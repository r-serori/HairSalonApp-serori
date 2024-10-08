import AuthLoginForm from "../../components/elements/form/auth/AuthLoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import { login } from "../../slices/auth/userSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import { isLogin } from "../../slices/auth/isLoginSlice";
import { clearError } from "../../slices/auth/userSlice";
import RouterButton from "../../components/elements/button/RouterButton";
import { useEffect, useState } from "react";
import {
  userStatus,
  userMessage,
  userError,
  userErrorStatus,
} from "../../hooks/authSelector";
import { getUserKey, allLogout } from "../../hooks/useMethod";
import { pushUserId } from "../../hooks/pushLocalStorage";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  getPermission,
  PermissionsState,
} from "../../slices/auth/permissionSlice";
import ForgotPasswordButton from "../../components/elements/button/ForgotPasswordButton";
import { renderError } from "../../api_backend/errorHandler";
import { AppDispatch } from "../../redux/store";
import { KeyState } from "../../slices/auth/keySlice";
import LoadingComponent from "@/components/loading/Loading";
import { set } from "lodash";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
      const response: any = await dispatch(login(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        console.log("ログイン成功");
        dispatch(isLogin());
        const token: string | undefined = response.payload.token;
        if (token === undefined) {
          throw new Error();
        }
        localStorage.setItem("token", token);
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
          setLoading(false);
        } else {
          router.push("/dashboard");
          setLoading(false);
        }
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null) throw new Error("ログイン処理に失敗しました");
      }
    } catch (error) {
      setLoading(false);
      console.error("ログイン処理に失敗しました", error);
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

      {uStatus === "loading" || loading ? (
        <LoadingComponent />
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
