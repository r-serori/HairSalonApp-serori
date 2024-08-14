import { sendRequest } from "../requestApi";

export const userApi = {
  //ログイン処理
  login: async (formData: { email: string; password: string }) => {
    try {
      const response = (await sendRequest(
        "POST",
        "/api/login",
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //購入者ownerがuser登録するときの処理
  register: async (formData: {
    name: string;
    email: string;
    password: string;
    role: string;
    isAttendance: boolean;
    password_confirmation: string;
  }) => {
    try {
      const response = await sendRequest("POST", "/api/register", formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //オーナーがスタッフを登録 Gate,OWNER
  staffRegister: async (formData: {
    name: string;
    email: string;
    password: string;
    role: string;
    isAttendance: boolean;
  }) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/api/staffRegister`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //ログアウト処理 Gate,ALL
  logout: async () => {
    try {
      const response = (await sendRequest("POST", `/api/logout`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //オーナーがスタッフの情報を取得 Gate,OWNER
  getUsers: async () => {
    try {
      const response = (await sendRequest("GET", `/api/getUsers`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  getAttendanceUsers: async () => {
    try {
      const response = (await sendRequest(
        "GET",
        `/api/getAttendanceUsers`
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //各スタッフが自分の情報を取得 Gate,ALL
  showUser: async () => {
    try {
      const response = (await sendRequest("GET", `/api/showUser`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //ユーザーが自分の個人情報を変更 Gate,ALL
  updateUser: async (formData: { name: string; email: string }) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/api/updateUser`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //ユーザーが自分のパスワードを変更 Gate,ALL
  updateUserPassword: async (formData: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/api/updateUserPassword`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = (await sendRequest("POST", `/api/forgotPassword`, {
        email: email,
      })) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  resetPassword: async (formData: {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
  }) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/api/resetPassword`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //ownerがstaffの個人情報を変更するときに使用
  updateUserPermission: async (formData: {
    id: number; //user_id
    role: string;
  }) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/api/updatePermission`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //ownerがstaffを削除するときに使用
  deleteUser: async (id: number) => {
    try {
      const response = (await sendRequest("POST", `/api/deleteUser`, {
        id: id,
      })) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
