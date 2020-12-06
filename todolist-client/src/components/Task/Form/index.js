import React from "react";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {renderField} from "../../Field";

export default function TaskForm(props) {
    const {handleSubmit, taskToUpdate, message, successful} = props;
    return (
        <Form onSubmit={handleSubmit} validate={validate} render={({handleSubmit}) => (
            <form className="form-task" onSubmit={handleSubmit}>
                {!successful && (
                    <>
                        <Field component="input" type="hidden" name="id" initialValue={taskToUpdate && taskToUpdate.id}/>
                        <Row>
                            <Field name="title" component={renderField} type="text" initialValue={taskToUpdate && taskToUpdate.title} label="Заголовок"/>
                        </Row>
                        <Row>
                            <Field name="description" component={renderField} type="text" initialValue={taskToUpdate && taskToUpdate.description} label="Описание"/>
                        </Row>
                        <Row>
                            <Field name="expiresAs" component={renderField} type="text" initialValue={taskToUpdate && taskToUpdate.expiresAt} label="Дата окончания"/>
                        </Row>
                        <Row>
                            <Field name="priority" component={renderField} type="text" initialValue={taskToUpdate && taskToUpdate.priority} label="Приоритет"/>
                        </Row>
                        {taskToUpdate && (
                            <Row>
                                <Field name="status" component={renderField} type="text" initialValue={taskToUpdate && taskToUpdate.status} label="Статус"/>
                            </Row>
                        )}
                        <Row>
                            <Field name="responsible" component={renderField} type="text" initialValue={taskToUpdate && taskToUpdate.responsible.username} label="Ответственный"/>
                        </Row>
                    </>
                )}
                {message && (
                    <FormGroup>
                        <Alert variant={successful ? "success" : "danger"}>
                            {message}
                        </Alert>
                    </FormGroup>
                )}
                {!successful && (
                    <Button type="submit" variant="primary" block>{taskToUpdate ? "Сохранить" : "Создать"}</Button>
                )}
            </form>
        )}/>
    );
}
