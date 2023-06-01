import axios from "./axios";

const setSession = (token: string | null): void => {
  if (token) {
    localStorage.setItem("token", token);

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

const setUser = (user: any): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export { setSession, setUser };
 