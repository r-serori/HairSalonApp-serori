import { sendRequest } from "../../requestApi";

export const attendance_timeApi = {
  selectFetchAttendanceTimes: async (formData: {
    user_id: number;
    yearMonth: string;
  }) => {
    try {
      const userIdEncoded: string = encodeURIComponent(
        formData.user_id.toString()
      );
      const yearMonthEncoded: string = encodeURIComponent(formData.yearMonth);
      const response = await sendRequest(
        "GET",
        `/api/attendance_times/selectedAttendanceTimes/${yearMonthEncoded}/${userIdEncoded}`
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  firstGetAttendanceTime: async (user_id: number) => {
    try {
      const response = await sendRequest(
        "GET",
        `/api/firstAttendanceTimes/firstGet/${encodeURIComponent(user_id)}`
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  pleaseEditEndTime: async (formData: {
    id: number;
    end_time: string;
    end_photo_path: string;
    user_id: number;
  }) => {
    try {
      const response = await sendRequest(
        "POST",
        `/api/attendance_times/pleaseEditEndTime`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  createStartTime: async (formData: {
    start_time: string;
    start_photo_path: string;
    user_id: number;
  }) => {
    try {
      const response = await sendRequest(
        "POST",
        "/api/attendance_times/startTimeShot",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  createEndTime: async (formData: {
    end_time: string;
    end_photo_path: string;
    user_id: number;
  }) => {
    try {
      const response = await sendRequest(
        "POST",
        "/api/attendance_times/endTimeShot",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateStartTime: async (formData: {
    id: number;
    start_time: string;
    start_photo_path: string;
    user_id: number;
  }) => {
    try {
      const response = await sendRequest(
        "POST",
        `/api/attendance_times/updateStartTime`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateEndTime: async (formData: {
    id: number;
    end_time: string;
    end_photo_path: string;
    user_id: number;
  }) => {
    try {
      const response = await sendRequest(
        "POST",
        `/api/attendance_times/updateEndTime`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteAttendanceTime: async (id: number) => {
    try {
      const response = await sendRequest(
        "POST",
        `/api/attendance_times/delete`,
        {
          id: id,
        }
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
