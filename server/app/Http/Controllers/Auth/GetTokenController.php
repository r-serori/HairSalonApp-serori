<?php

namespace App\Http\Controllers\Auth;




class GetTokenController
{
  public function getToken()
  {
    return response()->json([
      'message' => 'トークンを取得しました。',
    ], 200, [], JSON_UNESCAPED_UNICODE)->header('Content-Type', 'application/json; charset=UTF-8');
  }
}
