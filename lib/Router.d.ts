import { Schema } from "./Validator";
import {Context} from "./Context";
/**
 * Тип объекта с роутами
 */
export type Routing = Record<string, Rout | RoutParam>;
/**
 * Тип роутера
 */
export interface Rout {
    router: Router,
    description?: string,
}
/**
 * Тип конечного роута
 */
export interface RoutParam {
    /**
     * Итоговая строка роута (используется для документации)
     */
    url?: string,
    /**
     * Типы доступных http запросов
     */
    method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE'| 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATH',
    /**
     * Схема валидации тела запроса
     */
    schema?: Schema,
    /**
     * Первый обработчик, который выполняется в первую очередь, имеющий доступ к обеъкту клинета
     * можно использовать для установки заголовков или проверки доступа
     */
    preHandler?: (client: Context) => void,
    /**
     * Основной обработчик запроса
     * @param data Валидированные по схеме дынные
     * @param req Объект с параметрами запроса
     */
    handler: (data: any, req: {
        /**
         * Параметры запроса
         */
        query: Record<string, string>,
        /**
         * Обработанные Cookie
         */
        cookie: Record<string, string>,
        /**
         * Обработанные заголовки
         */
        headers: Record<string, string>
    }) => Promise<any>,
    /**
     * Последний обработчик, который выполняется в полседнюю очередь, имеющий доступ к обеъкту клинета
     * можно использовать для установки заголовков
     */
    postHandler?: (client: Context) => void,
    /**
     * Описание роута
     */
    description?: string,
}
/**
 * Класс для создания главного роутера сервера
 */
export declare class Router {
    constructor(routs: Routing);
}
