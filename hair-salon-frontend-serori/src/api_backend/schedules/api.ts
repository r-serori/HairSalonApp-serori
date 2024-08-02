import { sendRequest } from "../requestApi";
import {
  ScheduleState,
  RequestScheduleState,
} from "../../slices/schedules/scheduleSlice";

export const schedulesApi = {
  //両方作成します
  createCustomerAndSchedule: async (formData: RequestScheduleState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/webReq/schedules/customers/double",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  createSchedule: async (formData: ScheduleState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/webReq/schedules/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllSchedules: async () => {
    try {
      const response = await sendRequest("GET", `/webReq/schedules/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  selectGetSchedules: async (year: string) => {
    try {
      const response = await sendRequest(
        "GET",
        `/webReq/schedules/customers/selectGetYear/${encodeURIComponent(year)}`
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateSchedule: async (formData: ScheduleState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/webReq/schedules/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  // 両方更新します
  updateCustomerAndSchedule: async (formData: RequestScheduleState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/webReq/schedules/customers/doubleUpdate`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  createCustomerAndUpdateSchedule: async (formData: RequestScheduleState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/webReq/schedules/customers/customerCreateScheduleUpdate`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteSchedule: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/webReq/schedules/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateCustomerAndScheduleCreate: async (formData: RequestScheduleState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/webReq/schedules/customers/customerOnlyUpdate`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
