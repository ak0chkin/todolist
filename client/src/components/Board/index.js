import React, {useLayoutEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import TaskModal from "./Modal";
import {createTask, getBoard, updateTask} from "../../actions/board";
import {Button, Container, Row} from "react-bootstrap";
import "./index.css"
import {clearMessage} from "../../actions/message";
import TaskTable from "./Table";
import TaskFilter from "./Filter";

function Board(props) {
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
            })
            .catch(() => {
            });
    }

    function handleUpdate(values) {
        dispatch(updateTask(values))
            .then(() => {
                setSuccessful(true);
            });
    }

    function handleFilter(e) {
        switch (e.target.getAttribute('name')) {
            case 'performer':
                if (e.target.checked)
                    setTaskFilter(state => ({
                        ...state,
                        performers: [e.target.id, ...state.performers],
                    }));
                else {
                    setTaskFilter(state => ({
                        ...state,
                        performers: state.performers.filter(item => item !== e.target.id),
                    }));
                }
                break;
            case 'expiresAt':
                setTaskFilter(state => ({
                    ...state,
                    expiresAt: e.target.id,
                }));
                break;
            default:
                break;
        }
    }

    const {auth: {user: currentUser}, board: {performers, tasks}} = useSelector(state => state);
    const [taskToUpdate, setTaskToUpdate] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [taskFilter, setTaskFilter] = useState({performers: [], expiresAt: ''});
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        if (currentUser) {
            dispatch(getBoard())
                .catch(() => {
                });
        }
    }, [dispatch, currentUser])

    if (!currentUser) {
        return (<Redirect to="/login"/>);
    }
    return (
        <Container>
            <TaskModal handleSubmit={taskToUpdate ? handleUpdate : handleCreate}
                       handleClose={handleClose} performers={[currentUser.username, ...performers]}
                       taskToUpdate={taskToUpdate}
                       show={showModal} successful={successful}/>
            <Row className="filter-row">
                <h5>Задачи:</h5>
                <Row className="filter-row__control ml-auto">
                    <TaskFilter handleFilter={handleFilter} performers={[currentUser.username, ...performers]}/>
                    <div>
                        <Button className="btn-filter" size="sm" onClick={handleShow}>
                            Новая задача
                        </Button>
                    </div>
                </Row>


            </Row>
            <TaskTable tasks={tasks} filter={taskFilter} handleShow={handleShow}/>
        </Container>
    );
}


export default Board;