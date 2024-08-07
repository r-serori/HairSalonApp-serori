import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import {
  daily_saleError,
  daily_saleErrorStatus,
  daily_salesStore,
  daily_saleStatus,
} from "../../../../hooks/selector";
import { Daily_salesState } from "../../../../slices/daily_sales/daily_saleSlice";
import { updateDaily_sales } from "../../../../slices/daily_sales/daily_saleSlice";
import DailySalesForm from "../../../../components/elements/form/sales/daily_sales/Daily_salesForm";
import RouterButton from "../../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../../redux/store";
import { renderError } from "../../../../api_backend/errorHandler";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../../hooks/authSelector";
import LoadingComponent from "@/components/loading/Loading";

const DailySalesEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const dsStatus: string = useSelector(daily_saleStatus);
  const dsError: string = useSelector(daily_saleError);
  const dsErrorStatus: number = useSelector(daily_saleErrorStatus);

  const { id } = router.query; // idを取得

  const dailySale: Daily_salesState = useSelector(daily_salesStore)?.find(
    (dailySale: Daily_salesState) => dailySale.id === Number(id)
  ) || {
    id: 0,
    date: "",
    daily_sales: 0,
  };

  const handleUpdate = async (formData: {
    id: number;
    date: string;
    daily_sales: number;
  }) => {
    try {
      const response = await dispatch(updateDaily_sales(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/daily_sales");
      } else {
        const re = renderError(dsErrorStatus, router, dispatch);
        if (re === null) throw new Error("日別売上の更新に失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-full ">
      {dsError && (
        <BasicAlerts type="error" message={dsError} space={1} padding={1} />
      )}
      {dsStatus === "loading" && permission ? (
        <LoadingComponent />
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <BasicAlerts
            message={
              "日付変更はできません！変更したい場合は、日次売上画面から項目を削除し、予約画面から更新し直してください！"
            }
            type={"info"}
            padding={1}
            space={1}
          />
          <div className=" my-4 mx-4">
            <RouterButton link={"/daily_sales"} value="日別売上画面に戻る" />
          </div>

          <DailySalesForm node={dailySale} createDailySales={handleUpdate} />
        </div>
      )}
    </div>
  );
};

export default DailySalesEdit;
