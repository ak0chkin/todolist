import React from "react";
import TaskForm from "../Form";
import {Modal} from "react-bootstrap";

export default function TaskModal(props) {
    const {handleSubmit, handleClose, taskToUpdate, performers, show, successful} = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{taskToUpdate ? "Редактировать задачу" : "Создать задачу"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TaskForm handleSubmit={handleSubmit} taskToUpdate={taskToUpdate} performers={performers}
                          successful={successful}/>
            </Modal.Body>
        </Modal>
    );
}
