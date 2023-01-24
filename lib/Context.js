const url = require('url');

class Context {

    url;
    method;
    pathname;
    query;
    host;
    body = null;
    handlerParam = null;
    data = null;
    headers;
    cookie = null;
    preparedCookie = null;
    preparedHeaders = null;

    constructor(req, body) {
        this.body = body;
        this.url = req.url;
        this.method = req.method;
        this.preparedHeaders = new Map();
        this.parseUrl(this.url);
        this.parseHeaders(req.headers);
    }

    parseUrl(sUrl) {
        const reqUrl = url.parse(sUrl);

        let query = null;
        if (reqUrl.query) {
            const entries = new url.URLSearchParams(reqUrl.query);
            query = Object.fromEntries(entries);
        }

        this.pathname = reqUrl.pathname;
        this.query = query;
    }

    parseHeaders(headers) {
        if (!headers) {
            return;
        }

        if (headers.cookie) {
            const entries = [];
            const rawFieldList = headers.cookie.split('; ');
            for (let i = 0; i < rawFieldList.length; i++) {
                const rawField = rawFieldList[i];
                const entry = rawField.split('=');
                entries.push(entry);
            }
            this.cookie = Object.fromEntries(entries);
        }

        if (headers.host) {
            const asHost = headers.host.split(':');
            this.host = asHost.shift();
        }

        this.headers = headers;
    }

    setCookie(name, val, option) {
        const { host } = this;
        let cookie = `${name}=${val}; `;
        if (option?.expires) cookie += `expires=${option.expires}; `;
        if (option?.maxAge) cookie += `max-age=${option.maxAge}; `;
        if (option?.path) {
            cookie += `Path=${option.path}; `;
        } else {
            cookie += 'Path=/; ';
        }
        if (option?.httpOnly) cookie += 'HttpOnly; ';
        cookie += `Domain=${host}; `;
        this.preparedCookie?.push(cookie);
    }

    setHeader(name, value) {
        this.preparedHeaders.set(name, value);
    }

    delCookie(name) {
        this.preparedCookie?.push(`${name}=deleted; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=${this.host}`);
    }
}

module.exports = Context;
