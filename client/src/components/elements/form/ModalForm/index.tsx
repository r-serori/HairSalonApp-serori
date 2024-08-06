import React, { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import PrimaryButton from "../../button/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { updateCourse } from "../../../../slices/courses/courseSlice";
import { updateOption } from "../../../../slices/options/optionSlice";
import { updateMerchandise } from "../../../../slices/merchandises/merchandiseSlice";
import { updateHairstyle } from "../../../../slices/hairstyles/hairstyleSlice";
import { updateStockCategory } from "../../../../slices/stocks/stock_categories/stock_categorySlice";
import { updateStock } from "../../../../slices/stocks/stockSlice";
import { updateCustomer } from "../../../../slices/customers/customerSlice";
import SingleCheckBox from "../../input/checkbox/SingleCheckbox";
import MultiCheckbox from "../../input/checkbox/MultiCheckbox";
import BasicTextField from "../../input/BasicTextField";
import {
  coursesStore,
  hairstylesStore,
  merchandiseStore,
  optionsStore,
  stock_categoriesStore,
} from "../../../../hooks/selector";
import { user } from "../../../../hooks/authSelector";
import BasicNumberField from "../../input/BasicNumberField";
import { CourseState } from "../../../../slices/courses/courseSlice";
import { OptionState } from "../../../../slices/options/optionSlice";
import { MerchandiseState } from "../../../../slices/merchandises/merchandiseSlice";
import { HairstyleState } from "../../../../slices/hairstyles/hairstyleSlice";
import { Stock_categoryState } from "../../../../slices/stocks/stock_categories/stock_categorySlice";
import { UserState } from "../../../../slices/auth/userSlice";
import {
  AttendanceTimeShotsNodes,
  StockNodes,
} from "../../../../types/interface";
import { Attendance_timeState } from "../../../../slices/attendance_times/attendance_timesSlice";
import { AttendancesNodes } from "../../../../types/interface";
import { CustomerNodes } from "../../../../types/interface";

interface ModalFormProps {
  type: string;
  editValue: string | number | string[] | number[] | null;
  editNode:
    | UserState
    | CourseState
    | OptionState
    | MerchandiseState
    | HairstyleState
    | AttendanceTimeShotsNodes
    | Attendance_timeState
    | AttendancesNodes
    | StockNodes
    | Stock_categoryState
    | CustomerNodes;
  NodesProp: string;
  link: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalForm: React.FC<ModalFormProps> = ({
  type,
  editValue,
  editNode,
  NodesProp,
  link,
  open,
  setOpen,
}) => {
  const [EditValue, setEditValue] = useState<any>(editValue);
  const [EditNode, setEditNode] = useState<any>(editNode);
  const [checkName, setCheckName] = React.useState<string[]>([]);

  const [isValidate, setIsValidate] = useState<boolean>(true);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (
      NodesProp === "course" ||
      NodesProp === "option" ||
      NodesProp === "merchandise" ||
      NodesProp === "hairstyle" ||
      NodesProp === "names"
    ) {
      const slicer = () => {
        const splitEditValue = EditValue.split(",\n");
        setCheckName(splitEditValue);
        return splitEditValue;
      };
      slicer();
    } else {
      return;
    }
  }, [NodesProp, EditValue]);

  const getCheckBoxCategoriesState: Stock_categoryState[] = useSelector(
    stock_categoriesStore
  );

  const getOptionCategories =
    getCheckBoxCategoriesState?.map((category) => category.category) || [];

  const getCoursesState: CourseState[] = useSelector(coursesStore);

  const getOptionsState: OptionState[] = useSelector(optionsStore);

  const getMerchandisesState: MerchandiseState[] =
    useSelector(merchandiseStore);

  const getHairstylesState: HairstyleState[] = useSelector(hairstylesStore);

  const getUsersState: UserState[] = useSelector(user);

  const changeMan = () => {
    const changeCourses_id = () => {
      const course_id = Array.isArray(getCoursesState)
        ? getCoursesState
            .filter((course) => checkName.includes(course.course_name))
            .map((course) => course.id)
        : [Object(getCoursesState).id];
      return course_id;
    };

    const defaultChangeCourses_id = () => {
      const courses = EditNode.course.split(",\n");
      const course_id = Array.isArray(getCoursesState)
        ? getCoursesState
            .filter((course) => courses.includes(course.course_name))
            .map((course) => course.id)
        : [Object(getCoursesState).id];
      return course_id;
    };

    const changeOptions_id = () => {
      const option_id = Array.isArray(getOptionsState)
        ? getOptionsState
            .filter((option) => checkName.includes(option.option_name))
            .map((option) => option.id)
        : [Object(getOptionsState).id];
      return option_id;
    };

    const defaultChangeOptions_id = () => {
      const options = EditNode.option.split(",\n");
      const option_id = Array.isArray(getOptionsState)
        ? getOptionsState
            .filter((option) => options.includes(option.option_name))
            .map((option) => option.id)
        : [Object(getOptionsState).id];
      return option_id;
    };

    const changeMerchandises_id = () => {
      const merchandise_id = Array.isArray(getMerchandisesState)
        ? getMerchandisesState
            .filter((merchandise) =>
              checkName.includes(merchandise.merchandise_name)
            )
            .map((merchandise) => merchandise.id)
        : [Object(getMerchandisesState).id];

      return merchandise_id;
    };

    const defaultChangeMerchandises_id = () => {
      const merchandises = EditNode.merchandise.split(",\n");
      const merchandise_id = Array.isArray(getMerchandisesState)
        ? getMerchandisesState
            .filter((merchandise) =>
              merchandises.includes(merchandise.merchandise_name)
            )
            .map((merchandise) => merchandise.id)
        : [Object(getMerchandisesState).id];
      return merchandise_id;
    };

    const changeHairstyles_id = () => {
      const hairstyle_id = Array.isArray(getHairstylesState)
        ? getHairstylesState
            .filter((hairstyle) => checkName.includes(hairstyle.hairstyle_name))
            .map((hairstyle) => hairstyle.id)
        : [Object(getHairstylesState).id];

      return hairstyle_id;
    };

    const defaultChangeHairstyles_id = () => {
      const hairstyles = EditNode.hairstyle.split(",\n");
      const hairstyle_id = Array.isArray(getHairstylesState)
        ? getHairstylesState
            .filter((hairstyle) =>
              hairstyles.includes(hairstyle.hairstyle_name)
            )
            .map((hairstyle) => hairstyle.id)
        : [Object(getHairstylesState).id];
      return hairstyle_id;
    };

    const changeUsers_id = () => {
      const user_id = Array.isArray(getUsersState)
        ? getUsersState
            .filter((user) => checkName.includes(user.name))
            .map((user) => user.id)
        : [Object(getUsersState).id];

      return user_id;
    };

    const defaultChangeUsers_id = () => {
      const users = EditNode.names.split(",\n");
      const user_id = Array.isArray(getUsersState)
        ? getUsersState
            .filter((user) => users.includes(user.name))
            .map((user) => user.id)
        : [Object(getUsersState).id];
      return user_id;
    };

    return {
      changeCourses_id,
      defaultChangeCourses_id,
      changeOptions_id,
      defaultChangeOptions_id,
      changeMerchandises_id,
      defaultChangeMerchandises_id,
      changeHairstyles_id,
      defaultChangeHairstyles_id,
      changeUsers_id,
      defaultChangeUsers_id,
    };
  };

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setEditValue(newValue);
  };

  const changeCategoryId = (): number | null => {
    const foundCategory = getCheckBoxCategoriesState.find(
      (category) => category.category === EditValue
    );

    const categoryId: number | null = foundCategory ? foundCategory.id : null;

    return categoryId;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isValidate === false) return;

    const updatedNode = {
      ...EditNode,
      [NodesProp]: EditValue,
    };
    try {
      switch (link) {
        case "/courses":
          const cResponse = await dispatch(updateCourse(updatedNode) as any);
          // if (cResponse.meta.requestStatus === "fulfilled") {
          //   setOpen(false);
          // }
          break;
        case "/options":
          const oResponse = await dispatch(updateOption(updatedNode) as any);
          if (oResponse.meta.requestStatus === "fulfilled") {
            setOpen(false);
          }
          break;
        case "/merchandises":
          const mResponse = await dispatch(
            updateMerchandise(updatedNode) as any
          );
          if (mResponse.meta.requestStatus === "fulfilled") {
            setOpen(false);
          }
          break;
        case "/hairstyles":
          const hResponse = await dispatch(updateHairstyle(updatedNode) as any);
          if (hResponse.meta.requestStatus === "fulfilled") {
            setOpen(false);
          }
          break;
        case "/stock_categories":
          const scResponse = await dispatch(
            updateStockCategory(updatedNode) as any
          );
          if (scResponse.meta.requestStatus === "fulfilled") {
            setOpen(false);
          }
          break;
        case "/stocks":
          if (NodesProp === "category_name") {
            const { category_name, ...newUpdatedNode } = updatedNode;
            const superUpdatedNode = {
              ...newUpdatedNode,
              stock_category_id: changeCategoryId() ? changeCategoryId() : null,
            };
            const sResponse = await dispatch(
              updateStock(superUpdatedNode) as any
            );
            if (sResponse.meta.requestStatus === "fulfilled") {
              setOpen(false);
            }
          } else {
            const objInCategoryID = getCheckBoxCategoriesState.find(
              (category) => category.category === EditNode.category_name
            );

            const categoryId: number | null = objInCategoryID
              ? objInCategoryID.id
              : null;

            const { category_name, ...newUpdatedNode } = updatedNode;
            const superUpdatedNode = {
              ...newUpdatedNode,
              stock_category_id: categoryId,
            };
            const sResponse = await dispatch(
              updateStock(superUpdatedNode) as any
            );
            if (sResponse.meta.requestStatus === "fulfilled") {
              setOpen(false);
            }
          }
          break;
        case "/customers":
          changeMan();
          if (NodesProp === "course") {
            const course_id = changeMan().changeCourses_id();
            const option_id = changeMan().defaultChangeOptions_id();
            const merchandise_id = changeMan().defaultChangeMerchandises_id();
            const hairstyle_id = changeMan().defaultChangeHairstyles_id();
            const user_id = changeMan().defaultChangeUsers_id();
            const {
              course,
              option,
              merchandise,
              hairstyle,
              user,
              ...newUpdatedNode
            } = updatedNode;
            const superUpdatedNode = {
              ...newUpdatedNode,
              course_id: course_id,
              option_id: option_id,
              merchandise_id: merchandise_id,
              hairstyle_id: hairstyle_id,
              user_id: user_id,
            };

            const response = await dispatch(
              updateCustomer(superUpdatedNode) as any
            );
            if (response.meta.requestStatus === "fulfilled") {
              setOpen(false);
            }
          } else if (NodesProp === "option") {
            const course_id = changeMan().defaultChangeCourses_id();
            const option_id = changeMan().changeOptions_id();
            const merchandise_id = changeMan().defaultChangeMerchandises_id();
            const hairstyle_id = changeMan().defaultChangeHairstyles_id();
            const user_id = changeMan().defaultChangeUsers_id();
            const {
              course,
              option,
              merchandise,
              hairstyle,
              user,
              ...newUpdatedNode
            } = updatedNode;
            const superUpdatedNode = {
              ...newUpdatedNode,
              course_id: course_id,
              option_id: option_id,
              merchandise_id: merchandise_id,
              hairstyle_id: hairstyle_id,
              user_id: user_id,
            };
            const response = await dispatch(
              updateCustomer(superUpdatedNode) as any
            );
            if (response.meta.requestStatus === "fulfilled") {
              setOpen(false);
            }
          } else if (NodesProp === "merchandise") {
            const course_id = changeMan().defaultChangeCourses_id();
            const option_id = changeMan().defaultChangeOptions_id();
            const merchandise_id = changeMan().changeMerchandises_id();
            const hairstyle_id = changeMan().defaultChangeHairstyles_id();
            const user_id = changeMan().defaultChangeUsers_id();
            const {
              course,
              option,
              merchandise,
              hairstyle,
              user,
              ...newUpdatedNode
            } = updatedNode;
            const superUpdatedNode = {
              ...newUpdatedNode,
              course_id: course_id,
              option_id: option_id,
              merchandise_id: merchandise_id,
              hairstyle_id: hairstyle_id,
              user_id: user_id,
            };
            const response = await dispatch(
              updateCustomer(superUpdatedNode) as any
            );
            if (response.meta.requestStatus === "fulfilled") {
              setOpen(false);
            }
          } else if (NodesProp === "hairstyle") {
            const course_id = changeMan().defaultChangeCourses_id();
            const option_id = changeMan().defaultChangeOptions_id();
            const merchandise_id = changeMan().defaultChangeMerchandises_id();
            const hairstyle_id = changeMan().changeHairstyles_id();
            const user_id = changeMan().defaultChangeUsers_id();
            const {
              course,
              option,
              merchandise,
              hairstyle,
              user,
              ...newUpdatedNode
            } = updatedNode;
            const superUpdatedNode = {
              ...newUpdatedNode,
              course_id: course_id,
              option_id: option_id,
              merchandise_id: merchandise_id,
              hairstyle_id: hairstyle_id,
              user_id: user_id,
            };
            const response = await dispatch(
              updateCustomer(superUpdatedNode) as any
            );
            if (response.meta.requestStatus === "fulfilled") {
              setOpen(false);
            }
          } else if (NodesProp === "names") {
            const course_id = changeMan().defaultChangeCourses_id();
            const option_id = changeMan().defaultChangeOptions_id();
            const merchandise_id = changeMan().defaultChangeMerchandises_id();
            const hairstyle_id = changeMan().defaultChangeHairstyles_id();
            const user_id = changeMan().changeUsers_id();
            const {
              course,
              option,
              merchandise,
              hairstyle,
              user,
              ...newUpdatedNode
            } = updatedNode;
            const superUpdatedNode = {
              ...newUpdatedNode,
              course_id: course_id,
              option_id: option_id,
              merchandise_id: merchandise_id,
              hairstyle_id: hairstyle_id,
              user_id: user_id,
            };
            const response = await dispatch(
              updateCustomer(superUpdatedNode) as any
            );
            if (response.meta.requestStatus === "fulfilled") {
              setOpen(false);
            }
          } else {
            const course_id = changeMan().defaultChangeCourses_id();
            const option_id = changeMan().defaultChangeOptions_id();
            const merchandise_id = changeMan().defaultChangeMerchandises_id();
            const hairstyle_id = changeMan().defaultChangeHairstyles_id();
            const user_id = changeMan().defaultChangeUsers_id();
            const {
              course,
              option,
              merchandise,
              hairstyle,
              user,
              ...newUpdatedNode
            } = updatedNode;
            const superUpdatedNode = {
              ...newUpdatedNode,
              course_id: course_id,
              option_id: option_id,
              merchandise_id: merchandise_id,
              hairstyle_id: hairstyle_id,
              user_id: user_id,
            };
            const response = await dispatch(
              updateCustomer(superUpdatedNode) as any
            );
            if (response.meta.requestStatus === "fulfilled") {
              setOpen(false);
            }
          }
          break;

        default:
          break;
      }
    } catch (error) {}
  };

  const handleCheckChange = (event: SelectChangeEvent<typeof checkName>) => {
    const {
      target: { value },
    } = event;
    setCheckName(typeof value === "string" ? value.split(",\n") : value);
    setEditNode({
      ...EditNode,
      [NodesProp]: (value as string[]).join(",\n"),
    });
  };

  const renderComponent = () => {
    switch (NodesProp) {
      case "category_name":
        return (
          <SingleCheckBox
            value={EditValue}
            nodeId={EditNode.id.toString()}
            getOptions={getOptionCategories}
            onChange={(newValue) => setEditValue(newValue)}
            required={false}
          />
        );
      case "course":
        return (
          <MultiCheckbox
            getOptions={getCoursesState}
            optionName={checkName}
            onChanger={handleCheckChange}
            nodesProp={NodesProp}
            required={false}
          />
        );
      case "option":
        return (
          <MultiCheckbox
            getOptions={getOptionsState}
            optionName={checkName}
            onChanger={handleCheckChange}
            nodesProp={NodesProp}
            required={false}
          />
        );
      case "merchandise":
        return (
          <MultiCheckbox
            getOptions={getMerchandisesState}
            optionName={checkName}
            onChanger={handleCheckChange}
            nodesProp="merchandise"
            required={false}
          />
        );
      case "hairstyle":
        return (
          <MultiCheckbox
            getOptions={getHairstylesState}
            optionName={checkName}
            onChanger={handleCheckChange}
            nodesProp="hairstyle"
            required={false}
          />
        );
      case "names":
        return (
          <MultiCheckbox
            getOptions={getUsersState}
            optionName={checkName}
            onChanger={handleCheckChange}
            nodesProp={NodesProp}
            onValidationChange={(isValid) => setIsValidate(isValid)}
            required={true}
            error={true}
          />
        );
      default:
        return (
          <BasicTextField
            id={EditNode.id.toString()}
            placeholder={EditValue === null ? "データがありません" : EditValue}
            value={EditValue}
            onChange={handleChange}
            decideLength={NodesProp === "remarks" ? 150 : 100}
            multiline={NodesProp === "remarks" ? true : false}
            rows={NodesProp === "remarks" ? 4 : 1}
            required={
              NodesProp === "remarks" || NodesProp === "supplier" ? false : true
            }
            onValidationChange={(isValid) => setIsValidate(isValid)}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-gray-300 py-4 flex">
        <input id="updateValueId" type="hidden" value={EditNode.id} />
        {type === "text" && renderComponent()}

        {type === "number" && (
          <BasicNumberField
            id={EditNode.id.toString()}
            placeholder={EditValue === null ? "データがありません" : EditValue}
            value={EditValue}
            onChange={handleChange}
            maxNumber={
              NodesProp === "phone_number" ? 999999999999999 : 4294967295
            }
            required={NodesProp === "phone_number" ? false : true}
            onValidationChange={
              NodesProp !== "phoneNumber"
                ? (isValid) => setIsValidate(isValid)
                : null
            }
            format={NodesProp === "phone_number" ? false : true}
          />
        )}

        <PrimaryButton value="更新" />
      </div>
    </form>
  );
};

export default ModalForm;
