import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import AuthRegisterForm from "../../components/elements/form/auth/AuthRegisterForm";
import { register } from "../../slices/auth/userSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import RouterButton from "../../components/elements/button/RouterButton";
import { useEffect, useState } from "react";
import {
  userStatus,
  userError,
  ownerError,
  userErrorStatus,
} from "../../hooks/authSelector";
import { getUserKey, allLogout } from "../../hooks/useMethod";
import { pushUserId } from "../../hooks/pushLocalStorage";
import { renderError } from "../../api_backend/errorHandler";
import { AppDispatch } from "../../redux/store";
import { KeyState } from "../../slices/auth/keySlice";
import LoadingComponent from "../../components/loading/Loading";

const RegisterPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const uStatus: string = useSelector(userStatus);

  const uError: string | null = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);
  const oError: string | null = useSelector(ownerError);

  useEffect(() => {
    localStorage.setItem("registerNow", "true");
    const isLogin: string | null = localStorage.getItem("isLogin");
    if (isLogin) {
      allLogout(dispatch);
    }
  }, []);

  const handleRegister = async (formData: {
    name: string;
    email: string;
    phone_number: string;
    role: string;
    password: string;
    isAttendance: boolean;
    password_confirmation: string;
  }) => {
    try {
      setLoading(true);
      const response: any = await dispatch(register(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        const token: string | undefined = response.payload.token;
        if (token === undefined) {
          throw new Error();
        }
        localStorage.setItem("token", token);
        const userId: number | null = Number(response.payload.responseUser.id);

        if (userId === null) throw new Error();

        const userKey: KeyState = await getUserKey(dispatch);

        if (userKey === null) throw new Error();

        const pushUser: boolean = pushUserId(userId, userKey);

        if (pushUser) {
          router.push("/auth/emailWait");
        } else {
          throw new Error();
        }
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null) throw new Error("register処理に失敗しました");
      }
    } catch (error) {
      setLoading(false);
      localStorage.removeItem("registerNow");
      return;
    }
  };

  return (
    <div>
      {oError && (
        <BasicAlerts type="error" message={oError} space={1} padding={0.6} />
      )}

      {uError && (
        <BasicAlerts type="error" message={uError} space={1} padding={0.6} />
      )}

      {uStatus === "loading" || loading ? (
        <LoadingComponent />
      ) : (
        <div>
          <div className="mt-4 ml-4">
            <RouterButton link="/" value="ホーム画面へ戻る" />
          </div>
          <AuthRegisterForm onSubmitOwner={handleRegister} />
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
