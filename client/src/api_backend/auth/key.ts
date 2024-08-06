import { sendRequest } from "../requestApi";

export const getKeyApi = {
  getKey: async () => {
    try {
      const response = (await sendRequest("GET", "/api/getKey")) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
