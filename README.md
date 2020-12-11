# todolist ([Demo](https://kochkin-todolist.herokuapp.com/))
Web приложение, пользователь которого может планировать свою деятельность и контролировать работу своих подчиненных при помощи механизма управления задачами.

## Описание
Соблюдены все требования:
* пароли пользователей нельзя хранить в незашифрованном виде;
* пользователь может получить доступ к приложению только после авторизации;
* пользователи не могут изменять атрибуты задач, созданных их руководителями, кроме статуса;
* пользователь не может указать в качестве ответственного задачи другого пользователя, который не является его подчиненным;

Основной стек:
* Backend - node js, express
* Frontend - react, redux
* База данных - postgresql

