import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import board from "./board";

export default combineReducers({
    auth,
    message,
    board,
});
