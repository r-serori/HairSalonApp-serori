import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import { resetPassword } from "../../../slices/auth/userSlice";
import BasicAlerts from "../../../components/elements/alert/BasicAlert";
import ResetPasswordForm from "../../../components/elements/form/userProfile/ResetPasswordForm";
import {
  userError,
  userMessage,
  userStatus,
  userErrorStatus,
} from "../../../hooks/authSelector";
import { renderError } from "../../../pages/api_backend/errorHandler";
import { AppDispatch } from "../../../redux/store";

const ResetPasswordPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const { token } = router.query;

  const uStatus = useSelector(userStatus);
  const uMessage = useSelector(userMessage);
  const uError: string = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  const handleResetPassword = async (formData: {
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    const requestForm = { ...formData, token: token as string };
    try {
      const response = await dispatch(resetPassword(requestForm) as any);
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/auth/login");
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null) throw new Error("パスワードリセットに失敗しました");
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
        <ResetPasswordForm onSubmitResetPassword={handleResetPassword} />
      )}
    </div>
  );
};

export default ResetPasswordPage;
