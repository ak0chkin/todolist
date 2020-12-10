import BoardService from "../services/board.service";
import {SET_MESSAGE, GET_BOARD_SUCCESS, CREATE_TASK_SUCCESS, UPDATE_TASK_SUCCESS} from "../constants/actionTypes";

export const createTask = (values) => (dispatch) => {
    return BoardService.createTask(values)
        .then((response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            dispatch({
                type: CREATE_TASK_SUCCESS,
                payload: response.data.task,
            })

            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({
                type: SET_MESSAGE,
                payload: error.response.data.message,
            });

            return Promise.reject();
        });
};

export const updateTask = (values) => (dispatch) => {
    return BoardService.updateTask(values)
        .then((response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            dispatch({
                type: UPDATE_TASK_SUCCESS,
                payload: response.data.task,
            })

            return Promise.resolve();
        })
        .catch((error) => {
            dispatch({
                type: SET_MESSAGE,
                payload: error.response.data.message,
            });

            return Promise.reject();
        });
};

export const getBoard = () => (dispatch) => {
    return BoardService.getBoard()
        .then((response) => {
            dispatch({
                type: GET_BOARD_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: SET_MESSAGE,
                payload: error.response.data.message,
            });
        })
}