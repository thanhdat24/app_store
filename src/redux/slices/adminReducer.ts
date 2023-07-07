import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginModel } from "../../interfaces/UserLoginModel";
import axios from "../../utils/axios";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { setSession, setUser } from "../../utils/jwt";
import { ChangePasswordModel } from "../../interfaces/ChangePasswordModel";

const getUserLocoalStorage = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

interface userLoginState {
  userLogin: UserLoginModel | null;
  errorLogin?: string | null;
  isAuthenticated?: boolean;
  errorUpdatePassword?: string | null;
}

const initialState: userLoginState = {
  userLogin: getUserLocoalStorage() as UserLoginModel | null,
  errorLogin: null,
  isAuthenticated: false,
  errorUpdatePassword: null,
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
    updatePasswordSuccess(state, action: PayloadAction<Number>) {
      if (action.payload === 204) {
        toast.success("Đổi mật khẩu thành công", { autoClose: 2000 });
      }
    },
    hasError(state, action) {
      switch (true) {
        case "checkuser" in action.payload:
          state.errorLogin = action.payload.checkuser[0];
          break;
        case "password" in action.payload:
          state.errorUpdatePassword = action.payload.password[0];
          toast.error(action.payload.password[0], { autoClose: 2000 });
          break;
        case "checkname" in action.payload:
          toast.error(action.payload.checkname[0], { autoClose: 2000 });
          break;
        // Xử lý các trường hợp khác nếu cần thiết
        default:
          // Xử lý trường hợp mặc định nếu cần thiết
          break;
      }
    },
  },
});

export const { loginSuccess, hasError, updatePasswordSuccess } =
  adminReducer.actions;

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

export const updatePassword = (updatePassword: ChangePasswordModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.patch(
        `api/Login/${updatePassword.IDNHANVIEN}`,
        updatePassword
      );
      const data: Number = await response.status;
      const action: PayloadAction<Number> = updatePasswordSuccess(data);
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
