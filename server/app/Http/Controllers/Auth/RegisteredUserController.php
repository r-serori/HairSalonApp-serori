<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Actions\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Fortify;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Enums\Roles;
use App\Http\Controllers\BaseController;
use App\Notifications\VerifyEmailNotification;

class RegisteredUserController extends BaseController
{
  /**
   * The guard implementation.
   *
   * @var \Illuminate\Contracts\Auth\StatefulGuard
   */
  protected $guard;

  /**
   * Create a new controller instance.
   *
   * @param  \Illuminate\Contracts\Auth\StatefulGuard  $guard
   * @return void
   */
  public function __construct(StatefulGuard $guard)
  {
    $this->guard = $guard;
  }

  /**
   * Create a new registered user.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Actions\Fortify\Contracts\CreatesNewUsers  $creator
   * @return \Illuminate\Http\JsonResponse
   */
  public function store(
    Request $request,
    CreatesNewUsers $creator
  ): JsonResponse {
    DB::beginTransaction();
    try {

      // Log::info('store');
      if (config('fortify.lowercase_usernames')) {
        $request->merge([
          Fortify::username() => Str::lower($request->{Fortify::username()}),
        ]);
      }

      event(($user = $creator->create($request->all())));

      $user->notify(new VerifyEmailNotification($user));

      $token = $user->createToken('HairSalonAppSerori')->plainTextToken;

      $responseUser =
        [
          'id' => $user->id,
          'name' => $user->name,
          'email' => $user->email,
          'phone_number' => $user->phone_number,
          'role' => Roles::$OWNER,
          'isAttendance' => $user->isAttendance,
        ];

      DB::commit();

      return $this->responseMan([
        'message' => 'ユーザー仮登録に成功しました！オーナー登録をしてください！',
        'responseUser' => $responseUser,
        'token' => $token
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      // Log::error($e->getMessage());
      if (strpos($e->getMessage(), 'メールアドレスの値は既に存在') !== false) {
        return $this->responseMan([
          'message' => 'メールアドレスが既に存在しています！他のメールアドレスを入力してください！'
        ], 400);
      } elseif (strpos($e->getMessage(), 'users_phone_number_unique') !== false) {
        return $this->responseMan([
          'message' => '電話番号が既に存在しています！他の電話番号を入力してください！'
        ], 400);
      } else {
        // その他のエラー処理
        // Log::error($e->getMessage());
        return $this->responseMan([
          'message' => '何らかのエラーが発生しました。もう一度最初からやり直してください！'
        ], 500);
      }
    }
  }
}
