const http = require('http');
const Context = require('./Context');
const Router = require('./Router');
const Validator = require('./Validator');

class Server {

    api_base_url = 'api';
    router = null;
    context = null;
    port = null;

    constructor(option) {
        if (!(option.router instanceof Router)) throw new TypeError();
        this.router = option.router;

        if (!(option.context instanceof Context)) throw new TypeError();
        this.context = option.context;

        this.port = option.port;
        this.app = this.createServer();
    }

    createServer() {
        return http.createServer();
    }

    listenRequest(cb) {
        this.app.on('request', async (req, res) => {
            const client = await this.processRequest(req);
            const data = this.processResponse(res, client);
            cb(res, data);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Start on ${this.port} port...`);
        })
    }

    parseBody(buff) {

    }

    async processRequest(req) {
        const buff = [];
        await new Promise((resolve, reject) => {
            req.on('data', (chunk) => {
                buff.push(chunk);
            }).on('end', async () => {
                resolve();
            });
        });

        const body = this.parseBody(buff);
        const client = new this.context(req, body);
        if (client.pathname.startsWith(this.api_base_url)) {
            client.handler = this.router.getHandler();
            return await this.processHandler(client);
        }
        return client;
    }

    async processHandler(client) {
        if (!client.handler) throw new Error();
        const { body, handler, method } = client;
        client.body = Validator.validate(handler.schema, body);
        client.data = method(body);
        return client;
    }

    processResponse(res, client) {
        const response = {
            error: null,
            message: null,
            data: client.data,
        };

        res.setHeader('Content-Type', 'application/json');
        if (client.preparedCookie.length && !res.headersSent) {
            res.setHeader('Set-Cookie', client.preparedCookie);
        }

        return JSON.stringify(response);
    }
}
