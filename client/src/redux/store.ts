import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import { useDispatch } from "react-redux";
import logger from "redux-logger";

// Redux ToolkitのconfigureStore関数を使用してReduxのストアを構成します。
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 作成したストアをデフォルトでエクスポートします。
export default store;

// 作成したストアの型をエクスポートします。
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
