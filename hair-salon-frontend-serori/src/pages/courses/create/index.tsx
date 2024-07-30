import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../../store/courses/courseSlice";
import CourseForm from "../../../components/elements/form/courses/CourseForm";
import { useRouter, NextRouter } from "next/router";
import RouterButton from "../../../components/elements/button/RouterButton";
import {
  courseError,
  courseErrorStatus,
  courseStatus,
} from "../../../components/Hooks/selector";
import BasicAlerts from "../../../components/elements/alert/BasicAlert";
import { renderError } from "../../../services/errorHandler";
import { AppDispatch } from "../../../redux/store";
import { PermissionsState } from "../../../store/auth/permissionSlice";
import { permissionStore } from "../../../components/Hooks/authSelector";

const CourseCreate: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const cStatus: string = useSelector(courseStatus);
  const cError: string = useSelector(courseError);
  const cErrorStatus: number = useSelector(courseErrorStatus);

  const handleCreate = async (formData: {
    id: number;
    course_name: string;
    price: number;
  }) => {
    try {
      const response = await dispatch(createCourse(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/courses");
      } else {
        const re = renderError(cErrorStatus, router, dispatch);
        if (re === null) throw new Error("コースの作成に失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-full">
      {cError && (
        <BasicAlerts type="error" message={cError} space={1} padding={1} />
      )}
      {cStatus === "loading" ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="mx-4 mt-4">
            <RouterButton link="/courses" value="コース画面へ戻る" />
          </div>

          <CourseForm createCourse={handleCreate} />
        </div>
      )}
    </div>
  );
};

export default CourseCreate;
