import React from "react";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {inputAdapter} from "../../Fields";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../../actions/auth";

function Login(props) {
    const {isLoggedIn, message} = props;

    async function handleLogin(values) {
        const {dispatch} = props;
        dispatch(login(values))
            .catch(() => {
            });
    }

    if (isLoggedIn) {
        return <Redirect to="/board"/>;
    }

    return (
        <Form onSubmit={handleLogin} validate={validate} render={({handleSubmit}) => (
            <form className="form-signin" onSubmit={handleSubmit}>
                <Row>
                    <Field name="username" component={inputAdapter} type="text" label="Имя пользователя"/>
                </Row>
                <Row>
                    <Field name="password" component={inputAdapter} type="password" label="Пароль"/>
                </Row>
                {message && (
                    <FormGroup>
                        <Alert variant="danger">
                            {message}
                        </Alert>
                    </FormGroup>
                )}
                <Button type="submit" variant="primary" block>Войти</Button>
            </form>
        )}/>
    );
}

function mapStateToProps(state) {
    const {isLoggedIn} = state.auth;
    const {message} = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);