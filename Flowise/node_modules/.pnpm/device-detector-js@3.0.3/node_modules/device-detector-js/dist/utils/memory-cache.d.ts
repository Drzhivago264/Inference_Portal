export declare const memoryCache: <Value>() => {
    set: (key: string, value: Value) => void;
    get: (key: string) => Value | undefined;
};
