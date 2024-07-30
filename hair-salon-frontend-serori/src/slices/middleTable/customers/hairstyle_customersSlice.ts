import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { hairstyleCustomerApi } from "../../../services/middleTable/customers/hairstyle_customersApi";
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
import { deleteHairstyle } from "../../hairstyles/hairstyleSlice";
import { ErrorType } from "../../../components/Hooks/interface";

export interface Hairstyle_customersState {
  // ステートの型
  hairstyle_id: number;
  customer_id: number;
}

export interface RootState {
  // RootStateの型
  hairstyle_customers: Hairstyle_customersState[];
  status: "idle" | "loading" | "success" | "failed";
  error: ErrorType;
}

export const initialState: RootState = {
  hairstyle_customers: [],
  status: "idle",
  error: {
    message: "",
    status: 0,
  },
};

const hairstyle_customersSlice = createSlice({
  name: "hairstyle_customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.hairstyle_customers = action.payload.hairstyle_customers;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.hairstyle_customers = action.payload.hairstyle_customers;
    });

    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.hairstyle_customers = [
        ...state.hairstyle_customers.filter(
          (stateHairstyleCustomer) =>
            !action.payload.hairstyle_customers.some(
              (payloadHairstyleCustomer) =>
                stateHairstyleCustomer.customer_id ===
                payloadHairstyleCustomer.customer_id
            )
        ),
        ...action.payload.hairstyle_customers,
      ];
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.hairstyle_customers = [
        ...state.hairstyle_customers.filter(
          (stateHairstyleCustomer) =>
            !action.payload.hairstyle_customers.some(
              (payloadHairstyleCustomer) =>
                stateHairstyleCustomer.customer_id ===
                payloadHairstyleCustomer.customer_id
            )
        ),
        ...action.payload.hairstyle_customers,
      ];
    });

    builder.addCase(createCustomerAndSchedule.fulfilled, (state, action) => {
      state.hairstyle_customers = [
        ...state.hairstyle_customers,
        ...action.payload.hairstyle_customers,
      ];
    });

    builder.addCase(
      createCustomerAndUpdateSchedule.fulfilled,
      (state, action) => {
        state.hairstyle_customers = [
          ...state.hairstyle_customers,
          ...action.payload.hairstyle_customers,
        ];
      }
    );

    builder.addCase(
      updateCustomerAndScheduleCreate.fulfilled,
      (state, action) => {
        state.hairstyle_customers = [
          ...state.hairstyle_customers.filter(
            (stateHairstyleCustomer) =>
              !action.payload.hairstyle_customers.some(
                (payloadHairstyleCustomer) =>
                  stateHairstyleCustomer.customer_id ===
                  payloadHairstyleCustomer.customer_id
              )
          ),
          ...action.payload.hairstyle_customers,
        ];
      }
    );

    builder.addCase(updateCustomerAndSchedule.fulfilled, (state, action) => {
      state.hairstyle_customers = [
        ...state.hairstyle_customers.filter(
          (stateHairstyleCustomer) =>
            !action.payload.hairstyle_customers.some(
              (payloadHairstyleCustomer) =>
                stateHairstyleCustomer.customer_id ===
                payloadHairstyleCustomer.customer_id
            )
        ),
        ...action.payload.hairstyle_customers,
      ];
    });

    builder.addCase(deleteHairstyle.fulfilled, (state, action) => {
      state.hairstyle_customers = state.hairstyle_customers.filter(
        (hairstyle_customer) =>
          hairstyle_customer.hairstyle_id !== action.payload.deleteId
      );
    });
  },
});

const hairstyle_customersReducer = hairstyle_customersSlice.reducer;

export default hairstyle_customersReducer;
