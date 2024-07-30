import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import { updateUserPassword } from "../../slices/auth/userSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import UpdatePasswordForm from "../../components/elements/form/userProfile/UpdatePasswordForm";
import {
  permissionStore,
  userError,
  userErrorStatus,
  userMessage,
  userStatus,
} from "../../hooks/authSelector";
import { isLogout } from "../../slices/auth/isLoginSlice";
import RouterButton from "../../components/elements/button/RouterButton";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../pages/api/errorHandler";
import { PermissionsState } from "../../slices/auth/permissionSlice";

const UpdatePasswordPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const uStatus: string = useSelector(userStatus);
  const uMessage: string | null = useSelector(userMessage);
  const uError: string | null = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  const handleUpdatePassword = async (formData: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      const response = await dispatch(updateUserPassword(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        dispatch(isLogout());
        localStorage.clear();
        router.push("/auth/login");
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null) throw new Error("パスワードの変更に失敗しました");
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
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="mt-4 ml-4">
            <RouterButton
              link={"/userProfile/updateUserInformation"}
              value="プロフィール画面に戻る"
            />
          </div>

          <UpdatePasswordForm onSubmitUpdatePassword={handleUpdatePassword} />
        </div>
      )}
    </div>
  );
};

export default UpdatePasswordPage;
