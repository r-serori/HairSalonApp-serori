<?php


namespace App\Http\Controllers\Auth;

use App\Enums\Roles;
use App\Http\Controllers\BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;




class GoogleAuthController extends BaseController
{
  public function redirectToGoogle()
  {
    return Socialite::driver('google')->redirect();
  }

  public function handleGoogleCallback()
  {
    $googleUser = Socialite::driver('google')->user();

    $user = $this->findOrCreateUser($googleUser);

    Auth::login($user, true);
  }

  public function findOrCreateUser($googleUser): User
  {
    $user = User::where('google_id', $googleUser->id)->first();

    if ($user) {
      return $user;
    } else {

      $authNowUser = Auth::user();

      if ($authNowUser) {
        $role = Roles::$STAFF;
      } else {
        $role = Roles::$OWNER;
      }

      return User::create([
        'name' => $googleUser->name,
        'email' => $googleUser->email,
        'google_id' => $googleUser->id,
        'password' => bcrypt(Str::random(16)),
        'role' => $role,
        'isAttendance' => 0,
        'email_verified_at' => now(),
      ]);
    }
  }
}
