import { allLogout } from "../../hooks/useMethod";
import { changeMessage } from "../../slices/auth/userSlice";

export interface ErrorResponse {
  status: number;
  message: string;
  data?: any;
}

export const handleErrorResponse = (
  response: any,
  rejectWithValue: Function
) => {
  if (response.status >= 200 && response.status < 300) {
    // 成功時の処理
    // console.log("response.success", response); // 成功メッセージをコンソールに表示するなど、適切な処理を行う
    return response.data; // response.dataを返すことで、必要なデータのみを返す
  } else if (response.status >= 400 && response.status < 500) {
    // クライアントエラー時の処理
    // console.log("response.error", response); // エラーメッセージをコンソールに表示するなど、適切な処理を行う
    return rejectWithValue({
      status: response.status,
      message: response.data.message,
    }); // rejectWithValueでエラーメッセージを返す
  } else if (response.status >= 500) {
    // サーバーエラー時の処理
    // console.log("response.error", response); // エラーメッセージをコンソールに表示するなど、適切な処理を行う
    return rejectWithValue({
      status: response.status,
      message: response.data.message,
    }); // rejectWithValueでエラーメッセージを返す
  } else {
    return rejectWithValue({
      status: response.status,
      message: "予期しないエラーが発生しました",
    }); // 一般的なエラーメッセージを返す
  }
};

export const handleCatchError = (err: any, rejectWithValue: Function) => {
  // console.log("errだよ", err);
  return rejectWithValue({
    status: 500,
    message: "予期しないエラーが発生しました",
  });
};

export const renderError = async (
  errorStatus: number | null,
  router: any,
  dispatch: any
) => {
  if (errorStatus === null) return null;
  switch (errorStatus) {
    case 401:
      await allLogout(dispatch);
      router.push({
        pathname: "/error",
        query: { code: 401 },
      });
    case 403:
      await allLogout(dispatch);
      router.push({
        pathname: "/error",
        query: { code: 403 },
      });
    case 419:
      await allLogout(dispatch);
      router.push({
        pathname: "/error",
        query: { code: 419 },
      });
    case 422:
      await allLogout(dispatch);
      router.push({
        pathname: "/error",
        query: { code: 422 },
      });
    case 433:
      await allLogout(dispatch);
      router.push({
        pathname: "/error",
        query: { code: 433 },
      });
    case 500:
      await allLogout(dispatch);
      router.push({
        pathname: "/error",
        query: { code: 500 },
      });
    case 503:
      await allLogout(dispatch);
      router.push({
        pathname: "/error",
        query: { code: 503 },
      });
    default:
      return null;
  }
};
