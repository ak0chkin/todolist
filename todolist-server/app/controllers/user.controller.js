exports.allAccess = async (request, response) => {
    response.status(200).send({content: "Содержимое, доступное всем."});
};

exports.userBoard = async (request, response) => {
    response.status(200).send({content: "Содержимое, доступное авторизованным пользователям."});
};