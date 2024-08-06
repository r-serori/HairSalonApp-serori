import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DatePickerValueProps {
  value: Dayjs | null;
  changer: (newValue: Dayjs) => void;
  whatSales: string;
  onValidateChange: (isValid: boolean) => void;
}

const DatePickerValue: React.FC<DatePickerValueProps> = ({
  value,
  changer,
  whatSales,
  onValidateChange,
}) => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const errorChecker = (newValue: Dayjs | null) => {
    if (
      dayjs(newValue)
        .utc()
        .tz("Asia/Tokyo")
        .format("YYYY-MM-DD")
        .includes("Invalid") ||
      dayjs(newValue)
        .utc()
        .tz("Asia/Tokyo")
        .format("YYYY-MM")
        .includes("Invalid") ||
      dayjs(newValue).utc().tz("Asia/Tokyo").format("YYYY").includes("Invalid")
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
      <DatePicker
        label={
          whatSales === "過去未来"
            ? "表示したい年を選択"
            : whatSales === "日次"
            ? "日付を選択"
            : whatSales === "月次"
            ? "月を選択"
            : whatSales === "年次"
            ? "年を選択"
            : "表示したい年月を選択"
        }
        value={
          value === null
            ? dayjs().utc().tz("Asia/Tokyo")
            : dayjs(value).utc().tz("Asia/Tokyo")
        }
        onChange={(newValue: Dayjs | null) => errorChecker(newValue)}
        views={
          whatSales === "日次"
            ? ["year", "month", "day"]
            : whatSales === "月次" || whatSales === "勤怠"
            ? ["year", "month"]
            : ["year"]
        }
      />
    </LocalizationProvider>
  );
};

export default DatePickerValue;
