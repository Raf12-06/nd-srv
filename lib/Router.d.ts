import {Schema} from "./Validator";

export type Routing = Record<string, Rout | RoutParam>;

export interface RoutParam {
    url?: string,
    method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE'| 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATH',
    schema?: Schema,
    preHandler?: Function,
    handler: Function,
    postHandler?: Function,
    description?: string,
}

export interface Rout {
    router: Router,
    description?: string,
}

export declare class Router {
    constructor(routs: Routing);
}
