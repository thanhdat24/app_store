import { BillingPeriodModel } from "../../interfaces/BillingPeriod";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "../../utils/axios";

interface BillingPeriodState {
  billingPeriodList: BillingPeriodModel[] | null;
  error?: string | null;
}

const initialState: BillingPeriodState = {
  billingPeriodList: null,
};

const billingPeriod = createSlice({
  name: "billingPeriod",
  initialState,
  reducers: {
    getAllBillingPeriodSuccess(
      state,
      action: PayloadAction<BillingPeriodModel[]>
    ) {
      state.billingPeriodList = action.payload;
    },
  },
});

export const { getAllBillingPeriodSuccess } = billingPeriod.actions;

export const getAllBillingPeriod = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("/api/KYTHUs");
      const data: BillingPeriodModel[] = await response.data;
      const action: PayloadAction<BillingPeriodModel[]> =
        getAllBillingPeriodSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default billingPeriod.reducer;
