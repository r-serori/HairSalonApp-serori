<?php


namespace App\Http\Controllers\Auth;


use App\Http\Controllers\BaseController;
use App\Models\User;
use App\Enums\Roles;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class VioRoleController extends BaseController
{
  public function vioRole()
  {
    try {
      $user = User::find(Auth::id());
      // Log::info($user);
      if ($user && $user->hasRole(Roles::$OWNER)) {

        return $this->responseMan([
          'myRole' => 'オーナー'
        ]);
      } else if ($user && $user->hasRole(Roles::$MANAGER)) {

        return $this->responseMan([
          'myRole' => 'マネージャー'
        ]);
      } else if ($user && $user->hasRole(Roles::$STAFF)) {

        return $this->responseMan([
          'myRole' => 'スタッフ'
        ]);
      } else {
        return $this->responseMan([
          'myRole' => '権限がありません'
        ], 403);
      }
    } catch (\Exception $e) {
      // Log::error($e->getMessage());
      return $this->serverErrorResponseWoman();
    }
  }
}
