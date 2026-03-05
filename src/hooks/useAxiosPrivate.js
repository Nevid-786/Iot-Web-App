import { useEffect } from "react";
import axiosPrivate from "../axios/axiosPrivate";
import AuthService from "../Services/authservice";
import { useDispatch } from "react-redux";
import { logout } from "../Slices/authSlice"
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    // REQUEST INTERCEPTOR
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {

          console.log("access token expired");

          originalRequest._retry = true;

          try {
            const res = await AuthService.refreshToken();

            if (!res.ok) {
              throw new Error("Refresh token expired");
            }

            const data = await res.json();

            console.log("new access token:", data.accessToken);

            // retry original request AFTER refresh completes
            return axiosPrivate(originalRequest);

          } catch (refreshError) {

            console.log("Refresh token expired:", refreshError);
            navigate('/login'); // Redirect to login page

            dispatch(logout());

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // CLEANUP
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };

  }, [dispatch]);

  return axiosPrivate;
};

export default useAxiosPrivate;