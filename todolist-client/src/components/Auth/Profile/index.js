import React from "react";
import AuthService from "../../../services/auth.service";
import {Container} from "react-bootstrap";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const {currentUser} = this.state;
        return (
            <Container>
                <h3>
                    <strong>{currentUser.surname} {currentUser.name} {currentUser.patronymic ? currentUser.patronymic : ''}</strong>
                </h3>
                <p>
                    <strong>Имя пользователя:</strong>{" "}
                    {currentUser.username}
                </p>
                <p>
                    <strong>Идентификатор:</strong>{" "}
                    {currentUser.id}
                </p>
                <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken}
                </p>
                {currentUser.head && <p>
                    <strong>Руководитель:</strong>{" "}
                    {currentUser.head}
                </p>}
            </Container>
        );
    }
}
