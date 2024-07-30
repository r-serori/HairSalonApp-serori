import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { courseCustomerApi } from "../../../services/middleTable/customers/course_customersApi";
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
import { deleteCourse } from "../../courses/courseSlice";
import { ErrorType } from "../../../components/Hooks/interface";

export interface Course_customersState {
  // ステートの型
  course_id: number;
  customer_id: number;
}

export interface RootState {
  // RootStateの型
  course_customers: Course_customersState[];
  status: "idle" | "loading" | "success" | "failed";
  error: ErrorType;
}

export const initialState: RootState = {
  course_customers: [],
  status: "idle",
  error: {
    message: "",
    status: 0,
  },
};

const course_customersSlice = createSlice({
  name: "course_customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.course_customers = action.payload.course_customers;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.course_customers = action.payload.course_customers;
    });

    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.course_customers = [
        ...state.course_customers.filter(
          (stateCourse_customer) =>
            !action.payload.course_customers.some(
              (payloadCourse_customer) =>
                stateCourse_customer.customer_id ===
                payloadCourse_customer.customer_id
            )
        ),
        ...action.payload.course_customers,
      ];
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.course_customers = [
        ...state.course_customers.filter(
          (stateCourse_customer) =>
            !action.payload.course_customers.some(
              (payloadCourse_customer) =>
                stateCourse_customer.customer_id ===
                payloadCourse_customer.customer_id
            )
        ),
        ...action.payload.course_customers,
      ];
    });

    builder.addCase(createCustomerAndSchedule.fulfilled, (state, action) => {
      state.course_customers = [
        ...state.course_customers,
        ...action.payload.course_customers,
      ];
    });

    builder.addCase(
      updateCustomerAndScheduleCreate.fulfilled,
      (state, action) => {
        state.course_customers = [
          ...state.course_customers.filter(
            (stateCourse_customer) =>
              !action.payload.course_customers.some(
                (payloadCourse_customer) =>
                  stateCourse_customer.customer_id ===
                  payloadCourse_customer.customer_id
              )
          ),
          ...action.payload.course_customers,
        ];
      }
    );

    builder.addCase(
      createCustomerAndUpdateSchedule.fulfilled,
      (state, action) => {
        state.course_customers = [
          ...state.course_customers,
          ...action.payload.course_customers,
        ];
      }
    );

    builder.addCase(updateCustomerAndSchedule.fulfilled, (state, action) => {
      state.course_customers = [
        ...state.course_customers.filter(
          (stateCourse_customer) =>
            !action.payload.course_customers.some(
              (payloadCourse_customer) =>
                stateCourse_customer.customer_id ===
                payloadCourse_customer.customer_id
            )
        ),
        ...action.payload.course_customers,
      ];
    });

    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.course_customers = state.course_customers.filter(
        (course_customer) =>
          course_customer.course_id !== action.payload.deleteId
      );
    });
  },
});

const course_customersReducer = course_customersSlice.reducer;

export default course_customersReducer;
