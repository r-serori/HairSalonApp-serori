import { sendRequest } from "../requestApi";
import { OptionState } from "../../slices/options/optionSlice";

export const optionApi = {
  createOption: async (formData: OptionState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/webReq/options/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllOptions: async () => {
    try {
      const response = await sendRequest("GET", `/webReq/options/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateOption: async (formData: OptionState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/webReq/options/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteOption: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/webReq/options/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
