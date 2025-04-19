export class utilsValidator {
    static isWhiteSpace = str => {
        return !str || /^\s*$/.test(str);
    };

    static isNullOrEmpty = text => {
        return (
            text === undefined ||
            text === null ||
            text === '' ||
            utilsValidator.isWhiteSpace(text)
        );
    };

    static isUndefined = obj => {
        return (typeof (obj) === 'undefined');
    }

    static evaluateObject = obj => {
        const result = !!(obj && Object.keys(obj).length);
        return result;
    };

    static hasErrorResponse = response => {
        const fieldErrors = [
            'exceptionMessage',
            'erroresValidacion',
            'validationErrorMessage',
            'mensajeValidacion',
            'mensajeError',
            'message',
            'mensaje',
            'error',
            'errorMessage',
            'stackTrace',
            'ErrorMessage',
        ];

        if (!response) {
            return false;
        }
        const hasErrors = fieldErrors.some(field => {
            if (typeof response[field] === 'object') {
                const isError = utilsValidator.evaluateObject(response[field]);

                if (isError) return isError;
            }

            if (typeof response[field] === 'string') {
                if (response[field]) {
                    return true;
                }
            }

            return false;
        });

        return hasErrors;
    };

    static isNull = obj => {
        return obj === null;
    }


}