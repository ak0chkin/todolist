const validate = values => {
    const errors = {};
    if (!values['username']) {
        errors['username'] = 'Имя пользователя не может быть пустым';
    }
    if (!values['password']) {
        errors['password'] = 'Пароль не может быть пустым';
    }

    return errors;
}

export default validate;