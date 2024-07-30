import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { courseApi } from "../../pages/api/courses/api";
import RootState from "../../redux/reducers/rootReducer";
import { getCustomer } from "../customers/customerSlice";
import { getSchedule } from "../schedules/scheduleSlice";
import {
  handleErrorResponse,
  handleCatchError,
} from "../../pages/api/errorHandler";
import { ErrorType, deleteResponse } from "../../types/interface";

export const getCourse = createAsyncThunk<
  GetCourseState,
  void,
  {
    rejectValue: ErrorType;
  }
>("courses/getCourse", async (_, { rejectWithValue }) => {
  try {
    const response: any = await courseApi.fetchAllCourses();

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const createCourse = createAsyncThunk<
  PostCourseState,
  CourseState,
  {
    rejectValue: ErrorType;
  }
>("courses/createCourse", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await courseApi.createCourse(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const updateCourse = createAsyncThunk<
  PostCourseState,
  CourseState,
  {
    rejectValue: ErrorType;
  }
>("courses/updateCourse", async (formData, { rejectWithValue }) => {
  try {
    const response: any = await courseApi.updateCourse(formData);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export const deleteCourse = createAsyncThunk<
  deleteResponse,
  number,
  {
    rejectValue: ErrorType;
  }
>("courses/deleteCourse", async (id, { rejectWithValue }) => {
  try {
    const response = await courseApi.deleteCourse(id);

    return handleErrorResponse(response, rejectWithValue);
  } catch (err) {
    return handleCatchError(err, rejectWithValue);
  }
});

export interface CourseState {
  // ステートの型
  id: number;
  course_name: string;
  price: number;
}

export interface GetCourseState {
  message: string;
  courses: CourseState[];
}

export interface PostCourseState {
  message: string;
  course: CourseState;
}

export interface RootState {
  // ルートステートの型を定義
  courses: CourseState[];
  status: "idle" | "loading" | "success" | "failed";
  message: string | null; // メッセージ
  error: ErrorType; // エラーメッセージ
}

const initialState: RootState = {
  // 初期状態
  courses: [],
  status: "idle",
  message: null, // メッセージ
  error: {
    message: "",
    status: 0,
  }, // エラーメッセージ
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourse.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(getCourse.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "コースの取得に成功しました！";
      state.courses = [...state.courses, ...action.payload.courses];
    });
    builder.addCase(getCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(createCourse.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message
        ? action.payload.message
        : "コースの作成に成功しました！";
      state.courses = [...state.courses, action.payload.course];
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(updateCourse.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      state.status = "success";
      state.courses = state.courses.map((course) =>
        course.id === action.payload.course.id
          ? { ...course, ...action.payload.course }
          : course
      );
      state.message = action.payload.message
        ? action.payload.message
        : "コースの更新に成功しました！";
    });
    builder.addCase(updateCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(deleteCourse.pending, (state) => {
      state.status = "loading";
      state.message = null;
      state.error = {
        message: "",
        status: 0,
      };
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.status = "success";
      state.courses = state.courses.filter(
        (course) => course.id !== Number(action.payload.deleteId)
      );

      state.message = action.payload.message
        ? action.payload.message
        : "コースの削除に成功しました！";
    });
    builder.addCase(deleteCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action?.payload || {
        message: "予期しないエラーが発生しました",
        status: 500,
      };
    });

    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.status = "success";
      state.courses = action.payload.courses
        ? state.courses.length === action.payload.courses.length
          ? state.courses
          : action.payload.courses
        : state.courses;
    });

    builder.addCase(getSchedule.fulfilled, (state, action) => {
      state.status = "success";
      state.courses = action.payload.courses
        ? state.courses.length === action.payload.courses.length
          ? state.courses
          : action.payload.courses
        : state.courses;
    });
  },
});

const courseReducer = courseSlice.reducer;

export default courseReducer;
