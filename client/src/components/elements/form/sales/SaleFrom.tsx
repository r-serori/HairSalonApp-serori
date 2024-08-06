import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import DatePickerValue from "../../input/DatePickerValue";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import PrimaryButton from "../../button/PrimaryButton";
import DeleteButton from "../../button/DeleteButton";
import {
  changeDailySaleMessage,
  createDaily_sales,
} from "../../../../slices/daily_sales/daily_saleSlice";
import {
  changeMonthlySaleMessage,
  createMonthly_sales,
} from "../../../../slices/monthly_sales/monthly_saleSlice";
import {
  changeYearlySaleMessage,
  createYearly_sales,
} from "../../../../slices/yearly_sales/yearly_saleSlice";
import {
  daily_saleError,
  monthly_saleError,
  yearly_saleError,
} from "../../../../hooks/selector";
import { CourseState } from "../../../../slices/courses/courseSlice";
import { OptionState } from "../../../../slices/options/optionSlice";
import { MerchandiseState } from "../../../../slices/merchandises/merchandiseSlice";
import { CalendarEvent } from "../../../calender/CalendarComponent";
import BasicAlerts from "../../alert/BasicAlert";

interface SaleFormProps {
  events: CalendarEvent[];
  whatSales: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  nodes: any;
  courses: CourseState[];
  options: OptionState[];
  merchandises: MerchandiseState[];
}
const SaleForm: React.FC<SaleFormProps> = ({
  events,
  whatSales,
  setShowModal,
  courses,
  options,
  merchandises,
}) => {
  dayjs.locale("ja");
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const dispatch = useDispatch();
  const router = useRouter();

  const dailySalesError = useSelector(daily_saleError);

  const monthlySalesError = useSelector(monthly_saleError);

  const yearlySalesError = useSelector(yearly_saleError);

  const [time, setTime] = React.useState<Dayjs | null>(
    dayjs().utc().tz("Asia/Tokyo")
  );

  const [timeValidate, setTimeValidate] = React.useState<boolean>(true);

  const [sumPrice, setSumPrice] = React.useState<number | 0>(0);
  const [message, setMessage] = React.useState<string>("");

  const sumPricer = (updateDate: Dayjs) => {
    if (!timeValidate) return;
    //モーダルでDateTimePickerで選択した日付をdayjsでformat()で形を変更している。
    let sameDateEvents: any = [];
    try {
      if (whatSales === "日次") {
        const updateDateFormat = dayjs(updateDate).format("YYYY-MM-DD");

        //events==schedulesとtitleとしてcustomer_nameを持っているものを取得。上記の updateDateFormatと同じ日付のものを取得。
        sameDateEvents = events.filter(
          (event: any) =>
            dayjs(event.start).format("YYYY-MM-DD") === updateDateFormat
        );
      } else if (whatSales === "月次") {
        const updateDateFormat = dayjs(updateDate).format("YYYY-MM");

        sameDateEvents = events.filter(
          (event: any) =>
            dayjs(event.start).format("YYYY-MM") === updateDateFormat
        );
      } else if (whatSales === "年次") {
        const updateDateFormat = dayjs(updateDate).format("YYYY");

        sameDateEvents = events.filter(
          (event: any) => dayjs(event.start).format("YYYY") === updateDateFormat
        );
      }

      if (sameDateEvents.length === 0) {
        setSumPrice(0);
        setMessage("選択した、時制に予約が入っていないので売上がありません！");
        return;
      }

      const sameCustomerEvents = sameDateEvents.filter((event: any) => {
        if (event.isCustomer) {
          return {
            course: event.course,
            option: event.option,
            merchandise: event.merchandise,
          };
        }
      });

      //sameCustomerEventsをmapで回して、courseのみを取得。その後、配列内に配列が複数入っている状態になるのでflat()で配列を一つの配列にする。
      const sameCoursesEvents = sameCustomerEvents
        .map((event: any) => event.course)
        .flat();

      // coursesの中にあるcourse_nameとpriceを取得して、配列に入れる。
      const courseNameAndPrices = courses.map((course: CourseState) => ({
        courseName: course.course_name,
        coursePrice: course.price,
      }));

      // 一つの配列にした配列をmapで回して、courseNameと同じだったら、coursePriceを取得して、reduceで合計する。
      const sameCoursesPrice: number = sameCoursesEvents
        .map((course: any) => {
          if (!courseNameAndPrices || courseNameAndPrices.length === 0) {
            return 0;
          }
          const foundCourse = courseNameAndPrices.find(
            (courseNameAndPrice) => courseNameAndPrice.courseName === course
          );
          return foundCourse ? foundCourse.coursePrice : 0;
        })
        .reduce((acc: number, cur: number) => acc + cur, 0);
      //optionも同様にする。
      const sameOptionsEvents = sameCustomerEvents
        .map((event: any) => event.option)
        .flat();

      const optionNameAndPrices = options.map((option: OptionState) => ({
        optionName: option.option_name,
        optionPrice: option.price,
      }));

      const sameOptionsPrice: number = sameOptionsEvents
        .map((option: any) => {
          if (!optionNameAndPrices || optionNameAndPrices.length === 0) {
            return 0;
          }
          const foundOption = optionNameAndPrices.find(
            (optionNameAndPrice) => optionNameAndPrice.optionName === option
          );
          return foundOption ? foundOption.optionPrice : 0;
        })
        .reduce((acc: number, cur: number) => acc + cur, 0);

      //merchandiseも同様にする。

      const sameMerchandisesEvents = sameCustomerEvents
        .map((event: any) => event.merchandise)
        .flat();

      const merchandiseNameAndPrices = merchandises.map(
        (merchandise: MerchandiseState) => ({
          merchandiseName: merchandise.merchandise_name,
          merchandisePrice: merchandise.price,
        })
      );

      const sameMerchandisesPrice: number = sameMerchandisesEvents
        .map((merchandise: any) => {
          if (
            !merchandiseNameAndPrices ||
            merchandiseNameAndPrices.length === 0
          ) {
            return 0;
          }
          const foundMerchandise = merchandiseNameAndPrices.find(
            (merchandiseNameAndPrice) =>
              merchandiseNameAndPrice.merchandiseName === merchandise
          );
          return foundMerchandise ? foundMerchandise.merchandisePrice : 0;
        })
        .reduce((acc: number, cur: number) => acc + cur, 0);

      const result: number =
        sameCoursesPrice + sameOptionsPrice + sameMerchandisesPrice;

      setMessage("");
      setSumPrice(result);
    } catch (e) {
      return 0;
    }
  };

  const allInitialState = () => {
    setTime(dayjs().utc().tz("Asia/Tokyo"));
    setSumPrice(0);
    setMessage("");
    setShowModal(false);
  };

  const InitialState = () => {
    setTime(dayjs().utc().tz("Asia/Tokyo"));
    setMessage("");
    setSumPrice(0);
  };

  const SalesSubmit = async () => {
    if (!timeValidate) return;
    try {
      if (time === null) return;
      if (sumPrice === 0) {
        setMessage("売上が0円のため、更新できません。");
        return;
      }
      if (whatSales === "日次") {
        const SalesFormData = {
          id: 0,
          date: time.utc().tz("Asia/Tokyo").format("YYYY-MM-DD"),
          daily_sales: sumPrice,
        };

        const response = await dispatch(
          createDaily_sales(SalesFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          allInitialState();
          router.push("/daily_sales");
        } else {
          throw new Error();
        }
      } else if (whatSales === "月次") {
        const SalesFormData = {
          id: 0,
          year_month: time.utc().tz("Asia/Tokyo").format("YYYY-MM"),
          monthly_sales: sumPrice,
        };

        const response = await dispatch(
          createMonthly_sales(SalesFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          allInitialState();
          router.push("/monthly_sales");
        } else {
          throw new Error();
        }
      } else if (whatSales === "年次") {
        const SalesFormData = {
          id: 0,
          year: time.utc().tz("Asia/Tokyo").format("YYYY"),
          yearly_sales: sumPrice,
        };

        const response = await dispatch(
          createYearly_sales(SalesFormData) as any
        );
        if (response.meta.requestStatus === "fulfilled") {
          allInitialState();
          router.push("/yearly_sales");
        } else {
          throw new Error();
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    changeDailySaleMessage("");
    changeMonthlySaleMessage("");
    changeYearlySaleMessage("");
    InitialState();
    sumPricer(dayjs().utc().tz("Asia/Tokyo"));
  }, [whatSales]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ja-JP").format(price);
  };

  return (
    <>
      <>
        {message && (
          <BasicAlerts message={message} type="warning" space={1} padding={1} />
        )}

        {dailySalesError && whatSales === "日次" && (
          <BasicAlerts
            message={dailySalesError}
            type="error"
            space={1}
            padding={1}
          />
        )}

        {monthlySalesError && whatSales === "月次" && (
          <BasicAlerts
            message={monthlySalesError}
            type="error"
            space={1}
            padding={1}
          />
        )}

        {yearlySalesError && whatSales === "年次" && (
          <BasicAlerts
            message={yearlySalesError}
            type="error"
            space={1}
            padding={1}
          />
        )}

        <div className="flex justify-center items-center py-4">
          <DatePickerValue
            value={time}
            changer={(newValue) => {
              setTime(newValue);
              sumPricer(newValue);
            }}
            whatSales={
              whatSales === "日次"
                ? "日次"
                : whatSales === "月次"
                ? "月次"
                : "年次"
            }
            onValidateChange={setTimeValidate}
          />
        </div>
        <div className="p-4 md:p-5 text-center pt-8">
          {whatSales === "日次" ? (
            <div>
              <h3 className="font-normal text-gray-900 dark:text-gray-400">
                {time === null
                  ? "日付を正しく入力してください。"
                  : dayjs(time)
                      .utc()
                      .tz("Asia/Tokyo")
                      .format("YYYY-MM-DD")
                      .includes("Invalid")
                  ? "日付を正しく入力してください。"
                  : `${time.format("YYYY")}
                年${time.format("MM")}月${time.format("DD")}
                日の売上合計は
                ${formatPrice(sumPrice)}円でした。`}
              </h3>
              {sumPrice > 0 && (
                <h3 className="font-normal text-gray-900 dark:text-gray-400 pt-8">
                  日次売上に更新しますか？
                </h3>
              )}
            </div>
          ) : whatSales === "月次" ? (
            <div>
              <h3 className="font-normal text-gray-900 dark:text-gray-400">
                {time === null
                  ? "日付を正しく入力してください。"
                  : dayjs(time)
                      .utc()
                      .tz("Asia/Tokyo")
                      .format("YYYY-MM")
                      .includes("Invalid")
                  ? "日付を正しく入力してください。"
                  : `${time.format("YYYY")}年${time.format(
                      "MM"
                    )}月の売上合計は${formatPrice(sumPrice)}円でした。`}
              </h3>
              {sumPrice > 0 && (
                <h3 className="font-normal text-gray-900 dark:text-gray-400 pt-8">
                  月次売上に更新しますか？
                </h3>
              )}
            </div>
          ) : (
            <div>
              <h3 className="font-normal text-gray-900 dark:text-gray-400">
                {time === null
                  ? "日付を正しく入力してください。"
                  : dayjs(time)
                      .utc()
                      .tz("Asia/Tokyo")
                      .format("YYYY")
                      .includes("Invalid")
                  ? "日付を正しく入力してください。"
                  : `${time.format("YYYY")}
                年の売上合計は
                ${formatPrice(sumPrice)}円でした。`}
              </h3>
              {sumPrice > 0 && (
                <h3 className="font-normal text-gray-900 dark:text-gray-400 pt-8">
                  年次売上に更新しますか？
                </h3>
              )}
            </div>
          )}
          <div className="flex justify-center pt-8 gap-16">
            <div>
              <DeleteButton
                value={"戻る"}
                onClicker={() => allInitialState()}
              />
            </div>
            {sumPrice > 0 && (
              <div>
                <PrimaryButton value={"更新"} onChanger={SalesSubmit} />
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default SaleForm;
