import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RevenueStreamModel } from "../../interfaces/RevenueStreamModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";

interface RevenueStreamState {
  revenueStreamList: RevenueStreamModel[] | null;
}

const initialState: RevenueStreamState = {
  revenueStreamList: null,
};

const revenueStreamReducer = createSlice({
  name: "revenueStreamReducer",
  initialState,
  reducers: {
    getAlRevenueStreamSuccess(
      state,
      action: PayloadAction<RevenueStreamModel[]>
    ) {
      state.revenueStreamList = action.payload;
    },
  },
});

export const { getAlRevenueStreamSuccess } = revenueStreamReducer.actions;

export const getAlRevenueStream = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/TUYENTHUs");
      const data: RevenueStreamModel[] = await response.data;
      const action: PayloadAction<RevenueStreamModel[]> =
        getAlRevenueStreamSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default revenueStreamReducer.reducer;
