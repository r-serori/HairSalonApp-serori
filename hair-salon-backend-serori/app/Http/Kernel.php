<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{

  //全てのリクエストに含まれるミドルウェア
  protected $middleware = [
    \App\Http\Middleware\TrustHosts::class,
    \App\Http\Middleware\TrustProxies::class,
    \Illuminate\Http\Middleware\HandleCors::class,
    \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
    \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
    \App\Http\Middleware\TrimStrings::class,
    \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
  ];

  protected $middlewareGroups = [
    //webミドルウェアグループ
    //csrf保護、セッションの開始、エラーの共有、CSRFトークンの検証、モデルのバインディング
    'web' => [
      \App\Http\Middleware\EncryptCookies::class,
      \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
      \Illuminate\Session\Middleware\StartSession::class,
      \Illuminate\View\Middleware\ShareErrorsFromSession::class,
      \App\Http\Middleware\VerifyCsrfToken::class,
      \Illuminate\Routing\Middleware\SubstituteBindings::class,
      \App\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ],
    //apiミドルウェアグループ
    //CSRFトークンの検証、モデルのバインディング、フロントエンドリクエストの状態を確認、APIのスロットリング
    'api' => [
      \Illuminate\Routing\Middleware\ThrottleRequests::class,
      \Illuminate\Routing\Middleware\SubstituteBindings::class,
      \App\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
      \Illuminate\Http\Middleware\HandleCors::class,
    ],
  ];


  //ルートミドルウェア
  //認証、認可、CSRFトークンの検証、モデルのバインディング、APIのスロットリング
  protected $routeMiddleware = [
    //認証ミドルウェア　認証されていない場合、エラーメッセージを返す
    'auth' => \App\Http\Middleware\Authenticate::class,
    'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
    'signed' => \App\Http\Middleware\ValidateSignature::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
  ];
}
