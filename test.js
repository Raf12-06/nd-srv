const { Server, Context, Router } = require('./index');

const router = new Router({
    '/api': {
        method: 'GET',
        schema: {
            page: {
                type: 'number',
                reference: {
                    length: { min: 0 },
                },
                require: true,
            },
            limit: {
                type: 'number',
                reference: {
                    length: { min: 0 },
                },
                require: true,
            },
        },
        async handler(client) {
            return 'hello';
        }
    }
});

const server = new Server({
    router: router,
    context: Context
});
server.response((res, data) => { res.end(data) });
server.start(8080);
