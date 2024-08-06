import React from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useEffect } from "react";
import { Draggable } from "gsap/dist/Draggable";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RouterButton from "../components/elements/button/RouterButton";

// ScrollTriggerの初期化
gsap.registerPlugin(Draggable);

const NotExistPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  useEffect(() => {
    Draggable.create("#active", {
      bounds: ".container",
      inertia: true,
    });
    Draggable.create("#rotate", {
      type: "rotation",
      inertia: true,
    });
    localStorage.getItem("isLogin") === "true"
      ? setIsLogin(true)
      : setIsLogin(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between container h-full mx-auto overflow-hidden ">
      <div>
        <h1 className="mt-48 lg:text-5xl text-3xl  text-red-500 ">
          お探しのページが見つかりません。
        </h1>
      </div>

      <div className="mt-24">
        {isLogin ? (
          <RouterButton link="dashboard" value="一覧画面へ戻る" />
        ) : (
          <RouterButton link="/" value="ホーム画面へ戻る" />
        )}
      </div>

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

export default NotExistPage;
