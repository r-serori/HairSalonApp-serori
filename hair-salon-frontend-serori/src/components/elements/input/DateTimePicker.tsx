import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import DemoContainer from "@mui/x-date-pickers/DateTimePicker";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { PermissionsState } from "../../../slices/auth/permissionSlice";

interface DateTimeRangePickerProps {
  value: Dayjs | null;
  changer: (newValue: Dayjs) => void;
  isAllDay?: boolean; //終日の予定かどうか
  role?: PermissionsState; //スタッフかどうか
  onValidateChange: (isValid: boolean) => void;
}

const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = ({
  value,
  changer,
  isAllDay,
  role,
  onValidateChange,
}) => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const dayJsValue =
    value === null
      ? dayjs().utc().tz("Asia/Tokyo")
      : dayjs(value).utc().tz("Asia/Tokyo");

  // 0時と23時のdayjsオブジェクトを作成
  const minTime = dayjs().hour(0).minute(0).utc().tz("Asia/Tokyo");
  const maxTime = dayjs().hour(23).minute(59).utc().tz("Asia/Tokyo");

  const errorChecker = (newValue: Dayjs | null) => {
    if (
      dayjs(newValue)
        .utc()
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD HH:mm")
        .includes("Invalid")
    ) {
      onValidateChange(false);
    } else {
      onValidateChange(true);
    }
    if (newValue === null) {
      changer(dayjs().utc().tz("Asia/Tokyo"));
    } else {
      changer(newValue);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={
          isAllDay || role === "スタッフ"
            ? "選択できません"
            : "日時を選択してください"
        }
        value={dayJsValue}
        onChange={(newValue: Dayjs | null) => errorChecker(newValue)}
        {...(isAllDay || role === "スタッフ" ? { readOnly: true } : {})}
        minTime={minTime}
        maxTime={maxTime}
        ampm={false} // 24時間形式に設定
      />
    </LocalizationProvider>
  );
};

export default DateTimeRangePicker;
