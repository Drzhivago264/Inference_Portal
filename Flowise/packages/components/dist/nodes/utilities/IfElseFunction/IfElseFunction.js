"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vm2_1 = require("vm2");
const utils_1 = require("../../../src/utils");
class IfElseFunction_Utilities {
    constructor() {
        this.label = 'IfElse Function';
        this.name = 'ifElseFunction';
        this.version = 1.0;
        this.type = 'IfElseFunction';
        this.icon = 'ifelsefunction.svg';
        this.category = 'Utilities';
        this.description = `Split flows based on If Else javascript functions`;
        this.baseClasses = [this.type, 'Utilities'];
        this.inputs = [
            {
                label: 'Input Variables',
                name: 'functionInputVariables',
                description: 'Input variables can be used in the function with prefix $. For example: $var',
                type: 'json',
                optional: true,
                acceptVariable: true,
                list: true
            },
            {
                label: 'IfElse Name',
                name: 'functionName',
                type: 'string',
                optional: true,
                placeholder: 'If Condition Match'
            },
            {
                label: 'If Function',
                name: 'ifFunction',
                description: 'Function must return a value',
                type: 'code',
                rows: 2,
                default: `if ("hello" == "hello") {
    return true;
}`
            },
            {
                label: 'Else Function',
                name: 'elseFunction',
                description: 'Function must return a value',
                type: 'code',
                rows: 2,
                default: `return false;`
            }
        ];
        this.outputs = [
            {
                label: 'True',
                name: 'returnTrue',
                baseClasses: ['string', 'number', 'boolean', 'json', 'array']
            },
            {
                label: 'False',
                name: 'returnFalse',
                baseClasses: ['string', 'number', 'boolean', 'json', 'array']
            }
        ];
    }
    async init(nodeData, input, options) {
        const ifFunction = nodeData.inputs?.ifFunction;
        const elseFunction = nodeData.inputs?.elseFunction;
        const functionInputVariablesRaw = nodeData.inputs?.functionInputVariables;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const variables = await (0, utils_1.getVars)(appDataSource, databaseEntities, nodeData);
        const flow = {
            chatflowId: options.chatflowid,
            sessionId: options.sessionId,
            chatId: options.chatId,
            input
        };
        let inputVars = {};
        if (functionInputVariablesRaw) {
            try {
                inputVars =
                    typeof functionInputVariablesRaw === 'object' ? functionInputVariablesRaw : JSON.parse(functionInputVariablesRaw);
            }
            catch (exception) {
                throw new Error("Invalid JSON in the IfElse's Input Variables: " + exception);
            }
        }
        // Some values might be a stringified JSON, parse it
        for (const key in inputVars) {
            let value = inputVars[key];
            if (typeof value === 'string') {
                value = (0, utils_1.handleEscapeCharacters)(value, true);
                if (value.startsWith('{') && value.endsWith('}')) {
                    try {
                        value = JSON.parse(value);
                    }
                    catch (e) {
                        // ignore
                    }
                }
                inputVars[key] = value;
            }
        }
        let sandbox = { $input: input };
        sandbox['$vars'] = (0, utils_1.prepareSandboxVars)(variables);
        sandbox['$flow'] = flow;
        if (Object.keys(inputVars).length) {
            for (const item in inputVars) {
                sandbox[`$${item}`] = inputVars[item];
            }
        }
        const builtinDeps = process.env.TOOL_FUNCTION_BUILTIN_DEP
            ? utils_1.defaultAllowBuiltInDep.concat(process.env.TOOL_FUNCTION_BUILTIN_DEP.split(','))
            : utils_1.defaultAllowBuiltInDep;
        const externalDeps = process.env.TOOL_FUNCTION_EXTERNAL_DEP ? process.env.TOOL_FUNCTION_EXTERNAL_DEP.split(',') : [];
        const deps = utils_1.availableDependencies.concat(externalDeps);
        const nodeVMOptions = {
            console: 'inherit',
            sandbox,
            require: {
                external: { modules: deps },
                builtin: builtinDeps
            }
        };
        const vm = new vm2_1.NodeVM(nodeVMOptions);
        try {
            const responseTrue = await vm.run(`module.exports = async function() {${ifFunction}}()`, __dirname);
            if (responseTrue)
                return { output: typeof responseTrue === 'string' ? (0, utils_1.handleEscapeCharacters)(responseTrue, false) : responseTrue, type: true };
            const responseFalse = await vm.run(`module.exports = async function() {${elseFunction}}()`, __dirname);
            return { output: typeof responseFalse === 'string' ? (0, utils_1.handleEscapeCharacters)(responseFalse, false) : responseFalse, type: false };
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = { nodeClass: IfElseFunction_Utilities };
//# sourceMappingURL=IfElseFunction.js.map