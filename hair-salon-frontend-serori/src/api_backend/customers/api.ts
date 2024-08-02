import { sendRequest } from "../requestApi";
import { CustomerState } from "../../slices/customers/customerSlice";

export const customerApi = {
  createCustomer: async (formData: CustomerState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/webReq/customers/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllCustomers: async () => {
    try {
      const response = await sendRequest("GET", `/webReq/customers/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateCustomer: async (formData: CustomerState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/webReq/customers/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteCustomer: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/webReq/customers/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
