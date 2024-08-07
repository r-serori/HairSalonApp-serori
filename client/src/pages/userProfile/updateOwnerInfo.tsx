import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import {
  ownerError,
  ownerErrorStatus,
  ownerMessage,
  ownerStatus,
  ownerStore,
  permissionStore,
} from "../../hooks/authSelector";
import { useEffect } from "react";
import { ownerPermission } from "../../hooks/useMethod";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import RouterButton from "../../components/elements/button/RouterButton";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../api_backend/errorHandler";
import {
  getOwner,
  OwnerState,
  updateOwner,
} from "../../slices/auth/ownerSlice";
import AuthOwnerForm from "../../components/elements/form/auth/AuthOwnerForm";
import { changeMessage } from "../../slices/auth/userSlice";
import LoadingComponent from "../../components/loading/Loading";

const UpdateOwnerInformationPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const owner: OwnerState = useSelector(ownerStore);

  const oStatus: string = useSelector(ownerStatus);
  const oMessage: string | null = useSelector(ownerMessage);
  const oError: string | null = useSelector(ownerError);
  const oErrorStatus: number = useSelector(ownerErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    dispatch(changeMessage(null));
    const fetchData = async () => {
      try {
        ownerPermission(permission, router);

        if (permission === "オーナー") {
          const response = await dispatch(getOwner() as any);
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(oErrorStatus, router, dispatch);
            if (re === null) throw new Error("店舗情報の取得に失敗しました");
          }
        }
      } catch (error) {
        return;
      }
    };

    if (permission) fetchData();
  }, [dispatch, permission]);

  const handleUpdateOwnerInformation = async (formData: OwnerState) => {
    try {
      const response = await dispatch(updateOwner(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/dashboard");
      } else {
        const re = renderError(oErrorStatus, router, dispatch);
        if (re === null) throw new Error("ownerInfoUpdateに失敗しました");
      }
    } catch (error) {}
  };

  return (
    <div>
      {oError && (
        <BasicAlerts type="error" message={oError} space={1} padding={0.6} />
      )}

      {oMessage && (
        <BasicAlerts
          type="success"
          message={oMessage}
          space={1}
          padding={0.6}
        />
      )}

      {(oStatus === "loading" || !owner) && permission ? (
        <LoadingComponent />
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div className="mx-4">
          <div className="my-4 ">
            <RouterButton link={"/dashboard"} value="一覧画面へ戻る" />
          </div>
          <AuthOwnerForm node={owner} onSubmit={handleUpdateOwnerInformation} />
        </div>
      )}
    </div>
  );
};

export default UpdateOwnerInformationPage;
