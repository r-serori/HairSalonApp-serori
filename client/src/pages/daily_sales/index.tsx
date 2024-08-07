import ComponentTable from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Daily_salesState,
  getDaily_sales,
} from "../../slices/daily_sales/daily_saleSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import RouterButton from "../../components/elements/button/RouterButton";
import { useRouter, NextRouter } from "next/router";
import {
  daily_saleError,
  daily_saleErrorStatus,
  daily_saleMessage,
  daily_salesStore,
  daily_saleStatus,
} from "../../hooks/selector";
import { ownerPermission } from "../../hooks/useMethod";
import _ from "lodash";
import { permissionStore } from "../../hooks/authSelector";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import EasyModal from "../../components/modal/EasyModal";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../api_backend/errorHandler";
import { NodesProps, SearchItems } from "../../types/interface";
import LoadingComponent from "@/components/loading/Loading";

const Daily_sales: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const [tHeaderItems, setTHeaderItems] = useState<string[]>([]);
  const [salesOpen, setSalesOpen] = useState<boolean>(false);
  const [yearMonth, setYearMonth] = useState<string>("");

  const daily_sales: Daily_salesState[] = useSelector(daily_salesStore);
  const dsStatus: string | null = useSelector(daily_saleStatus);
  const dsMessage: string | null = useSelector(daily_saleMessage);
  const dsError: string | null = useSelector(daily_saleError);
  const dsErrorStatus: number = useSelector(daily_saleErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  const nowDailySales = async () => {
    try {
      const response = await dispatch(getDaily_sales() as any);

      if (response.meta.requestStatus === "rejected") {
        const re = renderError(dsErrorStatus, router, dispatch);
        if (re === null) {
          throw new Error("日別売上の取得に失敗しました");
        }
      }
      setYearMonth("");
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        ownerPermission(permission, router);

        if (permission === "オーナー") {
          setTHeaderItems(["日付", "売上", "編集", "削除"]);
        } else {
          router.push("/dashboard");
        }

        if (daily_sales.length === 0 && permission === "オーナー") {
          const response = await dispatch(getDaily_sales() as any);
          setYearMonth("");
          localStorage.removeItem("ds_year");
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(dsErrorStatus, router, dispatch);
            if (re === null) {
              throw new Error("日別売上の取得に失敗しました");
            }
          }
        }
      } catch (error) {
        return;
      }
    };

    if (permission) fetchData();
  }, [dispatch, permission]);

  const searchItems: SearchItems = [
    { key: "date", value: "日付" },
    { key: "daily_sales", value: "売上" },
  ];

  const nodesProps: NodesProps[] = [
    { text: "date" },
    { number: "daily_sales" },
  ];

  const nodes: Daily_salesState[] = daily_sales;

  return (
    <div>
      {dsMessage && (
        <BasicAlerts
          type="success"
          message={dsMessage}
          space={1}
          padding={0.6}
        />
      )}
      {dsError && (
        <BasicAlerts type="error" message={dsError} space={1} padding={0.6} />
      )}

      {(dsStatus === "loading" || !nodes) && permission ? (
        <LoadingComponent />
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div className="mx-4">
          <div className="flex justify-between items-center my-4">
            <div className="flex justify-start items-center gap-4 ">
              {yearMonth === "" && (
                <EasyModal
                  open={salesOpen}
                  setOpen={setSalesOpen}
                  whoAreYou="dailySales"
                  yearMonth={yearMonth}
                  setYearMonth={setYearMonth}
                />
              )}
              {yearMonth !== "" && (
                <button
                  className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-md text-bold px-4 py-2 text-center "
                  onClick={() => {
                    nowDailySales();
                  }}
                >
                  現在の年月に戻す
                </button>
              )}
            </div>
            <div className="flex justify-end items-center gap-4">
              <RouterButton link="/monthly_sales" value="月次売上画面へ" />
              <RouterButton link="/yearly_sales" value="年次売上画面へ" />
            </div>
          </div>

          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            nodesProps={nodesProps}
            tHeaderItems={tHeaderItems}
            link="/daily_sales"
            role={permission}
          />
        </div>
      )}
    </div>
  );
};

export default Daily_sales;
