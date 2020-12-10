import React from "react";
import {priorities, statuses} from "../../../constants/dropDowns";
import moment from "moment";
import {Table} from "react-bootstrap";
import "./index.css"

function TaskTable(props) {
    function taskFilter(tasks, filter) {
        let result = tasks;
        if (filter.performers.length) {
            result = tasks.filter(item => filter.performers.includes(item.performer.username));
        }
        switch (filter.expiresAt) {
            case "all":
                return result;
            case "today":
                return result.filter(item => (
                    moment(item.expiresAt).isAfter(moment().add(-1, 'days'))
                    && moment(item.expiresAt).isBefore(moment().add(1, 'days'))
                ));
            case "week":
                return tasks.filter(item => (
                    moment(item.expiresAt).isAfter(moment().add(-1, 'days'))
                    && moment(item.expiresAt).isBefore(moment().add(6, 'days'))
                ));
            case "future":
                return tasks.filter(item => (
                    moment(item.expiresAt).isAfter(moment().add(6, 'days'))
                ));
            default:
                return result;
        }
    }

    const {tasks, filter, handleShow} = props;
    const filteredTasks = taskFilter(tasks, filter);
    const taskRows = filteredTasks.map(({id, title, priority, expiresAt, performer, status}) => {
        return (
            <tr key={id} onClick={() => {
                handleShow(id)
            }}>
                <td className={status == 2 || status == 3 ? "title_green" : moment().isBefore(expiresAt) ? "title_grey" : "title_red"}>{title}</td>
                <td>{priorities[priority]}</td>
                <td>{moment(expiresAt).format("DD/MM/yyyy")}</td>
                <td>{performer.username}</td>
                <td>{statuses[status]}</td>
            </tr>
        )
    });

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