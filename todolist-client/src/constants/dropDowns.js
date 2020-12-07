import React from "react";

export const statuses = {
    0: 'К выполнению',
    1: 'Выполняется',
    2: 'Выполнена',
    3: 'Отменена',
}

export const statusOptions = (
    <>
        <option value="0">К выполнению</option>
        <option value="1">Выполняется</option>
        <option value="2">Выполнена</option>
        <option value="3">Отменена</option>
    </>
)

export const priorities = {
    0: '1',
    1: '2',
    2: '3',
    3: '4',
}

export const priorityOptions = (
    <>
        <option value="0">1</option>
        <option value="1">2</option>
        <option value="2">3</option>
        <option value="3">4</option>
    </>
)