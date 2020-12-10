import React from "react";
import {Field, Form} from "react-final-form";
import validate from "./validate";
import "./index.css";
import {Alert, Button, FormGroup, Row} from "react-bootstrap";
import {datePickerAdapter, inputAdapter, selectAdapter} from "../../Fields";
import {useSelector} from "react-redux";
import moment from "moment";
import {priorityOptions, statusOptions} from "../../../constants/dropDowns";

function TaskForm(props) {
    const {message: {message}, auth: {user: currentUser}} = useSelector(state => state);
    const {handleSubmit, taskToUpdate, performers, successful} = props;
    const limitation = taskToUpdate ? taskToUpdate.creatorId === currentUser.id : true;
    const performerOptions = [<option key={'none'} style={{display: 'none'}}/>, ...performers.map(item => (
        <option key={item} value={item}>{item}</option>
    ))];

    return (
        <Form onSubmit={handleSubmit} validate={validate}
              initialValues={taskToUpdate ? {
                  ...taskToUpdate,
                  expiresAt: moment(taskToUpdate.expiresAt).toDate(),
                  performer: taskToUpdate.performer.username
              } : {}}
              render={({handleSubmit}) => (
                  <form className="form-task" onSubmit={handleSubmit}>
                      {!successful && (
                          <>
                              <Field component="input" type="hidden" name="id"/>
                              <Row>
                                  <Field name="title" component={inputAdapter} type="text" label="Заголовок" disabled={!limitation}/>
                              </Row>
                              <Row>
                                  <Field name="description" component={inputAdapter} type="textarea" label="Описание" disabled={!limitation} as="textarea"/>
                              </Row>
                              <Row>
                                  <Field name="expiresAt" component={datePickerAdapter} type="text"
                                         label="Дата окончания" disabled={!limitation}/>
                              </Row>
                              <Row>
                                  <Field name="priority" component={selectAdapter} options={priorityOptions}
                                         label="Приоритет" disabled={!limitation}/>
                              </Row>
                              {taskToUpdate && (
                                  <Row>
                                      <Field name="status" component={selectAdapter} options={statusOptions}
                                             label="Статус"/>
                                  </Row>
                              )}
                              <Row>
                                  <Field name="performer" component={selectAdapter} options={performerOptions}
                                         label="Ответственный" disabled={!limitation}/>
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

export default TaskForm;