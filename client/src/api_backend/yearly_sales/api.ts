import { sendRequest } from "../requestApi";
import { Yearly_salesState } from "../../slices/yearly_sales/yearly_saleSlice";

export const yearlySaleApi = {
  createYearlySales: async (formData: Yearly_salesState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/api/yearly_sales/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllYearlySales: async () => {
    try {
      const response = await sendRequest("GET", `/api/yearly_sales/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateYearlySales: async (formData: Yearly_salesState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/api/yearly_sales/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteYearlySales: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/api/yearly_sales/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
