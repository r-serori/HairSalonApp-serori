import AuthLoginForm from "../../components/elements/form/auth/AuthLoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import { login } from "../../store/auth/userSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import { isLogin } from "../../store/auth/isLoginSlice";
import { clearError, changeMessage } from "../../store/auth/userSlice";
import RouterButton from "../../components/elements/button/RouterButton";
import { useEffect } from "react";
import {
  userStatus,
  userMessage,
  userError,
  userErrorStatus,
} from "../../components/Hooks/authSelector";
import { getUserKey, allLogout } from "../../components/Hooks/useMethod";
import { pushUserId } from "../../components/Hooks/pushLocalStorage";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  getPermission,
  PermissionsState,
} from "../../store/auth/permissionSlice";
import ForgotPasswordButton from "../../components/elements/button/ForgotPasswordButton";
import { renderError } from "../../services/errorHandler";
import { AppDispatch } from "../../redux/store";
import { KeyState } from "../../store/auth/keySlice";

const LoginPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const uStatus: string = useSelector(userStatus);
  const uMessage: string | null = useSelector(userMessage);
  const uError: string | null = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  useEffect(() => {
    localStorage.setItem("registerNow", "true");
    const isLogin: string | null = localStorage.getItem("isLogin");
    if (isLogin) {
      allLogout(dispatch);
    }
  }, []); // useEffectの依存配列を空にすることで、初回のみ実行されるようにする

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      const response: any = await dispatch(login(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(isLogin());
        const userId: number | undefined = response.payload.responseUser.id;
        if (userId === undefined) {
          throw new Error();
        }
        const userKey: KeyState = await getUserKey(dispatch);

        if (userKey === null) {
          throw new Error();
        }
        const pushUser: boolean = pushUserId(userId, userKey);

        await dispatch(getPermission() as any);

        const ownerRender: boolean | undefined = response.payload.ownerRender;

        const role: PermissionsState = response.payload.responseUser.role;
        if (role === null) throw new Error();
        if (ownerRender === undefined) throw new Error();

        if (role === "オーナー" && pushUser && ownerRender) {
          router.push("/auth/owner");
        } else {
          router.push("/dashboard");
        }
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null) throw new Error("ログイン処理に失敗しました");
      }
    } catch (error) {
      localStorage.removeItem("registerNow");
      allLogout(dispatch);
      router.push("/auth/login");
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
        <div>
          <div className="mt-4 ml-4 flex justify-between">
            <RouterButton
              link="/"
              value="ホーム画面へ"
              onChangeAndRouter={() => dispatch(clearError())}
            />
            <ForgotPasswordButton />
          </div>
          <AuthLoginForm onSubmit={handleLogin} />

          <div className="flex justify-center gap-32 ">
            <div id="active" className="mt-10 text-8xl ">
              <ContentCutIcon className="text-8xl" />
            </div>
            <div id="rotate" className="mt-10 text-8xl">
              <StorefrontIcon className="text-8xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
