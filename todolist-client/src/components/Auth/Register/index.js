import React from "react";
import AuthService from "../../../services/auth.service";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {renderField} from "../../Field";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'message': '',
            'successful': false
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    async handleRegister(values) {
        AuthService.register(values).then(
            response => {
                this.setState({
                    'message': response.data.message,
                    'successful': true
                });
            },
            error => {
                this.setState({
                    'message': error.response.data.message,
                    'successful': false
                });
            }
        );
    }

    render() {
        return (
            <Form onSubmit={this.handleRegister} validate={validate} render={({handleSubmit}) => (
                <form className="form-signup" onSubmit={handleSubmit}>
                    {!this.state.successful && (
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
                    {this.state.message && (
                        <FormGroup>
                            <Alert variant={this.state.successful ? "success" : "danger"}>
                                {this.state.message}
                            </Alert>
                        </FormGroup>
                    )}
                    {!this.state.successful && (
                    <Button type="submit" variant="primary" block>Зарегистрироваться</Button>
                    )}
                </form>
            )}/>
        );
    }
}
