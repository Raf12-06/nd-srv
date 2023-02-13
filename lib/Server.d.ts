import { Router } from './Router';
import { IncomingMessage, ServerResponse, Server } from "http";
import { Context } from "./Context";

export declare class Srv {
    /**
     * Создание объекта сервера
     */
    constructor(option: {
        router: Router,
        context: Context,
        app: Server<typeof IncomingMessage, typeof ServerResponse>;
    });
    /**
     * Отображает запрос для анализа
     */
    request(cb: (req: IncomingMessage) => void);
    /**
     * Срабатывает, когда сервер обработал запрос, или возвращает ошибку при обработке
     */
    response(cb: (err: Error, res: ServerResponse, data: any) => void);
    /**
     * Запуск сервера на указанном проту
     */
    start(port: number, cd: () => void): void;
}
