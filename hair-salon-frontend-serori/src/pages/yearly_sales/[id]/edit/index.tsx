import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import {
  yearly_salesStore,
  yearly_saleStatus,
  yearly_saleError,
  yearly_saleErrorStatus,
} from "../../../../hooks/selector";
import { Yearly_salesState } from "../../../../slices/yearly_sales/yearly_saleSlice";
import { updateYearly_sales } from "../../../../slices/yearly_sales/yearly_saleSlice";
import YearlySalesForm from "../../../../components/elements/form/sales/yearly_sales/Yearly_salesForm";
import RouterButton from "../../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../../redux/store";
import { renderError } from "../../../../api_backend/errorHandler";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../../hooks/authSelector";

const YearlySalesEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const { id } = router.query; // idを取得

  const yearlySale: Yearly_salesState = useSelector(yearly_salesStore)?.find(
    (yearlySale: Yearly_salesState) => yearlySale.id === Number(id)
  ) || {
    id: 0,
    year: "",
    yearly_sales: 0,
  };

  const ysStatus: string = useSelector(yearly_saleStatus);
  const ysError: string | null = useSelector(yearly_saleError);
  const ysErrorStatus: number = useSelector(yearly_saleErrorStatus);

  const handleUpdate = async (formData: Yearly_salesState) => {
    try {
      const response = await dispatch(updateYearly_sales(formData) as any);
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/yearly_sales");
      } else {
        const re = renderError(ysErrorStatus, router, dispatch);
        if (re === null) throw new Error("年次売上の更新に失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-full ">
      {ysError && (
        <BasicAlerts type="error" message={ysError} space={1} padding={1} />
      )}
      {ysStatus === "loading" ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <BasicAlerts
            message={
              "日付変更はできません！変更したい場合は、年次売上画面から項目を削除し、予約画面から更新し直してください！"
            }
            type={"info"}
            padding={1}
            space={1}
          />
          <div className="my-4 mx-4">
            <RouterButton link={"/yearly_sales"} value="年次売上画面に戻る" />
          </div>

          <YearlySalesForm node={yearlySale} createYearlySales={handleUpdate} />
        </div>
      )}
    </div>
  );
};

export default YearlySalesEdit;
