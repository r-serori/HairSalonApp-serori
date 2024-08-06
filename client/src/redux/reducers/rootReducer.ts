// reducers/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import attendance_timeReducer from "../../slices/attendance_times/attendance_timesSlice";
import courseReducer from "../../slices/courses/courseSlice";
import optionReducer from "../../slices/options/optionSlice";
import merchandiseReducer from "../../slices/merchandises/merchandiseSlice";
import customerReducer from "../../slices/customers/customerSlice";
import hairstyleReducer from "../../slices/hairstyles/hairstyleSlice";
import course_customersReducer from "../../slices/middleTable/customers/course_customersSlice";
import merchandise_customersReducer from "../../slices/middleTable/customers/merchandise_customersSlice";
import option_customersReducer from "../../slices/middleTable/customers/option_customersSlice";
import hairstyle_customersReducer from "../../slices/middleTable/customers/hairstyle_customersSlice";
import customer_usersReducer from "../../slices/middleTable/customers/customer_usersSlice";
import scheduleReducer from "../../slices/schedules/scheduleSlice";
import stockReducer from "../../slices/stocks/stockSlice";
import stock_categoryReducer from "../../slices/stocks/stock_categories/stock_categorySlice";
import daily_salesReducer from "../../slices/daily_sales/daily_saleSlice";
import monthly_salesReducer from "../../slices/monthly_sales/monthly_saleSlice";
import yearly_salesReducer from "../../slices/yearly_sales/yearly_saleSlice";
import authReducer from "../../slices/auth/userSlice";
import ownerReducer from "../../slices/auth/ownerSlice";
import staffReducer from "../../slices/auth/staffSlice";
import { loginNowReducer } from "../../slices/auth/isLoginSlice";
import keyReducer from "../../slices/auth/keySlice";
import permissionReducer from "../../slices/auth/permissionSlice";

// 他のリデューサーをインポートする
const rootReducer = combineReducers({
  loginNow: loginNowReducer,
  users: authReducer,
  owner: ownerReducer,
  staffs: staffReducer,
  key: keyReducer,
  permissions: permissionReducer,
  attendance_times: attendance_timeReducer,
  courses: courseReducer,
  options: optionReducer,
  merchandises: merchandiseReducer,
  hairstyles: hairstyleReducer,
  customers: customerReducer,
  schedules: scheduleReducer,
  stocks: stockReducer,
  stock_categories: stock_categoryReducer,
  daily_sales: daily_salesReducer,
  monthly_sales: monthly_salesReducer,
  yearly_sales: yearly_salesReducer,
  course_customers: course_customersReducer,
  merchandise_customers: merchandise_customersReducer,
  option_customers: option_customersReducer,
  hairstyle_customers: hairstyle_customersReducer,
  customer_users: customer_usersReducer,
  // 他のリデューサーをここに追加する
});

export default rootReducer;

// store/auth/authSlice.ts
