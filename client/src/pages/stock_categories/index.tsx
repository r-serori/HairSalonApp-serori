import ComponentTable from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Stock_categoryState,
  getStockCategory,
} from "../../slices/stocks/stock_categories/stock_categorySlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import RouterButton from "../../components/elements/button/RouterButton";
import { useRouter, NextRouter } from "next/router";
import {
  stock_categoryMessage,
  stock_categoryStatus,
  stock_categoryError,
  stock_categoriesStore,
  stock_categoryErrorStatus,
} from "../../hooks/selector";
import { permissionStore } from "../../hooks/authSelector";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { staffPermission } from "../../hooks/useMethod";
import _ from "lodash";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../api_backend/errorHandler";
import { NodesProps, SearchItems, THeaderItems } from "../../types/interface";

const Stock_categories = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const [tHeaderItems, setTHeaderItems] = useState<THeaderItems>([]);

  const stockCategories: Stock_categoryState[] = useSelector(
    stock_categoriesStore
  );
  const scStatus: string = useSelector(stock_categoryStatus);
  const scMessage: string | null = useSelector(stock_categoryMessage);
  const scError: string | null = useSelector(stock_categoryError);
  const scErrorStatus: number = useSelector(stock_categoryErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        staffPermission(permission, router);
        if (permission === "オーナー") {
          setTHeaderItems(["在庫カテゴリ名", "編集", "削除"]);
        } else if (permission === "マネージャー") {
          setTHeaderItems(["在庫カテゴリ名", "編集"]);
        } else {
          setTHeaderItems(["在庫カテゴリ名"]);
        }
        if (
          stockCategories.length === 0 &&
          (permission === "オーナー" ||
            permission === "マネージャー" ||
            permission === "スタッフ")
        ) {
          const response = await dispatch(getStockCategory() as any);
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(scErrorStatus, router, dispatch);
            if (re === null)
              throw new Error("在庫カテゴリ情報の取得に失敗しました");
          }
        }
      } catch (error) {
        return;
      }
    };

    if (permission) fetchData();
  }, [dispatch, permission]);

  const searchItems: SearchItems = [
    { key: "category", value: "在庫カテゴリ名" },
  ];

  const nodesProps: NodesProps[] = [{ text: "category" }];

  const nodes: Stock_categoryState[] = stockCategories;

  return (
    <div>
      {scMessage && (
        <BasicAlerts
          type="success"
          message={scMessage}
          space={1}
          padding={0.6}
        />
      )}
      {scError && (
        <BasicAlerts type="error" message={scError} space={1} padding={0.6} />
      )}
      {scStatus === "loading" ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div className="mx-4">
          <div className="flex justify-between my-4">
            <RouterButton link="/stocks" value="在庫画面に戻る" />
            <RouterButton
              link="/stock_categories/create"
              value="在庫カテゴリ新規作成"
            />
          </div>

          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            nodesProps={nodesProps}
            tHeaderItems={tHeaderItems}
            link="/stock_categories"
            role={permission}
          />
        </div>
      )}
    </div>
  );
};

export default Stock_categories;
