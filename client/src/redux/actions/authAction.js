// redux/actions/authActions.js
import API from "../../utils/axios";
import { setUser,logout } from "../slices/authSlice";

export const fetchUser = () => async (dispatch) => {

  try {
    const res = await API.get("/api/me");
    dispatch(setUser(res.data));
  } catch (error) {
    console.log(error);
    // 🔥 VERY IMPORTANT
    dispatch(setUser(null));
    dispatch(logout());
  }
};