import React from "react";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {renderField} from "../../Field";

export default function TaskForm(props) {
    const {handleSubmit, message, successful} = props;
    return (
        <Form onSubmit={handleSubmit} validate={validate} render={({handleSubmit}) => (
            <form className="form-task" onSubmit={handleSubmit}>
                {!successful && (
                    <>
                        <Row>
                            <Field name="title" component={renderField} type="text" label="Заголовок"/>
                        </Row>
                        <Row>
                            <Field name="description" component={renderField} type="text" label="Описание"/>
                        </Row>
                        <Row>
                            <Field name="expiresAs" component={renderField} type="text" label="Дата окончания"/>
                        </Row>
                        <Row>
                            <Field name="priority" component={renderField} type="text" label="Приоритет"/>
                        </Row>
                        <Row>
                            <Field name="responsible" component={renderField} type="text" label="Ответственный"/>
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
                    <Button type="submit" variant="primary" block>Создать</Button>
                )}
            </form>
        )}/>
    );
}
