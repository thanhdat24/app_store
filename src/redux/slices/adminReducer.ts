import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginModel } from "../../interfaces/UserLoginModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { setSession, setUser } from "../../utils/jwt";

interface userLoginState {
  userLogin: UserLoginModel | null;
  errorLogin?: string | null;
  isAuthenticated?: boolean;
}

const initialState: userLoginState = {
  userLogin: null,
  errorLogin: null,
  isAuthenticated: false,
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<UserLoginModel>) {
      state.userLogin = action.payload;
      toast.success("Đăng nhập thành công", { autoClose: 2000 });
    },
    hasError(state, action) {
      if (action.payload.LoginFail.length > 0)
        state.errorLogin = action.payload.LoginFail[0];
    },
  },
});

export const { loginSuccess, hasError } = adminReducer.actions;

export const login = (userLogin: UserLoginModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/Login", userLogin);
      const data: UserLoginModel = await response.data;
      console.log("data", data);
      setSession(data.token);
      setUser(data);
      const action: PayloadAction<UserLoginModel> = loginSuccess(data);
      dispatch(action);
    } catch (error: any) {
      console.log("error123", error);
      dispatch(hasError(error.ModelState));
    }
  };
};

export default adminReducer.reducer;
