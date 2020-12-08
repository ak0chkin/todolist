import {GET_BOARD_SUCCESS} from "../constants/actionTypes";


const initialState = {
    performers: [],
    tasks: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_BOARD_SUCCESS:
            return payload;

        default:
            return state;
    }
}