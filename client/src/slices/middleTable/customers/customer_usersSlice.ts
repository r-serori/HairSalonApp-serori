import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import RootState from "../../../redux/reducers/rootReducer";
import {
  getCustomer,
  createCustomer,
  updateCustomer,
} from "../../customers/customerSlice";
import {
  getSchedule,
  createCustomerAndSchedule,
  updateCustomerAndSchedule,
  updateCustomerAndScheduleCreate,
  createCustomerAndUpdateSchedule,
} from "../../schedules/scheduleSlice";
import { deleteUser } from "../../auth/userSlice";
import { ErrorType } from "../../../types/interface";

export interface Customer_usersState {
  // ステートの型
  customer_id: number;
  user_id: number;
}

export interface RootState {
  // RootStateの型
  customer_users: Customer_usersState[];
  loading: boolean;
  error: ErrorType;
}

export const initialState: RootState = {
  customer_users: [],
  loading: false,
  error: {
    message: "",
    status: 0,
  },
};

const customer_usersSlice = createSlice({
  name: "customer_users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.customer_users = action.payload.customer_users;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.customer_users = action.payload.customer_users;
    });

    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.customer_users = action.payload.customer_users;
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.customer_users = action.payload.customer_users;
    });

    builder.addCase(createCustomerAndSchedule.fulfilled, (state, action) => {
      state.customer_users = action.payload.customer_users;
    });

    builder.addCase(
      updateCustomerAndScheduleCreate.fulfilled,
      (state, action) => {
        state.customer_users = action.payload.customer_users;
      }
    );

    builder.addCase(updateCustomerAndSchedule.fulfilled, (state, action) => {
      state.customer_users = action.payload.customer_users;
    });

    builder.addCase(
      createCustomerAndUpdateSchedule.fulfilled,
      (state, action) => {
        state.customer_users = action.payload.customer_users;
      }
    );

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.customer_users = state.customer_users.filter(
        (customer_user) => customer_user.user_id !== action.payload.deleteId
      );
    });
  },
});

const customer_usersReducer = customer_usersSlice.reducer;

export default customer_usersReducer;
