import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import { updateUser, UserState } from "../../slices/auth/userSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import UpdateInformationForm from "../../components/elements/form/userProfile/UpdateInformationForm";
import {
  permissionStore,
  user,
  userError,
  userErrorStatus,
  userMessage,
  userStatus,
} from "../../hooks/authSelector";
import { useEffect } from "react";
import { allLogout, staffPermission } from "../../hooks/useMethod";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { showUser } from "../../slices/auth/userSlice";
import RouterButton from "../../components/elements/button/RouterButton";
import ForgotPasswordButton from "../../components/elements/button/ForgotPasswordButton";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../api_backend/errorHandler";
import { isLogout } from "../../slices/auth/isLoginSlice";

const UpdateUserInformationPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const editUser: UserState = useSelector(user)[0];

  const uStatus: string = useSelector(userStatus);
  const uMessage: string | null = useSelector(userMessage);
  const uError: string | null = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        staffPermission(permission, router);

        if (
          permission === "オーナー" ||
          permission === "マネージャー" ||
          permission === "スタッフ"
        ) {
          const response = await dispatch(showUser() as any);
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(uErrorStatus, router, dispatch);
            if (re === null)
              throw new Error("ユーザー情報の取得に失敗しました");
          }
        }
      } catch (error) {
        return;
      }
    };
    if (permission) fetchData();
  }, [dispatch, permission]);

  const handleUpdateUserInformation = async (formData: {
    name: string;
    email: string;
    phone_number: string;
  }) => {
    try {
      const response = await dispatch(updateUser(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        if (response.payload.redirect === true) {
          localStorage.clear();
          dispatch(isLogout());
          router.push("/auth/emailWait");
        } else {
          router.push("/dashboard");
        }
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null) throw new Error("userInfoUpdateに失敗しました");
      }
    } catch (error) {}
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
      <div className="mx-4">
        <div className="flex justify-between my-4 ">
          <RouterButton link={"/dashboard"} value="一覧画面へ戻る" />
          <RouterButton
            link={"/userProfile/updatePassword"}
            value="パスワードを変更する場合はこちら"
          />
          <ForgotPasswordButton logout={true} />
        </div>

        {uStatus === "loading" ? (
          <p>Loading...</p>
        ) : permission === null ? (
          <p>あなたに権限はありません。</p>
        ) : (
          <UpdateInformationForm
            onSubmitUserInformation={handleUpdateUserInformation}
            node={Object(editUser)}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateUserInformationPage;
