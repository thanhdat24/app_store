import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { BillingPeriodModel } from "../../interfaces/BillingPeriodModel";

interface BillingPeriodState {
  billingPeriodList: BillingPeriodModel[] | null;
  detailBillingPeriodSuccess?: BillingPeriodModel | null;
  createBillingPeriodSuccess?: BillingPeriodModel | null;
  updateBillingPeriodSuccess?: Number | null;
  deleteBillingPeriodSuccess?: BillingPeriodModel | null;
  error?: string | null;
}

const initialState: BillingPeriodState = {
  billingPeriodList: null,
  detailBillingPeriodSuccess: null,
  createBillingPeriodSuccess: null,
  updateBillingPeriodSuccess: null,
  deleteBillingPeriodSuccess: null,
  error: null,
};

const billingPeriodReducer = createSlice({
  name: "billingPeriodReducer",
  initialState,
  reducers: {
    hasError(state, action) {
      switch (true) {
        case "TENKYTHU" in action.payload:
          toast.error(action.payload.TENKYTHU[0], { autoClose: 2000 });
          break;
        case "kythu" in action.payload:
          toast.error(action.payload.kythu[0], { autoClose: 2000 });
          break;
        // Xử lý các trường hợp khác nếu cần thiết
        default:
          // Xử lý trường hợp mặc định nếu cần thiết
          break;
      }

    },
    getAllBillingPeriodsSuccess(
      state,
      action: PayloadAction<BillingPeriodModel[]>
    ) {
      state.billingPeriodList = action.payload;
    },
    getDetailBillingPeriodsSuccess(
      state,
      action: PayloadAction<BillingPeriodModel>
    ) {
      state.detailBillingPeriodSuccess = action.payload;
    },
    createBillingPeriodSuccess(
      state,
      action: PayloadAction<BillingPeriodModel>
    ) {
      state.createBillingPeriodSuccess = action.payload;
      toast.success("Tạo thành công!", { autoClose: 2000 });
    },
    updateBillingPeriodSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updateBillingPeriodSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    deleteBillingPeriodSuccess(
      state,
      action: PayloadAction<BillingPeriodModel>
    ) {
      state.deleteBillingPeriodSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
    resetBillingPeriodSuccess(state) {
      state.createBillingPeriodSuccess = null;
      state.updateBillingPeriodSuccess = null;
      state.deleteBillingPeriodSuccess = null;
    },
  },
});

export const {
  getAllBillingPeriodsSuccess,
  getDetailBillingPeriodsSuccess,
  createBillingPeriodSuccess,
  updateBillingPeriodSuccess,
  deleteBillingPeriodSuccess,
  resetBillingPeriodSuccess,
  hasError,
} = billingPeriodReducer.actions;

export const getAllBillingPeriods = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/KYTHUs");
      const data: BillingPeriodModel[] = await response.data;
      const action: PayloadAction<BillingPeriodModel[]> =
        getAllBillingPeriodsSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailBillingPeriods = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`api/KYTHUs/${id}`);
      const data: BillingPeriodModel = await response.data;
      const action: PayloadAction<BillingPeriodModel> =
        getDetailBillingPeriodsSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createBillingPeriod = (billingPeriod: BillingPeriodModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/KYTHUs", billingPeriod);
      const data: BillingPeriodModel = await response.data;
      const action: PayloadAction<BillingPeriodModel> =
        createBillingPeriodSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const updateBillingPeriod = (billingPeriod: BillingPeriodModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.patch(
        `api/KYTHUs/${billingPeriod.IDKYTHU}`,
        billingPeriod
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateBillingPeriodSuccess(data);
      dispatch(action);
      console.log(response);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const deleteBillingPeriod = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/KYTHUs/${id}`);
      const data: BillingPeriodModel = await response.data;
      const action: PayloadAction<BillingPeriodModel> =
        deleteBillingPeriodSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const resetBillingPeriod = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetBillingPeriodSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default billingPeriodReducer.reducer;
