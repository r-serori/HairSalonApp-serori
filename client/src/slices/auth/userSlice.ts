import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api_backend/auth/api";
import RootState from "../../redux/reducers/rootReducer";
import { getCustomer } from "../customers/customerSlice";
import { getSchedule, selectGetSchedules } from "../schedules/scheduleSlice";
import {
  pleaseEditEndTime,
  createStartTime,
  createEndTime,
  selectGetAttendanceTimes,
} from "../attendance_times/attendance_timesSlice";
import { isLogout } from "./isLoginSlice";
import { deleteResponse, ErrorType, RoleState } from "../../types/interface";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../api_backend/errorHandler";

export const login = createAsyncThunk<
  ResponseUserAndTokenState,
  {
    email: string;
    password: string;
  },
  {
    rejectValue: ErrorType;
  }
>("login/users", async (formData, { rejectWithValue }) => {
  try {
    const response = await userApi.login(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const register = createAsyncThunk<
  ResponseUserAndTokenState,
  {
    name: string;
    email: string;
    phone_number: string;
    role: string;
    password: string;
    isAttendance: boolean;
    password_confirmation: string;
  },
  {
    rejectValue: ErrorType;
  }
>("register/users", async (formData, { rejectWithValue }) => {
  try {
    const response = await userApi.register(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const staffRegister = createAsyncThunk<
  ResponseUserState,
  {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    role: string;
    isAttendance: boolean;
  },
  {
    rejectValue: ErrorType;
  }
>("staffRegister/users", async (formData, { rejectWithValue }) => {
  try {
    const response = await userApi.staffRegister(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const logout = createAsyncThunk<
  string,
  void,
  {
    rejectValue: ErrorType;
  }
>("logout/users", async (_, { rejectWithValue }) => {
  try {
    const response = await userApi.logout();
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const getUsers = createAsyncThunk<
  GetUserState,
  void,
  {
    rejectValue: ErrorType;
  }
>("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await userApi.getUsers();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const showUser = createAsyncThunk<
  ResponseUserState,
  void,
  {
    rejectValue: ErrorType;
  }
>("users/showUser", async (_, { rejectWithValue }) => {
  try {
    const response = await userApi.showUser();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateUserPassword = createAsyncThunk<
  string,
  {
    current_password: string;
    password: string;
    password_confirmation: string;
  },
  {
    rejectValue: ErrorType;
  }
>("users/updateUserPassword", async (formData, { rejectWithValue }) => {
  try {
    const response = await userApi.updateUserPassword(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateUserPermission = createAsyncThunk<
  ResponseUserState,
  { id: number; role: string },
  {
    rejectValue: ErrorType;
  }
>("users/updateUserPermission", async (formData, { rejectWithValue }) => {
  try {
    const response = await userApi.updateUserPermission(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateUser = createAsyncThunk<
  ResponseUserState,
  {
    name: string;
    email: string;
    phone_number: string;
  },
  {
    rejectValue: ErrorType;
  }
>("users/updateUser", async (formData, { rejectWithValue }) => {
  try {
    const response = await userApi.updateUser(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const forgotPassword = createAsyncThunk<
  {
    message: string;
  },
  string,
  {
    rejectValue: ErrorType;
  }
>("users/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await userApi.forgotPassword(email);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const resetPassword = createAsyncThunk<
  {
    message: string;
  },
  {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
  },
  {
    rejectValue: ErrorType;
  }
>("users/resetPassword", async (formData, { rejectWithValue }) => {
  try {
    const response = await userApi.resetPassword(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteUser = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const response = await userApi.deleteUser(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface UserState {
  // ステートの型
  id: number;
  name: string;
  email?: string;
  phone_number?: string;
  password?: string;
  role?: RoleState;
  isAttendance: boolean;
}

export interface ResponseUserAndTokenState {
  responseUser: UserState;
  token: string;
  message: string;
}

export interface ResponseUserState {
  responseUser: UserState;
  message: string;
}

export interface GetUserState {
  responseUsers: UserState[];
  message: string;
}

export interface RootState {
  users: UserState[];
  status: "idle" | "loading" | "success" | "failed";
  message: string | null;
  error: ErrorType;
}

const initialState: RootState = {
  // 初期状態
  users: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  }, // エラーメッセージ
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError(state) {
      state.error.message = "";
    },
    changeErrorMessage(state, action) {
      state.error.message = action.payload;
    },
    changeMessage(state, action) {
      state.message = action.payload;
    },
    trueIsAttendance(state, action: PayloadAction<number>) {
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, isAttendance: true } : user
      );
    },
    falseIsAttendance(state, action: PayloadAction<number>) {
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, isAttendance: false } : user
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.users = [action.payload.responseUser];
      state.message = action.payload.message
        ? action.payload.message
        : `お帰りなさい！ ${action.payload.responseUser.name}さん！`;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });
    builder.addCase(register.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "success";
      state.users = [...state.users, action.payload.responseUser];
      state.message = `登録に成功しました！ ${action.payload.responseUser.name}さん！`;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });
    builder.addCase(staffRegister.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(staffRegister.fulfilled, (state, action) => {
      state.status = "success";
      state.message = `スタッフの登録に成功しました！ ${action.payload.responseUser.name}さん！`;
      state.users = !Array.isArray(state.users)
        ? [state.users, action.payload.responseUser]
        : [...state.users, action.payload.responseUser];
    });

    builder.addCase(staffRegister.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(logout.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.status = "success";
      state.users = [];
      state.message = "ログアウトに成功しました！";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    //get系
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload.responseUsers;
      state.message = action.payload.message;
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(showUser.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(showUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users = [action.payload.responseUser];
      state.message = "ユーザー情報の取得に成功しました！";
    });
    builder.addCase(showUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    //update系
    builder.addCase(updateUserPermission.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateUserPermission.fulfilled, (state, action) => {
      state.status = "success";
      state.users = state.users.map((user) =>
        user.id === action.payload.responseUser.id
          ? { ...user, ...action.payload.responseUser }
          : user
      );
      state.message = "ユーザー情報の更新に成功しました！";
    });
    builder.addCase(updateUserPermission.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateUser.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "ユーザー情報の更新に成功しました！";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    //delete系
    builder.addCase(deleteUser.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users = state.users.filter(
        (users) => users.id !== action.payload.deleteId
      );
      state.message = "ユーザー情報の削除に成功しました！";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateUserPassword.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "パスワードの更新に成功しました！";
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "パスワードのリセットに成功しました！";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload.responseUsers
        ? action.payload.responseUsers
        : state.users;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload.responseUsers;
    });

    builder.addCase(selectGetSchedules.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload.responseUsers;
    });

    builder.addCase(pleaseEditEndTime.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });

    builder.addCase(createStartTime.fulfilled, (state, action) => {
      state.status = "success";
      state.message =
        action.payload.message || "出勤しました！今日も一日頑張りましょう！";
    });

    builder.addCase(createEndTime.fulfilled, (state, action) => {
      state.status = "success";
      state.message =
        action.payload.message ||
        "退勤しました！今日も1日お疲れ様でした！ゆっくりお休み下さい！";
    });

    builder.addCase(isLogout, (state) => {
      state.status = "success";
      state.users = [];
      // state.error = "セッションが切れました！再度ログインしてください！";
    });

    builder.addCase(selectGetAttendanceTimes.fulfilled, (state, action) => {
      state.status = "success";
      state.users = state?.users || [action.payload.responseUser];
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
    });

    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });
  },
});

export const {
  clearError,
  changeMessage,
  changeErrorMessage,
  trueIsAttendance,
  falseIsAttendance,
} = usersSlice.actions;

const usersReducer = usersSlice.reducer;

export default usersReducer;
