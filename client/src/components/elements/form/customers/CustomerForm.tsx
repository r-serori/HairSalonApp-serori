import React, { useEffect, useState } from "react";
import BasicTextField from "../../input/BasicTextField";
import SingleCheckBox from "../../input/checkbox/SingleCheckbox";
import MultiCheckbox from "../../input/checkbox/MultiCheckbox";
import PrimaryButton from "../../button/PrimaryButton";
import { useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material";
import { CustomerState } from "../../../../slices/customers/customerSlice";
import {
  courseError,
  coursesStore,
  hairstylesStore,
  merchandiseStore,
  optionsStore,
} from "../../../../hooks/selector";
import { user } from "../../../../hooks/authSelector";
import BasicNumberField from "../../input/BasicNumberField";
import { CourseState } from "../../../../slices/courses/courseSlice";
import { OptionState } from "../../../../slices/options/optionSlice";
import { MerchandiseState } from "../../../../slices/merchandises/merchandiseSlice";
import { HairstyleState } from "../../../../slices/hairstyles/hairstyleSlice";
import { UserState } from "../../../../slices/auth/userSlice";

interface CustomerFormProps {
  node?: CustomerState;
  onSubmit: (formData: CustomerState) => void;
  edit?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  node = null,
  onSubmit,
  edit,
}) => {
  const getCoursesState: CourseState[] = useSelector(coursesStore);

  const getOptionsState: OptionState[] = useSelector(optionsStore);

  const getMerchandisesState: MerchandiseState[] =
    useSelector(merchandiseStore);

  const getHairstylesState: HairstyleState[] = useSelector(hairstylesStore);

  const getUsersState: UserState[] = useSelector(user);

  const [customer_name, setCustomer_Name] = useState<string>(
    node?.customer_name || ""
  );

  const [phone_number, setPhoneNumber] = useState<string>(
    node?.phone_number || ""
  );

  const [remarks, setRemarks] = useState<string>(node?.remarks || "");

  const [courses, setCourses] = useState<string[]>(
    node?.course_id && Array.isArray(node.course_id)
      ? getCoursesState
          .filter(
            (course) => node.course_id && node.course_id.includes(course.id)
          )
          .map((course) => course.course_name)
      : []
  );
  const [options, setOptions] = useState<string[]>(
    node?.option_id && Array.isArray(node.option_id)
      ? getOptionsState
          .filter(
            (option) => node.option_id && node.option_id.includes(option.id)
          )
          .map((option) => option.option_name)
      : []
  );
  const [merchandises, setMerchandises] = useState<string[]>(
    node?.merchandise_id && Array.isArray(node.merchandise_id)
      ? getMerchandisesState
          .filter(
            (merchandise) =>
              node.merchandise_id &&
              node.merchandise_id.includes(merchandise.id)
          )
          .map((merchandise) => merchandise.merchandise_name)
      : []
  );
  const [hairstyles, setHairstyles] = useState<string[]>(
    node?.hairstyle_id && Array.isArray(node.hairstyle_id)
      ? getHairstylesState
          .filter(
            (hairstyle) =>
              node.hairstyle_id && node.hairstyle_id.includes(hairstyle.id)
          )
          .map((hairstyle) => hairstyle.hairstyle_name)
      : []
  );
  const [users, setUsers] = useState<string[]>(
    node === null && getUsersState.length > 1
      ? []
      : (node !== null && node.user_id !== null && getUsersState.length > 1) ||
        (Array.isArray(getUsersState) &&
          getUsersState.length > 1 &&
          node !== null &&
          node.user_id !== null)
      ? getUsersState
          .filter((user) => node.user_id && node.user_id.includes(user.id))
          .map((user) => user.name) || []
      : Object(getUsersState).name
  );

  const [customerNameValidate, setCustomerNameValidate] = useState<boolean>(
    node?.customer_name ? true : false
  );
  const [usersValidate, setUsersValidate] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerNameValidate || !usersValidate) {
      return;
    }

    onSubmit({
      id: node?.id || 0,
      customer_name: customer_name,
      phone_number: phone_number,
      remarks: remarks,
      course_id: Array.isArray(getCoursesState)
        ? getCoursesState
            .filter((course) => courses.includes(course.course_name))
            .map((course) => course.id)
        : [Object(getCoursesState).id],
      option_id: Array.isArray(getOptionsState)
        ? getOptionsState
            .filter((option) => options.includes(option.option_name))
            .map((option) => option.id)
        : [Object(getOptionsState).id],
      merchandise_id: Array.isArray(getMerchandisesState)
        ? getMerchandisesState
            .filter((merchandise) =>
              merchandises.includes(merchandise.merchandise_name)
            )
            .map((merchandise) => merchandise.id)
        : [Object(getMerchandisesState).id],
      hairstyle_id: Array.isArray(getHairstylesState)
        ? getHairstylesState
            .filter((hairstyle) =>
              hairstyles.includes(hairstyle.hairstyle_name)
            )
            .map((hairstyle) => hairstyle.id)
        : [Object(getHairstylesState).id],
      user_id: Array.isArray(getUsersState)
        ? getUsersState
            .filter((user) => users.includes(user.name))
            .map((user) => user.id)
        : [Object(getUsersState).id],
    });
  };

  const handleCourseChange = (event: SelectChangeEvent<string[]>) => {
    setCourses(event.target.value as string[]);
  };

  const handleOptionChange = (event: SelectChangeEvent<string[]>) => {
    setOptions(event.target.value as string[]);
  };

  const handleMerchandiseChange = (event: SelectChangeEvent<string[]>) => {
    setMerchandises(event.target.value as string[]);
  };

  const handleHairstyleChange = (event: SelectChangeEvent<string[]>) => {
    setHairstyles(event.target.value as string[]);
  };

  const handleUserChange = (event: SelectChangeEvent<string[]>) => {
    setUsers(event.target.value as string[]);
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="max-w-3xl w-full ">
        <div>
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            {edit ? "顧客情報編集" : "顧客情報新規作成"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <BasicTextField
            id={0}
            placeholder="顧客名"
            value={customer_name}
            onChange={(e) => setCustomer_Name(e.target.value)}
            onValidationChange={(isValid) => setCustomerNameValidate(isValid)}
          />
          <BasicNumberField
            id={1}
            placeholder="電話番号"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            maxNumber={999999999999999}
            required={false}
            format={false}
          />
          <BasicTextField
            id={3}
            placeholder="備考"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            multiline={true}
            rows={4}
            decideLength={150}
            required={false}
          />

          <MultiCheckbox
            getOptions={getCoursesState}
            optionName={courses}
            nodesProp="course"
            onChanger={handleCourseChange}
            required={false}
          />
          <MultiCheckbox
            getOptions={getOptionsState}
            optionName={options}
            nodesProp="option"
            onChanger={handleOptionChange}
            required={false}
          />
          <MultiCheckbox
            getOptions={getMerchandisesState}
            optionName={merchandises}
            nodesProp="merchandise"
            onChanger={handleMerchandiseChange}
            required={false}
          />
          <MultiCheckbox
            getOptions={getHairstylesState}
            optionName={hairstyles}
            nodesProp="hairstyle"
            onChanger={handleHairstyleChange}
            required={false}
          />
          <MultiCheckbox
            getOptions={getUsersState}
            optionName={users}
            nodesProp="names"
            onChanger={handleUserChange}
            onValidationChange={(isValid) => setUsersValidate(isValid)}
            required={true}
            error={true}
          />
          <PrimaryButton value={"作成"} />
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
