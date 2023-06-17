import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatisticsModel } from "../../interfaces/StatisticsModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";

interface StatisticState {
  statisticList: StatisticsModel[] | null;
}

const initialState: StatisticState = {
  statisticList: null,
};

const statisticsReducer = createSlice({
  name: "statisticsReducer",
  initialState,
  reducers: {
    getStatisticsSuccess(state, action: PayloadAction<StatisticsModel[]>) {
      state.statisticList = action.payload;
    },
  },
});

export const { getStatisticsSuccess } = statisticsReducer.actions;

export const getStatistics = (dataFilter: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log("dataFilter", dataFilter);
      const response = await axios.post("api/vd", dataFilter);
      const data: StatisticsModel[] = await response.data;
      const action: PayloadAction<StatisticsModel[]> =
        getStatisticsSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default statisticsReducer.reducer;
