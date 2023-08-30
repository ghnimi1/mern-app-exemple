import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./authReducers";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export default rootReducer;
