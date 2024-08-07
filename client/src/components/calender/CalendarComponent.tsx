import { Calendar, EventInput } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import multiMonthPlugin from "@fullcalendar/multimonth/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import FullCalendar from "@fullcalendar/react";
import ScheduleModal from "../modal/ScheduleModal";
import SalesModal from "../modal/SalesModal";
import EasyModal from "../modal/EasyModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ButtonModal from "../modal/ButtonModal";
import { customerStatus } from "../../hooks/selector";
import { permissionStore } from "../../hooks/authSelector";
import { CourseState } from "../../slices/courses/courseSlice";
import { OptionState } from "../../slices/options/optionSlice";
import { MerchandiseState } from "../../slices/merchandises/merchandiseSlice";
import { HairstyleState } from "../../slices/hairstyles/hairstyleSlice";
import { UserState } from "../../slices/auth/userSlice";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { ScheduleModalNodes } from "../../types/interface";
import LoadingComponent from "../loading/Loading";

export interface CalendarEvent {
  id: number;
  title: string;
  phone_number?: string | null;
  remarks?: string | null;
  start: string;
  end: string;
  allDay: boolean;
  course?: string[] | [];
  option?: string[] | [];
  merchandise?: string[] | [];
  hairstyle?: string[] | [];
  names?: string[] | [];
  customer_id?: number;
  isCustomer: boolean;
}

interface OpenCalendarProps {
  events: CalendarEvent[];
  scheduleYear: string;
  setScheduleYear: (year: string) => void;
  nodes: ScheduleModalNodes[];
  users: UserState[];
  courses: CourseState[];
  options: OptionState[];
  merchandises: MerchandiseState[];
  hairstyles: HairstyleState[];
  customerNames: string[];
  nowScheduleGetter: () => void;
}

const MyCalendar: React.FC<OpenCalendarProps> = ({
  events,
  nodes,
  users,
  courses,
  options,
  merchandises,
  hairstyles,
  customerNames,
  scheduleYear,
  setScheduleYear,
  nowScheduleGetter,
}) => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const cStatus: string = useSelector(customerStatus);

  const eventInputs: EventInput[] = events.map((event) => ({
    id: event.id.toString(),
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    extendedProps: {
      phone_number: event.phone_number ? event.phone_number : "",
      remarks: event.remarks ? event.remarks : "",
      course: event.course ? event.course : [],
      option: event.option ? event.option : [],
      merchandise: event.merchandise ? event.merchandise : [],
      hairstyle: event.hairstyle ? event.hairstyle : [],
      names: event.names ? event.names : [],
      isCustomer: event.isCustomer,
      customer_id: event.customer_id ? event.customer_id : 0,
    },
  }));

  const eventBorderColor = "#333";

  const permission: PermissionsState = useSelector(permissionStore);

  //予約内容を作成するためのstate
  const [showModal, setShowModal] = useState<boolean>(false);
  //顧客か顧客以外かを判定するためのstate
  const [showButtonModal, setShowButtonModal] = useState<boolean>(false);

  // ButtonModalで使用するstate, 顧客or顧客以外の判定を行う
  const [isCustomer, setIsCustomer] = useState<boolean>(false);

  //カレンダーのイベントをクリックした際に選択したイベントを格納するstate
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // イベントをクリックした際にどのようなイベントをクリックしたかを格納するstate
  const [whoIsEvent, setWhoIsEvent] = useState<
    "編集" | "クリック" | "選択" | ""
  >("");

  // 日次、月次、年次の売上を表示するためのstate
  const [DailySalesModal, setDailySalesModal] = useState(false);
  const [monthlySalesModal, setMonthlySalesModal] = useState(false);
  const [yearlySalesModal, setYearlySalesModal] = useState(false);

  // EasyModalを表示するためのstate　表示する予約の年を選択する
  const [easyOpen, setEasyOpen] = useState(false);

  const handleEventClick = (e: any) => {
    setSelectedEvent(e);
    setShowButtonModal(true);
    // setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const currentYear = scheduleYear
    ? scheduleYear
    : dayjs().utc().tz("Asia/Tokyo").format("YYYY");

  // console.log("currentYear", currentYear);
  const nextYear = scheduleYear
    ? currentYear
    : dayjs(currentYear).add(1, "year").format("YYYY");

  // console.log("nextYear", nextYear);
  return (
    <>
      {cStatus === "loading" ? (
        <LoadingComponent />
      ) : (
        // ローディングが終わったらカレンダーを表示する

        <div className="flex justify-between items-center my-4 ">
          {scheduleYear ? (
            <button
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-md text-bold px-4 py-2 text-center mr-auto ml-4 "
              onClick={() => {
                localStorage.removeItem("year");
                nowScheduleGetter();
              }}
            >
              現在の年の予約を表示
            </button>
          ) : (
            <div className="mr-auto ml-4 ">
              <EasyModal
                open={easyOpen}
                setOpen={setEasyOpen}
                yearMonth={scheduleYear}
                setYearMonth={setScheduleYear}
                whoAreYou="schedules"
              />
            </div>
          )}

          {permission === "オーナー" && (
            <div className="flex justify-start items-center mr-4 gap-4">
              <SalesModal
                showModal={DailySalesModal}
                setShowModal={setDailySalesModal}
                events={events}
                whatSales="日次"
                nodes={nodes}
                courses={courses}
                options={options}
                merchandises={merchandises}
              />

              <SalesModal
                showModal={monthlySalesModal}
                setShowModal={setMonthlySalesModal}
                events={events}
                whatSales="月次"
                nodes={nodes}
                courses={courses}
                options={options}
                merchandises={merchandises}
              />

              <SalesModal
                showModal={yearlySalesModal}
                setShowModal={setYearlySalesModal}
                events={events}
                whatSales="年次"
                nodes={nodes}
                courses={courses}
                options={options}
                merchandises={merchandises}
              />
            </div>
          )}
        </div>
      )}

      <FullCalendar
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear", //,listWeek,listDayは追加したかったらする
        }} //ここでカレンダーのヘッダーを設定している
        buttonText={{
          today: "今日",
          month: "月",
          week: "週",
          day: "日",
          multiMonthYear: "年",
        }} //カレンダーのボタンの名前を設定している
        dayMaxEventRows={true} //カレンダーの月表示の際の一日のマスに重ねることができるイベントの最大数をtrueで指定できるように設定している。falseの場合、無制限に重ねることができる
        views={{
          // ↓dayGridMonth, dayGridWeek,dayGridDayの表示形式を設定している
          dayGrid: {
            dayMaxEventRows: 2, //カレンダーの月表示の際の一日のマスに重ねることができるイベントの最大数を設定している
            dayHeaderFormat: {
              weekday: "long",
            }, //headerに表示される曜日の表示形式を設定している。月表示には日付は不要なので設定していない
          },
          //↓timeGridWeek, timeGridDayの表示形式を設定している
          timeGrid: {
            dayHeaderFormat: {
              weekday: "short",
              month: "numeric",
              day: "numeric",
            }, //headerに表示される曜日の表示形式を設定している。週、日表示には日付も表示するように設定している
            slotLabelFormat: {
              hour: "numeric",
              minute: "2-digit",
            }, //カレンダーの左に表示されるの時間の表示形式を設定している
            slotDuration: "00:15:00", //カレンダーの横行の間隔の時間を設定している
            slotLabelInterval: "00:15:00", //カレンダーの左に表示されるの時間をどの間隔で表示するかを設定している
            slotMinTime: "07:00:00", //カレンダーの表示の開始時間を設定している
            slotMaxTime: "24:00:00", //カレンダーの表示の終了時間を設定している
            selectable: true, //カレンダーの時間をクリックした際にイベントを追加することができるように設定している
            selectMirror: true, //カレンダーの時間をクリックした際にイベントを追加する際にマウスで選択した時間を表示するかどうかを設定している
            dateClick: function (info) {
              if (permission === "オーナー" || permission === "マネージャー") {
                handleEventClick(info);
                setWhoIsEvent("クリック");
              } else {
                return;
              }
            },
            select: function (info) {
              if (permission === "オーナー" || permission === "マネージャー") {
                handleEventClick(info);
                setWhoIsEvent("選択");
              } else {
                return;
              }
            },
            eventClick: function (info) {
              setWhoIsEvent("編集");
              setSelectedEvent(info.event);
              setShowModal(true);
            },
          },
          multiMonth: {
            dayHeaderFormat: {
              weekday: "short",
            },
          },
        }}
        validRange={{
          start: `${currentYear}-01-01`,
          end: `${nextYear}-12-31`,
        }}
        businessHours={{
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6], //カレンダーの営業日を設定している
          startTime: "7:00", //カレンダーの営業開始時間を設定している
          endTime: "22:00", //カレンダーの営業終了時間を設定している
        }}
        weekNumbers={true} //カレンダーの週番号を表示するかどうかを設定している
        weekText="週" //カレンダーの週番号の表示形式を設定している
        navLinks={true} //カレンダーの日付をクリックした際にその日付のページに遷移するかどうかを設定している
        nowIndicator={true} //カレンダーの現在時刻を表示するかどうかを設定している
        eventMaxStack={2} //カレンダーの週、日の表示の際の一日のマスに重ねることができるイベントの最大数を設定している
        //カレンダーの曜日と月の表示形式を設定している
        contentHeight={600} //カレンダーの高さを設定している
        moreLinkText={(num) => `他${num}件`} //カレンダーの月表示の際に一日のマスに重ねることができるイベントの最大数を超えた場合に表示されるテキストを設定している
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          multiMonthPlugin,
          interactionPlugin, //日付をクリックした際にイベントを追加することができるように設定できる。https://fullcalendar.io/docs/dateClick参照
        ]} //カレンダーのプラグインを設定している。増やしていくことで機能を追加できる
        initialView="dayGridMonth" //カレンダーの初期表示を設定している
        locale={"ja"}
        allDayText="終日"
        titleFormat={{ year: "numeric", month: "short" }} //カレンダーのタイトルの表示形式を設定している
        weekends={true} //カレンダーの土日の表示を設定している
        events={eventInputs} //カレンダーに表示するイベントを設定している
        eventBorderColor={eventBorderColor} // ボーダーの色を指定
      />

      {showModal && selectedEvent && !showButtonModal && (
        <ScheduleModal
          showModal={showModal}
          selectedEvent={selectedEvent}
          setShowModal={setShowModal}
          setSelectedEvent={setSelectedEvent}
          whoIsEvent={whoIsEvent}
          setWhoIsEvent={setWhoIsEvent}
          isCustomerProp={isCustomer}
          nodes={nodes}
          users={users}
          courses={courses}
          options={options}
          merchandises={merchandises}
          hairstyles={hairstyles}
          customerNames={customerNames}
        />
      )}
      {showButtonModal && selectedEvent && whoIsEvent !== "編集" && (
        <ButtonModal
          showButtonModal={showButtonModal}
          setShowButtonModal={setShowButtonModal}
          isCustomer={isCustomer}
          whoIsEvent={whoIsEvent}
          setIsCustomer={setIsCustomer}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default MyCalendar;
