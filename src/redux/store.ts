import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./slices/districtReducer";
import customerReducer from "./slices/customerReducer";
import customerTypeReducer from "./slices/customerTypeReducer";
import wardReducer from "./slices/wardReducer";
import permissionReducer from "./slices/permissionReducer";
import revenueRoutesReducer from "./slices/revenueRoutesReducer";
import staffReducer from "./slices/staffReducer";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    customerType: customerTypeReducer,
    district: districtReducer,
    ward: wardReducer,
    permission: permissionReducer,
    staff: staffReducer,
    revenueRoutes: revenueRoutesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
