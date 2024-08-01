import { sendRequest } from "../requestApi";
import { MerchandiseState } from "../../slices/merchandises/merchandiseSlice";

export const merchandiseApi = {
  createMerchandise: async (formData: MerchandiseState) => {
    try {
      const response = await sendRequest(
        "POST",
        "/merchandises/store",
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  fetchAllMerchandises: async () => {
    try {
      const response = await sendRequest("GET", `/merchandises/all`);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateMerchandise: async (formData: MerchandiseState) => {
    try {
      const response = await sendRequest(
        "POST",
        `/merchandises/update`,
        formData
      );
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  deleteMerchandise: async (id: number) => {
    try {
      const response = await sendRequest("POST", `/merchandises/delete`, {
        id: id,
      });
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
