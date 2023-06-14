import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuModel } from "../../interfaces/MenuModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";

interface MenuState {
  menuList: MenuModel[] | null;
}

const initialState: MenuState = {
  menuList: null,
};

const menuReducer = createSlice({
  name: "menuReducer",
  initialState,
  reducers: {
    getAllMenuSuccess(state, action: PayloadAction<MenuModel[]>) {
      state.menuList = action.payload;
    },
  },
});

export const { getAllMenuSuccess } = menuReducer.actions;

export const getAllMenus = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("/api/PHIEUTHUs");
      const data: MenuModel[] = await response.data;
      const action: PayloadAction<MenuModel[]> = getAllMenuSuccess(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export default menuReducer.reducer;
