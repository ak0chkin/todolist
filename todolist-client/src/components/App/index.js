import React from "react";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Profile from "../Auth/Profile";
import Home from "../Home";
import Board from "../Board";
import './index.css';
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import {clearMessage} from "../../actions/message";

function App(props) {
    const {user: currentUser} = props;
    function logOut() {
        props.dispatch(logout());
    }
    props.history.listen(() => {
        props.dispatch(clearMessage());
    });
    return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        /
                    </Link>
                    <div className="navbar-nav mr-auto">
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
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.surname} {currentUser.name}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href={"/login"} className="nav-link" onClick={logOut}>
                                    Выйти
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Войти
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Регистрация
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/board" component={Board}/>
                    </Switch>
                </div>
            </div>
    );
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(withRouter(App));