import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { stockCategoryApi } from "../../../api_backend/stock_categories/api";
import RootState from "../../../redux/reducers/rootReducer";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../../api_backend/errorHandler";
import { deleteResponse, ErrorType } from "../../../types/interface";

// APIから在庫カテゴリ情報を取得する非同期アクション//get
export const getStockCategory = createAsyncThunk<
  GetStockCategoryState,
  void,
  { rejectValue: ErrorType }
>("stock_categories/getStockCategory", async (_, { rejectWithValue }) => {
  try {
    const response: any = await stockCategoryApi.fetchAllStockCategories(); // APIからデータを取得

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

// 新しい在庫カテゴリ情報を作成する非同期アクション//post,store
export const createStockCategory = createAsyncThunk<
  PostStockCategoryState,
  Stock_categoryState,
  { rejectValue: ErrorType }
>(
  "stock_categories/createStockCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response: any = await stockCategoryApi.createStockCategory(
        formData
      );

      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

// 在庫カテゴリ情報を更新する非同期アクション,put,update
export const updateStockCategory = createAsyncThunk<
  PostStockCategoryState,
  Stock_categoryState,
  { rejectValue: ErrorType }
>(
  "stock_categories/updateStockCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response: any = await stockCategoryApi.updateStockCategory(
        formData
      );

      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

// 在庫カテゴリ情報を削除する非同期アクション//delete
export const deleteStockCategory = createAsyncThunk<
  deleteResponse,
  number,
  { rejectValue: ErrorType }
>("stock_categories/deleteStockCategory", async (id, { rejectWithValue }) => {
  try {
    const response: any = await stockCategoryApi.deleteStockCategory(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface Stock_categoryState {
  // ステートの型
  id: number;
  category: string;
}

export interface GetStockCategoryState {
  stockCategories: Stock_categoryState[];
  message: string;
}
export interface PostStockCategoryState {
  stockCategory: Stock_categoryState;
  message: string;
}

export interface RootState {
  stock_categories: Stock_categoryState[];
  status: "idle" | "loading" | "success" | "failed";
  message: string | null;
  error: ErrorType;
}

const initialState: RootState = {
  // 初期状態
  stock_categories: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const stock_categorySlice = createSlice({
  name: "stock_categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStockCategory.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(getStockCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.stock_categories = [
        ...state.stock_categories,
        ...action.payload.stockCategories,
      ];
      state.message = action.payload.message
        ? action.payload.message
        : "在庫カテゴリーの取得に成功しました！";
    });
    builder.addCase(getStockCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createStockCategory.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(createStockCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.stock_categories = [
        ...state.stock_categories,
        action.payload.stockCategory,
      ];
      state.message = action.payload.message
        ? action.payload.message
        : "在庫カテゴリーの作成に成功しました！";
    });
    builder.addCase(createStockCategory.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(updateStockCategory.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(updateStockCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.stock_categories = state.stock_categories.map((stock_category) =>
        stock_category.id === action.payload.stockCategory.id
          ? { ...stock_category, ...action.payload.stockCategory }
          : stock_category
      );
      state.message = action.payload.message
        ? action.payload.message
        : "在庫カテゴリーの更新に成功しました！";
    });
    builder.addCase(updateStockCategory.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });

    builder.addCase(deleteStockCategory.pending, (state) => {
      state.status = "loading";
      state.error = {
        message: "",
        status: 0,
      };
      state.message = null;
    });
    builder.addCase(deleteStockCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.stock_categories = state.stock_categories.filter(
        (stock_category) =>
          stock_category.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "在庫カテゴリーの削除に成功しました！";
    });
    builder.addCase(deleteStockCategory.rejected, (state, action) => {
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
      state.status = "failed";
    });
  },
});

const stockCategoryReducer = stock_categorySlice.reducer;

export default stockCategoryReducer;
