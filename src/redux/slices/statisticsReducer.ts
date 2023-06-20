import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatisticsModel } from "../../interfaces/StatisticsModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";

interface StatisticState {
  filterStatisticList: StatisticsModel[] | null;
  statisticAllList: StatisticsModel | null;
}

const initialState: StatisticState = {
  filterStatisticList: null,
  statisticAllList: null,
};

const statisticsReducer = createSlice({
  name: "statisticsReducer",
  initialState,
  reducers: {
    filterStatisticsSuccess(state, action: PayloadAction<StatisticsModel[]>) {
      state.filterStatisticList = action.payload;
    },
    getAllStatisticsSuccess(state, action: PayloadAction<StatisticsModel[]>) {
      state.statisticAllList = action.payload[0];
    },
  },
});

export const { filterStatisticsSuccess, getAllStatisticsSuccess } =
  statisticsReducer.actions;

export const filterStatistics = (dataFilter: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log("dataFilter", dataFilter);
      const response = await axios.post("api/vd", dataFilter);
      const data: StatisticsModel[] = await response.data;
      const action: PayloadAction<StatisticsModel[]> =
        filterStatisticsSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllStatistics = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/vd");
      const data: StatisticsModel[] = await response.data;
      const action: PayloadAction<StatisticsModel[]> =
        getAllStatisticsSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default statisticsReducer.reducer;
