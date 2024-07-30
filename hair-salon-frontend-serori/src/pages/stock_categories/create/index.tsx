import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStockCategory,
  Stock_categoryState,
} from "../../../store/stocks/stock_categories/stock_categorySlice";
import StockCategoryForm from "../../../components/elements/form/stocks/stock_categories/StockCategoriesForm";
import { useRouter, NextRouter } from "next/router";
import {
  stock_categoryStatus,
  stock_categoryError,
  stock_categoryErrorStatus,
} from "../../../components/Hooks/selector";
import RouterButton from "../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../redux/store";
import { renderError } from "../../../services/errorHandler";
import { PermissionsState } from "../../../store/auth/permissionSlice";
import { permissionStore } from "../../../components/Hooks/authSelector";

const StockCategoryCreate: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const scStatus: string = useSelector(stock_categoryStatus);
  const scError: string = useSelector(stock_categoryError);
  const scErrorStatus: number = useSelector(stock_categoryErrorStatus);

  const handleCreate = async (formData: Stock_categoryState) => {
    try {
      const response = await dispatch(createStockCategory(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/stock_categories");
      } else {
        const re = renderError(scErrorStatus, router, dispatch);
        if (re === null) throw new Error("在庫カテゴリの作成に失敗しました");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="min-h-full ">
      {scError && (
        <BasicAlerts type="error" message={scError} space={1} padding={1} />
      )}
      {scStatus === "loading" ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div>
          <div className="ml-4 mt-4">
            <RouterButton
              link={"/stock_categories"}
              value="在庫カテゴリ画面に戻る"
            />
          </div>

          <StockCategoryForm createStockCategory={handleCreate} />
        </div>
      )}
    </div>
  );
};

export default StockCategoryCreate;
