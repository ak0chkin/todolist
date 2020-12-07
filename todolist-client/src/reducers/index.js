import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import task from "./task";

export default combineReducers({
    auth,
    message,
    task,
});
