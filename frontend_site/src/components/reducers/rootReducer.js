import { combineReducers } from "redux";
import { userReducer } from "../reducers/userReducer";
import { teamReducer } from "./teamReducer";


export const rootReducer = combineReducers({
    userReducer,
    teamReducer
});