import React from "react";
import {priorities, statuses} from "../../../constants/dropDowns";
import moment from "moment";
import {Table} from "react-bootstrap";
import "./index.css"

function TaskTable(props) {
    const {tasks, handleShow} = props;

    const taskRows = tasks.map(({id, title, priority, expiresAt, performer, status}) => (
        <tr key={id} onClick={() => {
            handleShow(id)
        }}>
            <td>{title}</td>
            <td>{priorities[priority]}</td>
            <td>{moment(expiresAt).format("DD/MM/yyyy")}</td>
            <td>{performer.username}</td>
            <td>{statuses[status]}</td>
        </tr>
    ));

    return (
        <Table borderless hover>
            <thead>
            <tr>
                <th scope="col">Заголовок</th>
                <th scope="col">Приоритет</th>
                <th scope="col">Дата окончания</th>
                <th scope="col">Ответственный</th>
                <th scope="col">Статус</th>
            </tr>
            </thead>
            <tbody>
            {taskRows.length !== 0 && taskRows}
            </tbody>
        </Table>
    );
}

export default TaskTable;