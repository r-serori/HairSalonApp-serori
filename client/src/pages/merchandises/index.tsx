import ComponentTable from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  MerchandiseState,
  getMerchandise,
} from "../../slices/merchandises/merchandiseSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import RouterButton from "../../components/elements/button/RouterButton";
import { useRouter, NextRouter } from "next/router";
import {
  merchandiseStore,
  merchandiseStatus,
  merchandiseMessage,
  merchandiseError,
  merchandiseErrorStatus,
} from "../../hooks/selector";
import { permissionStore } from "../../hooks/authSelector";
import { staffPermission } from "../../hooks/useMethod";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import _ from "lodash";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../api_backend/errorHandler";
import { NodesProps, SearchItems, THeaderItems } from "../../types/interface";
import LoadingComponent from "../../components/loading/Loading";

const Merchandises = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const [tHeaderItems, setTHeaderItems] = useState<THeaderItems>([]);

  const permission: PermissionsState = useSelector(permissionStore);

  const merchandises: MerchandiseState[] = useSelector(merchandiseStore);
  const mStatus: string = useSelector(merchandiseStatus);
  const mMessage: string | null = useSelector(merchandiseMessage);
  const mError: string | null = useSelector(merchandiseError);
  const mErrorStatus: number = useSelector(merchandiseErrorStatus);

  useEffect(() => {
    const fetchData = async () => {
      try {
        staffPermission(permission, router);
        if (permission === "オーナー") {
          setTHeaderItems(["物販名", "価格", "編集", "削除"]);
        } else if (permission === "マネージャー") {
          setTHeaderItems(["物販名", "価格", "編集"]);
        } else {
          setTHeaderItems(["物販名", "価格"]);
        }
        if (
          merchandises.length === 0 &&
          (permission === "オーナー" ||
            permission === "マネージャー" ||
            permission === "スタッフ")
        ) {
          const response = await dispatch(getMerchandise() as any);
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(mErrorStatus, router, dispatch);
            if (re === null) throw new Error("物販情報の取得に失敗しました");
          }
        }
      } catch (error) {
        return;
      }
    };

    if (permission) fetchData();
  }, [dispatch, permission]);

  const searchItems: SearchItems = [
    { key: "merchandise_name", value: "物販名" },
    { key: "price", value: "価格" },
  ];

  const nodesProps: NodesProps[] = [
    { text: "merchandise_name" },
    { number: "price" },
  ];

  const nodes: MerchandiseState[] = merchandises;

  return (
    <div>
      {mMessage && (
        <BasicAlerts
          type="success"
          message={mMessage}
          space={1}
          padding={0.6}
        />
      )}

      {mError && (
        <BasicAlerts type="error" message={mError} space={1} padding={0.6} />
      )}
      {(mStatus === "loading" || !nodes) && permission ? (
        <LoadingComponent />
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div className="mx-4">
          <div className="my-4">
            <RouterButton
              link="/merchandises/create"
              value="物販情報新規作成"
            />
          </div>

          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            nodesProps={nodesProps}
            tHeaderItems={tHeaderItems}
            link="/merchandises"
            role={permission}
          />
        </div>
      )}
    </div>
  );
};

export default Merchandises;
