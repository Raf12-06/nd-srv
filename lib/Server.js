const http = require('http');
const Router = require('./Router');
const Validator = require('./Validator');
const { EventEmitter } = require('events');
const serverEvent = new EventEmitter();

class Server {

    router = null;
    context = null;

    constructor(option) {
        if (!(option.router instanceof Router)) throw new TypeError('option mast be instance of Router class');
        this.router = option.router;

        this.context = option.context;
        this.app = http.createServer();
    }

    request(cb) {
        this.app.on('request', async (req, res) => {
            cb(req);
            await this.processRequest(req).then(client => {
                serverEvent.emit('dataFinish', null, res, client);
            }).catch(err => {
                serverEvent.emit('dataFinish', err, res, null);
            });
        });
    }

    response(cb) {
        serverEvent.on('dataFinish', (err, res, client) => {
            if (err) return cb(err, res, null);
            const data = this.processResponse(res, client);
            cb(null, res, data);
        });
    }

    start(port) {
        this.app.listen(port, () => {
            console.log(`Start on ${port} port...`);
        })
    }

    parseBody(buff) {
        let body = null;
        if (!buff.length) return body;
        try {
            // TODO Добавить асинхронный парсинг тела
            const sBody = Buffer.concat(buff).toString();
            body = JSON.parse(sBody);
        } catch (e) {
            throw new Error('bad request body');
        }
        return body;
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
        client.handlerParam = this.router.getHandlerParam(client.pathname);
        return await this.processHandler(client);
    }

    async processHandler(client) {
        if (!client.handlerParam) throw new Error('Not found');
        const { handlerParam } = client;
        client.body = Validator.validate(handlerParam.schema, client.body);
        await handlerParam?.preHandler(client);
        client.data = await handlerParam.handler(client.body);
        await handlerParam?.postHandler(client);
        return client;
    }

    processResponse(res, client) {

        res.setHeader('Content-Type', 'application/json');

        if (client?.preparedCookie?.length && !res.headersSent) {
            res.setHeader('Set-Cookie', client.preparedCookie);
        }

        if (client?.preparedHeaders.size && !res.headersSent) {
            const entries = client.preparedHeaders.entries();
            for (let entry of entries) {
                res.setHeader(entry[0], entry[1]);
            }
        }

        return JSON.stringify(client.data);
    }
}

module.exports = Server;
