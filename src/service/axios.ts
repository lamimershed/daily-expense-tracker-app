import axios from "axios";

let token = window.localStorage.getItem("token");

if (import.meta.env.MODE === "development") {
  token = import.meta.env.VITE_USER_TOKEN;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    // condition for UnAuthorized Data
    if (error.response.status === 401) {
      window.location.href = `${import.meta.env.VITE_LOGIN_URL}${import.meta.env.MODE === "production" ? "" : "/kareflow-saas"}?redirect=${import.meta.env.VITE_LOGIN_URL}/karechat-saas`;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
