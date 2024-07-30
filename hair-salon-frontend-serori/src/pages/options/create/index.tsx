import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOption, OptionState } from "../../../store/options/optionSlice";
import OptionForm from "../../../components/elements/form/options/OptionForm";
import { useRouter, NextRouter } from "next/router";
import {
  optionStatus,
  optionError,
  optionErrorStatus,
} from "../../../components/Hooks/selector";
import RouterButton from "../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../redux/store";
import { renderError } from "../../../services/errorHandler";
import { PermissionsState } from "../../../store/auth/permissionSlice";
import { permissionStore } from "../../../components/Hooks/authSelector";

const OptionCreate: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const oStatus: string = useSelector(optionStatus);
  const oError: string = useSelector(optionError);
  const oErrorStatus: number = useSelector(optionErrorStatus);

  const handleCreate = async (formData: OptionState) => {
    try {
      const response = await dispatch(createOption(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/options");
      } else {
        const re = renderError(oErrorStatus, router, dispatch);
        if (re === null) throw new Error("オプションの作成に失敗しました");
      }
    } catch (error) {
      return;
    }
  };
  return (
    <div className="min-h-full ">
      {oError && (
        <BasicAlerts type="error" message={oError} space={1} padding={1} />
      )}
      {oStatus === "loading" ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="ml-4 mt-4 ">
            <RouterButton link={"/options"} value="オプション画面に戻る" />
          </div>
          <OptionForm createOption={handleCreate} />
        </div>
      )}
    </div>
  );
};

export default OptionCreate;
