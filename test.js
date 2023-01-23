const { Server, Context, Router } = require('./index');

const router = new Router({
    '/api': {
        url: '/api',
        method: 'POST',
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
        async preHandler(client) {

        },
        async handler(data) {
            return 'hello';
        },
        async postHandler(client) {
            client.setHeader('asdafasf', '123');
            client.setCookie('12344', '124')
        }
    },
    '/hello': {
        url: '/hello',
        method: 'GET',
        async preHandler(client) {
        },
        async handler(data) {
            return 'hello2';
        },
        async postHandler(client) {
        }
    }
});

const server = new Server({
    router: router,
    context: Context
});
server.request((req) => {

})
server.response((err, res, data) => {
    if (err) {
        console.log('\x1b[2;31mERROR')
        console.log(err);
    }
    console.log(data);
})

server.start(8080);
