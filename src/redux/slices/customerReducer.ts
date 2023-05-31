import { CustomerModel } from "../../interfaces/CustomerModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { AppDispatch } from "../store";

interface CustomerState {
  customerList: CustomerModel[] | null;
}

const initialState: CustomerState = {
  customerList: null,
};

const customerReducer = createSlice({
  name: "customerReducer",
  initialState,
  reducers: {
    getAllCustomerSuccess(state, action: PayloadAction<CustomerModel[]>) {
      state.customerList = action.payload;
    },
  },
});

export const { getAllCustomerSuccess } = customerReducer.actions;

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

export default customerReducer.reducer;
