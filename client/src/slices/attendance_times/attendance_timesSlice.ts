import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { attendance_timeApi } from "../../api_backend/attendances/attendance_times/api";
import RootState from "../../redux/reducers/rootReducer";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../api_backend/errorHandler";
import { ErrorType, deleteResponse } from "../../types/interface";
import { UserState } from "../auth/userSlice";

export const selectGetAttendanceTimes = createAsyncThunk<
  GetAttendanceTimeState,
  {
    user_id: number;
    yearMonth: string;
  },
  {
    rejectValue: ErrorType;
  }
>(
  "attendance_times/selectGetAttendanceTimes",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await attendance_timeApi.selectFetchAttendanceTimes(
        formData
      );
      // console.log("responseだよ", response);

      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

export const firstGetAttendanceTime = createAsyncThunk<
  GetFirstAttendanceTimeState,
  number,
  {
    rejectValue: ErrorType;
  }
>(
  "attendance_times/firstGetAttendanceTime",
  async (id, { rejectWithValue }) => {
    try {
      const response: any = await attendance_timeApi.firstGetAttendanceTime(
        id as number
      );
      // console.log("responseだよ", response);
      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

export const pleaseEditEndTime = createAsyncThunk<
  PostAttendanceTimeState,
  {
    id: number;
    end_time: string;
    end_photo_path: string;
    user_id: number;
  },
  {
    rejectValue: ErrorType;
  }
>(
  "attendance_times/pleaseEditEndTime",
  async (formData, { rejectWithValue }) => {
    try {
      const response: any = await attendance_timeApi.pleaseEditEndTime(
        formData
      );
      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

export const updateStartTime = createAsyncThunk<
  PostAttendanceTimeState,
  {
    id: number;
    start_time: string;
    start_photo_path: string;
    user_id: number;
  },
  {
    rejectValue: ErrorType;
  }
>("attendance_times/updateStartTime", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await attendance_timeApi.updateStartTime(formData);
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateEndTime = createAsyncThunk<
  PostAttendanceTimeState,
  {
    id: number;
    end_time: string;
    end_photo_path: string;
    user_id: number;
  },
  {
    rejectValue: ErrorType;
  }
>("attendance_times/updateEndTime", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await attendance_timeApi.updateEndTime(formData);
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createStartTime = createAsyncThunk<
  PostAttendanceTimeState,
  {
    start_time: string;
    start_photo_path: string;
    user_id: number;
  },
  {
    rejectValue: ErrorType;
  }
>("attendance_times/createStartTime", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await attendance_timeApi.createStartTime(formData);
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createEndTime = createAsyncThunk<
  PostAttendanceTimeState,
  {
    end_time: string;
    end_photo_path: string;
    user_id: number;
  },
  {
    rejectValue: ErrorType;
  }
>("attendance_times/createEndTime", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await attendance_timeApi.createEndTime(formData);
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteAttendanceTime = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("attendance_times/deleteAttendanceTime", async (id, { rejectWithValue }) => {
  try {
    const response: any = await attendance_timeApi.deleteAttendanceTime(id);
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface Attendance_timeState {
  // ステートの型
  id: number;
  start_time: string | null;
  end_time: string | null;
  start_photo_path: string | null;
  end_photo_path: string | null;
  user_id: number;
}

export interface GetAttendanceTimeState {
  attendanceTimes: Attendance_timeState[];
  responseUser?: UserState;
  message: string;
}

export interface GetFirstAttendanceTimeState {
  attendanceTime: Attendance_timeState;
  message: string;
}

export interface PostAttendanceTimeState {
  attendanceTime: Attendance_timeState;
  message: string;
}

export interface RootState {
  // ルートステートの型を定義
  attendance_times: Attendance_timeState[]; // 出席情報の配列
  status: "idle" | "loading" | "success" | "failed";
  message: string | null; // メッセージ
  error: ErrorType; // エラーメッセージ
}

const initialState: RootState = {
  // 初期状態
  attendance_times: [], // 出席情報の配列
  status: "idle",
  message: null, // メッセージ
  error: {
    message: "",
    status: 0,
  }, // エラーメッセージ
};

const attendance_timeSlice = createSlice({
  name: "attendance_time",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(selectGetAttendanceTimes.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(selectGetAttendanceTimes.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "勤怠時間と画像の取得に成功しました！";
      state.attendance_times = action.payload.attendanceTimes;
    });
    builder.addCase(selectGetAttendanceTimes.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(firstGetAttendanceTime.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });

    builder.addCase(firstGetAttendanceTime.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "最新の勤怠情報を取得しました！";
      state.attendance_times =
        state.attendance_times.length > 0
          ? [...state.attendance_times, action.payload.attendanceTime]
          : [action.payload.attendanceTime];
    });

    builder.addCase(firstGetAttendanceTime.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(pleaseEditEndTime.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });

    builder.addCase(pleaseEditEndTime.fulfilled, (state, action) => {
      state.status = "success";
      state.attendance_times = state.attendance_times.map((attendance_time) =>
        attendance_time.id === action.payload.attendanceTime.id
          ? {
              ...attendance_time,
              ...action.payload.attendanceTime,
            }
          : attendance_time
      );
      state.message = action.payload.message;
    });
    builder.addCase(pleaseEditEndTime.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateStartTime.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateStartTime.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "出勤時間と画像の更新に成功しました！";
      state.attendance_times = state.attendance_times.map((attendance_time) =>
        attendance_time.id === action.payload.attendanceTime.id
          ? {
              ...attendance_time,
              ...action.payload.attendanceTime,
            }
          : attendance_time
      );
    });
    builder.addCase(updateStartTime.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateEndTime.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateEndTime.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "退勤時間と画像の更新に成功しました！";
      state.attendance_times = state.attendance_times.map((attendance_time) =>
        attendance_time.id === action.payload.attendanceTime.id
          ? { ...attendance_time, ...action.payload.attendanceTime }
          : attendance_time
      );
    });

    builder.addCase(updateEndTime.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createStartTime.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(createStartTime.fulfilled, (state, action) => {
      state.status = "success";
      state.attendance_times = [
        ...state.attendance_times,
        action.payload.attendanceTime,
      ];
      state.message = action.payload.message
        ? action.payload.message
        : "出勤時間と画像の登録に成功しました！";
    });
    builder.addCase(createStartTime.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createEndTime.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(createEndTime.fulfilled, (state, action) => {
      state.status = "success";
      state.attendance_times = state.attendance_times.map((attendance_time) =>
        attendance_time.id === action.payload.attendanceTime.id
          ? {
              ...attendance_time,
              ...action.payload.attendanceTime,
            }
          : attendance_time
      );
      state.message = action.payload.message
        ? action.payload.message
        : "退勤時間と画像の登録に成功しました！";
    });
    builder.addCase(createEndTime.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteAttendanceTime.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(deleteAttendanceTime.fulfilled, (state, action) => {
      state.status = "success";
      state.attendance_times = state.attendance_times.filter(
        (attendance_time) =>
          attendance_time.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "勤怠情報の削除に成功しました！";
    });

    builder.addCase(deleteAttendanceTime.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });
  },
});

const attendance_timeReducer = attendance_timeSlice.reducer;

export default attendance_timeReducer;
