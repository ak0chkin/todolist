import React, {useState} from "react";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {inputAdapter} from "../../Fields";
import {register} from "../../../actions/auth";
import {useDispatch, useSelector} from "react-redux";

function Register(props) {
    const dispatch = useDispatch();
    const {message} = useSelector(state => state.message)
    const [successful, setSuccessful] = useState(false);

    function handleRegister(values) {
        dispatch(register(values))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

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

export default Register;