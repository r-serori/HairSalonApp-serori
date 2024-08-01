import { sendRequest } from "../requestApi";
import { Stock_categoryState } from "../../slices/stocks/stock_categories/stock_categorySlice";

export const stockCategoryApi = {
  createStockCategory: async (formData: Stock_categoryState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/stock_categories/store",
        formData
      );
      return response;
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  fetchAllStockCategories: async () => {
    try {
      const response = await sendRequest("GET", `/stock_categories/all`);
      return response;
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  updateStockCategory: async (formData: Stock_categoryState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/stock_categories/update`,
        formData
      );
      return response;
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  deleteStockCategory: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/stock_categories/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
