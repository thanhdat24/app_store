import { CustomerModel } from "./../../interfaces/CustomerModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { CashierModel } from "../../interfaces/CashierModel";

interface CashierState {
  updateReceiptStatusSuccess?: Number | null;
  customersByCashierList: CashierModel[] | null;
  billingPeriodByCashierList: CustomerModel[] | null;
}

const initialState: CashierState = {
  updateReceiptStatusSuccess: null,
  customersByCashierList: null,
  billingPeriodByCashierList: null,
};

const cashierReducer = createSlice({
  name: "cashierReducer",
  initialState,
  reducers: {
    updateReceiptStatusSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updateReceiptStatusSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    getCustomersByCashierSuccess(state, action: PayloadAction<CashierModel[]>) {
      state.customersByCashierList = action.payload;
    },
    getBillingPeriodByCashierSuccess(
      state,
      action: PayloadAction<CustomerModel[]>
    ) {
      state.billingPeriodByCashierList = action.payload;
    },
    resetCasherSuccess(state) {
      state.updateReceiptStatusSuccess = null;
    },
  },
});

export const {
  updateReceiptStatusSuccess,
  getCustomersByCashierSuccess,
  resetCasherSuccess,
  getBillingPeriodByCashierSuccess,
} = cashierReducer.actions;

export const updateReceiptStatus = (idPhieu: number, idNhanVien: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(`api/THUNGANs/${idPhieu}`, {
        idNhanVien: idNhanVien,
      });
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateReceiptStatusSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCustomersByCashier = (idNhanVien: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`kh/${idNhanVien}`);

      const data: CashierModel[] = await response.data;
      const action: PayloadAction<CashierModel[]> =
        getCustomersByCashierSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBillingPeriodByCashier = (idNhanVien: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`phieuthu/${idNhanVien}`);

      const data: CustomerModel[] = await response.data;
      console.log("data", data);
      const action: PayloadAction<CustomerModel[]> =
        getBillingPeriodByCashierSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetCasher = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetCasherSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default cashierReducer.reducer;
