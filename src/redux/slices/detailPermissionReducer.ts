import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";

interface DetailPermissionState {
  createDetailPermissionSuccess: any | null;
  deleteDetailPermissionSuccess?: any | null;
}

const initialState: DetailPermissionState = {
  createDetailPermissionSuccess: null,
  deleteDetailPermissionSuccess: null,
};

const detailPermissionReducer = createSlice({
  name: "detailPermissionReducer",
  initialState,
  reducers: {
    employeePermissionSuccess(state, action: PayloadAction<any>) {
      if (action.payload === 204) {
        state.createDetailPermissionSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    deleteDetailPermissionSuccess(state, action: PayloadAction<any>) {
      if (action.payload === 200) {
        state.deleteDetailPermissionSuccess = action.payload;
        toast.success("Xóa thành công!", { autoClose: 2000 });
      }
    },
    resetEmployeePermissionSuccess(state) {
      state.createDetailPermissionSuccess = null;
      state.deleteDetailPermissionSuccess = null;
    },
  },
});

export const {
  employeePermissionSuccess,
  deleteDetailPermissionSuccess,
  resetEmployeePermissionSuccess,
} = detailPermissionReducer.actions;

export const employeePermission = (detailPermissionSuccess: any[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        "api/CHITIETPHANQUYENs",
        detailPermissionSuccess
      );
      const data: any = await response.status;
      console.log("data", data);
      const action: PayloadAction<any> = employeePermissionSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteDetailPermission = (detailPermission: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log("detailPermission", detailPermission);
      const response = await axios.delete(`api/CHITIETPHANQUYENs`, {
        data: detailPermission,
      });
      const data: any = await response.status;
      const action: PayloadAction<any> = deleteDetailPermissionSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log("error123", error);
    }
  };
};

export const resetEmployeePermission = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetEmployeePermissionSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default detailPermissionReducer.reducer;
