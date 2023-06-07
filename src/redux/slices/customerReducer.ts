import { CustomerModel } from "../../interfaces/CustomerModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";

import { toast } from "react-toastify";
interface CustomerState {
  customerList: CustomerModel[] | null;
  createCustomerSuccess?: CustomerModel | null;
  deleteCustomerSuccess?: CustomerModel | null;
  detailCustomerSuccess?: CustomerModel | null;
  isLoading?: boolean;
  error?: string | null;
}

const initialState: CustomerState = {
  customerList: null,
  createCustomerSuccess: null,
  deleteCustomerSuccess: null,
  detailCustomerSuccess: null,
  isLoading: false,
  error: null,
};

const customerReducer = createSlice({
  name: "customerReducer",
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      if (action.payload.MAKHACHHANG.length > 0)
        toast.error(action.payload.MAKHACHHANG[0], { autoClose: 2000 });
    },

    getAllCustomerSuccess(state, action: PayloadAction<CustomerModel[]>) {
      state.customerList = action.payload;
    },
    createCustomerSuccess(state, action: PayloadAction<CustomerModel>) {
      state.createCustomerSuccess = action.payload;
      toast.success("Tạo thành công!", { autoClose: 2000 });
    },
    deleteCustomerSuccess(state, action: PayloadAction<CustomerModel>) {
      state.deleteCustomerSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
    resetCustomerSuccess(state) {
      state.createCustomerSuccess = null;
    },
    detailCustomerSuccess(state, action: PayloadAction<CustomerModel>) {
      state.detailCustomerSuccess = action.payload;
    },
  },
});

export const {
  getAllCustomerSuccess,
  createCustomerSuccess,
  resetCustomerSuccess,
  deleteCustomerSuccess,
  detailCustomerSuccess,
  hasError,
} = customerReducer.actions;

export const getAllCustomer = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("/api/KHACHHANGs");

      const data: CustomerModel[] = await response.data;
      const action: PayloadAction<CustomerModel[]> =
        getAllCustomerSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCustomer = (customer: CustomerModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/KHACHHANGs", customer);
      const data: CustomerModel = await response.data;
      const action: PayloadAction<CustomerModel> = createCustomerSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const deleteCustomer = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/KHACHHANGs/${id}`);

      const data: CustomerModel = await response.data;
      const action: PayloadAction<CustomerModel> = deleteCustomerSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailCustomer = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`api/KHACHHANGs/${id}`);

      const data: CustomerModel = await response.data;
      const action: PayloadAction<CustomerModel> =
        detailCustomerSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetCustomer = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetCustomerSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default customerReducer.reducer;
