import React from "react";
import  {FormCheck, Dropdown} from "react-bootstrap";
import "./index.css";

const CustomItem = ({type, id, label, name, className, style, handleFilter }) => (
    <FormCheck type={type} id={id} name={name} label={label} className={className} style={style}/>
)

function TaskFilter(props) {
    const {performers} = props;
    const performerCheckboxes = performers.map(item => (
        <Dropdown.Item as={CustomItem} type="checkbox" id={item} name="performer" label={item}/>
    ));

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle className="btn-filter" id="dropdown-basic" size="sm">
                    Дата завершения
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={CustomItem} type="radio" id="0" name="expiresAt" label="Сегодня"/>
                    <Dropdown.Item as={CustomItem} type="radio" id="1" name="expiresAt" label="Неделя"/>
                    <Dropdown.Item as={CustomItem} type="radio" id="2" name="expiresAt" label="Будущее"/>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle className="btn-filter" id="dropdown-basic" size="sm">
                    Ответственный
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {performerCheckboxes}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default TaskFilter;