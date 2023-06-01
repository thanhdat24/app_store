import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./slices/districtReducer";
import customerReducer from "./slices/customerReducer";
import customerTypeReducer from "./slices/customerTypeReducer";
import revenueStreamReducer from "./slices/revenueStreamReducer";
import adminReducer from "./slices/adminReducer";

export const store = configureStore({
  reducer: {
    district: districtReducer,
    customer: customerReducer,
    customerType: customerTypeReducer,
    revenueStream: revenueStreamReducer,
    admin: adminReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
