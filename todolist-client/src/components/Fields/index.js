import {Col, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React from "react";
import DatePicker, {registerLocale} from "react-datepicker"
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.min.css"
import "./index.css"

registerLocale("ru", ru);

export const inputAdapter = ({input, type, label, meta: {touched, error}, ...rest}) => (
    <Col>
        <FormGroup>
            <FormLabel htmlFor={input.name}>{label}</FormLabel>
            <FormControl type={type} {...input} {...rest}/>
            {touched && error && <span className="form-group__error">{error}</span>}
        </FormGroup>
    </Col>
);

export const selectAdapter = ({input, label, options, meta: {touched, error}, ...rest}) => (
    <Col>
        <FormGroup>
            <FormLabel htmlFor={input.name}>{label}</FormLabel>
            <FormControl as="select" {...input} {...rest}>{options}</FormControl>
            {touched && error && <span className="form-group__error">{error}</span>}
        </FormGroup>
    </Col>
);

export const datePickerAdapter = ({input: {name, value, onChange}, label, meta: {touched, error}, ...rest}) => (
    <Col>
        <FormGroup>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <DatePicker name={name} selected={value} onChange={date => onChange(date)} {...rest} locale="ru" dateFormat="dd/MM/yyyy" className="form-control" />
            {touched && error && <span className="form-group__error">{error}</span>}
        </FormGroup>
    </Col>
);
