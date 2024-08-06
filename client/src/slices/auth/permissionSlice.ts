import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vioRoleApi } from "../../api_backend/auth/vioRole";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../api_backend/errorHandler";
import { ErrorType } from "../../types/interface";

export const getPermission = createAsyncThunk<
  GetPermissionState,
  void,
  {
    rejectValue: ErrorType;
  }
>("permission/getPermission", async (_, { rejectWithValue }) => {
  try {
    const response = await vioRoleApi.getVioRole();
    // console.log("responseMyRole", response);
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export type PermissionsState = "オーナー" | "マネージャー" | "スタッフ" | null;

export interface GetPermissionState {
  myRole: PermissionsState;
  message: string;
}

export interface RootState {
  permission: PermissionsState;
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: RootState = {
  permission: null,
  status: "idle",
};

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPermission.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPermission.fulfilled, (state, action) => {
        state.permission = action.payload.myRole;
        state.status = "success";
      })
      .addCase(getPermission.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

const permissionReducer = permissionSlice.reducer;

export default permissionReducer;
