import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import RootState from "../../redux/reducers/rootReducer";
import { getKeyApi } from "../../pages/api_backend/auth/key";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api_backend/errorHandler";
import { ErrorType } from "../../types/interface";

export const getKey = createAsyncThunk<
  GetKeyState,
  void,
  { rejectValue: ErrorType }
>("key/getKey", async (_, { rejectWithValue }) => {
  try {
    const response = await getKeyApi.getKey();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export type KeyState = string | null;

export interface GetKeyState {
  roleKey: KeyState;
  message: string;
}

export interface RootState {
  key: KeyState;
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: RootState = {
  key: null,
  status: "idle",
};

export const keySlice = createSlice({
  name: "key",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKey.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getKey.fulfilled, (state, action) => {
      state.status = "success";
      state.key = action.payload.roleKey;
    });
    builder.addCase(getKey.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectKey = (state: RootState) => state.key;

const keyReducer = keySlice.reducer;

export default keyReducer;
