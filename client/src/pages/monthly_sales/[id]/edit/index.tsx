import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import {
  monthly_salesStore,
  monthly_saleStatus,
  monthly_saleError,
  monthly_saleErrorStatus,
} from "../../../../hooks/selector";
import { Monthly_salesState } from "../../../../slices/monthly_sales/monthly_saleSlice";
import { updateMonthly_sales } from "../../../../slices/monthly_sales/monthly_saleSlice";
import MonthlySalesForm from "../../../../components/elements/form/sales/monthly_sales/Monthly_salesForm";
import RouterButton from "../../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../../redux/store";
import { renderError } from "../../../../api_backend/errorHandler";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../../hooks/authSelector";
import LoadingComponent from "@/components/loading/Loading";

const MonthlySalesEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const { id } = router.query; // idを取得

  const monthlySale: Monthly_salesState = useSelector(monthly_salesStore)?.find(
    (monthlySale: Monthly_salesState) => monthlySale.id === Number(id)
  ) || {
    id: 0,
    year_month: "",
    monthly_sales: 0,
  };

  const msStatus: string = useSelector(monthly_saleStatus);
  const msError: string = useSelector(monthly_saleError);
  const msErrorStatus: number = useSelector(monthly_saleErrorStatus);

  const handleUpdate = async (formData: Monthly_salesState) => {
    try {
      const response = await dispatch(updateMonthly_sales(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/monthly_sales");
      } else {
        const re = renderError(msErrorStatus, router, dispatch);
        if (re === null) throw new Error("月次売上の更新に失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-full ">
      {msError && (
        <BasicAlerts type="error" message={msError} space={1} padding={1} />
      )}
      {msStatus === "loading" && permission ? (
        <LoadingComponent />
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <BasicAlerts
            message={
              "日付変更はできません！変更したい場合は、月次売上画面から項目を削除し、予約画面から更新し直してください！"
            }
            type={"info"}
            padding={1}
            space={1}
          />
          <div className="my-4 mx-4">
            <RouterButton link={"/monthly_sales"} value="日別売上画面に戻る" />
          </div>

          <MonthlySalesForm
            node={monthlySale}
            createMonthlySales={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default MonthlySalesEdit;
