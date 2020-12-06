import {Col, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React from "react";

export const renderField = ({input, type, label, meta: {touched, error}}) => (
    <Col>
        <FormGroup>
            <FormLabel htmlFor={input.name}>{label}</FormLabel>
            <FormControl type={type} {...input} />
            {touched && error && <span className="form-group__error">{error}</span>}
        </FormGroup>
    </Col>
);