import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import RouterButton from "../../../../components/elements/button/RouterButton";
import {
  updateUserPermission,
  deleteUser,
  showUser,
} from "../../../../slices/auth/userSlice";
import UserUpdateForm from "../../../../components/elements/form/attendances/AttendanceForm";
import DeleteButton from "../../../../components/elements/button/DeleteButton";
import {
  user,
  userStatus,
  permissionStore,
  userError,
  userErrorStatus,
} from "../../../../hooks/authSelector";
import { ownerPermission } from "../../../../hooks/useMethod";
import { allLogout } from "../../../../hooks/useMethod";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { UserState } from "../../../../slices/auth/userSlice";
import { renderError } from "../../../../pages/api_backend/errorHandler";
import { AppDispatch } from "../../../../redux/store";

const AttenDanceEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const uStatus: string = useSelector(userStatus);
  const uError: string = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  const { id } = router.query; // idを取得

  const editUser: UserState = useSelector(user)?.find(
    (user: UserState) => user.id === Number(id)
  ) || {
    id: 0,
    name: "",
    isAttendance: false,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        ownerPermission(permission, router);

        if (!editUser && permission === "オーナー") {
          await dispatch(showUser() as any);
        } else {
          return;
        }
      } catch (error) {
        // console.log("Error", error);
        allLogout(dispatch);
        router.push("/auth/login");
      }
    };
    if (permission) fetchData();
  }, [dispatch, permission]);

  const handleUpdate = async (formData: { id: number; role: string }) => {
    try {
      const response = await dispatch(updateUserPermission(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/attendances");
      } else {
        const re = renderError(uErrorStatus, router, dispatch);
        if (re === null) throw new Error("更新に失敗しました");
      }
    } catch (error) {
      allLogout(dispatch);
      router.push("/auth/login");
    }
  };

  const handleDeleteUser = async () => {
    try {
      confirm(
        "本当にこのスタッフは退職しますか？今後このスタッフのデータは表示されませんが、よろしいですか？"
      );
      if (!confirm) {
        return;
      } else {
        const response = await dispatch(deleteUser(editUser.id) as any);
        if (response.meta.requestStatus === "fulfilled") {
          router.push("/attendances");
        } else {
          const re = renderError(uErrorStatus, router, dispatch);
          if (re === null) throw new Error("削除に失敗しました");
        }
      }
    } catch (error) {
      allLogout(dispatch);
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-full ">
      {uError && (
        <BasicAlerts message={uError} type={"error"} padding={1} space={1} />
      )}

      {uStatus === "loading" ? (
        <p>loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="mx-4">
            <div className="flex justify-between my-4">
              <RouterButton link={"/attendances"} value="スタッフ画面に戻る" />

              <DeleteButton value="退職する" onClicker={handleDeleteUser} />
            </div>
          </div>

          <div>
            <UserUpdateForm onSubmit={handleUpdate} node={editUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AttenDanceEdit;
