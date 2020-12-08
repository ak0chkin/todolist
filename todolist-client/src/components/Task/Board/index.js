import React, {useLayoutEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import TaskModal from "../Modal";
import {createTask, getBoard, updateTask} from "../../../actions/board";
import {Button, Container, /*FormControl, */Table} from "react-bootstrap";
import "./index.css"
import {clearMessage} from "../../../actions/message";
import moment from "moment";
import {priorities, statuses} from "../../../constants/dropDowns";

function Board(props) {
    const [taskToUpdate, setTaskToUpdate] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();
    const {auth: {user: currentUser}, board: {performers, tasks}} = useSelector(state => state);

    useLayoutEffect(() => {
        if (currentUser) {
            dispatch(getBoard())
                .catch(() => {
                });
        }
    }, [dispatch, currentUser])

    function handleClose() {
        setShowModal(false);
        dispatch(clearMessage());
    }

    function handleShow(id) {
        setTaskToUpdate(id ? tasks.find(item => item.id === id) : {});
        setShowModal(true);
        setSuccessful(false);
    }

    function handleCreate(values) {
        dispatch(createTask({...values, 'creatorId': currentUser.id}))
            .then(() => {
                setSuccessful(true);
                dispatch(getBoard())
                    .catch(() => {
                    });
            })
            .catch(() => {
            });
    }

    function handleUpdate(values) {
        dispatch(updateTask(values))
            .then(() => {
                setSuccessful(true);
                dispatch(getBoard())
                    .catch(() => {
                    });
            });
    }

    if (!currentUser) {
        return (<Redirect to="/login"/>);
    }
    const taskRows = tasks.map(({id, title, priority, expiresAt, performer, status}) => (
        <tr key={id} onClick={() => {
            handleShow(id)
        }}>
            <th scope="row">{title}</th>
            <td>{priorities[priority]}</td>
            <td>{moment(expiresAt).format("DD/MM/yyyy")}</td>
            <td>{performer.username}</td>
            <td>{statuses[status]}</td>
        </tr>
    ));
    return (
        <Container>
            <TaskModal handleSubmit={taskToUpdate ? handleUpdate : handleCreate}
                       handleClose={handleClose} performers={[currentUser.username, ...performers]} taskToUpdate={taskToUpdate}
                       show={showModal} successful={successful}/>

            <h3>Задачи:</h3>
            {/*<FormControl as="select" className="ml-auto">
                <option value="0">Без группировки</option>
                <option value="1">По дате завершения</option>
                <option value="2">По ответственным</option>
            </FormControl>*/}
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
            <Button variant="primary" className="ml-auto" onClick={handleShow}>
                Новая задача
            </Button>
        </Container>
    );
}


export default Board;