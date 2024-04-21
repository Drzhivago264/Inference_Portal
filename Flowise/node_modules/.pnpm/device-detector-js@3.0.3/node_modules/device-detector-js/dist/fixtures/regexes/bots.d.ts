declare const _exports: ({
    "regex": string;
    "name": string;
    "category": string;
    "url": string;
    "producer": {
        "name": string;
        "url": string;
    };
} | {
    "regex": string;
    "name": string;
    "category": string;
    "producer": {
        "name": string;
        "url": string;
    };
    "url"?: undefined;
} | {
    "regex": string;
    "name": string;
    "category": string;
    "url": string;
    "producer"?: undefined;
} | {
    "regex": string;
    "name": string;
    "category": string;
    "url"?: undefined;
    "producer"?: undefined;
} | {
    "regex": string;
    "name": string;
    "url": string;
    "producer": {
        "name": string;
        "url": string;
    };
    "category"?: undefined;
} | {
    "regex": string;
    "name": string;
    "category"?: undefined;
    "url"?: undefined;
    "producer"?: undefined;
} | {
    "regex": string;
    "name": string;
    "url": string;
    "category"?: undefined;
    "producer"?: undefined;
} | {
    "regex": string;
    "name": string;
    "producer": {
        "name": string;
        "url": string;
    };
    "category"?: undefined;
    "url"?: undefined;
})[];
export = _exports;
