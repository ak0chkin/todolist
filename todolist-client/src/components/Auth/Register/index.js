import React, {useState} from "react";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {renderField} from "../../Field";
import {register} from "../../../actions/auth";
import {connect} from "react-redux";

function Register(props) {
    const [successful, setSuccessful] = useState(false);

    async function handleRegister(values) {
        const {dispatch} = props;
        dispatch(register(values))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    const {message} = props;
    return (
        <Form onSubmit={handleRegister} validate={validate} render={({handleSubmit}) => (
            <form className="form-signup" onSubmit={handleSubmit}>
                {!successful && (
                    <>
                        <Row>
                            <Field className="col-4" name="surname" component={renderField}
                                   type="text" label="Фамилия"/>
                            <Field className="col-4" name="name" component={renderField} type="text"
                                   label="Имя"/>
                            <Field className="col-4" name="patronymic" component={renderField} type="text"
                                   label="Отчество"/>
                        </Row>
                        <Row>
                            <Field name="username" component={renderField} type="text"
                                   label="Имя пользователя"/>
                        </Row>
                        <Row>
                            <Field name="password" component={renderField} type="password" label="Пароль"/>
                        </Row>
                        <Row>
                            <Field name="head" component={renderField} type="text" label="Руководитель"/>
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
                    <Button type="submit" variant="primary" block>Зарегистрироваться</Button>
                )}
            </form>
        )}/>
    );
}

function mapStateToProps(state) {
    const {message} = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(Register);