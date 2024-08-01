import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { merchandiseApi } from "../../pages/api_backend/merchandises/api";
import RootState from "../../redux/reducers/rootReducer";
import { getCustomer } from "../customers/customerSlice";
import { getSchedule } from "../schedules/scheduleSlice";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api_backend/errorHandler";
import { deleteResponse, ErrorType } from "../../types/interface";

export const getMerchandise = createAsyncThunk<
  GetMerchandiseState,
  void,
  { rejectValue: ErrorType }
>("merchandises/getMerchandise", async (_, { rejectWithValue }) => {
  try {
    const response: any = await merchandiseApi.fetchAllMerchandises();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createMerchandise = createAsyncThunk<
  PostMerchandiseState,
  MerchandiseState,
  { rejectValue: ErrorType }
>("merchandises/createMerchandise", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await merchandiseApi.createMerchandise(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateMerchandise = createAsyncThunk<
  PostMerchandiseState,
  MerchandiseState,
  { rejectValue: ErrorType }
>("merchandises/updateMerchandise", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await merchandiseApi.updateMerchandise(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteMerchandise = createAsyncThunk<
  deleteResponse,
  number,
  { rejectValue: ErrorType }
>("merchandises/deleteMerchandise", async (id, { rejectWithValue }) => {
  try {
    const response: any = await merchandiseApi.deleteMerchandise(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface MerchandiseState {
  // ステートの型
  id: number;
  merchandise_name: string;
  price: number;
}

export interface GetMerchandiseState {
  merchandises: MerchandiseState[];
  message: string;
}
export interface PostMerchandiseState {
  merchandise: MerchandiseState;
  message: string;
}

export interface RootState {
  // RootStateの型
  merchandises: MerchandiseState[];
  status: "idle" | "loading" | "success" | "failed";
  message: string | null;
  error: ErrorType;
}

const initialState: RootState = {
  // 初期状態
  merchandises: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const merchandiseSlice = createSlice({
  name: "merchandises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMerchandise.pending, (state, action) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(getMerchandise.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "物販商品の取得に成功しました！";
      state.merchandises = [
        ...state.merchandises,
        ...action.payload.merchandises,
      ];
    });
    builder.addCase(getMerchandise.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createMerchandise.pending, (state, action) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(createMerchandise.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "物販商品の作成に成功しました！";
      state.merchandises = [...state.merchandises, action.payload.merchandise];
    });
    builder.addCase(createMerchandise.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateMerchandise.pending, (state, action) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateMerchandise.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "物販商品の更新に成功しました！";
      state.merchandises = state.merchandises.map((merchandise) =>
        merchandise.id === action.payload.merchandise.id
          ? { ...merchandise, ...action.payload.merchandise }
          : merchandise
      );
    });
    builder.addCase(updateMerchandise.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteMerchandise.pending, (state, action) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(deleteMerchandise.fulfilled, (state, action) => {
      state.status = "success";
      state.merchandises = state.merchandises.filter(
        (merchandise) => merchandise.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "物販の削除に成功しました！";
    });
    builder.addCase(deleteMerchandise.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.merchandises = action.payload.merchandises
        ? state.merchandises.length === action.payload.merchandises.length
          ? state.merchandises
          : action.payload.merchandises
        : state.merchandises;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.status = "success";
      state.merchandises = action.payload.merchandises
        ? state.merchandises.length === action.payload.merchandises.length
          ? state.merchandises
          : action.payload.merchandises
        : state.merchandises;
    });
  },
});

const merchandiseReducer = merchandiseSlice.reducer;

export default merchandiseReducer;
