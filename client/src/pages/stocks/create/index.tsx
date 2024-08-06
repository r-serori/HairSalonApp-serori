import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStock, StockState } from "../../../slices/stocks/stockSlice";
import StockForm from "../../../components/elements/form/stocks/StockForm";
import { useRouter, NextRouter } from "next/router";
import {
  stockStatus,
  stockError,
  stockErrorStatus,
} from "../../../hooks/selector";
import RouterButton from "../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../redux/store";
import { renderError } from "../../../api_backend/errorHandler";
import { PermissionsState } from "../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../hooks/authSelector";

const StockCreate: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const sStatus: string = useSelector(stockStatus);
  const sError: string = useSelector(stockError);
  const sErrorState: number = useSelector(stockErrorStatus);

  const handleCreate = async (formData: StockState) => {
    try {
      const response = await dispatch(createStock(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/stocks");
      } else {
        const re = renderError(sErrorState, router, dispatch);
        if (re === null) throw new Error("在庫の作成に失敗しました");
      }
    } catch (error) {
      return;
    }
  };
  return (
    <div className="min-h-full ">
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

          <StockForm createStock={handleCreate} />
        </div>
      )}
    </div>
  );
};

export default StockCreate;
