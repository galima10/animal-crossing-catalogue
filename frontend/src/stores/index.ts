import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./features/headerSlice";
import itemsReducer from "./features/itemsSlice";

export const store = configureStore({
  reducer: {
    header: headerReducer,
    item: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
