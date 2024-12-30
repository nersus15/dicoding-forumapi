const routes = (handler) => [
    {
        method: 'POST',
        path: '/threads',
        handler: handler.postThreadHandler,
        options: {
            auth: 'authapi_jwt'
        }
    }
];

module.exports = routes;