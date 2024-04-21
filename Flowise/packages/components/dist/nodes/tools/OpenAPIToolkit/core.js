"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonGetValueTool = exports.JsonListKeysTool = exports.JsonSpec = void 0;
const jsonpointer_1 = __importDefault(require("jsonpointer"));
const serializable_1 = require("@langchain/core/load/serializable");
const tools_1 = require("@langchain/core/tools");
/**
 * Represents a JSON object in the LangChain framework. Provides methods
 * to get keys and values from the JSON object.
 */
class JsonSpec extends serializable_1.Serializable {
    constructor(obj, max_value_length = 4000) {
        super(...arguments);
        this.lc_namespace = ['langchain', 'tools', 'json'];
        this.maxValueLength = 4000;
        this.obj = obj;
        this.maxValueLength = max_value_length;
    }
    /**
     * Retrieves all keys at a given path in the JSON object.
     * @param input The path to the keys in the JSON object, provided as a string in JSON pointer syntax.
     * @returns A string containing all keys at the given path, separated by commas.
     */
    getKeys(input) {
        const pointer = jsonpointer_1.default.compile(input);
        const res = pointer.get(this.obj);
        if (typeof res === 'object' && !Array.isArray(res) && res !== null) {
            return Object.keys(res)
                .map((i) => i.replaceAll('~', '~0').replaceAll('/', '~1'))
                .join(', ');
        }
        throw new Error(`Value at ${input} is not a dictionary, get the value directly instead.`);
    }
    /**
     * Retrieves the value at a given path in the JSON object.
     * @param input The path to the value in the JSON object, provided as a string in JSON pointer syntax.
     * @returns The value at the given path in the JSON object, as a string. If the value is a large dictionary or exceeds the maximum length, a message is returned instead.
     */
    getValue(input) {
        const pointer = jsonpointer_1.default.compile(input);
        const res = pointer.get(this.obj);
        if (res === null || res === undefined) {
            throw new Error(`Value at ${input} is null or undefined.`);
        }
        const str = typeof res === 'object' ? JSON.stringify(res) : res.toString();
        if (typeof res === 'object' && !Array.isArray(res) && str.length > this.maxValueLength) {
            return `Value is a large dictionary, should explore its keys directly.`;
        }
        if (str.length > this.maxValueLength) {
            return `${str.slice(0, this.maxValueLength)}...`;
        }
        return str;
    }
}
exports.JsonSpec = JsonSpec;
/**
 * A tool in the LangChain framework that lists all keys at a given path
 * in a JSON object.
 */
class JsonListKeysTool extends tools_1.Tool {
    static lc_name() {
        return 'JsonListKeysTool';
    }
    constructor(fields) {
        if (!('jsonSpec' in fields)) {
            // eslint-disable-next-line no-param-reassign
            fields = { jsonSpec: fields };
        }
        super(fields);
        this.name = 'json_list_keys';
        this.description = `Can be used to list all keys at a given path.
    Before calling this you should be SURE that the path to this exists.
    The input is a text representation of the path to the json as json pointer syntax (e.g. /key1/0/key2).`;
        this.jsonSpec = fields.jsonSpec;
    }
    /** @ignore */
    async _call(input) {
        try {
            return this.jsonSpec.getKeys(input);
        }
        catch (error) {
            return `${error}`;
        }
    }
}
exports.JsonListKeysTool = JsonListKeysTool;
/**
 * A tool in the LangChain framework that retrieves the value at a given
 * path in a JSON object.
 */
class JsonGetValueTool extends tools_1.Tool {
    static lc_name() {
        return 'JsonGetValueTool';
    }
    constructor(jsonSpec) {
        super();
        this.jsonSpec = jsonSpec;
        this.name = 'json_get_value';
        this.description = `Can be used to see value in string format at a given path.
    Before calling this you should be SURE that the path to this exists.
    The input is a text representation of the path to the json as json pointer syntax (e.g. /key1/0/key2).`;
    }
    /** @ignore */
    async _call(input) {
        try {
            return this.jsonSpec.getValue(input);
        }
        catch (error) {
            return `${error}`;
        }
    }
}
exports.JsonGetValueTool = JsonGetValueTool;
//# sourceMappingURL=core.js.map