import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createHairstyle,
  HairstyleState,
} from "../../../slices/hairstyles/hairstyleSlice";
import HairstyleForm from "../../../components/elements/form/hairstyles/HairstyleForm";
import { useRouter, NextRouter } from "next/router";
import RouterButton from "../../../components/elements/button/RouterButton";
import {
  hairstyleError,
  hairstyleErrorStatus,
  hairstyleStatus,
} from "../../../hooks/selector";
import BasicAlerts from "../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../redux/store";
import { renderError } from "../../../pages/api_backend/errorHandler";
import { PermissionsState } from "../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../hooks/authSelector";

const HairstyleCreate = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const hStatus: string = useSelector(hairstyleStatus);
  const hError: string = useSelector(hairstyleError);
  const hErrorStatus: number = useSelector(hairstyleErrorStatus);

  const handleCreate = async (formData: HairstyleState) => {
    try {
      const response = await dispatch(createHairstyle(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/hairstyles");
      } else {
        const re = renderError(hErrorStatus, router, dispatch);
        if (re === null) throw new Error("髪型の作成に失敗しました");
      }
    } catch (error) {
      return;
    }
  };
  return (
    <div className="min-h-full ">
      {hError && (
        <BasicAlerts type="error" message={hError} space={1} padding={1} />
      )}
      {hStatus === "loading" ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="mt-4 ml-4">
            <RouterButton link={"/hairstyles"} value="髪型画面に戻る" />
          </div>

          <HairstyleForm createHairstyle={handleCreate} />
        </div>
      )}
    </div>
  );
};

export default HairstyleCreate;
