import { sendRequest } from "../requestApi";
import { OwnerState } from "../../store/auth/ownerSlice";
export const ownerApi = {
  ownerRegister: async (formData: OwnerState) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/ownerRegister`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  getOwner: async () => {
    try {
      const response = (await sendRequest("GET", `/getOwner`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  updateOwner: async (formData: OwnerState) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/updateOwner`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
