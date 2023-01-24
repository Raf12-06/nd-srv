class Router {

    base_routs = {};

    list_get     = new Map();
    list_head    = new Map();
    list_post    = new Map();
    list_put     = new Map();
    list_delete  = new Map();
    list_connect = new Map();
    list_option  = new Map();
    list_trace   = new Map();
    list_path    = new Map();

    method = {
        GET:     'GET',
        HEAD:    'HEAD',
        POST:    'POST',
        PUT:     'PUT',
        DELETE:  'DELETE',
        CONNECT: 'CONNECT',
        OPTION:  'OPTION',
        TRACE:   'TRACE',
        PATH:    'PATH'
    }

    constructor(routs) {
        this.base_routs = routs;
        let path = [];
        const iterateObj = (obj) => {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                path.push(key);
                const currObj = obj[key];
                if (currObj.router) {
                    iterateObj(obj[key].router);
                } else {
                    if (path[path.length - 1] === '/') path.pop();
                    let currPath = path.join('');
                    switch (currObj.method) {
                        case this.method.GET:
                            this.list_get.set(currPath, currObj);
                            break;
                        case this.method.POST:
                            this.list_post.set(currPath, currObj);
                            break;
                        case this.method.HEAD:
                            this.list_head.set(currPath, currObj);
                            break;
                        case this.method.PUT:
                            this.list_put.set(currPath, currObj);
                            break;
                        case this.method.DELETE:
                            this.list_delete.set(currPath, currObj);
                            break;
                        case this.method.CONNECT:
                            this.list_connect.set(currPath, currObj);
                            break;
                        case this.method.OPTION:
                            this.list_option.set(currPath, currObj);
                            break;
                        case this.method.TRACE:
                            this.list_trace.set(currPath, currObj);
                            break;
                        case this.method.PATH:
                            this.list_path.set(currPath, currObj);
                            break;
                    }
                }
                path.pop();
            }
        }
        iterateObj(routs);
    }

    getHandlerParam(method, pathname) {
        let handlerParam = null;

        switch (method) {
            case this.method.PATH:
                handlerParam = this.list_path.get(pathname);
                break;
            case this.method.TRACE:
                handlerParam = this.list_trace.get(pathname);
                break;
            case this.method.PUT:
                handlerParam = this.list_put.get(pathname);
                break;
            case this.method.GET:
                handlerParam = this.list_get.get(pathname);
                break;
            case this.method.HEAD:
                handlerParam = this.list_head.get(pathname);
                break;
            case this.method.CONNECT:
                handlerParam = this.list_connect.get(pathname);
                break;
            case this.method.OPTION:
                handlerParam = this.list_option.get(pathname);
                break;
            case this.method.DELETE:
                handlerParam = this.list_delete.get(pathname);
                break;
            case this.method.POST:
                handlerParam = this.list_post.get(pathname);
                break;
        }
    }
}

module.exports = Router;
