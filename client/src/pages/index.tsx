import React from "react";
import RouterButton from "../components/elements/button/RouterButton";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BasicAlerts from "../components/elements/alert/BasicAlert";
import { useSelector } from "react-redux";
import { userError } from "../hooks/authSelector";
import { motion, useDragControls } from "framer-motion";

const HomePage: React.FC = () => {
  const uError: string | null = useSelector(userError) as string | null;

  return (
    <div className="h-full">
      {uError && (
        <BasicAlerts type="error" message={uError} space={1} padding={0.6} />
      )}
      <div className="flex flex-col items-center justify-between container h-full mx-auto overflow-y-hidden w-full">
        <motion.div
          className="mt-20 lg:text-8xl md:text-6xl sm:text-4xl text-3xl text-center font-bold"
          initial={{ y: -200 }}
          animate={{ y: 0 }}
        >
          <span>Welcome</span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 2, delay: 0.5 }}
          >
            to
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 4, delay: 1 }}
          >
            HairSalon
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 6, delay: 1.5 }}
          >
            App
          </motion.span>
        </motion.div>

        <div className="flex lg:gap-16  ">
          <motion.div
            initial={{ x: -500, y: -500 }}
            animate={{ x: 0, y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 1 }}
            className="lg:inline hidden mt-12 text-8xl text-red-600 "
          >
            <ContentCutIcon className="text-8xl" />
          </motion.div>
          <motion.div
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 2 }}
            className="lg:inline hidden mt-12 text-8xl text-green-400"
          >
            <ContentCutIcon className="text-8xl" />
          </motion.div>
          <motion.div
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 3 }}
            className="mt-12 text-8xl text-blue-600"
          >
            <ContentCutIcon className="text-8xl" />
          </motion.div>
          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 4 }}
            id="rotate"
            className="mt-12 text-8xl text-yellow-400"
          >
            <StorefrontIcon className="text-8xl" />
          </motion.div>
          <motion.div
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 3 }}
            className="mt-12 text-8xl text-purple-400"
          >
            <ContentCutIcon className="text-8xl" />
          </motion.div>
          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 2 }}
            className="lg:inline hidden mt-12 text-8xl text-blue-400"
          >
            <ContentCutIcon className="text-8xl" />
          </motion.div>
          <motion.div
            initial={{ x: 500, y: 500 }}
            animate={{ x: 0, y: 0 }}
            transition={{ ease: "easeOut", duration: 1, delay: 1 }}
            className="lg:inline hidden mt-12 text-8xl text-red-600"
          >
            <ContentCutIcon className="text-8xl" />
          </motion.div>
        </div>

        <nav className="mt-24">
          <ul className="flex lg:gap-80 gap-24 lg:mr-12">
            <motion.li
              className="lg:text-xl text-md"
              initial={{ y: 500 }}
              animate={{ y: 0 }}
            >
              <RouterButton
                link="auth/register"
                value="新規登録"
                pxValue={5}
                pyValue={4}
              />
            </motion.li>
            <motion.li
              className="lg:text-xl text-md"
              initial={{ y: 500 }}
              animate={{ y: 0 }}
            >
              <RouterButton
                link="auth/login"
                value="ログイン"
                pxValue={5}
                pyValue={4}
              />
            </motion.li>
          </ul>
        </nav>

        <div className="flex justify-center mt-12">
          <a
            className="text-bold text-lg"
            href="https://docs.google.com/document/d/e/2PACX-1vS-7DE8rijusBuosCWCt4qUwF550YSY253p5BT1KFdnbgd88ZrbAjdCtLxRW2mBlY7FwyyFweRKHFot/pub"
          >
            アプリの説明書を見る
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
