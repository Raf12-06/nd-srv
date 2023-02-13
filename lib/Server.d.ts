import { Router } from './Router';
import { IncomingMessage, ServerResponse, Server } from "http";

export declare class Srv {
    /**
     * Создание объекта сервера
     */
    constructor(option: {
        /**
         * Объект главнного роутера
         */
        router: Router,
        /**
         * Сервер Http модуля
         */
        app: Server<typeof IncomingMessage, typeof ServerResponse>,
        /**
         * Ссылка на класс Context
         */
        context: any,
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
