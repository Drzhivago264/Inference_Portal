"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticHandler = exports.additionalCallbacks = exports.CustomChainHandler = exports.ConsoleCallbackHandler = void 0;
const uuid_1 = require("uuid");
const langsmith_1 = require("langsmith");
const langfuse_langchain_1 = __importDefault(require("langfuse-langchain"));
const lunary_1 = __importDefault(require("lunary"));
const langsmith_2 = require("langsmith");
const langfuse_1 = require("langfuse");
const base_1 = require("@langchain/core/callbacks/base");
const tracer_langchain_1 = require("@langchain/core/tracers/tracer_langchain");
const base_2 = require("@langchain/core/tracers/base");
const lunary_2 = require("@langchain/community/callbacks/handlers/lunary");
const utils_1 = require("./utils");
function tryJsonStringify(obj, fallback) {
    try {
        return JSON.stringify(obj, null, 2);
    }
    catch (err) {
        return fallback;
    }
}
function elapsed(run) {
    if (!run.end_time)
        return '';
    const elapsed = run.end_time - run.start_time;
    if (elapsed < 1000) {
        return `${elapsed}ms`;
    }
    return `${(elapsed / 1000).toFixed(2)}s`;
}
class ConsoleCallbackHandler extends base_2.BaseTracer {
    persistRun(_run) {
        return Promise.resolve();
    }
    constructor(logger) {
        super();
        this.name = 'console_callback_handler';
        this.logger = logger;
    }
    // utility methods
    getParents(run) {
        const parents = [];
        let currentRun = run;
        while (currentRun.parent_run_id) {
            const parent = this.runMap.get(currentRun.parent_run_id);
            if (parent) {
                parents.push(parent);
                currentRun = parent;
            }
            else {
                break;
            }
        }
        return parents;
    }
    getBreadcrumbs(run) {
        const parents = this.getParents(run).reverse();
        const string = [...parents, run]
            .map((parent) => {
            const name = `${parent.execution_order}:${parent.run_type}:${parent.name}`;
            return name;
        })
            .join(' > ');
        return string;
    }
    // logging methods
    onChainStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[chain/start] [${crumbs}] Entering Chain run with input: ${tryJsonStringify(run.inputs, '[inputs]')}`);
    }
    onChainEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[chain/end] [${crumbs}] [${elapsed(run)}] Exiting Chain run with output: ${tryJsonStringify(run.outputs, '[outputs]')}`);
    }
    onChainError(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[chain/error] [${crumbs}] [${elapsed(run)}] Chain run errored with error: ${tryJsonStringify(run.error, '[error]')}`);
    }
    onLLMStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        const inputs = 'prompts' in run.inputs ? { prompts: run.inputs.prompts.map((p) => p.trim()) } : run.inputs;
        this.logger.verbose(`[llm/start] [${crumbs}] Entering LLM run with input: ${tryJsonStringify(inputs, '[inputs]')}`);
    }
    onLLMEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[llm/end] [${crumbs}] [${elapsed(run)}] Exiting LLM run with output: ${tryJsonStringify(run.outputs, '[response]')}`);
    }
    onLLMError(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[llm/error] [${crumbs}] [${elapsed(run)}] LLM run errored with error: ${tryJsonStringify(run.error, '[error]')}`);
    }
    onToolStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[tool/start] [${crumbs}] Entering Tool run with input: "${run.inputs.input?.trim()}"`);
    }
    onToolEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[tool/end] [${crumbs}] [${elapsed(run)}] Exiting Tool run with output: "${run.outputs?.output?.trim()}"`);
    }
    onToolError(run) {
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[tool/error] [${crumbs}] [${elapsed(run)}] Tool run errored with error: ${tryJsonStringify(run.error, '[error]')}`);
    }
    onAgentAction(run) {
        const agentRun = run;
        const crumbs = this.getBreadcrumbs(run);
        this.logger.verbose(`[agent/action] [${crumbs}] Agent selected action: ${tryJsonStringify(agentRun.actions[agentRun.actions.length - 1], '[action]')}`);
    }
}
exports.ConsoleCallbackHandler = ConsoleCallbackHandler;
/**
 * Custom chain handler class
 */
class CustomChainHandler extends base_1.BaseCallbackHandler {
    constructor(socketIO, socketIOClientId, skipK, returnSourceDocuments) {
        super();
        this.name = 'custom_chain_handler';
        this.isLLMStarted = false;
        this.socketIOClientId = '';
        this.skipK = 0; // Skip streaming for first K numbers of handleLLMStart
        this.returnSourceDocuments = false;
        this.cachedResponse = true;
        this.socketIO = socketIO;
        this.socketIOClientId = socketIOClientId;
        this.skipK = skipK ?? this.skipK;
        this.returnSourceDocuments = returnSourceDocuments ?? this.returnSourceDocuments;
    }
    handleLLMStart() {
        this.cachedResponse = false;
        if (this.skipK > 0)
            this.skipK -= 1;
    }
    handleLLMNewToken(token) {
        if (this.skipK === 0) {
            if (!this.isLLMStarted) {
                this.isLLMStarted = true;
                this.socketIO.to(this.socketIOClientId).emit('start', token);
            }
            this.socketIO.to(this.socketIOClientId).emit('token', token);
        }
    }
    handleLLMEnd() {
        this.socketIO.to(this.socketIOClientId).emit('end');
    }
    handleChainEnd(outputs, _, parentRunId) {
        /*
            Langchain does not call handleLLMStart, handleLLMEnd, handleLLMNewToken when the chain is cached.
            Callback Order is "Chain Start -> LLM Start --> LLM Token --> LLM End -> Chain End" for normal responses.
            Callback Order is "Chain Start -> Chain End" for cached responses.
         */
        if (this.cachedResponse && parentRunId === undefined) {
            const cachedValue = outputs.text ?? outputs.response ?? outputs.output ?? outputs.output_text;
            //split at whitespace, and keep the whitespace. This is to preserve the original formatting.
            const result = cachedValue.split(/(\s+)/);
            result.forEach((token, index) => {
                if (index === 0) {
                    this.socketIO.to(this.socketIOClientId).emit('start', token);
                }
                this.socketIO.to(this.socketIOClientId).emit('token', token);
            });
            if (this.returnSourceDocuments) {
                this.socketIO.to(this.socketIOClientId).emit('sourceDocuments', outputs?.sourceDocuments);
            }
            this.socketIO.to(this.socketIOClientId).emit('end');
        }
        else {
            if (this.returnSourceDocuments) {
                this.socketIO.to(this.socketIOClientId).emit('sourceDocuments', outputs?.sourceDocuments);
            }
        }
    }
}
exports.CustomChainHandler = CustomChainHandler;
const additionalCallbacks = async (nodeData, options) => {
    try {
        if (!options.analytic)
            return [];
        const analytic = JSON.parse(options.analytic);
        const callbacks = [];
        for (const provider in analytic) {
            const providerStatus = analytic[provider].status;
            if (providerStatus) {
                const credentialId = analytic[provider].credentialId;
                const credentialData = await (0, utils_1.getCredentialData)(credentialId ?? '', options);
                if (provider === 'langSmith') {
                    const langSmithProject = analytic[provider].projectName;
                    const langSmithApiKey = (0, utils_1.getCredentialParam)('langSmithApiKey', credentialData, nodeData);
                    const langSmithEndpoint = (0, utils_1.getCredentialParam)('langSmithEndpoint', credentialData, nodeData);
                    const client = new langsmith_1.Client({
                        apiUrl: langSmithEndpoint ?? 'https://api.smith.langchain.com',
                        apiKey: langSmithApiKey
                    });
                    let langSmithField = {
                        projectName: langSmithProject ?? 'default',
                        //@ts-ignore
                        client
                    };
                    if (nodeData?.inputs?.analytics?.langSmith) {
                        langSmithField = { ...langSmithField, ...nodeData?.inputs?.analytics?.langSmith };
                    }
                    const tracer = new tracer_langchain_1.LangChainTracer(langSmithField);
                    callbacks.push(tracer);
                }
                else if (provider === 'langFuse') {
                    const release = analytic[provider].release;
                    const langFuseSecretKey = (0, utils_1.getCredentialParam)('langFuseSecretKey', credentialData, nodeData);
                    const langFusePublicKey = (0, utils_1.getCredentialParam)('langFusePublicKey', credentialData, nodeData);
                    const langFuseEndpoint = (0, utils_1.getCredentialParam)('langFuseEndpoint', credentialData, nodeData);
                    let langFuseOptions = {
                        secretKey: langFuseSecretKey,
                        publicKey: langFusePublicKey,
                        baseUrl: langFuseEndpoint ?? 'https://cloud.langfuse.com',
                        sdkIntegration: 'Flowise'
                    };
                    if (release)
                        langFuseOptions.release = release;
                    if (options.chatId)
                        langFuseOptions.sessionId = options.chatId;
                    if (nodeData?.inputs?.analytics?.langFuse) {
                        langFuseOptions = { ...langFuseOptions, ...nodeData?.inputs?.analytics?.langFuse };
                    }
                    const handler = new langfuse_langchain_1.default(langFuseOptions);
                    callbacks.push(handler);
                }
                else if (provider === 'lunary') {
                    const lunaryAppId = (0, utils_1.getCredentialParam)('lunaryAppId', credentialData, nodeData);
                    const lunaryEndpoint = (0, utils_1.getCredentialParam)('lunaryEndpoint', credentialData, nodeData);
                    let lunaryFields = {
                        appId: lunaryAppId,
                        apiUrl: lunaryEndpoint ?? 'https://app.lunary.ai'
                    };
                    if (nodeData?.inputs?.analytics?.lunary) {
                        lunaryFields = { ...lunaryFields, ...nodeData?.inputs?.analytics?.lunary };
                    }
                    const handler = new lunary_2.LunaryHandler(lunaryFields);
                    callbacks.push(handler);
                }
            }
        }
        return callbacks;
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.additionalCallbacks = additionalCallbacks;
class AnalyticHandler {
    constructor(nodeData, options) {
        this.options = {};
        this.handlers = {};
        this.options = options;
        this.nodeData = nodeData;
        this.init();
    }
    async init() {
        try {
            if (!this.options.analytic)
                return;
            const analytic = JSON.parse(this.options.analytic);
            for (const provider in analytic) {
                const providerStatus = analytic[provider].status;
                if (providerStatus) {
                    const credentialId = analytic[provider].credentialId;
                    const credentialData = await (0, utils_1.getCredentialData)(credentialId ?? '', this.options);
                    if (provider === 'langSmith') {
                        const langSmithProject = analytic[provider].projectName;
                        const langSmithApiKey = (0, utils_1.getCredentialParam)('langSmithApiKey', credentialData, this.nodeData);
                        const langSmithEndpoint = (0, utils_1.getCredentialParam)('langSmithEndpoint', credentialData, this.nodeData);
                        const client = new langsmith_2.Client({
                            apiUrl: langSmithEndpoint ?? 'https://api.smith.langchain.com',
                            apiKey: langSmithApiKey
                        });
                        this.handlers['langSmith'] = { client, langSmithProject };
                    }
                    else if (provider === 'langFuse') {
                        const release = analytic[provider].release;
                        const langFuseSecretKey = (0, utils_1.getCredentialParam)('langFuseSecretKey', credentialData, this.nodeData);
                        const langFusePublicKey = (0, utils_1.getCredentialParam)('langFusePublicKey', credentialData, this.nodeData);
                        const langFuseEndpoint = (0, utils_1.getCredentialParam)('langFuseEndpoint', credentialData, this.nodeData);
                        const langfuse = new langfuse_1.Langfuse({
                            secretKey: langFuseSecretKey,
                            publicKey: langFusePublicKey,
                            baseUrl: langFuseEndpoint ?? 'https://cloud.langfuse.com',
                            sdkIntegration: 'Flowise',
                            release
                        });
                        this.handlers['langFuse'] = { client: langfuse };
                    }
                    else if (provider === 'lunary') {
                        const lunaryAppId = (0, utils_1.getCredentialParam)('lunaryAppId', credentialData, this.nodeData);
                        const lunaryEndpoint = (0, utils_1.getCredentialParam)('lunaryEndpoint', credentialData, this.nodeData);
                        lunary_1.default.init({
                            appId: lunaryAppId,
                            apiUrl: lunaryEndpoint
                        });
                        this.handlers['lunary'] = { client: lunary_1.default };
                    }
                }
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async onChainStart(name, input, parentIds) {
        const returnIds = {
            langSmith: {},
            langFuse: {},
            lunary: {}
        };
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            if (!parentIds || !Object.keys(parentIds).length) {
                const parentRunConfig = {
                    name,
                    run_type: 'chain',
                    inputs: {
                        text: input
                    },
                    serialized: {},
                    project_name: this.handlers['langSmith'].langSmithProject,
                    client: this.handlers['langSmith'].client,
                    ...this.nodeData?.inputs?.analytics?.langSmith
                };
                const parentRun = new langsmith_2.RunTree(parentRunConfig);
                await parentRun.postRun();
                this.handlers['langSmith'].chainRun = { [parentRun.id]: parentRun };
                returnIds['langSmith'].chainRun = parentRun.id;
            }
            else {
                const parentRun = this.handlers['langSmith'].chainRun[parentIds['langSmith'].chainRun];
                if (parentRun) {
                    const childChainRun = await parentRun.createChild({
                        name,
                        run_type: 'chain',
                        inputs: {
                            text: input
                        }
                    });
                    await childChainRun.postRun();
                    this.handlers['langSmith'].chainRun = { [childChainRun.id]: childChainRun };
                    returnIds['langSmith'].chainRun = childChainRun.id;
                }
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            let langfuseTraceClient;
            if (!parentIds || !Object.keys(parentIds).length) {
                const langfuse = this.handlers['langFuse'].client;
                langfuseTraceClient = langfuse.trace({
                    name,
                    sessionId: this.options.chatId,
                    metadata: { tags: ['openai-assistant'] },
                    ...this.nodeData?.inputs?.analytics?.langFuse
                });
            }
            else {
                langfuseTraceClient = this.handlers['langFuse'].trace[parentIds['langFuse']];
            }
            if (langfuseTraceClient) {
                const span = langfuseTraceClient.span({
                    name,
                    input: {
                        text: input
                    }
                });
                this.handlers['langFuse'].trace = { [langfuseTraceClient.id]: langfuseTraceClient };
                this.handlers['langFuse'].span = { [span.id]: span };
                returnIds['langFuse'].trace = langfuseTraceClient.id;
                returnIds['langFuse'].span = span.id;
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const monitor = this.handlers['lunary'].client;
            if (monitor) {
                const runId = (0, uuid_1.v4)();
                await monitor.trackEvent('chain', 'start', {
                    runId,
                    name,
                    userId: this.options.chatId,
                    input,
                    ...this.nodeData?.inputs?.analytics?.lunary
                });
                this.handlers['lunary'].chainEvent = { [runId]: runId };
                returnIds['lunary'].chainEvent = runId;
            }
        }
        return returnIds;
    }
    async onChainEnd(returnIds, output, shutdown = false) {
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            const chainRun = this.handlers['langSmith'].chainRun[returnIds['langSmith'].chainRun];
            if (chainRun) {
                await chainRun.end({
                    outputs: {
                        output
                    }
                });
                await chainRun.patchRun();
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            const span = this.handlers['langFuse'].span[returnIds['langFuse'].span];
            if (span) {
                span.end({
                    output
                });
                if (shutdown) {
                    const langfuse = this.handlers['langFuse'].client;
                    await langfuse.shutdownAsync();
                }
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const chainEventId = returnIds['lunary'].chainEvent;
            const monitor = this.handlers['lunary'].client;
            if (monitor && chainEventId) {
                await monitor.trackEvent('chain', 'end', {
                    runId: chainEventId,
                    output
                });
            }
        }
    }
    async onChainError(returnIds, error, shutdown = false) {
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            const chainRun = this.handlers['langSmith'].chainRun[returnIds['langSmith'].chainRun];
            if (chainRun) {
                await chainRun.end({
                    error: {
                        error
                    }
                });
                await chainRun.patchRun();
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            const span = this.handlers['langFuse'].span[returnIds['langFuse'].span];
            if (span) {
                span.end({
                    output: {
                        error
                    }
                });
                if (shutdown) {
                    const langfuse = this.handlers['langFuse'].client;
                    await langfuse.shutdownAsync();
                }
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const chainEventId = returnIds['lunary'].chainEvent;
            const monitor = this.handlers['lunary'].client;
            if (monitor && chainEventId) {
                await monitor.trackEvent('chain', 'end', {
                    runId: chainEventId,
                    output: error
                });
            }
        }
    }
    async onLLMStart(name, input, parentIds) {
        const returnIds = {
            langSmith: {},
            langFuse: {},
            lunary: {}
        };
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            const parentRun = this.handlers['langSmith'].chainRun[parentIds['langSmith'].chainRun];
            if (parentRun) {
                const childLLMRun = await parentRun.createChild({
                    name,
                    run_type: 'llm',
                    inputs: {
                        prompts: [input]
                    }
                });
                await childLLMRun.postRun();
                this.handlers['langSmith'].llmRun = { [childLLMRun.id]: childLLMRun };
                returnIds['langSmith'].llmRun = childLLMRun.id;
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            const trace = this.handlers['langFuse'].trace[parentIds['langFuse'].trace];
            if (trace) {
                const generation = trace.generation({
                    name,
                    input: input
                });
                this.handlers['langFuse'].generation = { [generation.id]: generation };
                returnIds['langFuse'].generation = generation.id;
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const monitor = this.handlers['lunary'].client;
            const chainEventId = this.handlers['lunary'].chainEvent[parentIds['lunary'].chainEvent];
            if (monitor && chainEventId) {
                const runId = (0, uuid_1.v4)();
                await monitor.trackEvent('llm', 'start', {
                    runId,
                    parentRunId: chainEventId,
                    name,
                    userId: this.options.chatId,
                    input
                });
                this.handlers['lunary'].llmEvent = { [runId]: runId };
                returnIds['lunary'].llmEvent = runId;
            }
        }
        return returnIds;
    }
    async onLLMEnd(returnIds, output) {
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            const llmRun = this.handlers['langSmith'].llmRun[returnIds['langSmith'].llmRun];
            if (llmRun) {
                await llmRun.end({
                    outputs: {
                        generations: [output]
                    }
                });
                await llmRun.patchRun();
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            const generation = this.handlers['langFuse'].generation[returnIds['langFuse'].generation];
            if (generation) {
                generation.end({
                    output: output
                });
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const llmEventId = this.handlers['lunary'].llmEvent[returnIds['lunary'].llmEvent];
            const monitor = this.handlers['lunary'].client;
            if (monitor && llmEventId) {
                await monitor.trackEvent('llm', 'end', {
                    runId: llmEventId,
                    output
                });
            }
        }
    }
    async onLLMError(returnIds, error) {
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            const llmRun = this.handlers['langSmith'].llmRun[returnIds['langSmith'].llmRun];
            if (llmRun) {
                await llmRun.end({
                    error: {
                        error
                    }
                });
                await llmRun.patchRun();
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            const generation = this.handlers['langFuse'].generation[returnIds['langFuse'].generation];
            if (generation) {
                generation.end({
                    output: error
                });
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const llmEventId = this.handlers['lunary'].llmEvent[returnIds['lunary'].llmEvent];
            const monitor = this.handlers['lunary'].client;
            if (monitor && llmEventId) {
                await monitor.trackEvent('llm', 'end', {
                    runId: llmEventId,
                    output: error
                });
            }
        }
    }
    async onToolStart(name, input, parentIds) {
        const returnIds = {
            langSmith: {},
            langFuse: {},
            lunary: {}
        };
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            const parentRun = this.handlers['langSmith'].chainRun[parentIds['langSmith'].chainRun];
            if (parentRun) {
                const childToolRun = await parentRun.createChild({
                    name,
                    run_type: 'tool',
                    inputs: {
                        input
                    }
                });
                await childToolRun.postRun();
                this.handlers['langSmith'].toolRun = { [childToolRun.id]: childToolRun };
                returnIds['langSmith'].toolRun = childToolRun.id;
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            const trace = this.handlers['langFuse'].trace[parentIds['langFuse'].trace];
            if (trace) {
                const toolSpan = trace.span({
                    name,
                    input
                });
                this.handlers['langFuse'].toolSpan = { [toolSpan.id]: toolSpan };
                returnIds['langFuse'].toolSpan = toolSpan.id;
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const monitor = this.handlers['lunary'].client;
            const chainEventId = this.handlers['lunary'].chainEvent[parentIds['lunary'].chainEvent];
            if (monitor && chainEventId) {
                const runId = (0, uuid_1.v4)();
                await monitor.trackEvent('tool', 'start', {
                    runId,
                    parentRunId: chainEventId,
                    name,
                    userId: this.options.chatId,
                    input
                });
                this.handlers['lunary'].toolEvent = { [runId]: runId };
                returnIds['lunary'].toolEvent = runId;
            }
        }
        return returnIds;
    }
    async onToolEnd(returnIds, output) {
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            const toolRun = this.handlers['langSmith'].toolRun[returnIds['langSmith'].toolRun];
            if (toolRun) {
                await toolRun.end({
                    outputs: {
                        output
                    }
                });
                await toolRun.patchRun();
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            const toolSpan = this.handlers['langFuse'].toolSpan[returnIds['langFuse'].toolSpan];
            if (toolSpan) {
                toolSpan.end({
                    output
                });
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const toolEventId = this.handlers['lunary'].toolEvent[returnIds['lunary'].toolEvent];
            const monitor = this.handlers['lunary'].client;
            if (monitor && toolEventId) {
                await monitor.trackEvent('tool', 'end', {
                    runId: toolEventId,
                    output
                });
            }
        }
    }
    async onToolError(returnIds, error) {
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langSmith')) {
            const toolRun = this.handlers['langSmith'].toolRun[returnIds['langSmith'].toolRun];
            if (toolRun) {
                await toolRun.end({
                    error: {
                        error
                    }
                });
                await toolRun.patchRun();
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'langFuse')) {
            const toolSpan = this.handlers['langFuse'].toolSpan[returnIds['langFuse'].toolSpan];
            if (toolSpan) {
                toolSpan.end({
                    output: error
                });
            }
        }
        if (Object.prototype.hasOwnProperty.call(this.handlers, 'lunary')) {
            const toolEventId = this.handlers['lunary'].llmEvent[returnIds['lunary'].toolEvent];
            const monitor = this.handlers['lunary'].client;
            if (monitor && toolEventId) {
                await monitor.trackEvent('tool', 'end', {
                    runId: toolEventId,
                    output: error
                });
            }
        }
    }
}
exports.AnalyticHandler = AnalyticHandler;
//# sourceMappingURL=handler.js.map