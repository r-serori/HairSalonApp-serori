import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ownerApi } from "../../pages/api/auth/ownerApi";
import RootState from "../../redux/reducers/rootReducer";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api/errorHandler";
import { ErrorType } from "../../types/interface";

export const ownerRegister = createAsyncThunk<
  PostOwnerState,
  OwnerState,
  {
    rejectValue: ErrorType;
  }
>("owner/register", async (formData, { rejectWithValue }) => {
  try {
    const response = await ownerApi.ownerRegister(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const getOwner = createAsyncThunk<
  PostOwnerState,
  void,
  {
    rejectValue: ErrorType;
  }
>("owner/getOwner", async (_, { rejectWithValue }) => {
  try {
    const response = await ownerApi.getOwner();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateOwner = createAsyncThunk<
  PostOwnerState,
  OwnerState,
  {
    rejectValue: ErrorType;
  }
>("owner/updateOwner", async (formData, { rejectWithValue }) => {
  try {
    const response = await ownerApi.updateOwner(formData);
    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface OwnerState {
  id: number;
  store_name: string;
  postal_code: string;
  prefecture: string;
  city: string;
  addressLine1: string;
  addressLine2: string | null;
  phone_number: string;
  user_id: number;
}

export interface PostOwnerState {
  owner: OwnerState;
  message: string;
}

export interface RootState {
  owner: OwnerState;
  status: "idle" | "loading" | "success" | "failed";
  message: string | null;
  error: ErrorType;
}

const initialState: RootState = {
  owner: {
    id: 0,
    store_name: "",
    postal_code: "",
    prefecture: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    phone_number: "",
    user_id: 0,
  },
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  }, // エラーメッセージ
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    oChangeMassage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ownerRegister.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(ownerRegister.fulfilled, (state, action) => {
      state.status = "success";
      state.owner = action.payload.owner;
      state.message = "オーナー登録が完了しました。";
    });
    builder.addCase(ownerRegister.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(getOwner.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(getOwner.fulfilled, (state, action) => {
      state.status = "success";
      state.owner = action.payload.owner;
    });
    builder.addCase(getOwner.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateOwner.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });

    builder.addCase(updateOwner.fulfilled, (state, action) => {
      state.status = "success";
      state.owner = action.payload.owner;
      state.message = "オーナー情報を更新しました。";
    });

    builder.addCase(updateOwner.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });
  },
});

export const { oChangeMassage } = ownerSlice.actions;

const ownerReducer = ownerSlice.reducer;

export default ownerReducer;
