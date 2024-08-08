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
import { deleteMerchandise } from "../../merchandises/merchandiseSlice";
import { ErrorType } from "../../../types/interface";

export interface Merchandise_customersState {
  // ステートの型
  merchandise_id: number;
  customer_id: number;
}

export interface RootState {
  // RootStateの型
  merchandise_customers: Merchandise_customersState[];
  status: "idle" | "loading" | "success" | "failed";
  error: ErrorType;
}

export const initialState: RootState = {
  merchandise_customers: [],
  status: "idle",
  error: {
    message: "",
    status: 0,
  },
};

const merchandise_customersSlice = createSlice({
  name: "merchandise_customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.merchandise_customers = action.payload.merchandise_customers;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.merchandise_customers = action.payload.merchandise_customers;
    });

    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.merchandise_customers = action.payload.merchandise_customers;
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.merchandise_customers = action.payload.merchandise_customers;
    });

    builder.addCase(createCustomerAndSchedule.fulfilled, (state, action) => {
      state.merchandise_customers = action.payload.merchandise_customers;
    });

    builder.addCase(
      updateCustomerAndScheduleCreate.fulfilled,
      (state, action) => {
        state.merchandise_customers = action.payload.merchandise_customers;
      }
    );

    builder.addCase(updateCustomerAndSchedule.fulfilled, (state, action) => {
      state.merchandise_customers = action.payload.merchandise_customers;
    });

    builder.addCase(
      createCustomerAndUpdateSchedule.fulfilled,
      (state, action) => {
        state.merchandise_customers = action.payload.merchandise_customers;
      }
    );

    builder.addCase(deleteMerchandise.fulfilled, (state, action) => {
      state.merchandise_customers = state.merchandise_customers.filter(
        (merchandise_customer) =>
          merchandise_customer.merchandise_id !== action.payload.deleteId
      );
    });
  },
});

const merchandise_customersReducer = merchandise_customersSlice.reducer;

export default merchandise_customersReducer;
