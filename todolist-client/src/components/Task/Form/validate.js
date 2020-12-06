const validate = values => {
    const errors = {};
    if (!values['title']) {
        errors['title'] = 'Заголовок не может быть пустым';
    }
    if (!values['description']) {
        errors['description'] = 'Описание не может быть пустым';
    }
    if (!values['priority']) {
        errors['priority'] = 'Приоритет не может быть пустым';
    }
    if (!values['responsible']) {
        errors['responsible'] = 'Ответственный не может быть пустым';
    }
    return errors;
}

export default validate;