"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicStructuredTool = void 0;
const vm2_1 = require("vm2");
const tools_1 = require("@langchain/core/tools");
const manager_1 = require("@langchain/core/callbacks/manager");
const utils_1 = require("../../../src/utils");
class ToolInputParsingException extends Error {
    constructor(message, output) {
        super(message);
        this.output = output;
    }
}
class DynamicStructuredTool extends tools_1.StructuredTool {
    constructor(fields) {
        super(fields);
        this.name = fields.name;
        this.description = fields.description;
        this.code = fields.code;
        this.func = fields.func;
        this.returnDirect = fields.returnDirect ?? this.returnDirect;
        this.schema = fields.schema;
    }
    async call(arg, configArg, tags, flowConfig) {
        const config = (0, manager_1.parseCallbackConfigArg)(configArg);
        if (config.runName === undefined) {
            config.runName = this.name;
        }
        let parsed;
        try {
            parsed = await this.schema.parseAsync(arg);
        }
        catch (e) {
            throw new ToolInputParsingException(`Received tool input did not match expected schema`, JSON.stringify(arg));
        }
        const callbackManager_ = await manager_1.CallbackManager.configure(config.callbacks, this.callbacks, config.tags || tags, this.tags, config.metadata, this.metadata, { verbose: this.verbose });
        const runManager = await callbackManager_?.handleToolStart(this.toJSON(), typeof parsed === 'string' ? parsed : JSON.stringify(parsed), undefined, undefined, undefined, undefined, config.runName);
        let result;
        try {
            result = await this._call(parsed, runManager, flowConfig);
        }
        catch (e) {
            await runManager?.handleToolError(e);
            throw e;
        }
        await runManager?.handleToolEnd(result);
        return result;
    }
    // @ts-ignore
    async _call(arg, _, flowConfig) {
        let sandbox = {};
        if (typeof arg === 'object' && Object.keys(arg).length) {
            for (const item in arg) {
                sandbox[`$${item}`] = arg[item];
            }
        }
        sandbox['$vars'] = (0, utils_1.prepareSandboxVars)(this.variables);
        // inject flow properties
        if (this.flowObj) {
            sandbox['$flow'] = { ...this.flowObj, ...flowConfig };
        }
        const builtinDeps = process.env.TOOL_FUNCTION_BUILTIN_DEP
            ? utils_1.defaultAllowBuiltInDep.concat(process.env.TOOL_FUNCTION_BUILTIN_DEP.split(','))
            : utils_1.defaultAllowBuiltInDep;
        const externalDeps = process.env.TOOL_FUNCTION_EXTERNAL_DEP ? process.env.TOOL_FUNCTION_EXTERNAL_DEP.split(',') : [];
        const deps = utils_1.availableDependencies.concat(externalDeps);
        const options = {
            console: 'inherit',
            sandbox,
            require: {
                external: { modules: deps },
                builtin: builtinDeps
            }
        };
        const vm = new vm2_1.NodeVM(options);
        const response = await vm.run(`module.exports = async function() {${this.code}}()`, __dirname);
        return response;
    }
    setVariables(variables) {
        this.variables = variables;
    }
    setFlowObject(flow) {
        this.flowObj = flow;
    }
}
exports.DynamicStructuredTool = DynamicStructuredTool;
//# sourceMappingURL=core.js.map