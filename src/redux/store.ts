import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";

const isDev = process.env.NODE_ENV !== "production";

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
    devTools: isDev,
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
