import { sendRequest } from "../requestApi";
import { StockState } from "../../slices/stocks/stockSlice";

export const stockApi = {
  createStock: async (formData: StockState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/webReq/stocks/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllStocks: async () => {
    try {
      const response = await sendRequest("GET", `/webReq/stocks/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateStock: async (formData: StockState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/webReq/stocks/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteStock: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/webReq/stocks/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
