const validate = values => {
    const errors = {};
    if (!values['title']) {
        errors['title'] = 'Заголовок не может быть пустым';
    }
    if (!values['description']) {
        errors['description'] = 'Описание не может быть пустым';
    }
    if (!values['expiresAt']) {
        errors['expiresAt'] = 'Дата окончания не может быть пустой';
    }
    if (!values['priority'] && values['priority'] !== 0) {
        errors['priority'] = 'Приоритет не может быть пустым';
    }
    if (!values['performer']) {
        errors['performer'] = 'Ответственный не может быть пустым';
    }
    return errors;
}

export default validate;