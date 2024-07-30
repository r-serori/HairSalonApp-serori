// reducers/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import attendance_timeReducer from "../../store/attendance_times/attendance_timesSlice";
import courseReducer from "../../store/courses/courseSlice";
import optionReducer from "../../store/options/optionSlice";
import merchandiseReducer from "../../store/merchandises/merchandiseSlice";
import customerReducer from "../../store/customers/customerSlice";
import hairstyleReducer from "../../store/hairstyles/hairstyleSlice";
import course_customersReducer from "../../store/middleTable/customers/course_customersSlice";
import merchandise_customersReducer from "../../store/middleTable/customers/merchandise_customersSlice";
import option_customersReducer from "../../store/middleTable/customers/option_customersSlice";
import hairstyle_customersReducer from "../../store/middleTable/customers/hairstyle_customersSlice";
import customer_usersReducer from "../../store/middleTable/customers/customer_usersSlice";
import scheduleReducer from "../../store/schedules/scheduleSlice";
import stockReducer from "../../store/stocks/stockSlice";
import stock_categoryReducer from "../../store/stocks/stock_categories/stock_categorySlice";
import daily_salesReducer from "../../store/daily_sales/daily_saleSlice";
import monthly_salesReducer from "../../store/monthly_sales/monthly_saleSlice";
import yearly_salesReducer from "../../store/yearly_sales/yearly_saleSlice";
import authReducer from "../../store/auth/userSlice";
import ownerReducer from "../../store/auth/ownerSlice";
import staffReducer from "../../store/auth/staffSlice";
import { loginNowReducer } from "../../store/auth/isLoginSlice";
import keyReducer from "../../store/auth/keySlice";
import permissionReducer from "../../store/auth/permissionSlice";

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
