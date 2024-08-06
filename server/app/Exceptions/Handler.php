<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }


    public function render($request, Throwable $exception)
    {
        if ($request->is('api/*')) {
            Log::error($exception->getMessage(), [
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'trace' => $exception->getTraceAsString(),
            ]);

            if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
                return response()->json([
                    'message' => '認証に失敗しました。メールアドレスまたはパスワードが正しくありません。',
                ], 400);
            } elseif ($exception instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'message' => '入力内容に誤りがあります。',
                    'errors' => $exception->errors(),
                ], 400);
            } elseif ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                return response()->json([
                    'message' => 'リソースが見つかりません。',
                ], 400);
            } elseif ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
                return response()->json([
                    'message' => $exception->getMessage(),
                ], $exception->getStatusCode());
            } else {
                return response()->json([
                    'message' => 'サーバーでエラーが起きました。管理者にお問い合わせください。',
                ], 500);
            }
        }

        return parent::render($request, $exception);
    }
}
