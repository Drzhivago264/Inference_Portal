export class GoogleAISafetyError extends Error {
    constructor(response, message) {
        super(message);
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "reply", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        this.response = response;
    }
}
