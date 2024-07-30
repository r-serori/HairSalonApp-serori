import { createSlice } from "@reduxjs/toolkit";

export interface LoginNowState {
  loginNow: boolean;
}

export const initialState: LoginNowState = {
  loginNow: false,
  //true の時はログインしている状態
};

export interface RootState {
  loginNow: LoginNowState;
}

export const loginNowSlice = createSlice({
  name: "loginNow",
  initialState,
  reducers: {
    isLogin: (state) => {
      state.loginNow = true;
      localStorage.setItem("isLogin", "true");
      localStorage.removeItem("registerNow");
    },
    isLogout: (state) => {
      state.loginNow = false;
      localStorage.removeItem("isLogin");
    },
  },
});

export const { isLogin, isLogout } = loginNowSlice.actions;

export const loginNowReducer = loginNowSlice.reducer;
