import ComponentTable from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  CustomerOnlyState,
  CustomerState,
  getCustomer,
} from "../../slices/customers/customerSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import RouterButton from "../../components/elements/button/RouterButton";
import { useRouter, NextRouter } from "next/router";
import {
  customersStore,
  customerStatus,
  customerMessage,
  customerError,
  coursesStore,
  optionsStore,
  merchandiseStore,
  hairstylesStore,
  course_customersStore,
  option_customersStore,
  merchandise_customersStore,
  hairstyle_customersStore,
  customer_usersStore,
  customerErrorStatus,
} from "../../hooks/selector";
import { user, permissionStore } from "../../hooks/authSelector";
import { staffPermission } from "../../hooks/useMethod";
import { allLogout } from "../../hooks/useMethod";
import _ from "lodash";
import { CourseState } from "../../slices/courses/courseSlice";
import { OptionState } from "../../slices/options/optionSlice";
import { MerchandiseState } from "../../slices/merchandises/merchandiseSlice";
import { HairstyleState } from "../../slices/hairstyles/hairstyleSlice";
import { Course_customersState } from "../../slices/middleTable/customers/course_customersSlice";
import { Option_customersState } from "../../slices/middleTable/customers/option_customersSlice";
import { Merchandise_customersState } from "../../slices/middleTable/customers/merchandise_customersSlice";
import { Hairstyle_customersState } from "../../slices/middleTable/customers/hairstyle_customersSlice";
import { Customer_usersState } from "../../slices/middleTable/customers/customer_usersSlice";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { UserState } from "../../slices/auth/userSlice";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../api_backend/errorHandler";
import {
  CustomerNodes,
  NodesProps,
  ScheduleModalNodes,
  SearchItems,
} from "../../types/interface";

const Customers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const [tHeaderItems, setTHeaderItems] = useState<string[]>([]);

  const customers: CustomerOnlyState[] = useSelector(customersStore);
  const cStatus: string = useSelector(customerStatus);
  const cMessage: string | null = useSelector(customerMessage);
  const cError: string | null = useSelector(customerError);
  const cErrorStatus: number = useSelector(customerErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        staffPermission(permission, router);
        if (permission === "オーナー") {
          setTHeaderItems([
            "顧客",
            "電話番号",
            "備考",
            "コース",
            "オプション",
            "商品",
            "髪型",
            "担当者",
            "編集",
            "削除",
          ]);
        } else if (permission === "マネージャー") {
          setTHeaderItems([
            "顧客名",
            "電話番号",
            "備考",
            "コース",
            "オプション",
            "商品",
            "髪型",
            "担当者",
            "編集",
          ]);
        } else {
          setTHeaderItems([
            "顧客",
            "電話番号",
            "備考",
            "コース",
            "オプション",
            "商品",
            "髪型",
            "担当者",
          ]);
        }
        if (
          _.isEmpty(customers) &&
          (permission === "オーナー" ||
            permission === "マネージャー" ||
            permission === "スタッフ")
        ) {
          const response = await dispatch(getCustomer() as any);
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(cErrorStatus, router, dispatch);
            if (re === null) throw new Error("顧客の取得に失敗しました");
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

  const courses: CourseState[] = useSelector(coursesStore);

  const options: OptionState[] = useSelector(optionsStore);

  const merchandises: MerchandiseState[] = useSelector(merchandiseStore);

  const hairstyles: HairstyleState[] = useSelector(hairstylesStore);

  const users: UserState[] = useSelector(user);

  const course_customers: Course_customersState[] = useSelector(
    course_customersStore
  );

  const option_customers: Option_customersState[] = useSelector(
    option_customersStore
  );
  const merchandise_customers: Merchandise_customersState[] = useSelector(
    merchandise_customersStore
  );
  const hairstyle_customers: Hairstyle_customersState[] = useSelector(
    hairstyle_customersStore
  );

  const customer_users: Customer_usersState[] =
    useSelector(customer_usersStore);

  const searchItems: SearchItems = [
    { key: "customer_name", value: "顧客" },
    { key: "phone_number", value: "電話番号" },
    { key: "remarks", value: "備考" },
    { key: "course", value: "コース" },
    { key: "option", value: "オプション" },
    {
      key: "merchandise",
      value: "商品",
    },
    { key: "hairstyle", value: "髪型" },
    { key: "names", value: "担当者" },
  ];

  const nodesProps: NodesProps[] = [
    { text: "customer_name" },
    { number: "phone_number" },
    { text: "remarks" },
    { text: "course" },
    { text: "option" },
    { text: "merchandise" },
    { text: "hairstyle" },
    { text: "names" },
  ];

  const nodes: CustomerNodes[] = Array.isArray(customers)
    ? [
        ...customers?.map((customer) => {
          // customerは一回一番下まで行く。その後、次のcustomerに行く。
          // 顧客に関連するコースの情報を取得
          const customerCourses =
            course_customers?.filter(
              (course) => course.customer_id === customer.id
            ) || [];
          // [{customer_id: 1, course_id: 1}]

          // 顧客に関連するコース名を取得し、カンマ区切りの文字列に変換
          const courseNames: string =
            customerCourses
              ?.map((course) => {
                const courseInfo =
                  courses?.find((c) => c.id === course.course_id) || null;
                return (courseInfo && courseInfo.course_name) || ""; // コース名が見つかった場合のみ取得
              })
              .join(",\n") || ""; // コース名をカンマ区切りの文字列に変換

          // 顧客に関連するオプションの情報を取得
          const customerOptions =
            option_customers?.filter(
              (cus_op) => cus_op.customer_id === customer.id
            ) || [];
          // [{customer_id: 1, option_id: 1},
          // {customer_id: 1, option_id: 2}]

          // 顧客に関連するオプション名を取得し、カンマ区切りの文字列に変換
          const optionNames: string =
            customerOptions
              ?.map((option) => {
                const optionInfo =
                  options?.find((o) => o.id === option.option_id) || null;
                return (optionInfo && optionInfo?.option_name) || ""; // オプション名が見つかった場合のみ取得
              })
              .join(",\n") || ""; // オプション名をカンマ区切りの文字列に変換
          // トリートメント, パーマ

          // 顧客に関連する商品の情報を取得
          const customerMerchandises =
            merchandise_customers?.filter(
              (merchandise) => merchandise.customer_id === customer.id
            ) || [];
          // [{customer_id: 1, merchandise_id: 1},
          // {customer_id: 1, merchandise_id: 2}]

          // 顧客に関連する商品名を取得し、カンマ区切りの文字列に変換
          const merchandiseNames: string =
            customerMerchandises
              ?.map((merchandise) => {
                const merchandiseInfo =
                  merchandises?.find(
                    (m) => m.id === merchandise.merchandise_id
                  ) || null;
                return (
                  (merchandiseInfo && merchandiseInfo?.merchandise_name) || ""
                ); // 商品名が見つかった場合のみ取得
              })
              .join(",\n") || ""; // 商品名をカンマ区切りの文字列に変換
          // シャンプー, コンディショナー

          // 顧客に関連する髪型の情報を取得
          const customerHairstyles =
            hairstyle_customers?.filter(
              (hairstyle) => hairstyle.customer_id === customer.id
            ) || [];
          // [{customer_id: 1, hairstyle_id: 1},
          // {customer_id: 1, hairstyle_id: 2}]

          // 顧客に関連する髪型名を取得し、カンマ区切りの文字列に変換
          const hairstyleNames: string =
            customerHairstyles
              ?.map((hairstyle) => {
                const hairstyleInfo =
                  hairstyles?.find((h) => h.id === hairstyle.hairstyle_id) ||
                  null;
                return (hairstyleInfo && hairstyleInfo?.hairstyle_name) || ""; // 髪型名が見つかった場合のみ取得
              })
              .join(",\n") || ""; // 髪型名をカンマ区切りの文字列に変換
          // ショート, ロング

          // 顧客に関連する担当者の情報を取得
          const customerUsers =
            customer_users?.filter(
              (user) => user.customer_id === customer.id
            ) || [];
          // [{customer_id: 1, user_id: 1}]

          // 顧客に関連する担当者名を取得し、カンマ区切りの文字列に変換
          const userNames: string = Array.isArray(users)
            ? customerUsers
                ?.map((user) => {
                  const userInfo = users.find((a) => a.id === user.user_id);
                  return (userInfo && userInfo?.name) || ""; // 担当者名が見つかった場合のみ取得
                })
                .join(",\n") || "" // 担当者名をカンマ区切りの文字列に変換
            : Object(users).name;

          // 田中店長

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
      ] || []
    : [];

  return (
    <div>
      <div>
        {cMessage && (
          <BasicAlerts
            type="success"
            message={cMessage}
            space={1}
            padding={0.6}
          />
        )}
        {cError && (
          <BasicAlerts type="error" message={cError} space={1} padding={0.6} />
        )}
      </div>
      {cStatus === "loading" || !nodes ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div className="mx-4">
          <div className="my-4 ">
            <RouterButton link="/customers/create" value="顧客新規作成" />
          </div>

          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            nodesProps={nodesProps}
            tHeaderItems={tHeaderItems}
            link="/customers"
            role={permission}
          />
        </div>
      )}
    </div>
  );
};

export default Customers;
