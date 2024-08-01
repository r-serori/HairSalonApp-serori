import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, NextRouter } from "next/router";
import {
  Stock_categoryState,
  updateStockCategory,
} from "../../../../slices/stocks/stock_categories/stock_categorySlice";
import StockCategoryForm from "../../../../components/elements/form/stocks/stock_categories/StockCategoriesForm";
import {
  stock_categoryStatus,
  stock_categoriesStore,
  stock_categoryError,
  stock_categoryErrorStatus,
} from "../../../../hooks/selector";
import RouterButton from "../../../../components/elements/button/RouterButton";
import BasicAlerts from "../../../../components/elements/alert/BasicAlert";
import { AppDispatch } from "../../../../redux/store";
import { renderError } from "../../../../pages/api_backend/errorHandler";
import { PermissionsState } from "../../../../slices/auth/permissionSlice";
import { permissionStore } from "../../../../hooks/authSelector";

const StockCategoryEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const permission: PermissionsState = useSelector(permissionStore);

  const { id } = router.query; // idを取得

  const stockCategory: Stock_categoryState = useSelector(
    stock_categoriesStore
  )?.find(
    (stockCategory: Stock_categoryState) => stockCategory.id === Number(id)
  ) || {
    id: 0,
    category: "",
  };

  const scStatus: string = useSelector(stock_categoryStatus);
  const scError: string = useSelector(stock_categoryError);
  const scErrorStatus: number = useSelector(stock_categoryErrorStatus);

  const handleUpdate = async (formData: Stock_categoryState) => {
    try {
      const response = await dispatch(updateStockCategory(formData) as any);

      if (response.meta.requestStatus === "fulfilled") {
        router.push("/stock_categories");
      } else {
        const re = renderError(scErrorStatus, router, dispatch);
        if (re === null) throw new Error("在庫カテゴリの更新に失敗しました");
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
          <div className="mt-4 ml-4">
            <RouterButton
              link={"/stock_categories"}
              value="在庫カテゴリ画面に戻る"
            />
          </div>

          <StockCategoryForm
            node={stockCategory}
            createStockCategory={handleUpdate}
            edit={true}
          />
        </div>
      )}
    </div>
  );
};

export default StockCategoryEdit;
