import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  createSchedule,
  createCustomerAndSchedule,
  updateSchedule,
  updateCustomerAndSchedule,
  updateCustomerAndScheduleCreate,
  RequestScheduleState,
  createCustomerAndUpdateSchedule,
} from "../../slices/schedules/scheduleSlice";
import { useSelector, useDispatch } from "react-redux";
import SingleCheckBox from "../elements/input/checkbox/SingleCheckbox";
import MultiCheckbox from "../elements/input/checkbox/MultiCheckbox";
import BasicTextField from "../elements/input/BasicTextField";
import PrimaryButton from "../elements/button/PrimaryButton";
import DeleteMan from "../deleteMan/[id]";
import BackAgainButton from "../elements/button/RouterButton";
import ControlledCheckbox from "../elements/input/checkbox/SimpleCheckBox";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useRouter, NextRouter } from "next/router";
import DateTimeRangePicker from "../elements/input/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { v4 as uuidv4 } from "uuid";
import { permissionStore, user } from "../../hooks/authSelector";
import { CourseState } from "../../slices/courses/courseSlice";
import { OptionState } from "../../slices/options/optionSlice";
import { MerchandiseState } from "../../slices/merchandises/merchandiseSlice";
import { HairstyleState } from "../../slices/hairstyles/hairstyleSlice";
import BasicNumberField from "../elements/input/BasicNumberField";
import { UserState } from "../../slices/auth/userSlice";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../api_backend/errorHandler";
import { scheduleError, scheduleErrorStatus } from "../../hooks/selector";
import { ScheduleModalNodes } from "../../types/interface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90vh", // ブラウザの高さの80%に設定
  overflowY: "auto", // 縦方向のスクロールを可能にする
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ScheduleModalProps {
  showModal: boolean;
  selectedEvent: any;
  whoIsEvent: "編集" | "クリック" | "選択" | "";
  setWhoIsEvent: (value: "編集" | "クリック" | "選択" | "") => void;
  setShowModal: (value: boolean) => void;
  setSelectedEvent: (value: any) => void;
  isCustomerProp: boolean;
  nodes: ScheduleModalNodes[];
  users: UserState[];
  courses: CourseState[];
  options: OptionState[];
  merchandises: MerchandiseState[];
  hairstyles: HairstyleState[];
  customerNames: string[];
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  showModal,
  selectedEvent,
  whoIsEvent,
  setWhoIsEvent,
  setShowModal,
  setSelectedEvent,
  isCustomerProp,
  nodes,
  users,
  courses,
  options,
  merchandises,
  hairstyles,
  customerNames,
}) => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const cError: string = useSelector(scheduleError);
  const sErrorStatus: number = useSelector(scheduleErrorStatus);

  const uniqueId = uuidv4();
  const permission = useSelector(permissionStore);

  const [isCustomer, setIsCustomer] = useState<boolean>(
    whoIsEvent === "編集"
      ? selectedEvent.extendedProps.isCustomer
      : isCustomerProp
  );

  //新規予約の場合、初期値として最初の顧客情報を取得
  const initialCustomer = isCustomer && nodes[0] ? nodes[0] : null;

  const [newReservation, setNewReservation] = useState<boolean>(
    whoIsEvent !== "編集" ? true : whoIsEvent === "編集" ? false : true
  );

  //trueは新規顧客、falseは既存顧客 顧客予約の場合はfalse　最初は既存顧客を表示
  const [newCustomer, setNewCustomer] = useState<boolean>(
    whoIsEvent === "編集" && isCustomer
      ? false
      : isCustomer && whoIsEvent !== "編集"
      ? true
      : false
  );

  // 既存顧客で新規予約の場合、初期値として最初の顧客情報を取得
  const [customerId, setCustomerId] = useState<number>(
    initialCustomer === null && newCustomer
      ? 0
      : whoIsEvent == "編集" && isCustomer
      ? selectedEvent.extendedProps.customer_id
      : !newCustomer && isCustomer && initialCustomer !== null
      ? initialCustomer?.id || 0
      : 0
  );

  const [customerName, setCustomerName] = useState<string>(
    //新規顧客、新規予約の場合は初期値としてnode[0]の顧客名を設定
    initialCustomer === null && newCustomer
      ? ""
      : whoIsEvent === "編集" && isCustomer
      ? selectedEvent.title
      : !newCustomer && isCustomer && initialCustomer !== null
      ? initialCustomer?.customer_name || ""
      : ""
  );

  const [phone_number, setPhoneNumber] = useState<string>(
    initialCustomer === null && newCustomer
      ? ""
      : whoIsEvent === "編集" && isCustomer
      ? selectedEvent.extendedProps.phone_number
      : !newCustomer && isCustomer && initialCustomer !== null
      ? initialCustomer?.phone_number || ""
      : ""
  );

  const [remarks, setRemarks] = useState<string>(
    initialCustomer === null && newCustomer
      ? ""
      : whoIsEvent === "編集" && isCustomer
      ? selectedEvent.extendedProps.remarks
      : !newCustomer && isCustomer && initialCustomer !== null
      ? initialCustomer?.remarks || ""
      : ""
  );

  const [courseNames, setCourseNames] = useState(
    initialCustomer === null && newCustomer
      ? []
      : whoIsEvent === "編集" && isCustomer
      ? selectedEvent.extendedProps.course
      : !newCustomer && isCustomer && initialCustomer !== null
      ? initialCustomer?.course || []
      : []
  );

  const [optionNames, setOptionNames] = useState(
    initialCustomer === null && newCustomer
      ? []
      : whoIsEvent === "編集" && isCustomer
      ? selectedEvent.extendedProps.option
      : !newCustomer && isCustomer && initialCustomer !== null
      ? initialCustomer?.option || []
      : []
  );

  const [merchandiseNames, setMerchandiseNames] = useState(
    initialCustomer === null && newCustomer
      ? []
      : whoIsEvent === "編集" && isCustomer
      ? selectedEvent.extendedProps.merchandise
      : !newCustomer && isCustomer && initialCustomer !== null
      ? initialCustomer?.merchandise || []
      : []
  );

  const [hairstyleNames, setHairstyleNames] = useState(
    initialCustomer === null && newCustomer
      ? []
      : whoIsEvent === "編集" && isCustomer
      ? selectedEvent.extendedProps.hairstyle
      : !newCustomer && isCustomer && initialCustomer !== null
      ? initialCustomer?.hairstyle || []
      : []
  );

  const [userNames, setUserNames] = useState<string[]>(
    initialCustomer === null &&
      newCustomer &&
      Array.isArray(users) &&
      users.length === 0
      ? []
      : initialCustomer === null &&
        newCustomer &&
        Array.isArray(users) &&
        users.length > 1
      ? [users[0].name]
      : newCustomer && !Array.isArray(users) && Object(users)
      ? [Object(users).name]
      : newCustomer && Array.isArray(users) && users.length === 1
      ? [users[0].name]
      : !newCustomer && Array.isArray(users) && users.length === 0
      ? []
      : !newCustomer && !Array.isArray(users) && Object(users)
      ? [Object(users).name]
      : !newCustomer && Array.isArray(users) && users.length === 1
      ? [users[0].name]
      : !newCustomer &&
        isCustomer &&
        Array.isArray(users) &&
        users.length > 1 &&
        whoIsEvent === "編集"
      ? selectedEvent.extendedProps.names
      : isCustomer &&
        Array.isArray(users) &&
        users.length > 1 &&
        initialCustomer !== null
      ? initialCustomer?.names || []
      : []
  );

  const [customerNameValidate, setCustomerNameValidate] = useState<boolean>(
    isCustomer ? true : false
  );

  const [usernameValidate, setUsernameValidate] = useState<boolean>(true);

  //編集時に選択したイベントのIDを取得  新規予約の場合は0 scheduleテーブルのID
  const [Sid, setSid] = useState<number>(
    whoIsEvent === "編集" ? selectedEvent.id : 0
  );

  //終日予約か時間指定予約かを判定
  const [allDay, setAllDay] = useState<boolean>(
    selectedEvent.allDay ? true : false
  );

  //顧客以外の予約の場合、タイトルを設定
  const [title, setTitle] = useState<string>(
    !isCustomer && !newReservation ? selectedEvent.title : ""
  );

  //開始時間を設定
  const [startTime, setStartTime] = useState<Dayjs | null>(
    allDay && whoIsEvent === "クリック"
      ? dayjs(selectedEvent.dateStr).utc().tz("Asia/Tokyo")
      : !allDay && whoIsEvent === "クリック"
      ? dayjs(selectedEvent.date).utc().tz("Asia/Tokyo")
      : dayjs(selectedEvent.startStr).utc().tz("Asia/Tokyo")
  );
  //終了時間を設定
  const [endTime, setEndTime] = useState<Dayjs | null>(
    allDay && whoIsEvent === "クリック"
      ? dayjs(selectedEvent.dateStr).add(1, "day").utc().tz("Asia/Tokyo")
      : !allDay && whoIsEvent === "クリック"
      ? dayjs(selectedEvent.date).add(15, "minute").utc().tz("Asia/Tokyo")
      : dayjs(selectedEvent.endStr).utc().tz("Asia/Tokyo")
  );

  const [titleValidate, setTitleValidate] = useState<boolean>(
    whoIsEvent === "編集" && !isCustomer && selectedEvent.title ? true : false
  );

  const [startTimeValidate, setStartTimeValidate] = useState<boolean>(true);

  const [endTimeValidate, setEndTimeValidate] = useState<boolean>(true);

  const changeCustomerState = (newValue: string | null) => {
    //編集時に選択した顧客情報を取得
    if (newValue === null) return;
    if (!nodes) return;
    const useCustomerState = nodes.find(
      (node: ScheduleModalNodes) => node.customer_name === newValue
    );

    if (!isCustomer) {
      setIsCustomer(false);
      setTitle(newValue);
      setTitleValidate(true);
      setNewReservation(false);
      return;
    }

    // useCustomerStateが存在する場合、顧客情報を設定
    setIsCustomer(true);
    setCustomerId(useCustomerState?.id || 0);
    setCustomerName(newValue);
    setCustomerNameValidate(true);
    setPhoneNumber(useCustomerState?.phone_number || "");
    setRemarks(useCustomerState?.remarks || "");
    setCourseNames(useCustomerState?.course || []);
    setOptionNames(useCustomerState?.option || []);
    setMerchandiseNames(useCustomerState?.merchandise || []);
    setHairstyleNames(useCustomerState?.hairstyle || []);
    setUserNames(useCustomerState?.names || []);
    setUsernameValidate(true);
  };

  //顧客情報をクリアする関数
  const clearStates = () => {
    setCustomerId(0);
    setCustomerName("");
    setPhoneNumber("");
    setRemarks("");
    setCourseNames([]);
    setOptionNames([]);
    setMerchandiseNames([]);
    setHairstyleNames([]);
    setUserNames(userNames || []);
  };

  //MultiCheckboxを使用する際の配列の値を変更していってくれる関数。
  //MultiCheckboxでは、選択した値を配列に格納していくため、
  const handleCourseChange = (event: SelectChangeEvent<string[]>) => {
    setCourseNames(event.target.value as string[]);
  };

  const handleOptionChange = (event: SelectChangeEvent<string[]>) => {
    setOptionNames(event.target.value as string[]);
  };

  const handleMerchandiseChange = (event: SelectChangeEvent<string[]>) => {
    setMerchandiseNames(event.target.value as string[]);
  };

  const handleHairstyleChange = (event: SelectChangeEvent<string[]>) => {
    setHairstyleNames(event.target.value as string[]);
  };

  const handleUserChange = (event: SelectChangeEvent<string[]>) => {
    setUserNames(event.target.value as string[]);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const customerAndScheduleCreate = async (
    scheduleAndCustomerFormData: RequestScheduleState
  ) => {
    try {
      if (
        //新規予約、新規顧客、タイトルなし
        newCustomer &&
        newReservation &&
        !title
      ) {
        const response = await dispatch(
          createCustomerAndSchedule(scheduleAndCustomerFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          handleClose();
        } else {
          const re = renderError(sErrorStatus, router, dispatch);
          if (re === null) throw new Error("予約処理に失敗しました");
        }
      } else if (
        //新規予約、既存顧客、タイトルなし
        !newCustomer &&
        newReservation &&
        !title
      ) {
        const response = await dispatch(
          updateCustomerAndScheduleCreate(scheduleAndCustomerFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          handleClose();
        } else {
          const re = renderError(sErrorStatus, router, dispatch);
          if (re === null) throw new Error("予約処理に失敗しました");
        }
      } else if (
        //予約編集、既存顧客、タイトルなし
        !newCustomer &&
        !newReservation &&
        !title
      ) {
        const response = await dispatch(
          updateCustomerAndSchedule(scheduleAndCustomerFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          handleClose();
        } else {
          const re = renderError(sErrorStatus, router, dispatch);
          if (re === null) throw new Error("予約処理に失敗しました");
        }
      } else if (
        //新規予約、顧客以外、タイトルあり
        !isCustomer &&
        newReservation &&
        title
      ) {
        const response = await dispatch(
          createSchedule(scheduleAndCustomerFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          handleClose();
        } else {
          const re = renderError(sErrorStatus, router, dispatch);
          if (re === null) throw new Error("予約処理に失敗しました");
        }
      } else if (
        //予約編集、顧客以外、タイトルあり,編集
        !isCustomer &&
        !newReservation &&
        title
      ) {
        const response = await dispatch(
          updateSchedule(scheduleAndCustomerFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          handleClose();
        } else {
          const re = renderError(sErrorStatus, router, dispatch);
          if (re === null) throw new Error("予約処理に失敗しました");
        }
      } else if (isCustomer && !newReservation && !title) {
        const response = await dispatch(
          createCustomerAndUpdateSchedule(scheduleAndCustomerFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          handleClose();
        } else {
          const re = renderError(sErrorStatus, router, dispatch);
          if (re === null) throw new Error("予約処理に失敗しました");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isCustomer &&
      (!customerNameValidate ||
        !usernameValidate ||
        !startTimeValidate ||
        !endTimeValidate)
    ) {
      return;
    } else if (
      !isCustomer &&
      (!titleValidate || !startTimeValidate || !endTimeValidate)
    ) {
      return;
    }

    customerAndScheduleCreate({
      id: Sid ? Sid : 0,
      customer_id: !newCustomer ? customerId : 0,
      customer_name: customerName,
      phone_number: phone_number || null,
      remarks: remarks || null,
      course_id:
        courses
          ?.filter((course) => courseNames.includes(course.course_name))
          .map((course) => course.id) || [],
      option_id: options
        .filter((option) => optionNames.includes(option.option_name))
        .map((option) => option.id),
      merchandise_id:
        merchandises
          ?.filter((merchandise) =>
            merchandiseNames.includes(merchandise.merchandise_name)
          )
          .map((merchandise) => merchandise.id) || [],
      hairstyle_id:
        hairstyles
          ?.filter((hairstyle) =>
            hairstyleNames.includes(hairstyle.hairstyle_name)
          )
          .map((hairstyle) => hairstyle.id) || [],
      user_id: Array.isArray(users)
        ? users
            .filter((user) => userNames.includes(user.name))
            .map((user) => user.id)
        : [Object(users).id],

      title: title ? title : null,
      start_time: dayjs(startTime)
        .utc()
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD hh:mm:ss"),
      end_time: dayjs(endTime)
        .utc()
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD hh:mm:ss"),
      allDay: allDay,
    });
  };

  const BackAgain = () => {
    setWhoIsEvent("");
    setIsCustomer(true);
    setNewCustomer(false);
    setCustomerId(0);
    setCustomerName("");
    setPhoneNumber("");
    setRemarks("");
    setCourseNames([]);
    setOptionNames([]);
    setMerchandiseNames([]);
    setHairstyleNames([]);
    setUserNames([]);
    setAllDay(false);
    setTitle("");
    setStartTime(null);
    setEndTime(null);
    setNewReservation(false);
    setShowModal(false);
    setSelectedEvent(null);
  };

  const startTimeChange = (e: Dayjs | null) => {
    if (e === null) {
      return;
    } else {
      setStartTime(dayjs(e).utc().tz("Asia/Tokyo"));
    }
  };

  const endTimeChange = (e: Dayjs | null) => {
    if (e === null) {
      return;
    } else {
      setEndTime(dayjs(e).utc().tz("Asia/Tokyo"));
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="text-xl text-gray-900 cursor-pointer hover:bg-gray-400 
        hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      ></Button>

      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl">
          {whoIsEvent === "編集" ? (
            <div className="flex justify-between items-center ml-2">
              {(permission === "オーナー" || permission === "マネージャー") && (
                <DeleteMan id={Sid} link={"/schedules"} />
              )}
              <button
                onClick={BackAgain}
                className="md:w-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-md px-4 py-2 text-center cursor-pointer mr-2 font-bold"
              >
                戻る
              </button>
            </div>
          ) : (
            <div className="flex justify-end ">
              <BackAgainButton onChanger={BackAgain} />
            </div>
          )}

          {/* モーダルのタイトル */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <>
              <div className="flex justify-center items-center  text-4xl">
                予約内容
              </div>

              <form onSubmit={handleSubmit}>
                <div className="pt-6 flex justify-center items-center ml-4 mr-4 text-3xl">
                  <h2>{allDay ? "終日" : "時間指定"}</h2>
                </div>

                <div className="flex justify-center items-center  gap-4">
                  <div className="flex justify-center items-center pt-6">
                    <span className="mr-2 text-right">開始時間:</span>
                    <DateTimeRangePicker
                      value={startTime}
                      changer={startTimeChange}
                      isAllDay={allDay ? true : false}
                      role={permission}
                      onValidateChange={(newValue) =>
                        setStartTimeValidate(newValue)
                      }
                    />
                  </div>
                  <div className="flex justify-center items-center pt-6 ">
                    <span className=" text-right mr-2">終了時間:</span>
                    <DateTimeRangePicker
                      value={endTime}
                      changer={endTimeChange}
                      isAllDay={allDay ? true : false}
                      role={permission}
                      onValidateChange={(newValue) =>
                        setEndTimeValidate(newValue)
                      }
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-center items-center ml-4 mr-4 ">
                  <div className="flex justify-center items-center ">
                    {whoIsEvent === "編集" && (
                      <div
                        className={`flex justify-center items-center ml-4 ${
                          newReservation ? "opacity-40" : ""
                        } `}
                      >
                        <ControlledCheckbox
                          label="現在の予約を編集"
                          checked={newReservation ? false : true}
                          onChanger={(newValue) => {
                            setNewReservation(newValue ? false : true);
                            if (newValue === false) {
                              clearStates();
                            } else {
                              if (!newCustomer) {
                                setCustomerName(
                                  whoIsEvent === "編集"
                                    ? selectedEvent.title
                                    : initialCustomer?.customer_name || ""
                                );
                                changeCustomerState(
                                  whoIsEvent === "編集"
                                    ? selectedEvent.title
                                    : initialCustomer?.customer_name || ""
                                );
                              }
                            }
                          }}
                          role={permission}
                        />
                      </div>
                    )}

                    {whoIsEvent === "編集" && (
                      <div
                        className={` flex justify-center items-center ml-4 ${
                          !newReservation ? "opacity-40" : ""
                        } `}
                      >
                        <ControlledCheckbox
                          label="選択中の時間に新規予約を追加"
                          checked={newReservation ? true : false}
                          onChanger={(newValue) => {
                            setNewReservation(newValue ? true : false);
                            if (newValue === true) {
                              clearStates();
                            } else {
                              if (!newCustomer) {
                                setCustomerName(
                                  whoIsEvent === "編集"
                                    ? selectedEvent.title
                                    : initialCustomer?.customer_name || ""
                                );
                                changeCustomerState(
                                  whoIsEvent === "編集"
                                    ? selectedEvent.title
                                    : initialCustomer?.customer_name || ""
                                );
                              }
                            }
                          }}
                          role={permission}
                        />
                      </div>
                    )}

                    {/* 顧客の場合 */}
                    {isCustomer && initialCustomer && (
                      <div
                        className={` flex justify-center items-center ml-4 ${
                          newCustomer || initialCustomer === null
                            ? ""
                            : "opacity-40"
                        } `}
                      >
                        <ControlledCheckbox
                          label={initialCustomer === null ? "" : "新規顧客:"}
                          checked={newCustomer ? true : false}
                          onChanger={(newValue) => {
                            setNewCustomer(newValue ? true : false);
                            if (newValue === true) {
                              clearStates();
                            } else {
                              setCustomerName(
                                whoIsEvent === "編集"
                                  ? selectedEvent.title
                                  : initialCustomer?.customer_name || ""
                              );
                              changeCustomerState(
                                whoIsEvent === "編集"
                                  ? selectedEvent.title
                                  : initialCustomer?.customer_name || ""
                              );
                            }
                          }}
                          // type={initialCustomer === null ? "disabled" : ""}
                          role={permission}
                        />
                      </div>
                    )}
                    {isCustomer && initialCustomer && (
                      <div
                        className={` flex justify-center items-center ml-4 ${
                          !newCustomer ? "" : "opacity-40"
                        } `}
                      >
                        <ControlledCheckbox
                          label="既存顧客:"
                          checked={newCustomer ? false : true}
                          onChanger={(newValue) => {
                            setNewCustomer(newValue ? false : true);
                            if (newValue === true) {
                              setCustomerName(
                                whoIsEvent === "編集"
                                  ? selectedEvent.title
                                  : initialCustomer?.customer_name || ""
                              );
                              changeCustomerState(
                                whoIsEvent === "編集"
                                  ? selectedEvent.title
                                  : initialCustomer?.customer_name || ""
                              );
                            } else {
                              clearStates();
                            }
                          }}
                          role={permission}
                          // type={whoIsEvent === "編集" ? "disabled" : ""}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {!isCustomer && (
                  <div className="pt-4 flex justify-center items-center ml-4 mr-4">
                    <div className="w-32 mr-2 text-right mb-6 ">タイトル:</div>
                    <BasicTextField
                      id={Number(uniqueId)}
                      placeholder="タイトル"
                      value={title}
                      onChange={(e) => setTitle(e.target.value || "")}
                      role={permission}
                      decideLength={50}
                      onValidationChange={(newValue) =>
                        setTitleValidate(newValue)
                      }
                    />
                  </div>
                )}

                {!newCustomer && isCustomer && (
                  <div className="pt-4">
                    <div className="pt-4 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mt-1 ">顧客名:</div>
                      <SingleCheckBox
                        onChange={(newValue) => {
                          changeCustomerState(newValue);
                        }}
                        nodeId={customerId + uniqueId}
                        getOptions={customerNames}
                        value={customerName}
                        role={permission}
                        onValidationChange={(newValue) =>
                          setCustomerNameValidate(newValue)
                        }
                      />
                    </div>
                    <div className="pt-4 flex justify-center items-center ml-4 mr-4">
                      <span className="w-32 mr-2 text-right mb-6 ">
                        電話番号:
                      </span>
                      <BasicNumberField
                        id={Number(uniqueId)}
                        placeholder="電話番号"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        role={permission}
                        required={false}
                        format={false}
                        maxNumber={999999999999999}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">備考:</div>
                      <BasicTextField
                        id={Number(uniqueId)}
                        placeholder="備考"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        role={permission}
                        decideLength={150}
                        multiline={true}
                        rows={4}
                        required={false}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">コース:</div>
                      <MultiCheckbox
                        nodesProp="course"
                        optionName={courseNames}
                        onChanger={handleCourseChange}
                        getOptions={courses}
                        role={permission}
                        required={false}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">
                        オプション:
                      </div>
                      <MultiCheckbox
                        nodesProp="option"
                        optionName={optionNames}
                        onChanger={handleOptionChange}
                        getOptions={options}
                        role={permission}
                        required={false}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">商品:</div>
                      <MultiCheckbox
                        nodesProp="merchandise"
                        optionName={merchandiseNames}
                        onChanger={handleMerchandiseChange}
                        getOptions={merchandises}
                        role={permission}
                        required={false}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">髪型:</div>
                      <MultiCheckbox
                        nodesProp="hairstyle"
                        optionName={hairstyleNames}
                        onChanger={handleHairstyleChange}
                        getOptions={hairstyles}
                        role={permission}
                        required={false}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">担当者:</div>
                      <MultiCheckbox
                        nodesProp="names"
                        optionName={userNames}
                        onChanger={handleUserChange}
                        getOptions={users}
                        role={permission}
                        required={true}
                        error={true}
                      />
                    </div>
                  </div>
                )}
                {newCustomer && isCustomer && (
                  <div className="w-full">
                    <div className="pt-4 flex justify-center items-center ml-4 mr-4 ">
                      <span className="w-32 text-right mb-6  mr-2 ">
                        顧客名:
                      </span>
                      <BasicTextField
                        id={Number(uniqueId)}
                        placeholder="顧客名"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        role={permission}
                        onValidationChange={(newValue) =>
                          setCustomerNameValidate(newValue)
                        }
                      />
                    </div>

                    <div className="pt-4 flex justify-center items-center ml-4 mr-4">
                      <span className="w-32 text-right mb-6  mr-2">
                        電話番号:
                      </span>
                      <BasicNumberField
                        id={Number(uniqueId)}
                        placeholder="電話番号"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        role={permission}
                        required={false}
                        format={false}
                        maxNumber={999999999999999}
                      />
                    </div>

                    <div className="pt-6 flex items-center ml-4 mr-4">
                      <span className="w-32 text-right mb-6  mr-2">備考:</span>
                      <BasicTextField
                        id={Number(uniqueId)}
                        placeholder="備考"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        role={permission}
                        decideLength={150}
                        multiline={true}
                        rows={4}
                        required={false}
                      />
                    </div>

                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6  ">コース:</div>
                      <MultiCheckbox
                        nodesProp="course"
                        optionName={courseNames}
                        onChanger={handleCourseChange}
                        getOptions={courses}
                        role={permission}
                        required={false}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">
                        オプション:
                      </div>
                      <MultiCheckbox
                        nodesProp="option"
                        optionName={optionNames}
                        onChanger={handleOptionChange}
                        getOptions={options}
                        role={permission}
                        required={false}
                      />
                    </div>

                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6">商品:</div>
                      <MultiCheckbox
                        nodesProp="merchandise"
                        optionName={merchandiseNames}
                        onChanger={handleMerchandiseChange}
                        getOptions={merchandises}
                        role={permission}
                        required={false}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">髪型:</div>
                      <MultiCheckbox
                        nodesProp="hairstyle"
                        optionName={hairstyleNames}
                        onChanger={handleHairstyleChange}
                        getOptions={hairstyles}
                        role={permission}
                        required={false}
                      />
                    </div>
                    <div className="pt-6 flex justify-center items-center ml-4 mr-4">
                      <div className="w-32 mr-2 text-right mb-6 ">担当者:</div>
                      <MultiCheckbox
                        nodesProp="names"
                        optionName={userNames}
                        onChanger={handleUserChange}
                        getOptions={users}
                        role={permission}
                        required={true}
                        error={true}
                      />
                    </div>
                  </div>
                )}
                {(permission === "オーナー" ||
                  permission === "マネージャー") && (
                  <div className="flex mt-6 justify-end items-center mr-2">
                    <PrimaryButton value={!newReservation ? "更新" : "作成"} />
                  </div>
                )}
              </form>
            </>
          </Typography>
          {/* モーダルの内容 */}
        </Box>
      </Modal>
    </div>
  );
};

export default ScheduleModal;
