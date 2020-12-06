import React from "react";
import TaskService from "../../services/task.service";
import AuthService from "../../services/auth.service";
import TaskModal from "../Task";
import {Button, Container, Table} from "react-bootstrap";
import "./index.css"

export default class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            tasks: [],
            taskToUpdate: {},
            showModal: false,
            message: '',
            successful: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        TaskService.getAll(this.state.currentUser)
            .then(response => {
                this.setState({
                    tasks: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleClose() {
        this.setState({
            showModal: false,
            taskToUpdate: {}
        })
    }

    handleShow(id) {
        this.setState(state => ({
            showModal: true,
            message: '',
            successful: false,
            taskToUpdate: id ? state.tasks.find(item => item.id === id) : {}
        }));
    }

    async handleCreate(values) {
        try {
            const response = await TaskService.create({...values, 'creatorId': this.state.currentUser.id});
            const message = response.data.message;
            const tasks = await TaskService.getAll(this.state.currentUser);
            this.setState({
                tasks: tasks.data,
                message: message,
                successful: true
            })
        } catch (error) {
            this.setState({
                'message': error.response.data.message
            })
        }
    }async handleUpdate(values) {
        try {
            const response = await TaskService.update(values);
            const message = response.data.message;
            const tasks = await TaskService.getAll(this.state.currentUser);
            this.setState({
                tasks: tasks.data,
                message: message,
                successful: true
            })
        } catch (error) {
            this.setState({
                'message': error.response.data.message
            })
        }
    }

    render() {
        const tasks = this.state.tasks.map(({id, title, priority, expiresAt, responsible, status}) => (
            <tr key={id}>
                <th scope="row"><Button variant="link" onClick={() => {
                    this.handleShow(id)
                }}>{title}</Button></th>
                <td>{priority}</td>
                <td>{expiresAt}</td>
                <td>{responsible.username}</td>
                <td>{status}</td>
            </tr>
        ));
        return (
            <>
                <TaskModal handleSubmit={this.state.taskToUpdate ? this.handleUpdate : this.handleCreate}
                           handleClose={this.handleClose} taskToUpdate={this.state.taskToUpdate}
                           show={this.state.showModal}
                           message={this.state.message} successful={this.state.successful}/>
                <Container>
                    <h3>Задачи</h3>
                    <Table bordered>
                        <thead>
                        <tr>
                            <th scope="col">Заголовок</th>
                            <th scope="col">Приоритет</th>
                            <th scope="col">Дата окончания</th>
                            <th scope="col">Ответственный</th>
                            <th scope="col">Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.length !== 0 && tasks}
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={this.handleShow}>
                        Новая задача
                    </Button>
                </Container>
            </>
        );
    }
}
