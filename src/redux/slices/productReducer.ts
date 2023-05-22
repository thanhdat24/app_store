import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductModel } from "../../interfaces/ProductModel";
import { AppDispatch } from "../store";
import productJson from "../../../product.json";

interface ProductState {
  productList: ProductModel[] | null;
  productDetail: ProductModel | null;
}
const localStorageKey = "productList"; // Key for localStorage

function getProductListFromLocalStorage(): ProductModel[] | null {
  const productListJson = localStorage.getItem(localStorageKey);
  if (productListJson) {
    return JSON.parse(productListJson);
  }
  return null;
}
const initialState: ProductState = {
  productList: getProductListFromLocalStorage() || productJson,
  productDetail: null,
};

function updateProductListInLocalStorage(productList: ProductModel[] | null) {
  if (productList) {
    localStorage.setItem(localStorageKey, JSON.stringify(productList));
  } else {
    localStorage.removeItem(localStorageKey);
  }
}

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductSuccess(state, action: PayloadAction<ProductModel[]>) {
      state.productList = action.payload;
      updateProductListInLocalStorage(state.productList);
    },
    deleteProductSuccess(state, action: PayloadAction<Number>) {
      state.productList =
        state.productList?.filter((product) => product.id !== action.payload) ??
        null;
      updateProductListInLocalStorage(state.productList);
    },
    getProductDetailSuccess(state, action: PayloadAction<Number>) {
      let productDetail = null;
      productDetail =
        state.productList?.filter((product) => product.id === action.payload) ??
        null;
      state.productDetail =
        productDetail && productDetail.length > 0 ? productDetail[0] : null;
    },

    addProductSuccess(state, action: PayloadAction<ProductModel>) {
      state.productList?.push(action.payload);

      updateProductListInLocalStorage(state.productList);
    },
    editProductSuccess(
      state,
      action: PayloadAction<{ id: number; data: ProductModel }>
    ) {
      const { id, data } = action.payload;
      const index = state.productList?.findIndex((x) => x.id === id);
      if (index !== undefined && index !== -1) {
        state.productList?.splice(index, 1, data);
      }
      updateProductListInLocalStorage(state.productList);
    },
  },
});

export const {
  getAllProductSuccess,
  deleteProductSuccess,
  addProductSuccess,
  editProductSuccess,
  getProductDetailSuccess,
} = productReducer.actions;

export const getAllProduct = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      const data: ProductModel[] = await response.data.content;
      const action: PayloadAction<ProductModel[]> = getAllProductSuccess(data);
      dispatch(action);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = (id: Number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const action: PayloadAction<Number> = deleteProductSuccess(id);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (data: ProductModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const action: PayloadAction<ProductModel> = addProductSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProductDetail = (id: Number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const action: PayloadAction<Number> = getProductDetailSuccess(id);
      console.log("action", action);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (id: number, data: ProductModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const action: PayloadAction<{ id: number; data: ProductModel }> =
        editProductSuccess({
          id,
          data,
        });
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
export default productReducer.reducer;
