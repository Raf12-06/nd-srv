const type = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    array: 'Array'
}

const reference = {
    [type.string]: {
        length: {
            max: (income, value) => income.length <= value,
            min: (income, value) => income.length >= value,
        },
        match: (income, regExp) => income.match(regExp),
    },
    [type.number]: {
        ID: (income) => income > 0,
        length: {
            max: (income, value) => income <= value,
            min: (income, value) => income >= value,
        },
    },
    [type.array]: {
        length: {
            max: (income, value) => income.length <= value,
            min: (income, value) => income.length >= value,
        },
        listID: (income) => {
            let isOk = true;
            for (let i = 0; i < income.length; i++) {
                const el = income[i];
                if (el <= 0) {
                    isOk = false;
                    break;
                }
            }
            return isOk;
        },
        elementType: (income, type) => {
            let isOk = true;
            for (let i = 0; i < income.length; i++) {
                const el = income[i];
                if (typeof el !== type) {
                    isOk = false;
                    break;
                }
            }
            return isOk;
        },
        elementMatch: (income, regExp) => {
            let isOk = true;
            for (let i = 0; i < income.length; i++) {
                const el = income[i];
                if (!el.match(regExp)) {
                    isOk = false;
                    break;
                }
            }
            return isOk;
        },
        elementIf: (income, cb) => {
            income.forEach(el => cb(el));
            return true;
        },
    }
}

class Validator {

    static validate = (schema, body, msg: string) => {
        if (!schema) return;
        if (!body) throw Error(`${msg}: Object is empty`);

        const validBody = {};
        for (const key in schema) {
            const income = body[key];
            const rule = schema[key];

            if (income === undefined || income === null) {
                if (rule.require) throw Error(`${msg}: Required field: ${key}`);
                if (rule.default) validBody[key] = rule.default;
                continue;
            }

            switch (rule.type) {
                case type.number:
                case type.string:
                case type.boolean:
                    if (typeof income === rule.type) validBody[key] = income;
                    else throw Error(`${msg}: Invalid type: ${key}`);

                    if (rule.reference) this.checkReference(key, income, rule, msg);
                    break;

                case type.array:
                    if (Array.isArray(income)) validBody[key] = income;
                    else throw Error(`${msg}: Invalid type: ${key}`);

                    if (rule.reference) this.checkReference(key, income, rule, msg);
                    break;
            }
        }

        return validBody;
    }

    static checkReference = (filed, value, rule, msg) => {
        const currRef = rule.reference;

        for (const ref in currRef) {
            const curr = reference[rule.type][ref];
            const isFunc = typeof curr === 'function';

            if (isFunc) {
                if (!curr(value, currRef[ref])) throw Error(`${msg}: Invalid value: ${filed}`);
            } else {
                for (const key in currRef[ref]) {
                    const opt = curr[key];
                    const optVal = currRef[ref][key];
                    if (!opt(value, optVal)) throw Error(`${msg}: Invalid value: ${filed}`);
                }
            }
        }
    }
}

module.exports = Validator;
