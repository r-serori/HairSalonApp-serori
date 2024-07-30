import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useRouter, NextRouter } from "next/router";
import { useDispatch } from "react-redux";
import DatePickerValue from "../input/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import PrimaryButton from "../button/PrimaryButton";
import DeleteButton from "../button/DeleteButton";
import { selectGetSchedules } from "../../../slices/schedules/scheduleSlice";
import { selectGetAttendanceTimes } from "../../../slices/attendance_times/attendance_timesSlice";
import { selectGetDaily_sales } from "../../../slices/daily_sales/daily_saleSlice";
import { selectGetMonthly_sales } from "../../../slices/monthly_sales/monthly_saleSlice";
import { AppDispatch } from "../../../redux/store";
import { renderError } from "../../.././pages/api/errorHandler";
import { useSelector } from "react-redux";
import {
  attendance_timeErrorStatus,
  daily_saleErrorStatus,
  monthly_saleErrorStatus,
  scheduleErrorStatus,
} from "../../../hooks/selector";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "60wh",
  maxHeight: "60vh", // ブラウザの高さの80%に設定
  Width: "100%", // ブラウザの高さの80%に設定
  Height: "100%", // ブラウザの高さの80%に設定
  overflowY: "auto", // 縦方向のスクロールを可能にする
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EasyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  whoAreYou: "attendanceTimes" | "schedules" | "dailySales" | "monthlySales";

  whatIsYourId?: number;
  yearMonth: string;
  setYearMonth: (yearMonth: string) => void;
}

const EasyModal: React.FC<EasyModalProps> = ({
  open,
  setOpen,
  whoAreYou,
  whatIsYourId,
  yearMonth,
  setYearMonth,
}) => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const atErrorStatus = useSelector(attendance_timeErrorStatus);
  const sErrorStatus = useSelector(scheduleErrorStatus);
  const dsErrorStatus = useSelector(daily_saleErrorStatus);
  const msErrorStatus = useSelector(monthly_saleErrorStatus);

  const [selectDate, setSelectDate] = useState<Dayjs>(
    dayjs().utc().tz("Asia/Tokyo")
  );

  const [year, setYear] = useState<string>(
    whoAreYou === "attendanceTimes" && yearMonth
      ? dayjs(yearMonth).utc().tz("Asia/Tokyo").format("YYYY-MM")
      : whoAreYou === "attendanceTimes" && !yearMonth
      ? dayjs(yearMonth).utc().tz("Asia/Tokyo").format("YYYY-MM")
      : whoAreYou !== "attendanceTimes" && yearMonth
      ? dayjs(yearMonth).utc().tz("Asia/Tokyo").format("YYYY")
      : dayjs().utc().tz("Asia/Tokyo").format("YYYY")
  );

  const [timeValidate, setTimeValidate] = useState<boolean>(true);

  let message = "去年以前、または来年以降の年を選択してください！";

  const resetState = () => {
    setSelectDate(dayjs().utc().tz("Asia/Tokyo"));
    setYear(
      whoAreYou === "attendanceTimes"
        ? dayjs().utc().tz("Asia/Tokyo").format("YYYY-MM")
        : dayjs().utc().tz("Asia/Tokyo").format("YYYY")
    );
  };

  const selectSubmit = async () => {
    try {
      if (!timeValidate) return;
      if (whoAreYou === "attendanceTimes") {
        const response = await dispatch(
          selectGetAttendanceTimes({
            user_id: whatIsYourId || 0,
            yearMonth: year,
          }) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          setOpen(false);
        } else {
          const re = renderError(atErrorStatus, router, dispatch);
          if (re === null) throw new Error();
        }
        if (setYearMonth) setYearMonth(year);
      } else if (whoAreYou === "schedules") {
        const response = await dispatch(selectGetSchedules(year) as any);
        if (response.meta.requestStatus === "fulfilled") {
          localStorage.setItem("year", year);
          if (setYearMonth) setYearMonth(year);

          setOpen(false);
        } else {
          const re = renderError(sErrorStatus, router, dispatch);
          if (re === null) throw new Error();
        }
      } else if (whoAreYou === "dailySales") {
        const response = await dispatch(selectGetDaily_sales(year) as any);
        if (response.meta.requestStatus === "fulfilled") {
          if (setYearMonth) setYearMonth(year);
          setOpen(false);
        } else {
          const re = renderError(dsErrorStatus, router, dispatch);
          if (re === null) throw new Error();
        }
      } else if (whoAreYou === "monthlySales") {
        const response = await dispatch(selectGetMonthly_sales(year) as any);
        if (response.meta.requestStatus === "fulfilled") {
          if (setYearMonth) setYearMonth(year);

          setOpen(false);
        } else {
          const re = renderError(msErrorStatus, router, dispatch);
          if (re === null) throw new Error();
        }
      } else {
        throw new Error("whoAreYouが不正です");
      }
    } catch (error) {
      // console.log("Error", error);
    }
  };

  return (
    <div>
      {whoAreYou === "attendanceTimes" ? (
        <Button
          onClick={() => {
            setOpen(true);
            resetState();
          }}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg text-md font-bold px-4 py-2 text-center"
        >
          去年以前か来年以降の勤怠時間を確認,編集
        </Button>
      ) : whoAreYou === "schedules" ? (
        <Button
          onClick={() => setOpen(true)}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg text-md font-bold px-4 py-2 text-center"
        >
          去年以前か来年以降の予約を確認,編集
        </Button>
      ) : (
        (whoAreYou === "dailySales" ||
          whoAreYou === "monthlySales" ||
          whoAreYou === "yearlySales") && (
          <Button
            onClick={() => setOpen(true)}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-lg text-md font-bold px-4 py-2 text-center"
          >
            去年以前か来年以降の売上を確認,編集
          </Button>
        )
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message && <p className=" text-center">{message}</p>}
            <div className="flex justify-center items-center ">
              <form onSubmit={selectSubmit}>
                <div className="flex justify-center items-center sm:pt-8 md:pt-12">
                  {whoAreYou === "attendanceTimes" ? (
                    <DatePickerValue
                      value={selectDate}
                      changer={(newValue) => {
                        setSelectDate(newValue);
                        setYear(newValue.format("YYYY-MM"));
                      }}
                      whatSales="勤怠"
                      onValidateChange={(validate) => setTimeValidate(validate)}
                    />
                  ) : (
                    <DatePickerValue
                      value={selectDate}
                      changer={(newValue) => {
                        setSelectDate(newValue);
                        setYear(newValue.format("YYYY"));
                      }}
                      whatSales="過去未来"
                      onValidateChange={(validate) => setTimeValidate(validate)}
                    />
                  )}
                </div>

                <div className="flex justify-center pt-8">
                  {(year === dayjs().utc().tz("Asia/Tokyo").format("YYYY") &&
                    (whoAreYou === "schedules" ||
                      whoAreYou === "dailySales" ||
                      whoAreYou === "monthlySales")) ||
                  (year ===
                    dayjs()
                      .utc()
                      .tz("Asia/Tokyo")
                      .add(1, "year")
                      .format("YYYY") &&
                    whoAreYou === "schedules") ||
                  (year === dayjs().utc().tz("Asia/Tokyo").format("YYYY-MM") &&
                    whoAreYou === "attendanceTimes") ? (
                    <>
                      <div className="mr-2 pt-16">
                        <DeleteButton
                          value={"戻る"}
                          place="left"
                          onClicker={() => {
                            setOpen(false);
                          }}
                        />
                      </div>
                      <p className="text-red-500 text-center mr-12">
                        {whoAreYou === "attendanceTimes"
                          ? "選択中の勤怠時間は既に表示しています。"
                          : whoAreYou === "schedules"
                          ? "選択中の予約は既に表示しています。"
                          : "選択中の売上は既に表示しています。"}
                      </p>
                    </>
                  ) : (
                    <div className="flex justify-between md:pt-8  ">
                      <div>
                        <DeleteButton
                          value={"戻る"}
                          // place="left"
                          onClicker={() => {
                            setOpen(false);
                          }}
                        />
                      </div>
                      <div className="md:ml-32 sm:ml-16">
                        <PrimaryButton value={"表示"} />
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default EasyModal;
