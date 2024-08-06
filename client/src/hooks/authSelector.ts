import { RootState } from "../redux/store";

// ログイン状態を取得 ログイン中はtrue ログアウト中はfalse
export const loginNow = (state: RootState) => state.loginNow.loginNow;

//owner情報を取得
export const ownerStore = (state: RootState) => state.owner.owner;
//owner情報のステータスを取得
export const ownerStatus = (state: RootState) => state.owner.status;

//owner情報のメッセージを取得
export const ownerMessage = (state: RootState) => state.owner.message;

//owner情報のエラーを取得
export const ownerError = (state: RootState) => state.owner.error.message;

export const ownerErrorStatus = (state: RootState) => state.owner.error.status;

//staff情報を取得
export const staff = (state: RootState) => state.staffs.staff;

//staff情報のステータスを取得
export const staffStatus = (state: RootState) => state.staffs.status;

//staff情報のメッセージを取得
export const staffMessage = (state: RootState) => state.staffs.message;

//staff情報のエラーを取得
export const staffError = (state: RootState) => state.staffs.error.message;

export const staffErrorStatus = (state: RootState) => state.staffs.error.status;

//ユーザー情報を取得
export const user = (state: RootState) => state.users.users;

//ユーザー情報のステータスを取得
export const userStatus = (state: RootState) => state.users.status;
//ユーザー情報のメッセージを取得
export const userMessage = (state: RootState) => state.users.message;
//ユーザー情報のエラーを取得
export const userError = (state: RootState) => state.users.error.message;

export const userErrorStatus = (state: RootState) => state.users.error.status;
//ユーザー情報のキーを取得
export const userKey = (state: RootState) => state.key.key;
//ユーザー情報のキーのステータスを取得
export const userKeyStatus = (state: RootState) => state.key.status;

export const permissionStore = (state: RootState) =>
  state.permissions.permission;
