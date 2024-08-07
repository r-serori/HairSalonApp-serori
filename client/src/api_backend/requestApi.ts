import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Cookieを使用するための設定を有効にする

export const sendRequest = async (
  method: "GET" | "POST" | "OPTIONS",
  url: string,
  data?: any
): Promise<any> => {
  console.log("送信するデータ:", data);
  try {
    // トークンが必要ないエンドポイントのリスト
    const noTokenEndpoints = [
      "/api/login",
      "/api/register",
      "/api/resetPassword",
      "/api/forgotPassword",
      "/api/verify-email",
      "/api/search",
      "/storage",
    ];

    // URLがトークンが不要なエンドポイントに含まれているかどうかを確認
    const requiresToken = !noTokenEndpoints.some((endpoint) =>
      url.startsWith(endpoint)
    );

    const token: string | null = requiresToken
      ? localStorage.getItem("token")
      : null;

    if (requiresToken && token === null)
      throw new Error("トークンが見つかりません");

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      ...(requiresToken && { Authorization: `Bearer ${token}` }), // トークンが必要な場合のみ Authorization ヘッダーを追加
    };

    const response = await axios.request({
      method,
      url,
      data,
      withCredentials: true,
      headers,
    });

    console.log(`${method} request to ${url} successful:`);
    console.log("RESPONSE", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("AxiosErrorが発生しました:", error.message);
      if (error.response) {
        console.error("サーバーからのレスポンス:", error.response);
        return error.response;
      } else if (error.request) {
        console.error(
          "リクエストは送信されましたが、レスポンスがありませんでした:",
          error.request
        );
        return error.request;
      } else {
        console.error(
          "リクエストの設定中にエラーが発生しました:",
          error.message
        );
        return error;
      }
    } else {
      console.error("予期しないエラーが発生しました:", error);
    }
    throw error;
  }
};
