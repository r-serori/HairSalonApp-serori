<?php

namespace App\Actions\DeleteUserMain;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Enums\Roles;

class DeleteUserMain
{
    public function deleteUser(Request $request)
    {
        try {
            $user = User::find(Auth::id());
            if ($user && $user->hasRole(Roles::$OWNER)) {

                $deleteUser = User::find($request->id); // 例: リクエストからユーザーIDを取得

                if (!$deleteUser) {
                    return response()->json([
                        'message' => 'ユーザーが見つかりませんでした。',
                    ], 404, [], JSON_UNESCAPED_UNICODE)->header('Content-Type', 'application/json; charset=UTF-8');
                }

                $deleteUser->delete();

                return response()->json([
                    'deleteId' => $request->id, // 例: リクエストからユーザーIDを取得
                    'message' => 'ユーザーの削除に成功しました。',
                ], 200, [], JSON_UNESCAPED_UNICODE)->header('Content-Type', 'application/json; charset=UTF-8');
            } else {
                return response()->json([
                    'message' => 'あなたは権限がありません。',
                ], 403, [], JSON_UNESCAPED_UNICODE)->header('Content-Type', 'application/json; charset=UTF-8');
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'エラーが発生しました。もう一度やり直してください。',
            ], 500, [], JSON_UNESCAPED_UNICODE)->header('Content-Type', 'application/json; charset=UTF-8');
        }
    }
}
