import React from "react";
import RouterButton from "../components/elements/button/RouterButton";
import gsap from "gsap";
import { useEffect } from "react";
import { Draggable } from "gsap/dist/Draggable";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BasicAlerts from "../components/elements/alert/BasicAlert";
import { useSelector } from "react-redux";
import { userError } from "../hooks/authSelector";

// ScrollTriggerの初期化
gsap.registerPlugin(Draggable);

const HomePage: React.FC = () => {
  const uError: string | null = useSelector(userError) as string | null;
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

  return (
    <div>
      {uError && (
        <BasicAlerts type="error" message={uError} space={1} padding={0.6} />
      )}
      <div className="flex flex-col items-center justify-between container h-full mx-auto overflow-hidden ">
        <div>
          <h1
            id="rotate"
            className={`mt-20 lg:text-8xl md:text-6xl sm:text-4xl text-3xl text-center font-bold transform rotate-12 `}
          >
            Welcome to HairSalon App
          </h1>
        </div>

        <nav className="mt-16">
          <ul className="flex gap-24 lg:mr-12">
            <li id="active" className="lg:text-xl text-md">
              <RouterButton
                link="auth/register"
                value="新規登録"
                pxValue={5}
                pyValue={4}
              />
            </li>
            <li id="active" className="lg:text-xl text-md">
              <RouterButton
                link="auth/login"
                value="ログイン"
                pxValue={5}
                pyValue={4}
              />
            </li>
          </ul>
        </nav>
        <div className="mt-12">
          <p className="text-red-500 lg:text-2xl text-xl bold text-center">
            文字が斜めになっています！文字を掴んで直してから登録またはログインして下さい！
          </p>
          <p className="text-red-500 lg:text-2xl text-xl bold text-center">
            ※文字を掴むと回転します！ ※しなくても登録、ログインできます！
          </p>
        </div>
        <div className="flex gap-24">
          <div id="active" className="mt-12 text-8xl">
            <ContentCutIcon className="text-8xl" />
          </div>
          <div id="rotate" className="mt-12 text-8xl">
            <StorefrontIcon className="text-8xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
