import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import {
  MerchandiseState,
  updateMerchandise,
} from "../../../../slices/merchandises/merchandiseSlice";
import MerchandiseForm from "../../../../components/elements/form/merchandises/MerchandiseForm";
import {
  merchandiseStatus,
  merchandiseStore,
  merchandiseError,
  merchandiseErrorStatus,
} from "../../../../hooks/selector";
import RouterButton from "../../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../../redux/store";
import { renderError } from "../../../../api_backend/errorHandler";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../../hooks/authSelector";
import LoadingComponent from "../../../../components/loading/Loading";

const MerchandiseEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const { id } = router.query; // idを取得

  const merchandise: MerchandiseState = useSelector(merchandiseStore)?.find(
    (merchandise: MerchandiseState) => merchandise.id === Number(id)
  ) || {
    id: 0,
    merchandise_name: "",
    price: 0,
  };

  const mStatus: string = useSelector(merchandiseStatus);
  const mError: string = useSelector(merchandiseError);
  const mErrorStatus: number = useSelector(merchandiseErrorStatus);

  const handleUpdate = async (formData: MerchandiseState) => {
    try {
      const response = await dispatch(updateMerchandise(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/merchandises");
      } else {
        const re = renderError(mErrorStatus, router, dispatch);
        if (re === null) throw new Error("物販の更新に失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-full ">
      {mError && (
        <BasicAlerts type="error" message={mError} space={1} padding={1} />
      )}
      {mStatus === "loading" && permission ? (
        <LoadingComponent />
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="ml-4 mt-4">
            <RouterButton link={"/merchandises"} value="物販画面に戻る" />
          </div>

          <MerchandiseForm
            node={merchandise}
            createMerchandise={handleUpdate}
            edit={true}
          />
        </div>
      )}
    </div>
  );
};

export default MerchandiseEdit;
