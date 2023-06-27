import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatisticsModel } from "../../interfaces/StatisticsModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";

interface StatisticState {
  filterStatisticList: StatisticsModel[] | null;
  statisticAllList: StatisticsModel | null;
  filterStaffStatisticList: StatisticsModel[] | null;
}

const initialState: StatisticState = {
  filterStatisticList: null,
  statisticAllList: null,
  filterStaffStatisticList: null,
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
    filterStaffStatisticsSuccess(
      state,
      action: PayloadAction<StatisticsModel[]>
    ) {
      state.filterStaffStatisticList = action.payload;
    },
  },
});

export const {
  filterStatisticsSuccess,
  getAllStatisticsSuccess,
  filterStaffStatisticsSuccess,
} = statisticsReducer.actions;

export const filterStatistics = (dataFilter: any) => {
  return async (dispatch: AppDispatch) => {
    try {
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

export const filterStaffStatistics = (dataFilter: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/TKnhanvien", dataFilter);
      const data: StatisticsModel[] = await response.data;
      const action: PayloadAction<StatisticsModel[]> =
        filterStaffStatisticsSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default statisticsReducer.reducer;
