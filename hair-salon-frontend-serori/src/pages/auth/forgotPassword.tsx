import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import { forgotPassword } from "../../slices/auth/userSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import ForgotPasswordForm from "../../components/elements/form/userProfile/ForgotPasswordForm";
import {
  userError,
  userMessage,
  userStatus,
  userErrorStatus,
} from "../../hooks/authSelector";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../pages/api/errorHandler";
import RouterButton from "../../components/elements/button/RouterButton";

const ForgotPasswordPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const uStatus: string = useSelector(userStatus);
  const uMessage: string | null = useSelector(userMessage);
  const uError: string | null = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  const handleForgotPassword = async (email: string) => {
    try {
      const response = await dispatch(forgotPassword(email) as any);
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/auth/resetEmailWait");
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null)
          throw new Error("forgotPassのリクエストに失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      {uError && (
        <BasicAlerts type="error" message={uError} space={1} padding={0.6} />
      )}

      {uMessage && (
        <BasicAlerts
          type="success"
          message={uMessage}
          space={1}
          padding={0.6}
        />
      )}

      {uStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-4">
          <div className="my-4">
            <RouterButton link="/" value="ホーム画面へ戻る" />
          </div>
          <ForgotPasswordForm onSubmitForgotPassword={handleForgotPassword} />
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
