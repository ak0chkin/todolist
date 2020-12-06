import React from "react";
import AuthService from "../../../services/auth.service";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {renderField} from "../../Field";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'message': ''
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin(values) {
        AuthService.login(values)
            .then(() => {
                    window.location.href = "/board";
                },
                error => {
                    this.setState({
                        loading: false,
                        message: error.response.data.message
                    });
                }
            );
    }

    render() {
        return (
            <Form onSubmit={this.handleLogin} validate={validate} render={({handleSubmit}) => (
                <form className="form-signin" onSubmit={handleSubmit}>
                    <Row>
                        <Field name="username" component={renderField} type="text" label="Имя пользователя"/>
                    </Row>
                    <Row>
                        <Field name="password" component={renderField} type="password" label="Пароль"/>
                    </Row>
                    {this.state.message && (
                        <FormGroup>
                            <Alert variant="danger">
                                {this.state.message}
                            </Alert>
                        </FormGroup>
                    )}
                    <Button type="submit" variant="primary" block>Войти</Button>
                </form>
            )}/>
        );
    }
}
