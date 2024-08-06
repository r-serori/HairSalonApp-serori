import { getKey, KeyState } from "../slices/auth/keySlice";
import { isLogout } from "../slices/auth/isLoginSlice";
import { logout } from "../slices/auth/userSlice";
import { AppDispatch } from "../redux/store";
import { NextRouter } from "next/router";
import { PermissionsState } from "../slices/auth/permissionSlice";

export const allLogout = async (
  dispatch: AppDispatch
): Promise<string | null> => {
  try {
    const response = await dispatch(logout() as any);
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(isLogout());
      localStorage.clear();
      return "ログアウトしました";
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const getUserKey = async (
  dispatch: AppDispatch
): Promise<KeyState | null> => {
  try {
    const response = await dispatch(getKey() as any);
    if (response.meta.requestStatus === "fulfilled") {
      return response.payload.roleKey;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const ownerPermission = (
  role: PermissionsState,
  router: NextRouter
): boolean | undefined => {
  if (role === "オーナー") {
    return true;
  } else {
    router.push("/dashboard");
  }
};

export const managerPermission = (
  role: PermissionsState,
  router: NextRouter
): boolean | undefined => {
  if (role === "マネージャー" || role === "オーナー") {
    return true;
  } else {
    router.push("/dashboard");
  }
};

export const staffPermission = (
  role: PermissionsState,
  router: NextRouter
): boolean | undefined => {
  if (role === "スタッフ" || role === "マネージャー" || role === "オーナー") {
    return true;
  } else {
    router.push("/dashboard");
  }
};
