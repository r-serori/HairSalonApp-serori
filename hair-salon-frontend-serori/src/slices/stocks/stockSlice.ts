import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { stockApi } from "../../services/stocks/api";
import RootState from "../../redux/reducers/rootReducer";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../services/errorHandler";
import { deleteResponse, ErrorType } from "../../components/Hooks/interface";
// APIから在庫情報を取得する非同期アクション//get
export const getStock = createAsyncThunk<
  GetStockState,
  void,
  {
    rejectValue: ErrorType;
  }
>("stocks/getStock", async (_, { rejectWithValue }) => {
  try {
    const response: any = await stockApi.fetchAllStocks(); // APIからデータを取得

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

// 新しい在庫情報を作成する非同期アクション//post,store
export const createStock = createAsyncThunk<
  PostStockState,
  StockState,
  {
    rejectValue: ErrorType;
  }
>("stocks/createStock", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await stockApi.createStock(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

// 在庫情報を更新する非同期アクション,put,update
export const updateStock = createAsyncThunk<
  PostStockState,
  StockState,
  {
    rejectValue: ErrorType;
  }
>("stocks/updateStock", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await stockApi.updateStock(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

// 在庫情報を削除する非同期アクション//delete
export const deleteStock = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("stocks/deleteStock", async (id, { rejectWithValue }) => {
  try {
    const response: any = await stockApi.deleteStock(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface StockState {
  // ステートの型
  id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  remarks: string | null;
  supplier: string | null; //仕入れ先
  notice: number; //通知
  stock_category_id: number | null; //在庫カテゴリー、外部キー
}

export interface GetStockState {
  stocks: StockState[];
  message: string | null;
}

export interface PostStockState {
  stock: StockState;
  message: string;
}

export interface RootState {
  stocks: StockState[];
  status: "idle" | "loading" | "success" | "failed";
  message: string | null;
  error: ErrorType;
}

const initialState: RootState = {
  // 初期状態
  stocks: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ここに非同期処理のreducerを記述
    builder.addCase(getStock.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(getStock.fulfilled, (state, action) => {
      state.status = "success";
      state.stocks = [...state.stocks, ...action.payload.stocks];
      state.message = action.payload.message
        ? action.payload.message
        : "在庫情報を取得しました！";
    });
    builder.addCase(getStock.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createStock.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(createStock.fulfilled, (state, action) => {
      state.status = "success";
      state.stocks = [...state.stocks, action.payload.stock];
      state.message = action.payload.message
        ? action.payload.message
        : "在庫情報を作成しました！";
    });
    builder.addCase(createStock.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateStock.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateStock.fulfilled, (state, action) => {
      state.status = "success";
      state.stocks = state.stocks.map((stock) =>
        stock.id === action.payload.stock.id
          ? { ...stock, ...action.payload.stock }
          : stock
      );
      state.message = action.payload.message
        ? action.payload.message
        : "在庫情報を更新しました！";
    });
    builder.addCase(updateStock.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteStock.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(deleteStock.fulfilled, (state, action) => {
      state.status = "success";
      state.stocks = state.stocks.filter(
        (stock) => stock.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "在庫情報を削除しました！";
    });
    builder.addCase(deleteStock.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });
  },
});

const stockReducer = stockSlice.reducer;

export default stockReducer;
