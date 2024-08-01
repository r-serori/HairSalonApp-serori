import ComponentTable from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import RouterButton from "../../components/elements/button/RouterButton";
import { getUsers } from "../../slices/auth/userSlice";
import { useRouter, NextRouter } from "next/router";
import {
  user,
  userError,
  userMessage,
  userStatus,
  permissionStore,
  userErrorStatus,
} from "../../hooks/authSelector";
import { ownerPermission, allLogout } from "../../hooks/useMethod";
import _ from "lodash";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { UserState } from "../../slices/auth/userSlice";
import { renderError } from "../../pages/api_backend/errorHandler";
import { AppDispatch } from "../../redux/store";
import {
  AttendancesNodes,
  NodesProps,
  SearchItems,
  THeaderItems,
} from "../../types/interface";

const Attendances = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const users: UserState[] = useSelector(user);
  const uStatus: string = useSelector(userStatus);
  const uMessage: string | null = useSelector(userMessage);
  const uError: string | null = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    const getStaffs = async () => {
      const response = await dispatch(getUsers() as any);
      localStorage.setItem("userCount", response.payload.userCount);
      return response;
    };

    const fetchData = async () => {
      try {
        ownerPermission(permission, router);

        const userCount: string | null = localStorage.getItem("userCount");
        if (
          (permission === "オーナー" && userCount === null) ||
          (Array.isArray(users) &&
            users.length < Number(userCount) &&
            permission === "オーナー")
        ) {
          const response = (await getStaffs()) as any;
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(uErrorStatus, router, dispatch);
            if (re === null) throw new Error("更新に失敗しました");
          }
        }
      } catch (error) {
        allLogout(dispatch);
        router.push("/auth/login");
      }
    };
    if (permission) fetchData();
  }, [dispatch, permission]);

  const searchItems: SearchItems = [
    { key: "name", value: "名前" },
    { key: "staff_phone_number", value: "スタッフ電話番号" },
    { key: "role", value: "役職" },
  ];

  const tHeaderItems: THeaderItems = [
    "名前",
    "スタッフ電話番号",
    "役職",
    "編集",
    "勤怠時間管理",
  ];

  const nodesProps: NodesProps[] = [
    { text: "name" },
    { number: "staff_phone_number" },
    { text: "role" },
  ];

  // nodesにusersをマップして処理
  const nodes: AttendancesNodes[] =
    Array.isArray(users) && users.length > 1
      ? users.map((user: UserState) => {
          return {
            id: user.id,
            name: user.name || "",
            staff_phone_number: user?.phone_number || "",
            role: user?.role || "スタッフ",
            isAttendance: user.isAttendance,
          };
        })
      : [];

  return (
    <div>
      {uMessage && (
        <BasicAlerts
          type="success"
          message={uMessage}
          space={1}
          padding={0.6}
        />
      )}

      {uError && (
        <BasicAlerts type="error" message={uError} space={1} padding={0.6} />
      )}
      {uStatus === "loading" || !nodes ? (
        <p>loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div className="mx-4">
          <div className="flex my-4">
            <RouterButton link="/auth/staffRegister" value="ユーザー登録" />
          </div>

          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            nodesProps={nodesProps}
            tHeaderItems={tHeaderItems}
            link="/attendances"
            role={permission}
          />
        </div>
      )}
    </div>
  );
};

export default Attendances;
