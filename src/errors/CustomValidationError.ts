class CustomValidationError extends Error {
    constructor(public message: string) {
        super();
    }
}

export { CustomValidationError };
