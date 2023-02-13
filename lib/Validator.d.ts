/**
 * Основные валидируемые типы
 */
type Type = 'number' | 'string' | 'boolean' | 'Array';
/**
 * Основной тип схемы [поле обхекта: схема валидации для поля]
 */
export type Schema = Record<string, SchemaField>
/**
 * Основные поля схемы
 */
interface SchemaField {
    /**
     * Тип которому должно соответствовать занчение поля
     */
    type: Type,
    /**
     * Является ли поле обязательным
     */
    require?: boolean,
    /**
     * Значение по умолчению, в случае отсутствия
     */
    default?: any,
    /**
     * Дополнительная валидация
     */
    reference?: Reference,
}
/**
 * Функции для дополнительной валидации
 */
interface Reference {
    /**
     * Ограничение длинны строки/числа/массива
     */
    length?: {
        min?: number,
        max?: number,
    },
    /**
     * Шаблон RegExp для сравнения строки
     */
    match?: RegExp,
    /**
     * Проверка числа на > 0
     */
    ID?: boolean,
    /**
     * Проверка массива на содержание чисел > 0
     */
    listID?: boolean,
    /**
     * Проверка массива на седержание элементов указанного типа
     */
    elementType?: Type,
    /**
     * Проверка массива строк на шаблон RegExp
     */
    elementMatch?: RegExp,
    /**
     * Перебор массива, для создания кастомной валидации
     */
    elementIf?: (el: any) => void,
}
/**
 * Класс, предоставляющий методы валидации
 */
export declare class Validator {
    /**
     * JSON описыващий валидацию
     * @param schema
     * Объект вадидации
     * @param body
     * Сообщение в случае возникновения ошибки валидации
     * @param msg
     */
    public static validate(schema: Schema, body: any, msg: string): any;
}
