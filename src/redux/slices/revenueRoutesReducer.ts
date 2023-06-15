import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { RevenueRoutesModel } from "../../interfaces/RevenueRoutesModel";

// Khai báo kiểu dữ liệu cho trạng thái của reducer
interface RevenueRoutesState {
  revenueRoutesList: RevenueRoutesModel[] | null;
  detailRevenueRouteSuccess?: RevenueRoutesModel | null;
  createRevenueRoutesSuccess?: RevenueRoutesModel | null;
  updateRevenueRoutesSuccess?: Number | null;
  deleteRevenueRoutesSuccess?: RevenueRoutesModel | null;
  error?: string | null;
}

const initialState: RevenueRoutesState = {
  revenueRoutesList: null,
  detailRevenueRouteSuccess: null,
  createRevenueRoutesSuccess: null,
  updateRevenueRoutesSuccess: null,
  deleteRevenueRoutesSuccess: null,
  error: null,
};

const revenueRoutesReducer = createSlice({
  name: "revenueRoutesReducer",
  initialState,
  reducers: {
    hasError(state, action) {
      switch (true) {
        case "MATUYENTHU" in action.payload:
          toast.error(action.payload.MATUYENTHU[0], { autoClose: 2000 });
          break;

        // Xử lý các trường hợp khác nếu cần thiết
        default:
          // Xử lý trường hợp mặc định nếu cần thiết
          break;
      }
    },

    getAllRevenueRoutesSuccess(
      state,
      action: PayloadAction<RevenueRoutesModel[]>
    ) {
      state.revenueRoutesList = action.payload;
    },
    getDetailRevenueRoutesSuccess(
      state,
      action: PayloadAction<RevenueRoutesModel>
    ) {
      state.detailRevenueRouteSuccess = action.payload;
    },
    createRevenueRoutesSuccess(
      state,
      action: PayloadAction<RevenueRoutesModel>
    ) {
      state.createRevenueRoutesSuccess = action.payload;
      toast.success("Tạo thành công!", { autoClose: 2000 });
    },
    updateRevenueRoutesSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updateRevenueRoutesSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    deleteRevenueRoutesSuccess(
      state,
      action: PayloadAction<RevenueRoutesModel>
    ) {
      state.deleteRevenueRoutesSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
    resetRevenueRoutesSuccess(state) {
      state.createRevenueRoutesSuccess = null;
      state.updateRevenueRoutesSuccess = null;
      state.deleteRevenueRoutesSuccess = null;
    },
  },
});

export const {
  getAllRevenueRoutesSuccess,
  getDetailRevenueRoutesSuccess,
  createRevenueRoutesSuccess,
  updateRevenueRoutesSuccess,
  deleteRevenueRoutesSuccess,
  resetRevenueRoutesSuccess,
  hasError,
} = revenueRoutesReducer.actions;

export const getAllRevenueRoutes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/TUYENTHUs");
      const data: RevenueRoutesModel[] = await response.data;
      const action: PayloadAction<RevenueRoutesModel[]> =
        getAllRevenueRoutesSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailRevenueRoutes = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`api/TUYENTHUs/${id}`);
      const data: RevenueRoutesModel = await response.data;
      const action: PayloadAction<RevenueRoutesModel> =
        getDetailRevenueRoutesSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createRevenueRoutes = (revenueRoute: RevenueRoutesModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/TUYENTHUs", revenueRoute);
      const data: RevenueRoutesModel = await response.data;
      const action: PayloadAction<RevenueRoutesModel> =
        createRevenueRoutesSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const updateRevenueRoutes = (revenueRoute: RevenueRoutesModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `api/TUYENTHUs/${revenueRoute.IDTUYENTHU}`,
        revenueRoute
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateRevenueRoutesSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const deleteRevenueRoutes = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/TUYENTHUs/${id}`);
      const data: RevenueRoutesModel = await response.data;
      const action: PayloadAction<RevenueRoutesModel> =
        deleteRevenueRoutesSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const resetRevenueRoutes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetRevenueRoutesSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default revenueRoutesReducer.reducer;
