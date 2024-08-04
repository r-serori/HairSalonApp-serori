import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true; // Cookieを使用するための設定を有効にする

// // CSRFトークンの取得
export const getCsrfToken = async () => {
  try {
    await axios.get("/api/sanctum/csrf-cookie");
    // CSRFトークンを取得
    const csrfToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    console.log("CSRFトークン取得成功:", csrfToken);
    axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
    return csrfToken;
  } catch (error) {
    console.error("CSRFトークンの取得に失敗しました:", error);
    throw new Error("CSRFトークンの取得に失敗しました");
  }
};

export const sendRequest = async (
  method: "GET" | "POST" | "OPTIONS",
  url: string,
  data?: any
): Promise<any> => {
  console.log("送信するデータ:", data);
  try {
    const response = await axios.request({
      method,
      url,
      data,
      withXSRFToken: true, // 追記
      xsrfHeaderName: "X-XSRF-TOKEN", // 追記
      withCredentials: true,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // CSRF トークンが必要な場合に備えて追加します
        "X-XSRF-TOKEN": axios.defaults.headers.common["X-XSRF-TOKEN"],
      },
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
