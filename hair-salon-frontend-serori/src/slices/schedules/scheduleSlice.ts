import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { schedulesApi } from "../../pages/api/schedules/api";
import RootState from "../../redux/reducers/rootReducer";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api/errorHandler";
import { CustomerOnlyState, deleteCustomer } from "../customers/customerSlice";
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
import { deleteResponse, ErrorType } from "../../types/interface";

export const getSchedule = createAsyncThunk<
  GetScheduleState,
  void,
  {
    rejectValue: ErrorType;
  }
>("schedule/getSchedule", async (_, { rejectWithValue }) => {
  try {
    const response: any = await schedulesApi.fetchAllSchedules();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const selectGetSchedules = createAsyncThunk<
  GetScheduleState,
  string,
  {
    rejectValue: ErrorType;
  }
>("schedule/selectGetSchedules", async (year, { rejectWithValue }) => {
  try {
    const response: any = await schedulesApi.selectGetSchedules(year);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createSchedule = createAsyncThunk<
  PostScheduleOnlyState,
  ScheduleState,
  {
    rejectValue: ErrorType;
  }
>("schedule/createSchedule", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await schedulesApi.createSchedule(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createCustomerAndSchedule = createAsyncThunk<
  PostScheduleState,
  RequestScheduleState,
  {
    rejectValue: ErrorType;
  }
>("schedule/customer/doubleCreate", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await schedulesApi.createCustomerAndSchedule(
      formData
    );

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createCustomerAndUpdateSchedule = createAsyncThunk<
  PostScheduleState,
  RequestScheduleState,
  {
    rejectValue: ErrorType;
  }
>(
  "schedule/customer/createCustomerAndUpdateSchedule",
  async (formData, { rejectWithValue }) => {
    try {
      const response: any = await schedulesApi.createCustomerAndUpdateSchedule(
        formData
      );

      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

export const updateSchedule = createAsyncThunk<
  PostScheduleOnlyState,
  ScheduleState,
  {
    rejectValue: ErrorType;
  }
>("schedule/updateSchedule", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await schedulesApi.updateSchedule(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateCustomerAndSchedule = createAsyncThunk<
  PostScheduleState,
  RequestScheduleState,
  {
    rejectValue: ErrorType;
  }
>("schedule/customer/doubleUpdate", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await schedulesApi.updateCustomerAndSchedule(
      formData
    );

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateCustomerAndScheduleCreate = createAsyncThunk<
  PostScheduleState,
  RequestScheduleState,
  {
    rejectValue: ErrorType;
  }
>(
  "schedule/customer/updateCustomerAndScheduleCreate",
  async (formData, { rejectWithValue }) => {
    try {
      const response: any = await schedulesApi.updateCustomerAndScheduleCreate(
        formData
      );

      return handleErrorResponse(response, rejectWithValue);
    } catch (err) {
      return handleCatchError(err, rejectWithValue);
    }
  }
);

export const deleteSchedule = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("schedule/deleteSchedule", async (id, { rejectWithValue }) => {
  try {
    const response: any = await schedulesApi.deleteSchedule(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface ScheduleState {
  // ステートの型
  id: number;
  title: string | null;
  start_time: string | null;
  end_time: string | null;
  allDay: boolean;
  customer_id: number | null;
}

export interface GetScheduleState {
  schedules: ScheduleState[];
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
export interface PostScheduleState {
  schedule: ScheduleState;
  customer: CustomerOnlyState;
  course_customers: Course_customersState[];
  option_customers: Option_customersState[];
  merchandise_customers: Merchandise_customersState[];
  hairstyle_customers: Hairstyle_customersState[];
  customer_users: Customer_usersState[];
  message: string;
}
export interface PostScheduleOnlyState {
  schedule: ScheduleState;
  message: string;
}

export interface RequestScheduleState {
  id: number;
  customer_id: number;
  customer_name: string;
  phone_number: string | null;
  remarks: string | null;
  course_id: number[] | null;
  option_id: number[] | null;
  merchandise_id: number[] | null;
  hairstyle_id: number[] | null;
  user_id: number[];
  title: string | null;
  start_time: string;
  end_time: string;
  allDay: boolean;
}

export interface RootState {
  schedules: ScheduleState[];
  status: "idle" | "loading" | "success" | "failed";
  message: string | null;
  error: ErrorType;
}

const initialState: RootState = {
  // 初期状態
  schedules: [],
  status: "idle",
  message: null,
  error: {
    message: "",
    status: 0,
  },
};

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchedule.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = {
          message: "",
          status: 0,
        };
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.status = "success";

        state.schedules = action.payload.schedules;
        state.message = action.payload.message
          ? action.payload.message
          : "スケジュールの取得に成功しました！";
      })
      .addCase(getSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.payload || {
          message: "予期しないエラーが発生しました",
          status: 500,
        };
      })
      .addCase(createSchedule.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = {
          message: "",
          status: 0,
        };
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.status = "success";
        state.schedules = [...state.schedules, action.payload.schedule];
        state.message = action.payload.message
          ? action.payload.message
          : "スケジュールの作成に成功しました！";
      })
      .addCase(createSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.payload || {
          message: "予期しないエラーが発生しました",
          status: 500,
        };
      })
      .addCase(createCustomerAndSchedule.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = {
          message: "",
          status: 0,
        };
      })
      .addCase(createCustomerAndSchedule.fulfilled, (state, action) => {
        state.status = "success";
        state.schedules = [...state.schedules, action.payload.schedule];
        state.message = action.payload.message
          ? action.payload.message
          : "スケジュールと顧客情報の作成に成功しました！";
      })
      .addCase(createCustomerAndSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.payload || {
          message: "予期しないエラーが発生しました",
          status: 500,
        };
      })

      .addCase(updateSchedule.pending, (state) => {
        state.status = "failed";
        state.message = null;
        state.error = {
          message: "",
          status: 0,
        };
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.status = "success";
        state.schedules = state.schedules.map((schedule) =>
          schedule.id === action.payload.schedule.id
            ? {
                ...schedule,
                ...action.payload.schedule,
              }
            : schedule
        );
        state.message = action.payload.message
          ? action.payload.message
          : "スケジュールの更新に成功しました！";
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.payload || {
          message: "予期しないエラーが発生しました",
          status: 500,
        };
      })
      .addCase(updateCustomerAndSchedule.pending, (state) => {
        state.status = "failed";
        state.message = null;
        state.error = {
          message: "",
          status: 0,
        };
      })
      .addCase(updateCustomerAndSchedule.fulfilled, (state, action) => {
        state.status = "success";
        state.schedules = state.schedules.map((schedule) =>
          schedule.id === action.payload.schedule.id
            ? {
                ...schedule,
                ...action.payload.schedule,
              }
            : schedule
        );
        state.message = action.payload.message
          ? action.payload.message
          : "スケジュールと顧客情報の更新に成功しました！";
      })
      .addCase(updateCustomerAndSchedule.rejected, (state, action) => {
        state.error = action?.payload || {
          message: "予期しないエラーが発生しました",
          status: 500,
        };
        state.status = "failed";
      })

      .addCase(updateCustomerAndScheduleCreate.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = {
          message: "",
          status: 0,
        };
      })
      .addCase(updateCustomerAndScheduleCreate.fulfilled, (state, action) => {
        state.status = "success";
        state.schedules = [...state.schedules, action.payload.schedule];
        state.message = action.payload.message
          ? action.payload.message
          : "顧客情報の更新とスケジュールの作成に成功しました！";
      })
      .addCase(updateCustomerAndScheduleCreate.rejected, (state, action) => {
        state.error = action?.payload || {
          message: "予期しないエラーが発生しました",
          status: 500,
        };
        state.status = "failed";
      })

      .addCase(createCustomerAndUpdateSchedule.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = {
          message: "",
          status: 0,
        };
      })
      .addCase(createCustomerAndUpdateSchedule.fulfilled, (state, action) => {
        state.status = "success";
        state.schedules = state.schedules = state.schedules.map((schedule) =>
          schedule.id === action.payload.schedule.id
            ? {
                ...schedule,
                ...action.payload.schedule,
              }
            : schedule
        );
        state.message = action.payload.message
          ? action.payload.message
          : "スケジュールの更新と顧客情報の作成に成功しました！";
      })

      .addCase(createCustomerAndUpdateSchedule.rejected, (state, action) => {
        state.error = action?.payload || {
          message: "予期しないエラーが発生しました",
          status: 500,
        };
        state.status = "failed";
      })

      .addCase(deleteSchedule.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = {
          message: "",
          status: 0,
        };
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.status = "success";
        state.schedules = state.schedules.filter(
          (schedule) => schedule.id !== Number(action.payload.deleteId)
        );
        state.message = action.payload.message
          ? action.payload.message
          : "スケジュールの削除に成功しました！";
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.error = action?.payload || {
          message: "予期しないエラーが発生しました",
          status: 500,
        };
        state.status = "failed";
      });

    builder.addCase(selectGetSchedules.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });

    builder.addCase(selectGetSchedules.fulfilled, (state, action) => {
      state.status = "success";
      state.schedules = action.payload.schedules;
      state.message = action.payload.message
        ? action.payload.message
        : "スケジュールの取得に成功しました！";
    });

    builder.addCase(selectGetSchedules.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.schedules = state.schedules.filter(
        (schedule) => schedule.customer_id !== action.payload.deleteId
      );
    });
  },
});

const scheduleReducer = scheduleSlice.reducer;

export default scheduleReducer;
