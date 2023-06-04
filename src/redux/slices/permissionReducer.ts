import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { PermissionModel } from "../../interfaces/PermissionModel";

interface PermissionState {
  permissionList: PermissionModel[] | null;
  detailPermissionSuccess?: PermissionModel | null;
  createPermissionSuccess?: PermissionModel | null;
  updatePermissionSuccess?: Number | null;
  deletePermissionSuccess?: PermissionModel | null;
  error?: string | null;
}

const initialState: PermissionState = {
  permissionList: null,
  detailPermissionSuccess: null,
  createPermissionSuccess: null,
  updatePermissionSuccess: null,
  deletePermissionSuccess: null,
  error: null,
};

const permissionReducer = createSlice({
  name: "permissionReducer",
  initialState,
  reducers: {

    hasError(state, action) {
      state.error = action.payload;
      const { TENQUYEN } = action.payload;
      if (TENQUYEN?.length > 0)
        toast.error(TENQUYEN[0], { autoClose: 2000 });
      },

    getAllPermissionsSuccess(state, action: PayloadAction<PermissionModel[]>) {
      state.permissionList = action.payload;
    },
    getDetailPermissionsSuccess(state, action: PayloadAction<PermissionModel>) {
      state.detailPermissionSuccess = action.payload;
    },
    createPermissionSuccess(state, action: PayloadAction<PermissionModel>) {
      state.createPermissionSuccess = action.payload;
      toast.success("Tạo thành công!", { autoClose: 2000 });
    },
    updatePermissionSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updatePermissionSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    deletePermissionSuccess(state, action: PayloadAction<PermissionModel>) {
      state.deletePermissionSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
    resetPermissionSuccess(state) {
      state.createPermissionSuccess = null;
      state.updatePermissionSuccess = null;
      state.deletePermissionSuccess = null;
    },
  },
});

export const {
  getAllPermissionsSuccess,
  getDetailPermissionsSuccess,
  createPermissionSuccess,
  updatePermissionSuccess,
  deletePermissionSuccess,
  resetPermissionSuccess,
  hasError,
} = permissionReducer.actions;

export const getAllPermissions = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/QUYENs");
      const data: PermissionModel[] = await response.data;
      const action: PayloadAction<PermissionModel[]> =
        getAllPermissionsSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPermission = (permission: PermissionModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/QUYENs", permission);
      const data: PermissionModel = await response.data;
      const action: PayloadAction<PermissionModel> =
        createPermissionSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const updatePermission = (permission: PermissionModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `api/QUYENs/${permission.IDQUYEN}`,
        permission
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updatePermissionSuccess(data);
      dispatch(action);
      console.log(response);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const deletePermission = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/QUYENs/${id}`);
      const data: PermissionModel = await response.data;
      const action: PayloadAction<PermissionModel> =
        deletePermissionSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetPermission = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetPermissionSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default permissionReducer.reducer;
