import React from "react";
import { NextRouter, useRouter } from "next/router";
import gsap from "gsap";
import { useEffect } from "react";
import { Draggable } from "gsap/dist/Draggable";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutButton from "../components/elements/button/logoutButton";
import RouterButton from "../components/elements/button/RouterButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { allLogout } from "../hooks/useMethod";

// ScrollTriggerの初期化
gsap.registerPlugin(Draggable);

const ErrorPage = () => {
  const router: NextRouter = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Draggableの設定
    Draggable.create("#active", {
      bounds: ".container",
      inertia: true,
    });
    Draggable.create("#rotate", {
      type: "rotation",
      inertia: true,
    });
  }, []);

  const { code } = router.query;

  const getMessage = () => {
    console.log(code);
    if (!code) {
      allLogout(dispatch);
      return "エラーが発生しました。再ログインしてください。";
    }
    switch (Number(code)) {
      case 401:
        return "認証が必要です。ログイン画面へ移動し、ログインしてください。";
      case 403:
        return "アクセス権限がありません。アクセス権限がありません。ユーザー登録画面へ移動し、ユーザー登録してください。";
      case 404:
        return "お探しのページが見つかりません。";
      case 419:
        return "セッションがタイムアウトしました。再度ログインしてください。";
      case 422:
        return "ログイン情報が不正です。再度ログインしてください。";
      case 433:
        return "メール認証が完了していません。メール認証を行ってください。";
      case 500:
        return "サーバーエラーが発生しました。しばらくしてからもう一度お試しください。復旧しない場合は、管理者にお問い合わせください。";
      case 503:
        return "サービスが一時的に利用できません。しばらくしてからもう一度お試しください。復旧しない場合は、管理者にお問い合わせください。";
      default:
        return "エラーが発生しました。再ログインしてください。";
    }
  };

  return (
    <div className="flex flex-col items-center justify-between container h-full mx-auto overflow-hidden ">
      <div className="flex justify-end py-4 mr-4 ">
        <LogoutButton className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" />
      </div>
      <div>
        <h1 className="mt-16 lg:text-4xl text-3xl  text-red-500 ">
          {getMessage()}
        </h1>
      </div>

      <nav className="mt-24">
        <ul className="flex gap-24 mr-12">
          <li id="active">
            <RouterButton link="auth/register" value="ユーザー登録画面へ" />
          </li>
          <li id="active">
            <RouterButton link="auth/login" value="ログイン画面へ" />
          </li>
          {(Number(code) === 403 || Number(code) === 404) && (
            <li id="active">
              <RouterButton link="dashboard" value="一覧画面へ" />
            </li>
          )}
        </ul>
      </nav>

      <div className="flex gap-24">
        <div id="active" className="mt-24 text-8xl">
          <ContentCutIcon className="text-8xl" />
        </div>
        <div id="rotate" className="mt-24 text-8xl">
          <StorefrontIcon className="text-8xl" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
