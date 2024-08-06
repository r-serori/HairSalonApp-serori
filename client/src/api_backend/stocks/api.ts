import { sendRequest } from "../requestApi";
import { StockState } from "../../slices/stocks/stockSlice";

export const stockApi = {
  createStock: async (formData: StockState) => {
    try {
      const response = await sendRequest("POST", "/api/stocks/store", formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllStocks: async () => {
    try {
      const response = await sendRequest("GET", `/api/stocks/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateStock: async (formData: StockState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/api/stocks/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteStock: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/api/stocks/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
