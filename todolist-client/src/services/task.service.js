import axios from "axios";

const API_URL = "http://localhost:8080/api/task/";

class TaskService {
    create({title, description, expiresAt, priority, status, creator, responsible}) {
        return axios.post(API_URL + "create", {
            title,
            description,
            expiresAt,
            priority,
            status,
            creator,
            responsible
        });
    }
    getAll({id}) {
        return axios.get(API_URL + "getAll", {
            params: {
                userId: id
            }
        });
    }
}

export default new TaskService();
