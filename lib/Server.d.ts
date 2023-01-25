import { Routing } from './Router';
import { Context } from "./Context";
import {IncomingMessage} from "http";

export declare class Server {

    constructor(option: {
        router: Routing,
        context: Context,
        app: any
    });

    request(cb: (req: IncomingMessage) => void);

    response(cb: (err: Error, res: any, data: any) => void);

    start(port: number): void;
}
