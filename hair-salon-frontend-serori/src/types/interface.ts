// localStorage使用時の型定義

import { PermissionsState } from "../slices/auth/permissionSlice";

export interface ApiResponse<T> {
  status?: number;
  message: string;
  data?: T;
}

export interface deleteResponse {
  message: string;
  deleteId: number;
}

export type RoleState = "オーナー" | "マネージャー" | "スタッフ";

// エラーの型定義
export interface ErrorType {
  status: number;
  message: string;
}

export interface ScheduleModalNodes {
  id: number;
  customer_name: string;
  phone_number: string | null;
  remarks: string | null;
  course: string[] | [];
  option: string[] | [];
  merchandise: string[] | [];
  hairstyle: string[] | [];
  names: string[] | [];
}
export interface CustomerNodes {
  id: number;
  customer_name: string;
  phone_number: string | null;
  remarks: string | null;
  course: string;
  option: string;
  merchandise: string;
  hairstyle: string;
  names: string;
}

export interface AttendanceTimeShotsNodes {
  id: number;
  shotUserName: string;
  attendanceNow: "勤務中" | "退勤中";
  isAttendance: boolean;
  start_time?: string | null; //不使用
  end_time?: string | null; //不使用
  start_photo_path?: string | null; //不使用
  end_photo_path?: string | null; //不使用
  user_id?: number; //不使用
}

export interface AttendancesNodes {
  id: number;
  name: string;
  staff_phone_number: string;
  role: PermissionsState;
  isAttendance: boolean;
}
export interface StockNodes {
  id: number;
  category_name: string | null;
  product_name: string;
  product_price: number;
  quantity: number;
  remarks: string | null;
  supplier: string | null;
  notice: number;
}

export type NodesProps =
  | {
      text: string;
    }
  | {
      number: string;
    };

export type SearchItems = { key: string; value: string }[];

export type THeaderItems = string[];

export interface PageNationProps {
  page: number;
  size: number;
}
