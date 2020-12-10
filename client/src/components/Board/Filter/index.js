import React from "react";
import {Dropdown, FormCheck} from "react-bootstrap";
import "./index.css";

const CustomItem = ({type, id, label, name, className, style, handleFilter}) => (
    <FormCheck type={type} id={id} name={name} label={label} onChange={handleFilter} className={className}
               style={style}/>
)

function TaskFilter(props) {
    const {performers, handleFilter} = props;
    const performerCheckboxes = performers.map(item => (
        <Dropdown.Item key={item} as={CustomItem} type="checkbox" id={item} name="performer" label={item}
                       handleFilter={handleFilter}/>
    ));

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle className="btn-filter" id="dropdown-basic" size="sm">
                    Дата завершения
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={CustomItem} type="radio" id="all" name="expiresAt" label="Все"
                                   handleFilter={handleFilter}/>
                    <Dropdown.Item as={CustomItem} type="radio" id="today" name="expiresAt" label="Сегодня"
                                   handleFilter={handleFilter}/>
                    <Dropdown.Item as={CustomItem} type="radio" id="week" name="expiresAt" label="Неделя"
                                   handleFilter={handleFilter}/>
                    <Dropdown.Item as={CustomItem} type="radio" id="future" name="expiresAt" label="Будущее"
                                   handleFilter={handleFilter}/>
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