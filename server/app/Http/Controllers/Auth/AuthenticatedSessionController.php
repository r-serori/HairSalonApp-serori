<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Pipeline;
use Laravel\Fortify\Actions\AttemptToAuthenticate;
use Laravel\Fortify\Actions\CanonicalizeUsername;
use Laravel\Fortify\Actions\EnsureLoginIsNotThrottled;
use Laravel\Fortify\Actions\PrepareAuthenticatedSession;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Contracts\LoginViewResponse;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Owner;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Validation\ValidationException;


class AuthenticatedSessionController extends BaseController
{


    public function __construct()
    {
    }

    /**
     * Show the login view.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Laravel\Fortify\Contracts\LoginViewResponse
     */
    public function create(Request $request): LoginViewResponse
    {
        return app(LoginViewResponse::class);
    }

    /**
     * Attempt to authenticate a new session.
     *
     * @param  \Laravel\Fortify\Http\Requests\LoginRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(LoginRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            return $this->loginPipeline($request)->then(function ($request) {
                try {
                    Log::info('loginstore!!!!!!!!!!!');
                    $existOwner = Owner::where('user_id', $request->user()->id)->first();

                    $user = User::find(Auth::id());

                    if ($user->email_verified_at === null) {
                        DB::rollBack();
                        $this->responseMan([
                            'message' => 'メール認証が完了していません。メール認証を行ってください。',
                        ], 400);
                    }

                    $token = $user->createToken('HairSalonAppSerori')->plainTextToken;

                    $responseUser = [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                        'phone_number' => $request->user()->phone_number,
                        'role' => $request->user()->role === Roles::$OWNER ? 'オーナー' : ($request->user()->role === Roles::$MANAGER ? 'マネージャー' : 'スタッフ'),
                        'isAttendance' => $request->user()->isAttendance,
                    ];

                    if (!empty($existOwner)) {
                        DB::commit();
                        return $this->responseMan([
                            'ownerRender' => false,
                            'message' => 'オーナー用ユーザーとしてログインしました!',
                            'responseUser' => $responseUser,
                            'token' => $token,
                        ]);
                    } else {
                        if ($request->user()->role === Roles::$OWNER) {
                            DB::rollBack();
                            return $this->responseMan([
                                'message' => 'オーナー用ユーザーとしてログインしました!ただし、店舗登録が完了していません。店舗登録を行ってください。',
                                'responseUser' => $responseUser,
                                'ownerRender' => true,
                                'token' => $token,
                            ]);
                        } else {
                            DB::commit();
                            return $this->responseMan([
                                'ownerRender' => false,
                                'message' => 'スタッフ用ユーザーとしてログインしました!',
                                'responseUser' => $responseUser,
                                'token' => $token,
                            ]);
                        }
                    }
                } catch (\Exception $e) {
                    DB::rollBack();
                    // Log::error($e->getMessage());
                    return response()->json([
                        'message' => 'ログインに失敗しました。もう一度やり直してください。',
                    ], 500);
                }
            });
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => '認証に失敗しました。メールアドレスまたはパスワードが正しくありません。',
            ], 400);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::error($e->getMessage());
            return response()->json([
                'message' => 'ログインに失敗しました。もう一度やり直してください。',
            ], 500);
        }
    }

    protected function loginPipeline(LoginRequest $request)
    {
        if (Fortify::$authenticateThroughCallback) {
            return (new Pipeline(app()))->send($request)->through(array_filter(
                call_user_func(Fortify::$authenticateThroughCallback, $request)
            ));
        }

        if (is_array(config('fortify.pipelines.login'))) {
            return (new Pipeline(app()))->send($request)->through(array_filter(
                config('fortify.pipelines.login')
            ));
        }

        return (new Pipeline(app()))->send($request)->through(array_filter([
            config('fortify.limiters.login') ? null : EnsureLoginIsNotThrottled::class,
            config('fortify.lowercase_usernames') ? CanonicalizeUsername::class : null,
            AttemptToAuthenticate::class,
            PrepareAuthenticatedSession::class,
        ]));
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request {id:id}
     * @return JsonResponse
     */
    public function destroy(Request $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $token = $request->bearerToken();
            Log::info('token: ' . $token);

            // Revoke the token
            if ($token) {
                $personalAccessToken = PersonalAccessToken::findToken($token);
                Log::info('personalAccessToken: ' . $personalAccessToken);
                if ($personalAccessToken) {
                    $personalAccessToken->delete();
                }
            }
            // Optionally, log the user out of the session
            Auth::guard('web')->logout();
            DB::commit();

            Log::info('logout');
            return $this->responseMan([
                'message' => 'ログアウトしました!'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            // Log::error($e->getMessage());
            return $this->responseMan([
                'message' => 'ログアウトに失敗しました。もう一度やり直してください。',
            ], 500);
        }
    }
}
