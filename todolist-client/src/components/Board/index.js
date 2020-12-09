import React, {useLayoutEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import TaskModal from "./Modal";
import {createTask, getBoard, updateTask} from "../../actions/board";
import {Button, Container} from "react-bootstrap";
import "./index.css"
import {clearMessage} from "../../actions/message";
import TaskTable from "./Table";
import TaskFilter from "./Filter";

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
    return (
        <Container>
            <TaskModal handleSubmit={taskToUpdate ? handleUpdate : handleCreate}
                       handleClose={handleClose} performers={[currentUser.username, ...performers]} taskToUpdate={taskToUpdate}
                       show={showModal} successful={successful}/>

            <h3>Задачи:</h3>
            <TaskFilter performers={performers}/>
            <Button variant="primary" className="ml-auto" onClick={handleShow}>
                Новая задача
            </Button>
            <TaskTable tasks={tasks} handleShow={handleShow}/>
        </Container>
    );
}


export default Board;