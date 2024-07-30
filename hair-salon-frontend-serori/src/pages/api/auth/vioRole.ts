import { sendRequest } from "../requestApi";

export const vioRoleApi = {
  getVioRole: async () => {
    try {
      const response = await sendRequest("GET", "/vio-role");
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("権限未確認");
      }
    } catch (error) {
      return false;
    }
  },
};
