import TaskService from "../services/task.service";
import {SET_MESSAGE, TASK_GET_ALL_SUCCESS} from "../constants/actionTypes";

export const create = (values) => (dispatch) => {
    return TaskService.create(values)
        .then((response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        })
        .catch((error) => {
            const message = error.response.data.message

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        });
};

export const update = (values) => (dispatch) => {
    return TaskService.update(values)
        .then((response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        })
        .catch((error) => {
            const message = error.response.data.message

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        });
};

export const getAll = (user) => (dispatch) => {
    return TaskService.getAll(user)
        .then((response) => {
            dispatch({
                type: TASK_GET_ALL_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            const message = error.response.data.message
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
        })
}