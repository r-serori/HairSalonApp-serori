import { sendRequest } from "../requestApi";
import { OptionState } from "../../store/options/optionSlice";

export const optionApi = {
  createOption: async (formData: OptionState) => {
    try {
      const response = await sendRequest("POST", "/options/store", formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllOptions: async () => {
    try {
      const response = await sendRequest("GET", `/options/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateOption: async (formData: OptionState) => {
    try {
      const response = await sendRequest("POST", `/options/update`, formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteOption: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/options/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
