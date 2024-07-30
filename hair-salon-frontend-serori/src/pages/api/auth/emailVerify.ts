import { sendRequest } from "../requestApi";

export const emailVerify = async (formData: { id: number; hash: string }) => {
  try {
    // 実際のパスパラメータを使用してリクエストを送信
    const response = await sendRequest(
      "GET",
      `//verify-email/${encodeURIComponent(formData.id)}/${encodeURIComponent(
        formData.hash
      )}`
    );
    return response;
  } catch (error) {
    return { error: error };
  }
};
