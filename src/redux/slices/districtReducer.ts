import { DistrictModel } from "./../../interfaces/DistrictModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";

interface DistrictState {
  districtList: DistrictModel[] | null;
  postDistrictSuccess: null;
}

const initialState: DistrictState = {
  districtList: null,
  postDistrictSuccess: null,
};

const districtReducer = createSlice({
  name: "districtReducer",
  initialState,
  reducers: {
    getAllDistrictSuccess(state, action: PayloadAction<DistrictModel[]>) {
      state.districtList = action.payload;
    },
    postDistrictSuccess(state, action: PayloadAction<DistrictModel>) {
      console.log(action);
    },
  },
});

export const { getAllDistrictSuccess, postDistrictSuccess } =
  districtReducer.actions;

export const getAllDistrict = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios({
        url: "https://localhost:44363/api/QUANHUYENs",
        method: "GET",
      });
      const data: DistrictModel[] = await response.data.content;
      const action: PayloadAction<DistrictModel[]> =
        getAllDistrictSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const postDistrict = (dataDistrict: DistrictModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios({
        url: "https://localhost:44363/api/QUANHUYENs",
        method: "POST",
        data: dataDistrict,
      });
      const data: DistrictModel = await response.data.content;
      const action: PayloadAction<DistrictModel> = postDistrictSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default districtReducer.reducer;
