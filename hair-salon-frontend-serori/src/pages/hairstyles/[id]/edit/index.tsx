import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import {
  updateHairstyle,
  HairstyleState,
} from "../../../../slices/hairstyles/hairstyleSlice";
import HairstyleForm from "../../../../components/elements/form/hairstyles/HairstyleForm";
import RouterButton from "../../../../components/elements/button/RouterButton";
import {
  hairstyleStatus,
  hairstylesStore,
  hairstyleError,
  hairstyleErrorStatus,
} from "../../../../hooks/selector";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../../redux/store";
import { renderError } from "../../../../pages/api/errorHandler";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../../hooks/authSelector";

const HairstyleEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const { id } = router.query; // idを取得

  const hairstyle = useSelector(hairstylesStore)?.find(
    (hairstyle: HairstyleState) => hairstyle.id === Number(id)
  ) || {
    id: 0,
    hairstyle_name: "",
  };
  const hStatus: string = useSelector(hairstyleStatus);
  const hError: string = useSelector(hairstyleError);
  const hErrorStatus: number = useSelector(hairstyleErrorStatus);

  const handleUpdate = async (formData: HairstyleState) => {
    try {
      const response = await dispatch(updateHairstyle(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/hairstyles");
      } else {
        const re = renderError(hErrorStatus, router, dispatch);
        if (re === null) throw new Error("髪型の更新に失敗しました");
      }
    } catch (error) {}
    return;
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

          <HairstyleForm
            node={hairstyle}
            createHairstyle={handleUpdate}
            edit={true}
          />
        </div>
      )}
    </div>
  );
};

export default HairstyleEdit;
