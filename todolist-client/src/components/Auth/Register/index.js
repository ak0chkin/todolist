import React, {useState} from "react";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {inputAdapter} from "../../Fields";
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
                            <Field name="surname" component={inputAdapter}
                                   type="text" label="Фамилия"/>
                            <Field name="name" component={inputAdapter} type="text"
                                   label="Имя"/>
                            <Field name="patronymic" component={inputAdapter} type="text"
                                   label="Отчество"/>
                        </Row>
                        <Row>
                            <Field name="username" component={inputAdapter} type="text"
                                   label="Имя пользователя"/>
                        </Row>
                        <Row>
                            <Field name="password" component={inputAdapter} type="password" label="Пароль"/>
                        </Row>
                        <Row>
                            <Field name="head" component={inputAdapter} type="text" label="Руководитель"/>
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