import {CLEAR_MESSAGE, SET_MESSAGE} from "../constants/actionTypes";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_MESSAGE:
            return {message: payload};

        case CLEAR_MESSAGE:
            return {message: ""};

        default:
            return state;
    }
}