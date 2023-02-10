interface Reference {

}

interface SchemaField {
    type: 'number' | 'string' | 'boolean' | 'Array',
    require?: boolean,
    default?: any,
    reference?: Reference,
}

export type Schema = Record<string, SchemaField>

export declare class Validator {

    public static validate(schema: Schema, body: any): any;

    public static checkReference(filed: string, value: any, rule: SchemaField): void;
}
