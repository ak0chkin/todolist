import {CREATE_TASK_SUCCESS, GET_BOARD_SUCCESS, UPDATE_TASK_SUCCESS} from "../constants/actionTypes";


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

        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: [payload, ...state.tasks],
            };

        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: [payload, ...state.tasks.filter(item => item.id !== payload.id)],
            }
        default:
            return state;
    }
}