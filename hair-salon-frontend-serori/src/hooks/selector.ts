import { RootState } from "../redux/store";

//勤怠時間を取得 配列で取得
export const attendance_timesStore = (state: RootState) =>
  state.attendance_times.attendance_times;

//勤怠時間のステータスを取得
export const attendance_timeStatus = (state: RootState) =>
  state.attendance_times.status;

//勤怠時間のメッセージを取得
export const attendance_timeMessage = (state: RootState) =>
  state.attendance_times.message;

//勤怠時間のエラーメッセージを取得
export const attendance_timeError = (state: RootState) =>
  state.attendance_times.error.message;

//勤怠時間のエラーステータスを取得
export const attendance_timeErrorStatus = (state: RootState) =>
  state.attendance_times.error.status;

//--------------------------------------------
//コース情報を取得 配列で取得
export const coursesStore = (state: RootState) => state.courses.courses;

//コース情報のステータスを取得
export const courseStatus = (state: RootState) => state.courses.status;

//コース情報のメッセージを取得
export const courseMessage = (state: RootState) => state.courses.message;

//コース情報のエラーを取得
export const courseError = (state: RootState) => state.courses.error.message;

//コース情報のエラーを取得
export const courseErrorStatus = (state: RootState) =>
  state.courses.error.status;

//--------------------------------------------
//オプション情報を取得 配列で取得
export const optionsStore = (state: RootState) => state.options.options;

//オプション情報のステータスを取得
export const optionStatus = (state: RootState) => state.options.status;

//オプション情報のメッセージを取得
export const optionMessage = (state: RootState) => state.options.message;

//オプション情報のエラーを取得
export const optionError = (state: RootState) => state.options.error.message;

export const optionErrorStatus = (state: RootState) =>
  state.options.error.status;
//--------------------------------------------
//物販情報を取得 配列で取得
export const merchandiseStore = (state: RootState) =>
  state.merchandises.merchandises;

//物販情報のステータスを取得
export const merchandiseStatus = (state: RootState) =>
  state.merchandises.status;

//物販情報のメッセージを取得
export const merchandiseMessage = (state: RootState) =>
  state.merchandises.message;

//物販情報のエラーを取得
export const merchandiseError = (state: RootState) =>
  state.merchandises.error.message;

export const merchandiseErrorStatus = (state: RootState) =>
  state.merchandises.error.status;

//--------------------------------------------
//髪型情報を取得 配列で取得
export const hairstylesStore = (state: RootState) =>
  state.hairstyles.hairstyles;

//髪型情報のステータスを取得
export const hairstyleStatus = (state: RootState) => state.hairstyles.status;

//髪型情報のメッセージを取得
export const hairstyleMessage = (state: RootState) => state.hairstyles.message;

//髪型情報のエラーを取得
export const hairstyleError = (state: RootState) =>
  state.hairstyles.error.message;

export const hairstyleErrorStatus = (state: RootState) =>
  state.hairstyles.error.status;

//--------------------------------------------
//顧客情報を取得 配列で取得
export const customersStore = (state: RootState) => state.customers.customers;

//顧客情報のステータスを取得
export const customerStatus = (state: RootState) => state.customers.status;

//顧客情報のメッセージを取得
export const customerMessage = (state: RootState) => state.customers.message;

//顧客情報のエラーを取得
export const customerError = (state: RootState) =>
  state.customers.error.message;

export const customerErrorStatus = (state: RootState) =>
  state.customers.error.status;

//--------------------------------------------
//在庫情報を取得 配列で取得
export const stocksStore = (state: RootState) => state.stocks.stocks;

//在庫情報のステータスを取得
export const stockStatus = (state: RootState) => state.stocks.status;

//在庫情報のメッセージを取得
export const stockMessage = (state: RootState) => state.stocks.message;

//在庫情報のエラーを取得
export const stockError = (state: RootState) => state.stocks.error.message;

export const stockErrorStatus = (state: RootState) => state.stocks.error.status;

//--------------------------------------------
//在庫カテゴリ情報を取得 配列で取得
export const stock_categoriesStore = (state: RootState) =>
  state.stock_categories.stock_categories;

//在庫カテゴリ情報のステータスを取得
export const stock_categoryStatus = (state: RootState) =>
  state.stock_categories.status;

//在庫カテゴリ情報のメッセージを取得
export const stock_categoryMessage = (state: RootState) =>
  state.stock_categories.message;

//在庫カテゴリ情報のエラーを取得
export const stock_categoryError = (state: RootState) =>
  state.stock_categories.error.message;

export const stock_categoryErrorStatus = (state: RootState) =>
  state.stock_categories.error.status;

//--------------------------------------------
//スケジュール情報を取得 配列で取得
export const schedulesStore = (state: RootState) => state.schedules.schedules;

//スケジュール情報のステータスを取得
export const scheduleStatus = (state: RootState) => state.schedules.status;

//スケジュール情報のメッセージを取得
export const scheduleMessage = (state: RootState) => state.schedules.message;

//スケジュール情報のエラーを取得
export const scheduleError = (state: RootState) =>
  state.schedules.error.message;

export const scheduleErrorStatus = (state: RootState) =>
  state.schedules.error.status;

//--------------------------------------------
//日次売上情報を取得 配列で取得
export const daily_salesStore = (state: RootState) =>
  state.daily_sales.daily_sales;

//日次売上情報のステータスを取得
export const daily_saleStatus = (state: RootState) => state.daily_sales.status;

//日次売上情報のメッセージを取得

export const daily_saleMessage = (state: RootState) =>
  state.daily_sales.message;

//日次売上情報のエラーを取得
export const daily_saleError = (state: RootState) =>
  state.daily_sales.error.message;

export const daily_saleErrorStatus = (state: RootState) =>
  state.daily_sales.error.status;

//--------------------------------------------
//月次売上情報を取得 配列で取得
export const monthly_salesStore = (state: RootState) =>
  state.monthly_sales.monthly_sales;

//月次売上情報のステータスを取得
export const monthly_saleStatus = (state: RootState) =>
  state.monthly_sales.status;

//月次売上情報のメッセージを取得

export const monthly_saleMessage = (state: RootState) =>
  state.monthly_sales.message;

//月次売上情報のエラーを取得

export const monthly_saleError = (state: RootState) =>
  state.monthly_sales.error.message;

export const monthly_saleErrorStatus = (state: RootState) =>
  state.monthly_sales.error.status;

//--------------------------------------------
//年次売上情報を取得 配列で取得
export const yearly_salesStore = (state: RootState) =>
  state.yearly_sales.yearly_sales;

//年次売上情報のステータスを取得
export const yearly_saleStatus = (state: RootState) =>
  state.yearly_sales.status;

//年次売上情報のメッセージを取得
export const yearly_saleMessage = (state: RootState) =>
  state.yearly_sales.message;

//年次売上情報のエラーを取得
export const yearly_saleError = (state: RootState) =>
  state.yearly_sales.error.message;

export const yearly_saleErrorStatus = (state: RootState) =>
  state.yearly_sales.error.status;

//--------------------------------------------
//中間テーブル情報
export const course_customersStore = (state: RootState) =>
  state.course_customers.course_customers;

export const option_customersStore = (state: RootState) =>
  state.option_customers.option_customers;

export const merchandise_customersStore = (state: RootState) =>
  state.merchandise_customers.merchandise_customers;

export const hairstyle_customersStore = (state: RootState) =>
  state.hairstyle_customers.hairstyle_customers;

export const customer_usersStore = (state: RootState) =>
  state.customer_users.customer_users;
