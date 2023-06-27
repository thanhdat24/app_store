import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";

interface PermissionRevenueRoutes {
  createPermissionRevenueSuccess: any | null;
  deletePermissionRoutesSuccess?: any | null;
}

const initialState: PermissionRevenueRoutes = {
  createPermissionRevenueSuccess: null,
  deletePermissionRoutesSuccess: null,
};

const permissionRevenueRoutesReducer = createSlice({
  name: "permissionRevenueRoutesReducer",
  initialState,
  reducers: {
    staffPermissionRoutesSuccess(state, action: PayloadAction<any>) {
      if (action.payload === 200) {
        state.createPermissionRevenueSuccess = action.payload;
        toast.success("Phân quyền thành công!", { autoClose: 2000 });
      }
    },
    deletePermissionRoutesSuccess(state, action: PayloadAction<any>) {
      if (action.payload.status === 200) {
        state.deletePermissionRoutesSuccess = action.payload.data;
        toast.success("Xóa quyền thành công!", { autoClose: 2000 });
      }
    },
    resetPermissionRoutesSuccess(state) {
      state.createPermissionRevenueSuccess = null;
      state.deletePermissionRoutesSuccess = null;
    },
  },
});

export const {
  staffPermissionRoutesSuccess,
  resetPermissionRoutesSuccess,
  deletePermissionRoutesSuccess,
} = permissionRevenueRoutesReducer.actions;
export const staffPermissionRoutes = (staffList: any[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`api/PHANQUYENTUYENTHUs`, staffList);
      const data: any = await response.status;
      const action: PayloadAction<any> = staffPermissionRoutesSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePermissionRoutes = (dataList: any[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/PHANQUYENTUYENTHUs`, {
        data: dataList,
      });
      const action: PayloadAction<any> =
        deletePermissionRoutesSuccess(response);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetPermissionRoutes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetPermissionRoutesSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
export default permissionRevenueRoutesReducer.reducer;
