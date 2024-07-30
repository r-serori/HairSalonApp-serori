import { sendRequest } from "../requestApi";
import { CustomerState } from "../../../slices/customers/customerSlice";

export const customerApi = {
  createCustomer: async (formData: CustomerState) => {
    try {
      const response = await sendRequest("POST", "/customers/store", formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllCustomers: async () => {
    try {
      const response = await sendRequest("GET", `/customers/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateCustomer: async (formData: CustomerState) => {
    try {
      const response = await sendRequest("POST", `/customers/update`, formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteCustomer: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/customers/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
