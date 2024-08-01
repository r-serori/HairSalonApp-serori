import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { yearlySaleApi } from "../../pages/api_backend/yearly_sales/api";
import RootState from "../../redux/reducers/rootReducer";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api_backend/errorHandler";
import { deleteResponse, ErrorType } from "../../types/interface";

export const getYearly_sales = createAsyncThunk<
  GetYearlySaleState,
  void,
  {
    rejectValue: ErrorType;
  }
>("yearly_sales/getYearly_sales", async (_, { rejectWithValue }) => {
  try {
    const response: any = await yearlySaleApi.fetchAllYearlySales();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createYearly_sales = createAsyncThunk<
  PostYearlySaleState,
  Yearly_salesState,
  {
    rejectValue: ErrorType;
  }
>("yearly_sales/createYearly_sales", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await yearlySaleApi.createYearlySales(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateYearly_sales = createAsyncThunk<
  PostYearlySaleState,
  Yearly_salesState,
  {
    rejectValue: ErrorType;
  }
>("yearly_sales/updateYearly_sales", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await yearlySaleApi.updateYearlySales(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteYearly_sales = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("yearly_sales/deleteYearly_sales", async (id, { rejectWithValue }) => {
  try {
    const response: any = await yearlySaleApi.deleteYearlySales(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface Yearly_salesState {
  // ステートの型
  id: number;
  year: string;
  yearly_sales: number;
}

export interface GetYearlySaleState {
  yearlySales: Yearly_salesState[];
  message: string;
}
export interface PostYearlySaleState {
  yearlySale: Yearly_salesState;
  message: string;
}

export interface RootState {
  // ルートステートの型を定義
  yearly_sales: Yearly_salesState[];
  status: "idle" | "loading" | "success" | "failed"; // ローディング状態
  message: string | null; // メッセージ
  error: ErrorType; // エラー
}

export const initialState: RootState = {
  yearly_sales: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const yearly_salesSlice = createSlice({
  name: "yearly_sales",
  initialState,
  reducers: {
    changeYearlySaleMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = {
        message: "",
        status: 0,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getYearly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(getYearly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.yearly_sales = [
        ...state.yearly_sales,
        ...action.payload.yearlySales,
      ];
      state.message = action.payload.message
        ? action.payload.message
        : "年間売上の取得に成功しました！";
    });
    builder.addCase(getYearly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createYearly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(createYearly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.yearly_sales = [...state.yearly_sales, action.payload.yearlySale];
      state.message = action.payload.message
        ? action.payload.message
        : "年間売上の登録に成功しました！";
    });
    builder.addCase(createYearly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateYearly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(updateYearly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.yearly_sales = state.yearly_sales.map((yearly_sale) =>
        yearly_sale.id === action.payload.yearlySale.id
          ? { ...yearly_sale, ...action.payload.yearlySale }
          : yearly_sale
      );
      state.message = action.payload.message
        ? action.payload.message
        : "年間売上の更新に成功しました！";
    });
    builder.addCase(updateYearly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteYearly_sales.pending, (state, action) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(deleteYearly_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.yearly_sales = state.yearly_sales.filter(
        (yearly_sales) => yearly_sales.id !== Number(action.payload.deleteId)
      );
    });
    builder.addCase(deleteYearly_sales.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });
  },
});

export const { changeYearlySaleMessage } = yearly_salesSlice.actions;

const yearly_salesReducer = yearly_salesSlice.reducer;

export default yearly_salesReducer;
