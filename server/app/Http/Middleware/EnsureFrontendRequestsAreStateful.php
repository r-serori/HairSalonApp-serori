<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureFrontendRequestsAreStateful
{
  public function handle(Request $request, Closure $next)
  {
    $response = $next($request);

    // Set the SameSite attribute for cookies
    $response->headers->set('SameSite', 'None', true);

    // Ensure the cookies are secure if using HTTPS
    if ($request->secure()) {
      $response->headers->set('Set-Cookie', 'Secure; HttpOnly; SameSite=None');
    }

    return $response;
  }
}
