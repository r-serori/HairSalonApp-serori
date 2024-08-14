import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import AuthStaffRegisterForm from "../../components/elements/form/auth/AuthStaffRegisterForm";
import { staffRegister } from "../../slices/auth/userSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import RouterButton from "../../components/elements/button/RouterButton";
import {
  userError,
  userStatus,
  permissionStore,
  userErrorStatus,
} from "../../hooks/authSelector";
import { useEffect } from "react";
import { ownerPermission } from "../../hooks/useMethod";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { renderError } from "../../api_backend/errorHandler";
import { AppDispatch } from "../../redux/store";
import LoadingComponent from "../../components/loading/Loading";

const StaffRegisterPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const uStatus: string = useSelector(userStatus);
  const uError: string | null = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    if (permission) ownerPermission(permission, router);
  }, [permission]);

  const handleStaffRegister = async (formData: {
    name: string;
    email: string;
    password: string;
    role: string;
    isAttendance: boolean;
  }) => {
    try {
      const response: any = await dispatch(staffRegister(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/attendances");
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null) throw new Error("スタッフ登録に失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-full ">
      {uError && (
        <BasicAlerts type="error" message={uError} space={1} padding={0.6} />
      )}
      <div className="mt-4 ml-4">
        <RouterButton link={"/attendances"} value="スタッフ画面に戻る" />
      </div>
      {uStatus === "loading" && permission ? (
        <LoadingComponent />
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <AuthStaffRegisterForm onSubmitStaff={handleStaffRegister} />
      )}
    </div>
  );
};

export default StaffRegisterPage;
