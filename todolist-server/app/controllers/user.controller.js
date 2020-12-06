exports.allAccess = async (request, response) => {
    response.status(200).send("Содержимое, доступное всем.");
};

exports.userBoard = async (request, response) => {
    response.status(200).send("Содержимое, доступное авторизованным пользователям.");
};