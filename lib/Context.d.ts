import { IncomingMessage } from 'http';

/**
 * Класс для работы с контекстом клиента
 */
export declare class Context {

    /**
     * Маршрут обращения
     */
    pathname: string;
    /**
     * Хост
     */
    host: string;
    /**
     * Объект с параметрами запроса
     */
    query: string;
    /**
     * Тело запроса
     */
    body: any;
    /**
     * Объект заголовков
     */
    headers: Object;
    /**
     * Объект cookie
     */
    cookie: Object;

    constructor(req: IncomingMessage, body: Record<string, any>);
    /**
     *
     * Подготавливает Set-Cookie заголовок для отправки на клиент
     */
    public setCookie(name: string, val: string | number, option?: {
        expires?: string,
        maxAge?: string,
        path?: string,
        httpOnly?: boolean,
    }): void;
    /**
     *
     * Подготавливает http заголовок для отправки на клиент
     */
    public setHeader(name: string, value: number | string): void;
    /**
     *
     * Подготавливает заголов для удаления cookie с сответствующим названием на клиенте
     */
    public delCookie(name: string): void;
}
