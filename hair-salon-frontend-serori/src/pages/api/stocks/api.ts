import { sendRequest } from "../requestApi";
import { StockState } from "../../store/stocks/stockSlice";

export const stockApi = {
  createStock: async (formData: StockState) => {
    try {
      const response = await sendRequest("POST", "/stocks/store", formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllStocks: async () => {
    try {
      const response = await sendRequest("GET", `/stocks/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateStock: async (formData: StockState) => {
    try {
      const response = await sendRequest("POST", `/stocks/update`, formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteStock: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/stocks/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
