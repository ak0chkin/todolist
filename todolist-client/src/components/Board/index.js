import React, {useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import TaskModal from "../Task";
import {create, getAll, update} from "../../actions/task";
import {Button, Container, Table} from "react-bootstrap";
import "./index.css"
import {clearMessage} from "../../actions/message";

function Board(props) {
    const [taskToUpdate, setTaskToUpdate] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const {dispatch, user: currentUser, tasks} = props;

    useLayoutEffect(() => {
        if (currentUser) {
            dispatch(getAll(currentUser))
                .catch(() => {
                });
        }
    }, [dispatch, currentUser])

    function handleClose() {
        setShowModal(false);
        dispatch(clearMessage());
    }

    function handleShow(id) {
        const {tasks} = props
        setTaskToUpdate(id ? tasks.find(item => item.id === id) : {});
        setShowModal(true);
        setSuccessful(false);
    }

    function handleCreate(values) {
        const {dispatch, user: currentUser} = props;
        dispatch(create({...values, 'creatorId': currentUser.id}))
            .then(() => {
                setSuccessful(true);
                dispatch(getAll(currentUser))
                    .catch(() => {
                    });
            })
            .catch(() => {
            });
    }

    function handleUpdate(values) {
        const {dispatch, user: currentUser} = props;
        dispatch(update(values))
            .then(() => {
                setSuccessful(true);
                dispatch(getAll(currentUser))
                    .catch(() => {
                    });
            });
    }

    if (!currentUser) {
        return (<Redirect to="/login"/>);
    }

    const taskRows = tasks.map(({id, title, priority, expiresAt, responsible, status}) => (
        <tr key={id} onClick={() => {
            handleShow(id)
        }}>
            <th scope="row">{title}</th>
            <td>{priority}</td>
            <td>{expiresAt}</td>
            <td>{responsible.username}</td>
            <td>{status}</td>
        </tr>
    ));
    return (
        <Container>
            <TaskModal handleSubmit={taskToUpdate ? handleUpdate : handleCreate}
                       handleClose={handleClose} taskToUpdate={taskToUpdate}
                       show={showModal} successful={successful}/>
            <h3>Задачи:</h3>
            <Table bordered hover>
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
                {taskRows.length !== 0 && taskRows}
                </tbody>
            </Table>
            <Button variant="primary" onClick={handleShow}>
                Новая задача
            </Button>
        </Container>
    );
}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {tasks} = state.task;
    return {
        user,
        tasks,
    };
}

export default connect(mapStateToProps)(Board);