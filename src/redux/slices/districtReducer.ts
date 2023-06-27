import { DistrictModel } from "./../../interfaces/DistrictModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";
import { toast } from "react-toastify";

interface DistrictState {
  districtList: DistrictModel[] | null;
  detailDistrictSuccess?: DistrictModel | null;
  createDistrictSuccess?: DistrictModel | null;
  updateDistrictSuccess?: Number | null;
  deleteDistrictSuccess?: DistrictModel | null;
  error?: string | null;
}

const initialState: DistrictState = {
  districtList: null,
  detailDistrictSuccess: null,
  createDistrictSuccess: null,
  updateDistrictSuccess: null,
  deleteDistrictSuccess: null,
  error: null,
};

const districtReducer = createSlice({
  name: "districtReducer",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
      const { TENQUANHUYEN } = action.payload;
      if (TENQUANHUYEN?.length > 0)
        toast.error(TENQUANHUYEN[0], { autoClose: 2000 });
      },

    getAllDistrictSuccess(state, action: PayloadAction<DistrictModel[]>) {
      state.districtList = action.payload;
    },
    getDetailDistrictSuccess(state, action: PayloadAction<DistrictModel>) {
      state.detailDistrictSuccess = action.payload;
    },
    createDistrictSuccess(state, action: PayloadAction<DistrictModel>) {
      state.createDistrictSuccess = action.payload;
      toast.success("Tạo thành công!", { autoClose: 2000 });
    },
    updateDistrictSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updateDistrictSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    deleteDistrictSuccess(state, action: PayloadAction<DistrictModel>) {
      state.deleteDistrictSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
    resetDistrictSuccess(state) {
      state.createDistrictSuccess = null;
      state.updateDistrictSuccess = null;
      state.deleteDistrictSuccess = null;
    },
  },
});

export const {
  getAllDistrictSuccess,
  getDetailDistrictSuccess,
  createDistrictSuccess,
  updateDistrictSuccess,
  deleteDistrictSuccess,
  resetDistrictSuccess,
  hasError,
} = districtReducer.actions;

export const getAllDistricts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/QUANHUYENs");
      const data: DistrictModel[] = await response.data;
      const action: PayloadAction<DistrictModel[]> =
        getAllDistrictSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailDistrict = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`api/QUANHUYENs/${id}`);
      const data: DistrictModel = await response.data;
      const action: PayloadAction<DistrictModel> =
        getDetailDistrictSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createDistrict = (district: DistrictModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/QUANHUYENs", district);
      const data: DistrictModel = await response.data;
      const action: PayloadAction<DistrictModel> = createDistrictSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const updateDistrict = (district: DistrictModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `api/QUANHUYENs/${district.IDQUANHUYEN}`,
        district
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateDistrictSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const deleteDistrict = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/QUANHUYENs/${id}`);
      const data: DistrictModel = await response.data.content;
      const action: PayloadAction<DistrictModel> = deleteDistrictSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetDistrict = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetDistrictSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default districtReducer.reducer;
