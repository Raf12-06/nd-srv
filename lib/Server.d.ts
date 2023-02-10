import { Router } from './Router';
import {IncomingMessage} from "http";

export declare class Server {

    constructor(option: {
        router: Router,
        context: any,
        app: any
    });

    request(cb: (req: IncomingMessage) => void);

    response(cb: (err: Error, res: any, data: any) => void);

    start(port: number): void;
}
