import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import { updateStock, StockState } from "../../../../slices/stocks/stockSlice";
import StockForm from "../../../../components/elements/form/stocks/StockForm";
import {
  stockStatus,
  stocksStore,
  stockError,
  stockErrorStatus,
} from "../../../../hooks/selector";
import RouterButton from "../../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../../redux/store";
import { renderError } from "../../../../pages/api/errorHandler";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../../hooks/authSelector";

const StockEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const { id } = router.query; // idを取得

  const stocks: StockState = useSelector(stocksStore)?.find(
    (stock: StockState) => stock.id === Number(id)
  ) || {
    id: 0,
    product_name: "",
    product_price: 0,
    quantity: 0,
    remarks: "",
    supplier: "",
    notice: 0,
    stock_category_id: 0,
  };

  const sStatus: string = useSelector(stockStatus);
  const sError: string = useSelector(stockError);
  const sErrorStatus: number = useSelector(stockErrorStatus);

  const handleUpdate = async (formData: StockState) => {
    try {
      const response = await dispatch(updateStock(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/stocks");
      } else {
        const res = renderError(sErrorStatus, router, dispatch);
        if (res === null) throw new Error("在庫の更新に失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-full">
      {sError && (
        <BasicAlerts type="error" message={sError} space={1} padding={1} />
      )}
      {sStatus === "loading" ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="mt-4 ml-4">
            <RouterButton link={"/stocks"} value="在庫画面に戻る" />
          </div>

          <StockForm node={stocks} createStock={handleUpdate} edit={true} />
        </div>
      )}
    </div>
  );
};

export default StockEdit;
