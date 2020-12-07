import React from "react";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Profile from "../Auth/Profile";
import Home from "../Home";
import Board from "../Task/Board";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import {clearMessage} from "../../actions/message";
import {Nav, Navbar, Container} from "react-bootstrap";
import './index.css';

function App(props) {
    const {user: currentUser} = props;

    function logOut() {
        props.dispatch(logout());
    }

    props.history.listen(() => {
        props.dispatch(clearMessage());
    });
    return (
        <>
            <Navbar bg="dark" variant="dark" expand>
                <Link to={"/"} className="navbar-brand">
                    /
                </Link>
                <Nav className="mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Домой
                        </Link>
                    </li>

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/board"} className="nav-link">
                                Задачи
                            </Link>
                        </li>
                    )}
                </Nav>

                {currentUser ? (
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.surname} {currentUser.name}
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={"/login"} className="nav-link" onClick={logOut}>
                                Выйти
                            </Link>
                        </Nav.Item>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Link to={"/login"} className="nav-link">
                                Войти
                            </Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Link to={"/register"} className="nav-link">
                                Регистрация
                            </Link>
                        </Nav.Item>
                    </Nav>
                )}
            </Navbar>

            <Container className=" mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route path="/board" component={Board}/>
                </Switch>
            </Container>
        </>
    );
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(withRouter(App));