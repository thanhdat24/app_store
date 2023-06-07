import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";

interface CashierState {
  updateReceiptStatusSuccess?: Number | null;
}

const initialState: CashierState = {
  updateReceiptStatusSuccess: null,
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
    resetCasherSuccess(state) {
      state.updateReceiptStatusSuccess = null;
    },
  },
});

export const { updateReceiptStatusSuccess, resetCasherSuccess } =
  cashierReducer.actions;

export const updateReceiptStatus = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put("api/THUNGANs", { IdPhieu: id });
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateReceiptStatusSuccess(data);
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
