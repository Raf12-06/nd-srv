import {Schema} from "./Validator";

export type Routing = Record<string, Rout | RoutParam>;

export interface RoutParam {
    url?: string,
    method: Method,
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

/**
 * Поддерживаемые http методы
 */
export enum Method {
    GET = 'GET',
    HEAD = 'HEAD',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    CONNECT = 'CONNECT',
    OPTIONS = 'OPTIONS',
    TRACE = 'TRACE',
    PATH = 'PATH'
}

export declare class Router {
    constructor(routs: Routing);

    public getHandlerParam(method: Method, pathname: string): RoutParam;
}
