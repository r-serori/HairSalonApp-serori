import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { optionApi } from "../../pages/api/options/api";
import RootState from "../../redux/reducers/rootReducer";
import { getCustomer } from "../customers/customerSlice";
import { getSchedule } from "../schedules/scheduleSlice";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api/errorHandler";
import { ErrorType, deleteResponse } from "../../types/interface";

export const getOption = createAsyncThunk<
  GetOptionState,
  void,
  { rejectValue: ErrorType }
>("options/getOption", async (_, { rejectWithValue }) => {
  try {
    const response: any = await optionApi.fetchAllOptions();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createOption = createAsyncThunk<
  PostOptionState,
  OptionState,
  { rejectValue: ErrorType }
>("options/createOption", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await optionApi.createOption(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateOption = createAsyncThunk<
  PostOptionState,
  OptionState,
  { rejectValue: ErrorType }
>("options/updateOption", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await optionApi.updateOption(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteOption = createAsyncThunk<
  deleteResponse,
  number,
  { rejectValue: ErrorType }
>("options/deleteOption", async (id, { rejectWithValue }) => {
  try {
    const response: any = await optionApi.deleteOption(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface OptionState {
  // ステートの型
  id: number;
  option_name: string;
  price: number;
}

export interface GetOptionState {
  options: OptionState[];
  message: string;
}
export interface PostOptionState {
  option: OptionState;
  message: string;
}

export interface RootState {
  options: OptionState[];
  status: "idle" | "loading" | "success" | "failed";
  message: string | null;
  error: ErrorType;
}

const initialState: RootState = {
  options: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const optionSlice = createSlice({
  name: "options",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOption.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(getOption.fulfilled, (state, action) => {
      state.status = "success";
      state.options = [...state.options, ...action.payload.options];
      state.message = action.payload.message
        ? action.payload.message
        : "オプションの取得に成功しました！";
    });
    builder.addCase(getOption.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "success";
    });

    builder.addCase(createOption.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(createOption.fulfilled, (state, action) => {
      state.status = "success";
      state.options = [...state.options, action.payload.option];
      state.message = action.payload.message
        ? action.payload.message
        : "オプションの登録に成功しました！";
    });
    builder.addCase(createOption.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(updateOption.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateOption.fulfilled, (state, action) => {
      state.status = "success";
      state.options = state.options.map((option) =>
        option.id === action.payload.option.id
          ? { ...option, ...action.payload.option }
          : option
      );
      state.message = action.payload.message
        ? action.payload.message
        : "オプション情報を更新しました！";
    });
    builder.addCase(updateOption.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(deleteOption.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(deleteOption.fulfilled, (state, action) => {
      state.status = "success";
      state.options = state.options.filter(
        (option) => option.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "オプション情報を削除しました！";
    });
    builder.addCase(deleteOption.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.options = action.payload.options
        ? state.options.length === action.payload.options.length
          ? state.options
          : action.payload.options
        : state.options;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.status = "success";
      state.options = action.payload.options
        ? state.options.length === action.payload.options.length
          ? state.options
          : action.payload.options
        : state.options;
    });
  },
});

const optionReducer = optionSlice.reducer;

export default optionReducer;
