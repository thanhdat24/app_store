import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginModel } from "../../interfaces/UserLoginModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { setSession, setUser } from "../../utils/jwt";

const getUserLocoalStorage = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

interface userLoginState {
  userLogin: UserLoginModel | null;
  errorLogin?: string | null;
  isAuthenticated?: boolean;
}

const initialState: userLoginState = {
  userLogin: getUserLocoalStorage() as UserLoginModel | null,
  errorLogin: null,
  isAuthenticated: false,
};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<UserLoginModel>) {
      state.userLogin = action.payload;
      state.isAuthenticated = true;
      toast.success("Đăng nhập thành công", { autoClose: 2000 });
    },
    hasError(state, action) {
      
      switch (true) {
        case "LoginFail" in action.payload:
          state.errorLogin = action.payload.LoginFail[0];
          break;
        // Xử lý các trường hợp khác nếu cần thiết
        default:
          // Xử lý trường hợp mặc định nếu cần thiết
          break;
      }
    },
  },
});

export const { loginSuccess, hasError } = adminReducer.actions;

export const login = (userLogin: UserLoginModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("api/Login", userLogin);
      const data: UserLoginModel = await response.data;
      setSession(data.token);
      setUser(data);
      const action: PayloadAction<UserLoginModel> = loginSuccess(data);
      dispatch(action);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      setSession(null);
      setUser(null);
    } catch (error: any) {
      dispatch(hasError(error.ModelState));
    }
  };
};

export default adminReducer.reducer;
