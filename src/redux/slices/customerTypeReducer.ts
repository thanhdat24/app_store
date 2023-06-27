import { CustomerTypeModel } from "../../interfaces/CustomerTypeModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";
import { toast } from "react-toastify";

interface CustomerState {
  customerTypeList: CustomerTypeModel[] | null;
  deleteCustomerTypeSuccess?: CustomerTypeModel | null;
  detailCustomerType?: CustomerTypeModel | null;
  createCustomerTypeSuccess?: CustomerTypeModel | null;
  updateCustomerTypeSuccess?: Number | null;
}

const initialState: CustomerState = {
  customerTypeList: null,
  deleteCustomerTypeSuccess: null,
  detailCustomerType: null,
  createCustomerTypeSuccess: null,
  updateCustomerTypeSuccess: null,
};

const customerTypeReducer = createSlice({
  name: "customerTypeReducer",
  initialState,
  reducers: {
    getAllCustomerTypeSuccess(
      state,
      action: PayloadAction<CustomerTypeModel[]>
    ) {
      state.customerTypeList = action.payload;
    },
    deleteCustomerTypeSuccess(state, action: PayloadAction<CustomerTypeModel>) {
      state.deleteCustomerTypeSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
    getDetailCustomerTypeSuccess(
      state,
      action: PayloadAction<CustomerTypeModel>
    ) {
      state.detailCustomerType = action.payload;
    },
    createCustomerSuccessType(state, action: PayloadAction<CustomerTypeModel>) {
      state.createCustomerTypeSuccess = action.payload;
      toast.success("Thêm thành công!", { autoClose: 2000 });
    },
    updateCustomerSuccessType(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updateCustomerTypeSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    resetCustomerTypeSuccess(state) {
      state.createCustomerTypeSuccess = null;
      state.updateCustomerTypeSuccess = null;
    },
  },
});

export const {
  getAllCustomerTypeSuccess,
  deleteCustomerTypeSuccess,
  getDetailCustomerTypeSuccess,
  createCustomerSuccessType,
  resetCustomerTypeSuccess,
  updateCustomerSuccessType,
} = customerTypeReducer.actions;

export const getAllCustomerTypes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("api/LOAIKHs");

      const data: CustomerTypeModel[] = await response.data;
      const action: PayloadAction<CustomerTypeModel[]> =
        getAllCustomerTypeSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCustomerType = (customerType: CustomerTypeModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/LOAIKHs", customerType);
      const data: CustomerTypeModel = await response.data;
      const action: PayloadAction<CustomerTypeModel> =
        createCustomerSuccessType(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCustomerType = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/LOAIKHs/${id}`);

      const data: CustomerTypeModel = await response.data;
      const action: PayloadAction<CustomerTypeModel> =
        deleteCustomerTypeSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailCustomerType = (id: Number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`api/LOAIKHs/${id}`);

      const data: CustomerTypeModel = await response.data;
      const action: PayloadAction<CustomerTypeModel> =
        getDetailCustomerTypeSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCustomerType = (customerType: CustomerTypeModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `api/LOAIKHs/${customerType.IDLOAIKH}`,
        customerType
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateCustomerSuccessType(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetCustomerType = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetCustomerTypeSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default customerTypeReducer.reducer;
