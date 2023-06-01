import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { StaffModel } from "../../interfaces/StaffModel";

interface StaffState {
  staffList: StaffModel[] | null;
  detailStaffSuccess?: StaffModel | null;
  createStaffSuccess?: StaffModel | null;
  updateStaffSuccess?: Number | null;
  deleteStaffSuccess?: StaffModel | null;
}

const initialState: StaffState = {
  staffList: null,
  detailStaffSuccess: null,
  createStaffSuccess: null,
  updateStaffSuccess: null,
  deleteStaffSuccess: null,
};

const staffReducer = createSlice({
  name: "staffReducer",
  initialState,
  reducers: {
    getAllStaffSuccess(state, action: PayloadAction<StaffModel[]>) {
      state.staffList = action.payload;
    },
    getDetailStaffSuccess(state, action: PayloadAction<StaffModel>) {
      state.detailStaffSuccess = action.payload;
    },
    createStaffSuccess(state, action: PayloadAction<StaffModel>) {
      state.createStaffSuccess = action.payload;
      toast.success("Tạo thành công!", { autoClose: 2000 });
    },
    updateStaffSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updateStaffSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
      toast.success("Cập nhật thành công!", { autoClose: 2000 });
    },
    deleteStaffSuccess(state, action: PayloadAction<StaffModel>) {
      state.deleteStaffSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
    resetStaffSuccess(state) {
      state.updateStaffSuccess = null;
      state.deleteStaffSuccess = null;
    },
  },
});

export const {
  getAllStaffSuccess,
  getDetailStaffSuccess,
  createStaffSuccess,
  updateStaffSuccess,
  deleteStaffSuccess,
  resetStaffSuccess,
} = staffReducer.actions;

export const getAllStaff = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/NHANVIENs");
      const data: StaffModel[] = await response.data;
      const action: PayloadAction<StaffModel[]> = getAllStaffSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailStaff = (id: Number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`api/NHANVIENs/${id}`);
      const data: StaffModel = await response.data;
      const action: PayloadAction<StaffModel> = getDetailStaffSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createStaff = (staff: StaffModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/NHANVIENs", staff);
      const data: StaffModel = await response.data;
      const action: PayloadAction<StaffModel> = createStaffSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateStaff = (staff: StaffModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `api/NHANVIENs/${staff.IDNHANVIEN}`,
        staff
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateStaffSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteStaff = (id: Number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/NHANVIENs/${id}`);
      const data: StaffModel = await response.data.content;
      const action: PayloadAction<StaffModel> = deleteStaffSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetStaff = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetStaffSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default staffReducer.reducer;
