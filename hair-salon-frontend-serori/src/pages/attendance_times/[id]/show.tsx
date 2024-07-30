import ComponentTable from "../../../components/table/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NextRouter, useRouter } from "next/router";
import {
  Attendance_timeState,
  GetAttendanceTimeState,
  selectGetAttendanceTimes,
} from "../../../store/attendance_times/attendance_timesSlice";
import EasyModal from "../../../components/modal/easy/EasyModal";
import { useState } from "react";
import BasicAlerts from "../../../components/elements/alert/BasicAlert";
import RouterButton from "../../../components/elements/button/RouterButton";
import {
  attendance_timeError,
  attendance_timeMessage,
  attendance_timesStore,
  attendance_timeStatus,
  attendance_timeErrorStatus,
} from "../../../components/Hooks/selector";
import {
  permissionStore,
  user,
  userStatus,
} from "../../../components/Hooks/authSelector";
import { ownerPermission } from "../../../components/Hooks/useMethod";
import { allLogout } from "../../../components/Hooks/useMethod";
import _ from "lodash";
import { PermissionsState } from "../../../store/auth/permissionSlice";
import { renderError } from "../../../services/errorHandler";
import { AppDispatch } from "../../../redux/store";
import { changeMessage, UserState } from "../../../store/auth/userSlice";
import {
  NodesProps,
  SearchItems,
  THeaderItems,
} from "../../../components/Hooks/interface";

const AttendanceTimes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const { id } = router.query; // idを取得

  const permission: PermissionsState = useSelector(permissionStore);

  // 初回のみデータ取得を行うためのフラグ
  const [attendanceTimeOpen, setAttendanceTimeOpen] = useState<boolean>(false);

  const users: UserState[] = useSelector(user);
  const uStatus: string = useSelector(userStatus);
  const atStatus: string = useSelector(attendance_timeStatus);

  const atMessage: string | null = useSelector(attendance_timeMessage);

  const atError: string | null = useSelector(attendance_timeError);

  const atErrorStatus: number | null = useSelector(attendance_timeErrorStatus);

  const attendanceTimes: Attendance_timeState[] = useSelector(
    attendance_timesStore
  );

  const [yearMonth, setYearMonth] = useState<string>("000111");

  const nowAttendanceTime = async () => {
    try {
      const response = await dispatch(
        selectGetAttendanceTimes({
          user_id: Number(id),
          yearMonth: "000111",
        }) as any
      );
      setYearMonth("000111");
      if (response.meta.requestStatus === "fulfilled") {
      } else {
        renderError(atErrorStatus, router, dispatch);
      }
    } catch (error) {
      console.error("Error:", error);
      allLogout(dispatch);
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        ownerPermission(permission, router);

        if (
          permission === "オーナー" ||
          permission === "マネージャー" ||
          permission === "スタッフ"
        ) {
          if (users.length === 0) {
            router.push("/attendances");
            return;
          }
          setYearMonth("000111");
          const response = await dispatch(
            selectGetAttendanceTimes({
              user_id: Number(id),
              yearMonth: yearMonth,
            }) as any
          );
          if (response.meta.requestStatus === "fulfilled") {
          } else {
            renderError(atErrorStatus, router, dispatch);
          }
        } else {
          return;
        }
      } catch (error) {
        console.error("Error:", error);
        allLogout(dispatch);
        router.push("/auth/login");
      }
    };
    if (permission) fetchData();
  }, [dispatch, permission]);

  const searchItems: SearchItems = [
    { key: "start_time", value: "出勤時間" },
    { key: "end_time", value: "退勤時間" },
  ];

  const tHeaderItems: THeaderItems = [
    "出勤時間",
    "出勤画像",
    "退勤時間",
    "退勤画像",
    "出勤時間と写真を編集",
    "退勤時間と写真を編集",
    "削除",
  ];

  const nodesProps: NodesProps[] = [
    { text: "start_time" },
    { text: "start_photo_path" },
    { text: "end_time" },
    { text: "end_photo_path" },
  ];

  const nodes: Attendance_timeState[] = attendanceTimes;

  return (
    <div>
      <div>
        {atMessage && (
          <BasicAlerts
            type="info"
            message={atMessage}
            space={1}
            padding={0.6}
          />
        )}
        {atError && (
          <BasicAlerts type="error" message={atError} space={1} padding={0.6} />
        )}
      </div>
      {atStatus === "loading" || uStatus === "loading" || !nodes ? (
        <p>loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="flex justify-between my-4 mx-4">
            <div>
              <RouterButton link="/attendances" value="スタッフ画面へ戻る" />
            </div>
            <div>
              {yearMonth !== "000111" && (
                <button
                  className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-md text-bold px-4 py-2 text-center "
                  onClick={() => {
                    nowAttendanceTime();
                  }}
                >
                  現在の年月に戻す
                </button>
              )}
            </div>
            {yearMonth === "000111" && (
              <div>
                <EasyModal
                  open={attendanceTimeOpen}
                  setOpen={setAttendanceTimeOpen}
                  whoAreYou="attendanceTimes"
                  whatIsYourId={Number(id)}
                  yearMonth={yearMonth}
                  setYearMonth={setYearMonth}
                />
              </div>
            )}
          </div>

          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            nodesProps={nodesProps}
            tHeaderItems={tHeaderItems}
            link="/attendance_times"
            role={permission}
          />
        </div>
      )}
    </div>
  );
};

export default AttendanceTimes;
