import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import BasicAlerts from "./BasicAlert";

interface AttendanceTimeResultProps {
  nodes: any;
}

const AttendanceTimeResult: React.FC<AttendanceTimeResultProps> = ({
  nodes,
}) => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const attendanceTimeResult = nodes
    .map((node: any) => {
      if (node.start_time === null || node.end_time === null) return 0;
      const startTime = dayjs(node.start_time).tz("Asia/Tokyo");
      const endTime = dayjs(node.end_time).tz("Asia/Tokyo");
      if (
        startTime.format("YYYY") === "9999" ||
        endTime.format("YYYY") === "9999"
      )
        return 0;
      const attendanceTime = endTime.diff(startTime, "minute");
      return attendanceTime;
    })
    .reduce((acc: number, cur: number) => acc + cur, 0);

  // console.log("勤怠時間計算結果", attendanceTimeResult);

  return (
    <div>
      {attendanceTimeResult === 0 ? (
        <BasicAlerts
          message="この月は出勤していません"
          type="warning"
          space={1}
          padding={0.8}
        />
      ) : (
        <BasicAlerts
          type="info"
          message={`この月は${Math.floor(
            attendanceTimeResult / 60
          )}時間${String(attendanceTimeResult % 60).padStart(
            2,
            "0"
          )}分出勤しました!`}
          space={1}
          padding={0.8}
        />
      )}
    </div>
  );
};
export default AttendanceTimeResult;
