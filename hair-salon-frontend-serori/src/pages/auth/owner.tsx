import { useRouter, NextRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ownerRegister, OwnerState } from "../../store/auth/ownerSlice";
import OwnerRegisterForm from "../../components/elements/form/auth/AuthOwnerForm";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import {
  userStatus,
  userMessage,
  userError,
  ownerErrorStatus,
  userKey,
} from "../../components/Hooks/authSelector";
import { changeMessage } from "../../store/auth/userSlice";
import { renderError } from "../../services/errorHandler";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { isLogin } from "../../store/auth/isLoginSlice";

const OwnerPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const uStatus: string = useSelector(userStatus);
  const uMessage: string | null = useSelector(userMessage);
  const uError: string | null = useSelector(userError);

  const oErrorStatus: number = useSelector(ownerErrorStatus);

  useEffect(() => {
    dispatch(isLogin());
  }, []);

  const ownerSubmit = async (formData: OwnerState) => {
    console.log(formData);
    try {
      const response = await dispatch(ownerRegister(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        dispatch(changeMessage(""));
        router.push("/dashboard");
      } else {
        const re = renderError(oErrorStatus, router, dispatch);
        if (re === null) throw new Error("パスワードリセットに失敗しました");
      }
    } catch (error) {
      dispatch(
        changeMessage("登録処理に失敗しました！もう一度お試しください！")
      );
      console.log("Error", error);
      return;
    }
  };

  return (
    <div>
      {uStatus == "idle" && (
        <BasicAlerts
          message="メールの認証が完了しました！続いて、オーナー登録を行ってください！"
          type="info"
          padding={0.8}
          space={1}
        />
      )}
      {uMessage && (
        <BasicAlerts
          message={uMessage}
          type="success"
          padding={0.8}
          space={1}
        />
      )}
      {uError && (
        <BasicAlerts message={uError} type="error" padding={0.8} space={1} />
      )}

      {uStatus == "loading" ? (
        <p>Loading...</p>
      ) : (
        <OwnerRegisterForm onSubmit={ownerSubmit} />
      )}
    </div>
  );
};

export default OwnerPage;
