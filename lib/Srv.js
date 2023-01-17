const http = require('http');
const Client = require('./Client');
const File = require('./File');
const Router = require('./Router');

class Srv {

    api_base_url = 'api';
    routs = {};
    port = 8080;

    constructor(opts) {
        if (!(opts.base_routs instanceof Router)) throw new Error();
        this.routs = opts.base_routs.getBaseRouter();

        this.port = opts.port;
        this.app = this.createServer();
    }

    createServer() {
        return http.createServer();
    }

    listenRequest() {
        this.app.on('request', async (req, res) => {
            await this.processRequest(req, (err, client) => {

            });
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Start on ${this.port} port...`);
        })
    }

    parseBody(buff) {

    }

    async processRequest(req, cb) {
        const buff = [];
        await new Promise((resolve, reject) => {
            req.on('data', (chunk) => {
                buff.push(chunk);
            }).on('end', async () => {
                resolve();
            });
        });

        const body = this.parseBody(buff);
        const client = new Client(req, body);
        if (client.pathname.startsWith(this.api_base_url)) {
            //client.handler =
        }
    }
}
