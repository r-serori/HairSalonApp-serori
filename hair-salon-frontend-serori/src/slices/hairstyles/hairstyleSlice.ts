import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { hairstyleApi } from "../../pages/api/hairstyles/api";
import RootState from "../../redux/reducers/rootReducer";
import { getCustomer } from "../customers/customerSlice";
import { getSchedule } from "../schedules/scheduleSlice";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api/errorHandler";
import { ErrorType, deleteResponse } from "../../types/interface";

export const getHairstyle = createAsyncThunk<
  GetHairstyleState,
  void,
  {
    rejectValue: ErrorType;
  }
>("hairstyles/getHairstyle", async (_, { rejectWithValue }) => {
  try {
    const response: any = await hairstyleApi.fetchAllHairstyles();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createHairstyle = createAsyncThunk<
  PostHairstyleState,
  HairstyleState,
  {
    rejectValue: ErrorType;
  }
>("hairstyles/createHairstyle", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await hairstyleApi.createHairstyle(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateHairstyle = createAsyncThunk<
  PostHairstyleState,
  HairstyleState,
  {
    rejectValue: ErrorType;
  }
>("hairstyles/updateHairstyle", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await hairstyleApi.updateHairstyle(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteHairstyle = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("hairstyles/deleteHairstyle", async (id, { rejectWithValue }) => {
  try {
    const response: any = await hairstyleApi.deleteHairstyle(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface HairstyleState {
  // ステートの型
  id: number;
  hairstyle_name: string;
}

export interface GetHairstyleState {
  hairstyles: HairstyleState[];
  message: string;
}
export interface PostHairstyleState {
  hairstyle: HairstyleState;
  message: string;
}

export interface RootState {
  // ルートステートの型を定義
  hairstyles: HairstyleState[];
  status: "idle" | "loading" | "success" | "failed";
  message: string | null;
  error: ErrorType;
}

const initialState: RootState = {
  // 初期状態
  hairstyles: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const hairstyleSlice = createSlice({
  name: "hairstyles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHairstyle.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(getHairstyle.fulfilled, (state, action) => {
      state.status = "success";
      state.hairstyles = [...state.hairstyles, ...action.payload.hairstyles];
      state.message = action.payload.message
        ? action.payload.message
        : "髪型情報を取得しました！ ";
    });
    builder.addCase(getHairstyle.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createHairstyle.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(createHairstyle.fulfilled, (state, action) => {
      state.status = "success";
      state.hairstyles = [...state.hairstyles, action.payload.hairstyle];
      state.message = action.payload.message
        ? action.payload.message
        : "髪型情報を作成しました！";
    });
    builder.addCase(createHairstyle.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateHairstyle.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateHairstyle.fulfilled, (state, action) => {
      state.status = "success";
      state.hairstyles = state.hairstyles.map((hairstyle) =>
        hairstyle.id === action.payload.hairstyle.id
          ? { ...hairstyle, ...action.payload.hairstyle }
          : hairstyle
      );
      state.message = action.payload.message
        ? action.payload.message
        : "髪型情報を更新しました！";
    });

    builder.addCase(updateHairstyle.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteHairstyle.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(deleteHairstyle.fulfilled, (state, action) => {
      state.status = "success";
      state.hairstyles = state.hairstyles.filter(
        (hairstyle) => hairstyle.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "髪型情報を削除しました！";
    });
    builder.addCase(deleteHairstyle.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.hairstyles = action.payload.hairstyles
        ? state.hairstyles.length === action.payload.hairstyles.length
          ? state.hairstyles
          : action.payload.hairstyles
        : state.hairstyles;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.status = "success";
      state.hairstyles = action.payload.hairstyles
        ? state.hairstyles.length === action.payload.hairstyles.length
          ? state.hairstyles
          : action.payload.hairstyles
        : state.hairstyles;
    });
  },
});

const hairstyleReducer = hairstyleSlice.reducer;

export default hairstyleReducer;
