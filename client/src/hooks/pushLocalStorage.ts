import CryptoJS from "crypto-js";
import _ from "lodash";
import { KeyState } from "../slices/auth/keySlice";

export const pushUserId = (userId: number, key: KeyState): boolean => {
  // データをJSON文字列に変換
  try {
    if (key === null || !userId) return false;
    const dataString = JSON.stringify(userId);

    const encryptedData = CryptoJS.AES.encrypt(
      dataString,
      String(key)
    ).toString();

    localStorage.setItem("user_id", encryptedData);
    return true;
  } catch (error) {
    return false;
  }
};
