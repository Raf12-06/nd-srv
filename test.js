const { Server, Context, Router } = require('./index');

const router = new Router({
    '/car': {
        router: {
            '/model': {
                url: '/car/model',
                method: 'GET',
                async handler(data) {
                    return 'hello2';
                }
            },
            '/mark': {
                url: '/car/mark',
                method: 'POST',
                async handler(data) {
                    return 'hello2';
                }
            },
            '/status': {
                router: {
                    '/fuel': {
                        url: '/car/model',
                        method: 'OPTION',
                        async handler(data) {
                            return 'hello2';
                        }
                    }
                }
            }
        }
    },
    '/api': {
        url: '/api',
        method: 'POST',
        async postHandler(client) {
            client.setHeader('asdafasf', '123');
            client.setCookie('12344', '124')
        }
    },
    '/hello': {
        url: '/hello',
        method: 'GET',
        async handler(data) {
            return 'hello2';
        }
    },
    '/user': {
        router: {
            '/': {
                url: '/user',
                method: 'POST',
                async handler(data) {
                    return '/user/name';
                }
            },
            '/name': {
                url: '/user/name',
                method: 'GET',
                async handler(data) {
                    return '/user/name';
                }
            },
            '/age': {
                url: '/user/age',
                method: 'GET',
                async handler(data) {
                    return '/user/age';
                }
            },
            '/access': {
                router: {
                    '/role': {
                        url: '/user/access/role',
                        method: 'GET',
                        async handler(data) {
                            return '/user/age';
                        }
                    },
                    '/static': {
                        router: {
                            '/': {
                                url: '/user/access/static',
                                method: 'POST',
                                async handler(data) {
                                    return 12;
                                }
                            }
                        }
                    },
                    '/stat': {
                        url: '/user/access/stat',
                        method: 'OPTION',
                        async handler(data) {
                            return 12;
                        }
                    }
                }
            }
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

server.start(8001);
