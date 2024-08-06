import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { customerApi } from "../../api_backend/customers/api";
import RootState from "../../redux/reducers/rootReducer";
import {
  getSchedule,
  createCustomerAndSchedule,
  updateCustomerAndSchedule,
  updateCustomerAndScheduleCreate,
  createCustomerAndUpdateSchedule,
} from "../schedules/scheduleSlice";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../api_backend/errorHandler";
import { deleteResponse, ErrorType } from "../../types/interface";
import { CourseState } from "../courses/courseSlice";
import { OptionState } from "../options/optionSlice";
import { MerchandiseState } from "../merchandises/merchandiseSlice";
import { HairstyleState } from "../hairstyles/hairstyleSlice";
import { UserState } from "../auth/userSlice";
import { Course_customersState } from "../middleTable/customers/course_customersSlice";
import { Option_customersState } from "../middleTable/customers/option_customersSlice";
import { Merchandise_customersState } from "../middleTable/customers/merchandise_customersSlice";
import { Hairstyle_customersState } from "../middleTable/customers/hairstyle_customersSlice";
import { Customer_usersState } from "../middleTable/customers/customer_usersSlice";

export const getCustomer = createAsyncThunk<
  GetCustomerState,
  void,
  {
    rejectValue: ErrorType;
  }
>("customer/getCustomer", async (_, { rejectWithValue }) => {
  try {
    const response: any = await customerApi.fetchAllCustomers();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createCustomer = createAsyncThunk<
  PostCustomerState,
  CustomerState,
  {
    rejectValue: ErrorType;
  }
>("customer/createCustomer", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await customerApi.createCustomer(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateCustomer = createAsyncThunk<
  PostCustomerState,
  CustomerState,
  {
    rejectValue: ErrorType;
  }
>("customer/updateCustomer", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await customerApi.updateCustomer(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteCustomer = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("customer/deleteCustomer", async (id, { rejectWithValue }) => {
  try {
    const response: any = await customerApi.deleteCustomer(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface CustomerState {
  // ステートの型
  id: number;
  customer_name: string;
  phone_number: string | null;
  remarks: string | null;
  course_id: number[] | null;
  option_id: number[] | null;
  merchandise_id: number[] | null;
  hairstyle_id: number[] | null;
  user_id: number[] | null;
}

export interface CustomerOnlyState {
  id: number;
  customer_name: string;
  phone_number: string | null;
  remarks: string | null;
}

export interface GetCustomerState {
  customers: CustomerOnlyState[];
  courses: CourseState[];
  options: OptionState[];
  merchandises: MerchandiseState[];
  hairstyles: HairstyleState[];
  responseUsers: UserState[];
  course_customers: Course_customersState[];
  option_customers: Option_customersState[];
  merchandise_customers: Merchandise_customersState[];
  hairstyle_customers: Hairstyle_customersState[];
  customer_users: Customer_usersState[];
  message: string;
}

export interface PostCustomerState {
  customer: CustomerState;
  course_customers: Course_customersState[];
  option_customers: Option_customersState[];
  merchandise_customers: Merchandise_customersState[];
  hairstyle_customers: Hairstyle_customersState[];
  customer_users: Customer_usersState[];
  message: string;
}

export interface RootState {
  // ルートステートの型を定義
  customers: CustomerOnlyState[]; // 顧客情報の配列
  status: "idle" | "loading" | "success" | "failed"; // ローディング状態
  message: string | null; // メッセージ
  error: ErrorType; // エラーメッセージ
}

const initialState: RootState = {
  // 初期状態
  customers: [], // 顧客情報の配列
  status: "idle", // ローディング状態
  message: null, // メッセージ
  error: {
    message: "",
    status: 0,
  }, // エラーメッセージ
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomer.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.status = "success";

      state.customers =
        action.payload.customers.length === 0
          ? []
          : action.payload.customers.length
          ? [...state.customers, ...action.payload.customers]
          : state.customers;

      state.message = action.payload.message
        ? action.payload.message
        : "顧客情報を取得しました！";
    });
    builder.addCase(getCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createCustomer.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.customers = [...state.customers, action.payload.customer];
      state.message = action.payload.message
        ? action.payload.message
        : "顧客情報を作成しました！";
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateCustomer.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.customers =
        state.customers.length === 1
          ? [action.payload.customer]
          : state.customers.map((customer) =>
              customer.id === action.payload.customer.id
                ? { ...customer, ...action.payload.customer }
                : customer
            );
      state.message = action.payload.message
        ? action.payload.message
        : "顧客情報を更新しました！";
    });

    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteCustomer.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.customers = state.customers.filter(
        (customer) => customer.id !== Number(action.payload.deleteId)
      );
      state.message = action.payload.message
        ? action.payload.message
        : "顧客情報を削除しました！";
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.status = "success";
      state.customers = action.payload.customers;
    });

    builder.addCase(createCustomerAndSchedule.fulfilled, (state, action) => {
      state.status = "success";
      state.customers =
        state.customers.length === 0
          ? [action.payload.customer]
          : [...state.customers, action.payload.customer];
    });

    builder.addCase(
      updateCustomerAndScheduleCreate.fulfilled,
      (state, action) => {
        state.status = "success";
        state.customers = state.customers.map((customer) =>
          customer.id === action.payload.customer.id
            ? { ...customer, ...action.payload.customer }
            : customer
        );
      }
    );

    builder.addCase(updateCustomerAndSchedule.fulfilled, (state, action) => {
      state.status = "success";
      state.customers = state.customers.map((customer) =>
        customer.id === action.payload.customer.id
          ? { ...customer, ...action.payload.customer }
          : customer
      );
    });

    builder.addCase(
      createCustomerAndUpdateSchedule.fulfilled,
      (state, action) => {
        state.status = "success";
        state.customers = [...state.customers, action.payload.customer];
      }
    );
  },
});

const customerReducer = customerSlice.reducer;

export default customerReducer;
