import React from "react";
import  {FormCheck, Dropdown} from "react-bootstrap";
import "./index.css";

function TaskFilter(props) {
    const {performers} = props;

    const CustomItem = ({ id, type, className, style, handleFilter }) => (
        <FormCheck type={type} id={id} label={id} className={className} style={style}/>
    )

    const performerCheckboxes = performers.map(item => (
        <Dropdown.Item as={CustomItem} type={"checkbox"} id={item}/>
    ));

    return (
        <>
            <Dropdown id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Toggle variant="secondary">
                    Ответственные
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {performerCheckboxes}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default TaskFilter;