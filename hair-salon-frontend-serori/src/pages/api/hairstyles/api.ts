import { sendRequest } from "../requestApi";
import { HairstyleState } from "../../../slices/hairstyles/hairstyleSlice";

export const hairstyleApi = {
  createHairstyle: async (formData: HairstyleState) => {
    try {
      const response = await sendRequest("POST", "/hairstyles/store", formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllHairstyles: async () => {
    try {
      const response = await sendRequest("GET", `/hairstyles/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateHairstyle: async (formData: HairstyleState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/hairstyles/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteHairstyle: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/hairstyles/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
