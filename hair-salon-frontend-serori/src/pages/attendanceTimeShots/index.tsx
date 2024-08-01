import ComponentTable from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import { getUsers } from "../../slices/auth/userSlice";
import { useRouter, NextRouter } from "next/router";
import {
  user,
  userError,
  userErrorStatus,
  userMessage,
  userStatus,
} from "../../hooks/authSelector";
import {
  attendance_timeError,
  attendance_timeStatus,
} from "../../hooks/selector";
import { permissionStore } from "../../hooks/authSelector";
import { staffPermission } from "../../hooks/useMethod";
import _ from "lodash";
import { allLogout } from "../../hooks/useMethod";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { UserState } from "../../slices/auth/userSlice";
import { renderError } from "../../pages/api_backend/errorHandler";
import { AppDispatch } from "../../redux/store";
import {
  AttendanceTimeShotsNodes,
  NodesProps,
  SearchItems,
  THeaderItems,
} from "../../types/interface";

const AttendanceTimeShots = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const users: UserState[] = useSelector(user);
  const uStatus: string = useSelector(userStatus);
  const uMessage: string | null = useSelector(userMessage);
  const uError: string | null = useSelector(userError);
  const uErrorStatus: number = useSelector(userErrorStatus);

  const atStatus: string = useSelector(attendance_timeStatus);
  const atimeError: string | null = useSelector(attendance_timeError);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    const getStaffs = async () => {
      const response = await dispatch(getUsers() as any);
      localStorage.setItem("userCount", response.payload.userCount);
      return response;
    };

    const fetchData = async () => {
      try {
        staffPermission(permission, router);

        const userCount: string | null = localStorage.getItem("userCount");
        if (
          userCount === null ||
          (Array.isArray(users) && users.length < Number(userCount))
        ) {
          const response = await getStaffs();
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

  const searchItems: SearchItems = [{ key: "shotUserName", value: "名前" }];

  const tHeaderItems: THeaderItems = ["名前", "勤務中？", "出勤", "退勤"];

  const nodesProps: NodesProps[] = [
    { text: "shotUserName" },
    { text: "attendanceNow" },
  ];

  const nodes: AttendanceTimeShotsNodes[] = Array.isArray(users)
    ? users?.map((user) => {
        return {
          id: user.id,
          shotUserName: user.name,
          attendanceNow: user.isAttendance ? "勤務中" : "退勤中",
          isAttendance: user.isAttendance,
        };
      }) || []
    : [];

  return (
    <div>
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
          <BasicAlerts message={uError} type={"error"} padding={1} space={1} />
        )}
        {atimeError && (
          <BasicAlerts
            type="error"
            message={atimeError}
            space={1}
            padding={0.6}
          />
        )}
      </div>
      <div className="my-4 mx-4">
        {uStatus === "loading" || atStatus === "loading" || !nodes ? (
          <p>Loading...</p>
        ) : permission === null ? (
          <p>あなたに権限はありません。</p>
        ) : (
          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            tHeaderItems={tHeaderItems}
            nodesProps={nodesProps}
            link="/attendanceTimeShots"
            role={permission}
          />
        )}
      </div>
    </div>
  );
};

export default AttendanceTimeShots;
