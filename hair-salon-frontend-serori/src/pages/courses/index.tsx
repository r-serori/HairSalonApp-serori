import ComponentTable from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CourseState, getCourse } from "../../slices/courses/courseSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import { useRouter, NextRouter } from "next/router";
import { permissionStore } from "../../hooks/authSelector";
import RouterButton from "../../components/elements/button/RouterButton";
import {
  courseError,
  courseErrorStatus,
  courseMessage,
  courseStatus,
  coursesStore,
} from "../../hooks/selector";
import { allLogout, staffPermission } from "../../hooks/useMethod";
import _ from "lodash";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { renderError } from "../../pages/api/errorHandler";
import { AppDispatch } from "../../redux/store";
import { NodesProps, SearchItems, THeaderItems } from "../../types/interface";

const Courses: React.FC = () => {
  const [tHeaderItems, setTHeaderItems] = useState<THeaderItems>([]);

  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const courses: CourseState[] = useSelector(coursesStore);
  const cStatus: string = useSelector(courseStatus);
  const cMessage: string | null = useSelector(courseMessage);
  const cError: string | null = useSelector(courseError);
  const cErrorStatus: number = useSelector(courseErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        staffPermission(permission, router);

        switch (permission) {
          case "オーナー":
            setTHeaderItems(["コース名", "価格", "編集", "削除"]);
            break;
          case "マネージャー":
            setTHeaderItems(["コース名", "価格", "編集"]);
            break;
          default:
            setTHeaderItems(["コース名", "価格"]);
            break;
        }

        if (
          _.isEmpty(courses) &&
          (permission === "オーナー" ||
            permission === "マネージャー" ||
            permission === "スタッフ")
        ) {
          const response = await dispatch(getCourse() as any);
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(cErrorStatus, router, dispatch);
            if (re === null) throw new Error("コースの取得に失敗しました");
          }
        } else {
          return;
        }
      } catch (error) {
        allLogout(dispatch);
        router.push("/auth/login");
      }
    };
    if (permission) fetchData(); // useEffect内で関数を呼び出す
  }, [dispatch, permission]); // useEffectの依存リストを指定

  const searchItems: SearchItems = [
    { key: "course_name", value: "コース名" },
    { key: "price", value: "価格" },
  ];

  const nodesProps: NodesProps[] = [
    { text: "course_name" },
    { number: "price" },
  ];

  const nodes: CourseState[] = courses;

  return (
    <div>
      {cMessage && (
        <BasicAlerts
          type="success"
          message={cMessage}
          space={1}
          padding={0.6}
        />
      )}

      {cError && (
        <BasicAlerts type="error" message={cError} space={1} padding={0.6} />
      )}
      {cStatus === "loading" || !nodes ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div className="mx-4">
          <div className="my-4">
            <RouterButton link="/courses/create" value="コース新規作成" />
          </div>

          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            nodesProps={nodesProps}
            tHeaderItems={tHeaderItems}
            link="/courses"
            role={permission}
          />
        </div>
      )}
    </div>
  );
};

export default Courses;
