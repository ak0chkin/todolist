import React from "react";
import UserService from "../../services/user.service";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data.content
                });
            },
            error => {
                this.setState({
                    content: error.response.data.message
                });
            }
        );
    }

    render() {
        const {content} = this.state;
        return (
            <div className="container">
                <h3>{content}</h3>
            </div>
        );
    }
}
