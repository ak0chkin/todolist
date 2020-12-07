import React from "react";
import {Container} from "react-bootstrap";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

function Profile(props) {
    const {user: currentUser} = props;

    if (!currentUser) {
        return <Redirect to="/login"/>;
    }
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
            {currentUser.headId && <p>
                <strong>Руководитель:</strong>{" "}
                {currentUser.headId}
            </p>}
        </Container>
    );
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);