import { sendRequest } from "../requestApi";
import { Daily_salesState } from "../../slices/daily_sales/daily_saleSlice";

export const dailySaleApi = {
  createDailySales: async (formData: Daily_salesState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/api/daily_sales/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllDailySales: async () => {
    try {
      const response = await sendRequest("GET", `/api/daily_sales/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  selectGetDailySales: async (year: string) => {
    try {
      const response = await sendRequest(
        "GET",
        `/api/daily_sales/selected/${encodeURIComponent(year)}`
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateDailySales: async (formData: Daily_salesState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/api/daily_sales/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },
  deleteDailySales: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/api/daily_sales/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
