import React from "react";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

function Profile(props) {
    const {user: currentUser} = useSelector(state => state.auth);

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
            {currentUser.headId && <p>
                <strong>Руководитель:</strong>{" "}
                {currentUser.headId}
            </p>}
        </Container>
    );
}

export default Profile;