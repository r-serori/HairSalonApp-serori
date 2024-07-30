import React, { useState } from "react";
import PrimaryButton from "../../button/PrimaryButton";
import { CourseState } from "../../../../slices/courses/courseSlice";
import BasicTextField from "../../input/BasicTextField";
import BasicNumberField from "../../input/BasicNumberField";

interface CourseFormProps {
  node?: CourseState;
  createCourse: (formData: CourseState) => void;
  edit?: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({
  node,
  createCourse,
  edit,
}) => {
  const [course_name, setCourse_name] = useState<string>(
    node?.course_name || ""
  );
  const [price, setPrice] = useState<number>(node?.price || 0);

  const [courseNameValidate, setCourseNameValidate] = useState<boolean>(
    node?.course_name ? true : false
  );
  const [priceValidate, setPriceValidate] = useState<boolean>(
    node?.price ? true : false
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!courseNameValidate || !priceValidate) {
      return;
    }

    createCourse({
      id: node?.id || 0,
      course_name: course_name,
      price: price,
    });
  };

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="max-w-md w-full ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {edit ? "コース情報編集" : "コース情報新規作成"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 ">
          <BasicTextField
            id={node ? node.id : 0}
            placeholder="コース名"
            value={course_name}
            onChange={(e) => setCourse_name(e.target.value)}
            onValidationChange={(isValid) => setCourseNameValidate(isValid)}
          />

          <BasicNumberField
            id={node ? node.id : 0}
            placeholder="価格"
            value={String(price)}
            onChange={(e) => setPrice(Number(e.target.value))}
            onValidationChange={(isValid) => setPriceValidate(isValid)}
            format={true}
          />

          <PrimaryButton value={"コース新規作成"} />
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
