import ComponentTable from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { OptionState, getOption } from "../../slices/options/optionSlice";
import BasicAlerts from "../../components/elements/alert/BasicAlert";
import RouterButton from "../../components/elements/button/RouterButton";
import { useRouter, NextRouter } from "next/router";
import {
  optionError,
  optionErrorStatus,
  optionMessage,
  optionStatus,
  optionsStore,
} from "../../hooks/selector";
import { permissionStore } from "../../hooks/authSelector";
import { PermissionsState } from "../../slices/auth/permissionSlice";
import { allLogout, staffPermission } from "../../hooks/useMethod";
import _ from "lodash";
import { AppDispatch } from "../../redux/store";
import { renderError } from "../../pages/api_backend/errorHandler";
import { NodesProps, SearchItems, THeaderItems } from "../../types/interface";

const Options: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();

  const [tHeaderItems, setTHeaderItems] = useState<THeaderItems>([]);

  const options: OptionState[] = useSelector(optionsStore);
  const opStatus: string = useSelector(optionStatus);
  const opMessage: string | null = useSelector(optionMessage);
  const opError: string | null = useSelector(optionError);
  const oErrorStatus: number = useSelector(optionErrorStatus);

  const permission: PermissionsState = useSelector(permissionStore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        staffPermission(permission, router);

        if (permission === "オーナー") {
          setTHeaderItems(["オプション名", "価格", "編集", "削除"]);
        } else if (permission === "マネージャー") {
          setTHeaderItems(["オプション名", "価格", "編集"]);
        } else {
          setTHeaderItems(["オプション名", "価格"]);
        }

        if (
          _.isEmpty(options) &&
          (permission === "オーナー" ||
            permission === "マネージャー" ||
            permission === "スタッフ")
        ) {
          const response = await dispatch(getOption() as any);
          if (response.meta.requestStatus === "rejected") {
            const re = renderError(oErrorStatus, router, dispatch);
            if (re === null)
              throw new Error("オプション情報の取得に失敗しました");
          }
        }
      } catch (error) {
        allLogout(dispatch);
        router.push("/auth/login");
      }
    };

    if (permission) fetchData();
  }, [dispatch, permission]);

  const searchItems: SearchItems = [
    { key: "option_name", value: "オプション名" },
    { key: "price", value: "価格" },
  ];

  const nodesProps: NodesProps[] = [
    { text: "option_name" },
    { number: "price" },
  ];

  const nodes: OptionState[] = options;

  return (
    <div>
      {opMessage && (
        <BasicAlerts
          type="success"
          message={opMessage}
          space={1}
          padding={0.6}
        />
      )}

      {opError && (
        <BasicAlerts type="error" message={opError} space={1} padding={0.6} />
      )}
      {opStatus === "loading" || !nodes ? (
        <p>Loading...</p>
      ) : permission === null ? (
        <p>あなたに権限はありません。</p>
      ) : (
        <div className="mx-4">
          <div className="my-4">
            <RouterButton
              link="/options/create"
              value="オプション情報新規作成"
            />
          </div>

          <ComponentTable
            nodes={nodes}
            searchItems={searchItems}
            nodesProps={nodesProps}
            tHeaderItems={tHeaderItems}
            link="/options"
            role={permission}
          />
        </div>
      )}
    </div>
  );
};

export default Options;
