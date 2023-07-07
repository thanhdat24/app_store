import { WardModel } from "../../interfaces/WardModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";
import { toast } from "react-toastify";

interface WardState {
  wardList: WardModel[] | null;
  detailWardSuccess?: WardModel | null;
  createWardSuccess?: WardModel | null;
  updateWardSuccess?: Number | null;
  deleteWardSuccess?: WardModel | null;
  error?: string | null;
}

const initialState: WardState = {
  wardList: null,
  detailWardSuccess: null,
  createWardSuccess: null,
  updateWardSuccess: null,
  deleteWardSuccess: null,
  error: null,
};

const wardReducer = createSlice({
  name: "wardReducer",
  initialState,
  reducers: {
    hasError(state, action) {
       switch (true) {
        case "TENXAPHUONG" in action.payload:
          toast.error(action.payload.TENXAPHUONG[0], { autoClose: 2000 });
             case "checkname" in action.payload:
          toast.error(action.payload.checkname[0], { autoClose: 2000 });
          break;
        // Xử lý các trường hợp khác nếu cần thiết
        default:
          // Xử lý trường hợp mặc định nếu cần thiết
          break;
      }
      },


    getAllWardSuccess(state, action: PayloadAction<WardModel[]>) {
      state.wardList = action.payload;
    },
    getDetailWardSuccess(state, action: PayloadAction<WardModel>) {
      state.detailWardSuccess = action.payload;
    },
    createWardSuccess(state, action: PayloadAction<WardModel>) {
      state.createWardSuccess = action.payload;
      toast.success("Tạo thành công!", { autoClose: 2000 });
    },
    updateWardSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updateWardSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    deleteWardSuccess(state, action: PayloadAction<WardModel>) {
      state.deleteWardSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
    resetWardSuccess(state) {
      state.createWardSuccess = null;
      state.updateWardSuccess = null;
      state.deleteWardSuccess = null;
    },
  },
});

export const {
  getAllWardSuccess,
  getDetailWardSuccess,
  createWardSuccess,
  updateWardSuccess,
  deleteWardSuccess,
  resetWardSuccess,
  hasError,
} = wardReducer.actions;

export const getAllWard = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/XAPHUONGs");
      const data: WardModel[] = await response.data;
      const action: PayloadAction<WardModel[]> = getAllWardSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailWard = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`api/XAPHUONGs/${id}`);
      const data: WardModel = await response.data;
      const action: PayloadAction<WardModel> = getDetailWardSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createWard = (ward: WardModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/XAPHUONGs", ward);
      const data: WardModel = await response.data;
      const action: PayloadAction<WardModel> = createWardSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const updateWard = (ward: WardModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `api/XAPHUONGs/${ward.IDXAPHUONG}`,
        ward
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateWardSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const deleteWard = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/XAPHUONGs/${id}`);
      const data: WardModel = await response.data.content;
      const action: PayloadAction<WardModel> = deleteWardSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetWard = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetWardSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default wardReducer.reducer;
