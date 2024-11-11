export class customApiError extends Error{
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

 export const createCustomApiError = (msg, statusCode) => {
    return new customApiError(msg, statusCode)
}

