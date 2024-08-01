import React from "react";
import MyCalendar, {
  CalendarEvent,
} from "../../components/calender/CalendarComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getSchedule,
  ScheduleState,
} from "../../slices/schedules/scheduleSlice";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import { useRouter, NextRouter } from "next/router";
import {
  customersStore,
  scheduleError,
  scheduleErrorStatus,
  scheduleMessage,
  scheduleStatus,
  schedulesStore,
} from "../../hooks/selector";
import { permissionStore, user } from "../../hooks/authSelector";
import { allLogout, staffPermission } from "../../hooks/useMethod";
import _ from "lodash";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import {
  CustomerOnlyState,
  CustomerState,
} from "../../slices/customers/customerSlice";
import { CourseState } from "../../slices/courses/courseSlice";
import { OptionState } from "../../slices/options/optionSlice";
import { MerchandiseState } from "../../slices/merchandises/merchandiseSlice";
import { HairstyleState } from "../../slices/hairstyles/hairstyleSlice";
import { Course_customersState } from "../../slices/middleTable/customers/course_customersSlice";
import { Option_customersState } from "../../slices/middleTable/customers/option_customersSlice";
import { Merchandise_customersState } from "../../slices/middleTable/customers/merchandise_customersSlice";
import { Hairstyle_customersState } from "../../slices/middleTable/customers/hairstyle_customersSlice";
import { Customer_usersState } from "../../slices/middleTable/customers/customer_usersSlice";
import {
  coursesStore,
  option_customersStore,
  course_customersStore,
  merchandise_customersStore,
  hairstylesStore,
  customer_usersStore,
  optionsStore,
  merchandiseStore,
  hairstyle_customersStore,
} from "../../hooks/selector";
import { UserState } from "../../slices/auth/userSlice";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../api_backend/errorHandler";
import { ScheduleModalNodes } from "../../types/interface";

const Schedules: React.FC = () => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const schedules: ScheduleState[] = useSelector(schedulesStore);
  const sStatus: string = useSelector(scheduleStatus);
  const sMessage: string | null = useSelector(scheduleMessage);
  const sError: string | null = useSelector(scheduleError);
  const sErrorStatus: number = useSelector(scheduleErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  const [scheduleYear, setScheduleYear] = useState<string>("");

  const nowScheduleGetter = async () => {
    try {
      localStorage.removeItem("year");
      setScheduleYear("");
      const response = await dispatch(getSchedule() as any);
      if (response.meta.requestStatus === "rejected") {
        const re = renderError(sErrorStatus, router, dispatch);
        if (re === null)
          throw new Error("スケジュール情報の取得に失敗しました");
      }
    } catch (error) {
      allLogout(dispatch);
      router.push("/auth/login");
    } finally {
      localStorage.removeItem("userCount");
    }
  };

  useEffect(() => {
    const year = localStorage.getItem("year");
    if (year) {
      setScheduleYear(year);
    } else {
      setScheduleYear("");
    }
    const fetchData = async () => {
      try {
        staffPermission(permission, router);

        if (
          _.isEmpty(schedules) &&
          (permission === "オーナー" ||
            permission === "マネージャー" ||
            permission === "スタッフ")
        ) {
          localStorage.removeItem("year");
          setScheduleYear("");
          const response = await dispatch(getSchedule() as any);
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(sErrorStatus, router, dispatch);
            if (re === null)
              throw new Error("スケジュール情報の取得に失敗しました");
          }
        }
      } catch (error) {
        allLogout(dispatch);
        router.push("/auth/login");
      } finally {
        localStorage.removeItem("userCount");
      }
    };
    if (permission) fetchData();
  }, [dispatch, permission]);

  // 顧客情報を取得
  const customers: CustomerOnlyState[] = useSelector(customersStore);

  // コース情報を取得
  const courses: CourseState[] = useSelector(coursesStore);

  // オプション情報を取得
  const options: OptionState[] = useSelector(optionsStore);

  // 商品情報を取得
  const merchandises: MerchandiseState[] = useSelector(merchandiseStore);
  // 髪型情報を取得
  const hairstyles: HairstyleState[] = useSelector(hairstylesStore);
  // 担当者情報を取得
  const users: UserState[] = useSelector(user);

  // 中間テーブルの情報を取得
  const course_customers: Course_customersState[] = useSelector(
    course_customersStore
  );
  // 中間テーブルの情報を取得
  const option_customers: Option_customersState[] = useSelector(
    option_customersStore
  );
  // 中間テーブルの情報を取得
  const merchandise_customers: Merchandise_customersState[] = useSelector(
    merchandise_customersStore
  );
  // 中間テーブルの情報を取得
  const hairstyle_customers: Hairstyle_customersState[] = useSelector(
    hairstyle_customersStore
  );

  // 中間テーブルの情報を取得
  const customer_users: Customer_usersState[] =
    useSelector(customer_usersStore);

  const customerNames: string[] =
    !customers || customers.length === 0
      ? []
      : customers.map((customer) => customer.customer_name);

  const nodes: ScheduleModalNodes[] = customers
    ? [
        ...customers.map((customer) => {
          // customerは一回一番下まで行く。その後、次のcustomerに行く。
          // 顧客に関連するコースの情報を取得
          const customerCourses: number[] =
            course_customers
              ?.filter((course) => course.customer_id === customer.id)
              ?.map((course) => course.course_id) || [];

          //  [1,2,3]

          const courseNames: string[] =
            courses
              ?.filter((course) => customerCourses.includes(course.id))
              ?.map((course) => course.course_name) || [];

          // 顧客に関連するオプションの情報を取得
          const customerOptions: number[] =
            option_customers
              ?.filter((option) => option.customer_id === customer.id)
              ?.map((option) => option.option_id) || [];

          const optionNames: string[] =
            options
              ?.filter((option) => customerOptions.includes(option.id))
              ?.map((option) => option.option_name) || [];

          // 顧客に関連する商品の情報を取得
          const customerMerchandises: number[] =
            merchandise_customers
              ?.filter((merchandise) => merchandise.customer_id === customer.id)
              ?.map((merchandise) => merchandise.merchandise_id) || [];

          const merchandiseNames: string[] =
            merchandises
              ?.filter((merchandise) =>
                customerMerchandises.includes(merchandise.id)
              )
              ?.map((merchandise) => merchandise.merchandise_name) || [];

          // 顧客に関連する髪型の情報を取得
          const customerHairstyles: number[] =
            hairstyle_customers
              ?.filter((hairstyle) => hairstyle.customer_id === customer.id)
              ?.map((hairstyle) => hairstyle.hairstyle_id) || [];

          const hairstyleNames: string[] =
            hairstyles
              ?.filter((hairstyle) => customerHairstyles.includes(hairstyle.id))
              ?.map((hairstyle) => hairstyle.hairstyle_name) || [];

          // 顧客に関連する担当者の情報を取得
          //user_idを配列にしている
          const customerUsers: number[] =
            customer_users
              ?.filter((user) => user.customer_id === customer.id)
              ?.map((user) => user.user_id) || [];

          const userNames: string[] = Array.isArray(users)
            ? users
                ?.filter((user) => customerUsers.includes(user.id))
                ?.map((user) => user.name) || []
            : [Object(users).name];

          // 顧客情報を返す
          return {
            id: customer.id,
            customer_name: customer.customer_name,
            phone_number: customer.phone_number,
            remarks: customer.remarks,
            course: courseNames,
            option: optionNames,
            merchandise: merchandiseNames,
            hairstyle: hairstyleNames,
            names: userNames,
          };
        }),
      ]
    : [];
  const events: CalendarEvent[] = schedules.map((schedule) => {
    if (schedule.customer_id) {
      const customer = nodes?.find(
        (node) => schedule.customer_id === node.id
      ) || {
        id: 0,
        customer_name: "",
        phone_number: "",
        remarks: "",
        course: [],
        option: [],
        merchandise: [],
        hairstyle: [],
        names: [],
      };
      return {
        id: schedule.id,
        title: customer.customer_name,
        phone_number: customer.phone_number,
        remarks: customer.remarks,
        course: customer.course,
        option: customer.option,
        merchandise: customer.merchandise,
        hairstyle: customer.hairstyle,
        names: customer.names,
        start: schedule?.start_time || "",
        end: schedule?.end_time || "",
        allDay: schedule?.allDay || false,
        isCustomer: true,
        customer_id: schedule?.customer_id || 0,
      };
    } else {
      return {
        id: schedule.id,
        title: schedule?.title || "",
        start: schedule?.start_time || "",
        end: schedule?.end_time || "",
        allDay: schedule?.allDay || false,
        isCustomer: false,
      };
    }
  });

  return (
    <div>
      {sMessage && (
        <BasicAlerts
          type="success"
          message={sMessage}
          space={1}
          padding={0.6}
        />
      )}
      {sError && (
        <BasicAlerts type="error" message={sError} space={1} padding={0.6} />
      )}
      {sStatus === "loading" ? (
        <p>loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <MyCalendar
          events={events}
          nodes={nodes}
          users={users}
          courses={courses}
          options={options}
          merchandises={merchandises}
          hairstyles={hairstyles}
          customerNames={customerNames}
          nowScheduleGetter={nowScheduleGetter}
          scheduleYear={scheduleYear}
          setScheduleYear={setScheduleYear}
        />
      )}
    </div>
  );
};

export default Schedules;
