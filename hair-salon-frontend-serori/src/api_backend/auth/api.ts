import { sendRequest, getCsrfToken } from "../requestApi";

export const userApi = {
  //ログイン処理
  login: async (formData: { email: string; password: string }) => {
    try {
      await getCsrfToken();
      const response = (await sendRequest("POST", "/login", formData)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //購入者ownerがuser登録するときの処理
  register: async (formData: {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    role: string;
    isAttendance: boolean;
    password_confirmation: string;
  }) => {
    try {
      await getCsrfToken();
      const response = await sendRequest("POST", "/register", formData);
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //オーナーがスタッフを登録 Gate,OWNER
  staffRegister: async (formData: {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    role: string;
    isAttendance: boolean;
  }) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/staffRegister`,
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
      const response = (await sendRequest("POST", `/logout`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //オーナーがスタッフの情報を取得 Gate,OWNER
  getUsers: async () => {
    try {
      const response = (await sendRequest("GET", `/getUsers`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  getAttendanceUsers: async () => {
    try {
      const response = (await sendRequest("GET", `/getAttendanceUsers`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //各スタッフが自分の情報を取得 Gate,ALL
  showUser: async () => {
    try {
      const response = (await sendRequest("GET", `/showUser`)) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  //ユーザーが自分の個人情報を変更 Gate,ALL
  updateUser: async (formData: {
    name: string;
    email: string;
    phone_number: string;
  }) => {
    try {
      const response = (await sendRequest(
        "POST",
        `/updateUser`,
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
        `/updateUserPassword`,
        formData
      )) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = (await sendRequest("POST", `/forgotPassword`, {
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
        `/resetPassword`,
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
        `/updatePermission`,
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
      const response = (await sendRequest("POST", `/deleteUser`, {
        id: id,
      })) as any;
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
