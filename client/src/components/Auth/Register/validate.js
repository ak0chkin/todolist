const validate = values => {
    const errors = {};
    if (!values['surname']) {
        errors['surname'] = 'Фамилия не может быть пустой';
    }
    if (!values['name']) {
        errors['name'] = 'Имя не может быть пустым';
    }
    if (!values['username']) {
        errors['username'] = 'Имя пользователя не может быть пустым';
    }
    if(!(/^[\w_-]{3,20}$/).test(values['username'])) {
        errors['username'] = 'Используйте буквы латинского алфавита, цифры, дефисы и подчёркивания (от 3 до 20 символов)'
    }
    if (!values['password']) {
        errors['password'] = 'Пароль не может быть пустым';
    }
    if(!(/^[\w_-]{3,20}$/).test(values['password'])) {
        errors['password'] = 'Используйте буквы латинского алфавита, цифры, дефисы и подчёркивания (от 3 до 20 символов)'
    }

    return errors;
}

export default validate;