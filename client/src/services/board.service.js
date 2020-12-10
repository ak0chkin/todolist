import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/board/';

class BoardService {
    createTask({title, description, expiresAt, priority, performer}) {
        return axios.post(API_URL + 'createTask', {
            title,
            description,
            expiresAt,
            priority,
            performer
        }, {headers: authHeader()});
    }

    updateTask({id, title, description, expiresAt, priority, status, performer}) {
        console.log(expiresAt)
        return axios.put(API_URL + 'updateTask', {
            title,
            description,
            expiresAt,
            priority,
            status,
            performer
        }, {
            params: {id},
            headers: authHeader()
        });
    }

    getBoard() {
        return axios.get(API_URL + 'getBoard', {headers: authHeader()});
    }
}

export default new BoardService();
