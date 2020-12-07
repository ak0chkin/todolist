import React from "react";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {datePickerAdapter, inputAdapter, selectAdapter} from "../../Fields";
import {connect} from "react-redux";
import moment from "moment";
import {priorityOptions, statusOptions} from "../../../constants/dropDowns";

function TaskForm(props) {
    const {handleSubmit, taskToUpdate, successful, message} = props;
    return (
        <Form onSubmit={handleSubmit} validate={validate}
              initialValues={taskToUpdate ? {
                  ...taskToUpdate,
                  expiresAt: moment(taskToUpdate.expiresAt).toDate(),
                  responsible: taskToUpdate.responsible.username
              } : {}}
              render={({handleSubmit}) => (
                  <form className="form-task" onSubmit={handleSubmit}>
                      {!successful && (
                          <>
                              <Field component="input" type="hidden" name="id"/>
                              <Row>
                                  <Field name="title" component={inputAdapter} type="text" label="Заголовок"/>
                              </Row>
                              <Row>
                                  <Field name="description" component={inputAdapter} type="text" label="Описание"/>
                              </Row>
                              <Row>
                                  <Field name="expiresAt" component={datePickerAdapter} type="text"
                                         label="Дата окончания"/>
                              </Row>
                              <Row>
                                  <Field name="priority" component={selectAdapter} options={priorityOptions} label="Приоритет"/>
                              </Row>
                              {taskToUpdate && (
                                  <Row>
                                      <Field name="status" component={selectAdapter} options={statusOptions} label="Статус"/>
                                  </Row>
                              )}
                              <Row>
                                  <Field name="responsible" component={inputAdapter} type="text" label="Ответственный"/>
                              </Row>
                          </>
                      )}
                      {message && (
                          <FormGroup>
                              <Alert variant={successful ? "success" : "danger"}>
                                  {message}
                              </Alert>
                          </FormGroup>
                      )}
                      {!successful && (
                          <Button type="submit" variant="primary"
                                  block>{taskToUpdate ? "Сохранить" : "Создать"}</Button>
                      )}
                  </form>
              )}/>
    );
}

function mapStateToProps(state) {
    const {message} = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(TaskForm);