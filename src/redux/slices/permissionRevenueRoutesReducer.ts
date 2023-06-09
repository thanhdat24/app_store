import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";

interface PermissionRevenueRoutes {
  createPermissionRevenueSuccess: any | null;
}

const initialState: PermissionRevenueRoutes = {
  createPermissionRevenueSuccess: null,
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
    resetPermissionRoutesSuccess(state) {
      state.createPermissionRevenueSuccess = null;
    },
  },
});

export const { staffPermissionRoutesSuccess, resetPermissionRoutesSuccess } =
  permissionRevenueRoutesReducer.actions;
export const staffPermissionRoutes = (staffList: any[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log("staffList", staffList);
      const response = await axios.post(`api/PHANQUYENTUYENTHUs`, staffList);
      const data: any = await response.status;
      const action: PayloadAction<any> = staffPermissionRoutesSuccess(data);
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
