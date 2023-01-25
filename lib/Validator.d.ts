interface Reference {

}

interface SchemaField {
    type: Type,
    require?: boolean,
    default?: any,
    reference?: Reference,
}

export type Schema = Record<string, SchemaField>

export enum Type {
    number = 'number',
    string = 'string',
    boolean = 'boolean',
    array = 'Array',
}

export declare class Validator {

    public static validate(schema: SchemaField, body: Object): void;

    public static checkReference(filed: string, value: any, rule: SchemaField): void;
}
