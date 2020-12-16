import axios from "axios";
import authHeader from "./auth-header";

const API_URL = '/api/board/';

class BoardService {
    createTask({title, description, expiresAt, priority, performer}) {
        return axios.post(API_URL + 'task', {
            title,
            description,
            expiresAt,
            priority,
            performer
        }, {headers: authHeader()});
    }

    updateTask({id, title, description, expiresAt, priority, status, performer}) {
        console.log(expiresAt)
        return axios.put(API_URL + 'task/' + id, {
            title,
            description,
            expiresAt,
            priority,
            status,
            performer
        }, {
            headers: authHeader()
        });
    }

    getBoard() {
        return axios.get(API_URL, {headers: authHeader()});
    }
}

export default new BoardService();
