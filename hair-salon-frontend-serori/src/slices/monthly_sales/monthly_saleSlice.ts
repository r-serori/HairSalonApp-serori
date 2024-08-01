import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { monthlySaleApi } from "../../pages/api_backend/monthly_sales/api";
import RootState from "../../redux/reducers/rootReducer";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api_backend/errorHandler";
import { ErrorType, deleteResponse } from "../../types/interface";

export const getMonthly_sales = createAsyncThunk<
  GetMonthlySaleState,
  void,
  { rejectValue: ErrorType }
>("monthly_sales/getMonthly_sales", async (_, { rejectWithValue }) => {
  try {
    const response: any = await monthlySaleApi.fetchAllMonthlySales();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const selectGetMonthly_sales = createAsyncThunk<
  GetMonthlySaleState,
  string,
  { rejectValue: ErrorType }
>("monthly_sales/selectGetMonthly_sales", async (year, { rejectWithValue }) => {
  try {
    const response: any = await monthlySaleApi.selectGetMonthlySales(year);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createMonthly_sales = createAsyncThunk<
  PostMonthlySaleState,
  Monthly_salesState,
  { rejectValue: ErrorType }
>(
  "monthly_sales/createMonthly_sales",
  async (formData, { rejectWithValue }) => {
    try {
      const response: any = await monthlySaleApi.createMonthlySales(formData);

      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

export const updateMonthly_sales = createAsyncThunk<
  PostMonthlySaleState,
  Monthly_salesState,
  { rejectValue: ErrorType }
>(
  "monthly_sales/updateMonthly_sales",
  async (formData, { rejectWithValue }) => {
    try {
      const response: any = await monthlySaleApi.updateMonthlySales(formData);

      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

export const deleteMonthly_sales = createAsyncThunk<
  deleteResponse,
  number,
  { rejectValue: ErrorType }
>("monthly_sales/deleteMonthly_sales", async (id, { rejectWithValue }) => {
  try {
    const response: any = await monthlySaleApi.deleteMonthlySales(id);
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface Monthly_salesState {
  // ステートの型
  id: number;
  year_month: string;
  monthly_sales: number;
}

export interface GetMonthlySaleState {
  monthlySales: Monthly_salesState[];
  message: string;
}
export interface PostMonthlySaleState {
  monthlySale: Monthly_salesState;
  message: string;
}

export interface RootState {
  // ルートステートの型を定義
  monthly_sales: Monthly_salesState[];
  status: "idle" | "loading" | "success" | "failed"; // ローディング状態
  message: string | null; // メッセージ
  error: ErrorType; // エラー
}

export const initialState: RootState = {
  monthly_sales: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const monthly_salesSlice = createSlice({
  name: "monthly_sales",
  initialState,
  reducers: {
    changeMonthlySaleMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = {
        message: "",
        status: 0,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getMonthly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(getMonthly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.monthly_sales = action.payload.monthlySales;
      state.message = action.payload.message
        ? action.payload.message
        : "月次売上の取得に成功しました！";
    });
    builder.addCase(getMonthly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(selectGetMonthly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(selectGetMonthly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.monthly_sales = action.payload.monthlySales;
      state.message = action.payload.message
        ? action.payload.message
        : "月次売上の取得に成功しました！";
    });
    builder.addCase(selectGetMonthly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createMonthly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(createMonthly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.monthly_sales = [
        ...state.monthly_sales,
        action.payload.monthlySale,
      ];
      state.message = action.payload.message
        ? action.payload.message
        : "月次売上の作成に成功しました！";
    });
    builder.addCase(createMonthly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateMonthly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(updateMonthly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.monthly_sales = state.monthly_sales.map((monthly_sales) =>
        monthly_sales.id === action.payload.monthlySale.id
          ? { ...monthly_sales, ...action.payload.monthlySale }
          : monthly_sales
      );
      state.message = action.payload.message
        ? action.payload.message
        : "月次売上の更新に成功しました！";
    });
    builder.addCase(updateMonthly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteMonthly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(deleteMonthly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.monthly_sales = state.monthly_sales.filter(
        (monthly_sales) => monthly_sales.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "月次売上の削除に成功しました！";
    });
    builder.addCase(deleteMonthly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });
  },
});

export const { changeMonthlySaleMessage } = monthly_salesSlice.actions;

const monthly_salesReducer = monthly_salesSlice.reducer;

export default monthly_salesReducer;
