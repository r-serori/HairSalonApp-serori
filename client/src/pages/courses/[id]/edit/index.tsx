import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import {
  updateCourse,
  getCourse,
} from "../../../../slices/courses/courseSlice";
import CourseForm from "../../../../components/elements/form/courses/CourseForm";
import {
  courseError,
  courseErrorStatus,
  coursesStore,
  courseStatus,
} from "../../../../hooks/selector";
import { CourseState } from "../../../../slices/courses/courseSlice";
import RouterButton from "../../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { renderError } from "../../../../api_backend/errorHandler";
import { AppDispatch } from "../../../../redux/store";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../../hooks/authSelector";
import LoadingComponent from "@/components/loading/Loading";

const CourseEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const { id } = router.query; // idを取得

  const course: CourseState = useSelector(coursesStore)?.find(
    (course: CourseState) => course.id === Number(id)
  ) || {
    id: 0,
    course_name: "",
    price: 0,
  };
  const cStatus: string = useSelector(courseStatus);
  const cError: string = useSelector(courseError);
  const cErrorStatus: number = useSelector(courseErrorStatus);

  const handleUpdate = async (formData: {
    id: number;
    course_name: string;
    price: number;
  }) => {
    try {
      const response = await dispatch(updateCourse(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/courses");
      } else {
        const re = renderError(cErrorStatus, router, dispatch);
        if (re === null) throw new Error("コースの更新に失敗しました");
      }
    } catch (error) {
      return;
    }
  };
  return (
    <div className="min-h-full ">
      {cError && (
        <BasicAlerts type="error" message={cError} space={1} padding={1} />
      )}
      {cStatus === "loading" && permission ? (
        <LoadingComponent />
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="mx-4 my-4">
            <RouterButton link={"/courses"} value="コース画面に戻る" />
          </div>

          <CourseForm node={course} createCourse={handleUpdate} edit={true} />
        </div>
      )}
    </div>
  );
};

export default CourseEdit;
