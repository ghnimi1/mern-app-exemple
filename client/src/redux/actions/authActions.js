import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "./types";
import axios from "../../axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post("/auth/login", { email, password });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    window.location.replace("/");
    localStorage.setItem("token", JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await axios.post("/auth/register", user);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    const token = localStorage.getItem("token");
    if (!token) window.location.replace("/login");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
