import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReceiptModel } from "../../interfaces/ReceiptModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";

interface ReceiptState {
  receiptList: ReceiptModel[] | null;
  createReceiptSuccess?: ReceiptModel | null;
  updateReceiptSuccess?: Number | null;
  deleteReceiptSuccess?: ReceiptModel | null;
  error?: string | null;
}

const initialState: ReceiptState = {
  receiptList: null,
  createReceiptSuccess: null,
  updateReceiptSuccess: null,
  deleteReceiptSuccess: null,
};

const receiptReducer = createSlice({
  name: "receiptReducer",
  initialState,
  reducers: {
    hasError(state, action) {
      switch (true) {
        case "phieu" in action.payload:
          toast.error(action.payload.phieu[0], { autoClose: 2000 });
          break;
        case "xoaphieu" in action.payload:
          toast.error(action.payload.xoaphieu[0], { autoClose: 2000 });
          break;
        case "khachhang" in action.payload:
          toast.error(action.payload.khachhang[0], { autoClose: 2000 });
          break;
        // Xử lý các trường hợp khác nếu cần thiết
        default:
          // Xử lý trường hợp mặc định nếu cần thiết
          break;
      }
    },

    getAllReceiptSuccess(state, action: PayloadAction<ReceiptModel[]>) {
      state.receiptList = action.payload;
    },
    createReceiptSuccess(state, action: PayloadAction<ReceiptModel>) {
      state.createReceiptSuccess = action.payload;
      toast.success("Tạo thành công!", { autoClose: 2000 });
    },
    resetReceiptSuccess(state) {
      state.receiptList = null;
      state.createReceiptSuccess = null;
      state.updateReceiptSuccess = null;
      state.deleteReceiptSuccess = null;
    },
    updateReceiptSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        state.updateReceiptSuccess = action.payload;
        toast.success("Cập nhật thành công!", { autoClose: 2000 });
      }
    },
    deleteReceiptSuccess(state, action: PayloadAction<ReceiptModel>) {
      state.deleteReceiptSuccess = action.payload;
      toast.success("Xóa thành công!", { autoClose: 2000 });
    },
  },
});

export const {
  hasError,
  getAllReceiptSuccess,
  createReceiptSuccess,
  resetReceiptSuccess,
  updateReceiptSuccess,
  deleteReceiptSuccess,
} = receiptReducer.actions;

export const getAllReceipt = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("/api/PHIEUTHUs");
      const data: ReceiptModel[] = await response.data;
      const action: PayloadAction<ReceiptModel[]> = getAllReceiptSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createReceipt = (receipt: ReceiptModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/PHIEUTHUs", receipt);
      const data: ReceiptModel = await response.data;

      const action: PayloadAction<ReceiptModel> = createReceiptSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const updateReceipt = (receipt: ReceiptModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.patch(
        `api/PHIEUTHUs/${receipt.IDPHIEU}`,
        receipt
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updateReceiptSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};



export const deleteReceipt = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`api/PHIEUTHUs/${id}`);
      const data: ReceiptModel = await response.data.content;
      const action: PayloadAction<ReceiptModel> = deleteReceiptSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const resetReceipt = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const action = resetReceiptSuccess();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default receiptReducer.reducer;
