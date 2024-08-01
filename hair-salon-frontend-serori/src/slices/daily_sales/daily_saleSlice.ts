import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { dailySaleApi } from "../../pages/api_backend/daily_sales/api";
import RootState from "../../redux/reducers/rootReducer";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api_backend/errorHandler";
import { deleteResponse, ErrorType } from "../../types/interface";

export const getDaily_sales = createAsyncThunk<
  GetDailySaleState,
  void,
  {
    rejectValue: ErrorType;
  }
>("daily_sales/getDaily_sales", async (_, { rejectWithValue }) => {
  try {
    const response: any = await dailySaleApi.fetchAllDailySales();
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const selectGetDaily_sales = createAsyncThunk<
  GetDailySaleState,
  string,
  {
    rejectValue: ErrorType;
  }
>("daily_sales/selectGetDaily_sales", async (year, { rejectWithValue }) => {
  try {
    const response: any = await dailySaleApi.selectGetDailySales(year);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    // console.log("errだよ", err);
    return handleCatchError(err, rejectWithValue);
  }
});

export const createDaily_sales = createAsyncThunk<
  PostDailySaleState,
  Daily_salesState,
  {
    rejectValue: ErrorType;
  }
>("daily_sales/createDaily_sales", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await dailySaleApi.createDailySales(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    // console.log("errだよ", err);
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateDaily_sales = createAsyncThunk<
  PostDailySaleState,
  Daily_salesState,
  {
    rejectValue: ErrorType;
  }
>("daily_sales/updateDaily_sales", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await dailySaleApi.updateDailySales(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    // console.log("errだよ", err);
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteDaily_sales = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("daily_sales/deleteDaily_sales", async (id, { rejectWithValue }) => {
  try {
    const response: any = await dailySaleApi.deleteDailySales(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    // console.log("errだよ", err);
    return handleCatchError(err, rejectWithValue);
  }
});

export interface Daily_salesState {
  // ステートの型
  id: number;
  date: string;
  daily_sales: number;
}

export interface GetDailySaleState {
  dailySales: Daily_salesState[];
  message: string;
}

export interface PostDailySaleState {
  dailySale: Daily_salesState;
  message: string;
}

export interface RootState {
  // ルートステートの型を定義
  daily_sales: Daily_salesState[];
  status: "idle" | "loading" | "success" | "failed"; // ローディング状態
  message: string | null; // メッセージ
  error: ErrorType; // エラー
}

export const initialState: RootState = {
  // 初期状態
  daily_sales: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const daily_salesSlice = createSlice({
  name: "daily_sales",
  initialState,
  reducers: {
    changeDailySaleMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.error = {
        message: "",
        status: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDaily_sales.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(getDaily_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.daily_sales = action.payload.dailySales;
      state.message = action.payload.message
        ? action.payload.message
        : "日次売上の取得に成功しました！";
    });
    builder.addCase(getDaily_sales.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(selectGetDaily_sales.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(selectGetDaily_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.daily_sales = action.payload.dailySales;
      state.message = action.payload.message
        ? action.payload.message
        : "日次売上の取得に成功しました！";
    });
    builder.addCase(selectGetDaily_sales.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(createDaily_sales.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(createDaily_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.daily_sales = [...state.daily_sales, action.payload.dailySale];
      state.message = action.payload.message
        ? action.payload.message
        : "日次売上の作成に成功しました！";
    });
    builder.addCase(createDaily_sales.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(updateDaily_sales.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(updateDaily_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.daily_sales = state.daily_sales.map((daily_sales) =>
        daily_sales.id === action.payload.dailySale.id
          ? { ...daily_sales, ...action.payload.dailySale }
          : daily_sales
      );
      state.message = action.payload.message
        ? action.payload.message
        : "日次売上の更新に成功しました！";
    });
    builder.addCase(updateDaily_sales.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(deleteDaily_sales.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(deleteDaily_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.daily_sales = state.daily_sales.filter(
        (daily_sales) => daily_sales.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "日次売上の削除に成功しました！";
    });
    builder.addCase(deleteDaily_sales.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });
  },
});

export const { changeDailySaleMessage } = daily_salesSlice.actions;

const daily_salesReducer = daily_salesSlice.reducer;

export default daily_salesReducer;
