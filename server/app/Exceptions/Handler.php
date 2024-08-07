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
        if ($request->wantsJson()) {
            if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
                // HttpException の場合は、ステータスコードを取得する
                $statusCode = $exception->getStatusCode();
            } else {
                // その他の例外の場合はデフォルトで 500 ステータスコードを使用する
                $statusCode = 500;
            }
            // JSON リクエストには JSON レスポンスを返す
            return response()->json([
                'message' => $exception->getMessage()
            ], $statusCode, [], JSON_UNESCAPED_UNICODE)->header(
                'Content-Type',
                'application/json; charset=UTF-8'
            );
        }

        // その他のリクエストには、通常のエラーページを返す
        return parent::render($request, $exception);
    }
}
