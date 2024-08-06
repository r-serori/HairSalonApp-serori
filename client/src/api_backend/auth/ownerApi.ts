import { sendRequest } from "../requestApi";
import { OwnerState } from "../../slices/auth/ownerSlice";
export const ownerApi = {
  ownerRegister: async (formData: OwnerState) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/api/ownerRegister`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  getOwner: async () => {
    try {
      const response = (await sendRequest("GET", `/api/getOwner`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateOwner: async (formData: OwnerState) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/api/updateOwner`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
