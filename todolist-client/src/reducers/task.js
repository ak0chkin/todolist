import {TASK_GET_ALL_SUCCESS} from "../constants/actionTypes";


const initialState = {
    tasks: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TASK_GET_ALL_SUCCESS:
            return { tasks: payload };

        default:
            return state;
    }
}