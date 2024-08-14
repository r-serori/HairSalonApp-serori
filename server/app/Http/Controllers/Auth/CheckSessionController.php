<?php


namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;



class CheckSessionController extends BaseController
{
  public function checkSession()
  {
    try {
      $user = User::find(Auth::id());
      if ($user && $user->hasRole(Roles::$OWNER) || $user->hasRole(Roles::$MANAGER) || $user->hasRole(Roles::$STAFF)) {

        return $this->responseMan([
          'status' => 'authenticated'
        ]);
      } else {
        return $this->responseMan([
          'status' => 'unauthenticated'
        ], 403);
      }
    } catch (\Exception $e) {
      // Log::error($e->getMessage());
      return $this->responseMan([
        'status' => 'unauthenticated'
      ], 500);
    }
  }
}
