<?php

namespace App\Services;

use App\Models\User;
use App\Enums\Roles;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class HasRole
{

    public function __construct()
    {
    }
    public function allAllow(): User //　権限は３種類あり、全ての役割を許可
    {
        $user = User::find(Auth::id());
        if ($user && ($user->hasRole(Roles::$OWNER) || $user->hasRole(Roles::$MANAGER) || $user->hasRole(Roles::$STAFF))) {
            return $user;
        } else {
            return response()->json(['message' => '権限がありません'], 403);
        }
    }

    public function managerAllow(): User
    {
        $user = User::find(Auth::id());
        if ($user && ($user->hasRole(Roles::$OWNER) || $user->hasRole(Roles::$MANAGER))) {
            return $user;
        } else {
            return response()->json(['message' => '権限がありません'], 403);
        }
    }

    public function ownerAllow(): User
    {
        $user = User::find(Auth::id());
        if ($user && $user->hasRole(Roles::$OWNER)) {
            return $user;
        } else {
            return response()->json(['message' => '権限がありません'], 403);
        }
    }
}
