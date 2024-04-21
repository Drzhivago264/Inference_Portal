"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const utils_1 = require("../../../src/utils");
const fsDefault = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const lodash_1 = require("lodash");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const handler_1 = require("../../../src/handler");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
class OpenAIAssistant_Agents {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listAssistants(_, options) {
                const returnData = [];
                const appDataSource = options.appDataSource;
                const databaseEntities = options.databaseEntities;
                if (appDataSource === undefined || !appDataSource) {
                    return returnData;
                }
                const assistants = await appDataSource.getRepository(databaseEntities['Assistant']).find();
                for (let i = 0; i < assistants.length; i += 1) {
                    const assistantDetails = JSON.parse(assistants[i].details);
                    const data = {
                        label: assistantDetails.name,
                        name: assistants[i].id,
                        description: assistantDetails.instructions
                    };
                    returnData.push(data);
                }
                return returnData;
            }
        };
        this.label = 'OpenAI Assistant';
        this.name = 'openAIAssistant';
        this.version = 3.0;
        this.type = 'OpenAIAssistant';
        this.category = 'Agents';
        this.icon = 'assistant.svg';
        this.description = `An agent that uses OpenAI Assistant API to pick the tool and args to call`;
        this.baseClasses = [this.type];
        this.inputs = [
            {
                label: 'Select Assistant',
                name: 'selectedAssistant',
                type: 'asyncOptions',
                loadMethod: 'listAssistants'
            },
            {
                label: 'Allowed Tools',
                name: 'tools',
                type: 'Tool',
                list: true
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            },
            {
                label: 'Disable File Download',
                name: 'disableFileDownload',
                type: 'boolean',
                description: 'Messages can contain text, images, or files. In some cases, you may want to prevent others from downloading the files. Learn more from OpenAI File Annotation <a target="_blank" href="https://platform.openai.com/docs/assistants/how-it-works/managing-threads-and-messages">docs</a>',
                optional: true,
                additionalParams: true
            }
        ];
    }
    async init() {
        return null;
    }
    async clearChatMessages(nodeData, options, sessionIdObj) {
        const selectedAssistantId = nodeData.inputs?.selectedAssistant;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const assistant = await appDataSource.getRepository(databaseEntities['Assistant']).findOneBy({
            id: selectedAssistantId
        });
        if (!assistant) {
            options.logger.error(`Assistant ${selectedAssistantId} not found`);
            return;
        }
        if (!sessionIdObj)
            return;
        let sessionId = '';
        if (sessionIdObj.type === 'chatId') {
            const chatId = sessionIdObj.id;
            const chatmsg = await appDataSource.getRepository(databaseEntities['ChatMessage']).findOneBy({
                chatId
            });
            if (!chatmsg) {
                options.logger.error(`Chat Message with Chat Id: ${chatId} not found`);
                return;
            }
            sessionId = chatmsg.sessionId;
        }
        else if (sessionIdObj.type === 'threadId') {
            sessionId = sessionIdObj.id;
        }
        const credentialData = await (0, utils_1.getCredentialData)(assistant.credential ?? '', options);
        const openAIApiKey = (0, utils_1.getCredentialParam)('openAIApiKey', credentialData, nodeData);
        if (!openAIApiKey) {
            options.logger.error(`OpenAI ApiKey not found`);
            return;
        }
        const openai = new openai_1.default({ apiKey: openAIApiKey });
        options.logger.info(`Clearing OpenAI Thread ${sessionId}`);
        try {
            if (sessionId)
                await openai.beta.threads.del(sessionId);
            options.logger.info(`Successfully cleared OpenAI Thread ${sessionId}`);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async run(nodeData, input, options) {
        const selectedAssistantId = nodeData.inputs?.selectedAssistant;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const disableFileDownload = nodeData.inputs?.disableFileDownload;
        const moderations = nodeData.inputs?.inputModeration;
        const isStreaming = options.socketIO && options.socketIOClientId;
        const socketIO = isStreaming ? options.socketIO : undefined;
        const socketIOClientId = isStreaming ? options.socketIOClientId : '';
        if (moderations && moderations.length > 0) {
            try {
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                (0, Moderation_1.streamResponse)(isStreaming, e.message, socketIO, socketIOClientId);
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        let tools = nodeData.inputs?.tools;
        tools = (0, lodash_1.flatten)(tools);
        const formattedTools = tools?.map((tool) => formatToOpenAIAssistantTool(tool)) ?? [];
        const assistant = await appDataSource.getRepository(databaseEntities['Assistant']).findOneBy({
            id: selectedAssistantId
        });
        if (!assistant)
            throw new Error(`Assistant ${selectedAssistantId} not found`);
        const credentialData = await (0, utils_1.getCredentialData)(assistant.credential ?? '', options);
        const openAIApiKey = (0, utils_1.getCredentialParam)('openAIApiKey', credentialData, nodeData);
        if (!openAIApiKey)
            throw new Error(`OpenAI ApiKey not found`);
        const openai = new openai_1.default({ apiKey: openAIApiKey });
        // Start analytics
        const analyticHandlers = new handler_1.AnalyticHandler(nodeData, options);
        await analyticHandlers.init();
        const parentIds = await analyticHandlers.onChainStart('OpenAIAssistant', input);
        try {
            const assistantDetails = JSON.parse(assistant.details);
            const openAIAssistantId = assistantDetails.id;
            // Retrieve assistant
            const retrievedAssistant = await openai.beta.assistants.retrieve(openAIAssistantId);
            if (formattedTools.length) {
                let filteredTools = [];
                for (const tool of retrievedAssistant.tools) {
                    if (tool.type === 'code_interpreter' || tool.type === 'retrieval')
                        filteredTools.push(tool);
                }
                filteredTools = (0, lodash_1.uniqWith)([...filteredTools, ...formattedTools], lodash_1.isEqual);
                // filter out tool with empty function
                filteredTools = filteredTools.filter((tool) => !(tool.type === 'function' && !tool.function));
                await openai.beta.assistants.update(openAIAssistantId, { tools: filteredTools });
            }
            else {
                let filteredTools = retrievedAssistant.tools.filter((tool) => tool.type !== 'function');
                await openai.beta.assistants.update(openAIAssistantId, { tools: filteredTools });
            }
            const chatmessage = await appDataSource.getRepository(databaseEntities['ChatMessage']).findOneBy({
                chatId: options.chatId,
                chatflowid: options.chatflowid
            });
            let threadId = '';
            let isNewThread = false;
            if (!chatmessage) {
                const thread = await openai.beta.threads.create({});
                threadId = thread.id;
                isNewThread = true;
            }
            else {
                const thread = await openai.beta.threads.retrieve(chatmessage.sessionId);
                threadId = thread.id;
            }
            // List all runs, in case existing thread is still running
            if (!isNewThread) {
                const promise = (threadId) => {
                    return new Promise((resolve) => {
                        const timeout = setInterval(async () => {
                            const allRuns = await openai.beta.threads.runs.list(threadId);
                            if (allRuns.data && allRuns.data.length) {
                                const firstRunId = allRuns.data[0].id;
                                const runStatus = allRuns.data.find((run) => run.id === firstRunId)?.status;
                                if (runStatus &&
                                    (runStatus === 'cancelled' ||
                                        runStatus === 'completed' ||
                                        runStatus === 'expired' ||
                                        runStatus === 'failed')) {
                                    clearInterval(timeout);
                                    resolve();
                                }
                            }
                            else {
                                clearInterval(timeout);
                                resolve();
                            }
                        }, 500);
                    });
                };
                await promise(threadId);
            }
            // Add message to thread
            await openai.beta.threads.messages.create(threadId, {
                role: 'user',
                content: input
            });
            // Run assistant thread
            const llmIds = await analyticHandlers.onLLMStart('ChatOpenAI', input, parentIds);
            const runThread = await openai.beta.threads.runs.create(threadId, {
                assistant_id: retrievedAssistant.id
            });
            const usedTools = [];
            const promise = (threadId, runId) => {
                return new Promise((resolve, reject) => {
                    const timeout = setInterval(async () => {
                        const run = await openai.beta.threads.runs.retrieve(threadId, runId);
                        const state = run.status;
                        if (state === 'completed') {
                            clearInterval(timeout);
                            resolve(state);
                        }
                        else if (state === 'requires_action') {
                            if (run.required_action?.submit_tool_outputs.tool_calls) {
                                clearInterval(timeout);
                                const actions = [];
                                run.required_action.submit_tool_outputs.tool_calls.forEach((item) => {
                                    const functionCall = item.function;
                                    let args = {};
                                    try {
                                        args = JSON.parse(functionCall.arguments);
                                    }
                                    catch (e) {
                                        console.error('Error parsing arguments, default to empty object');
                                    }
                                    actions.push({
                                        tool: functionCall.name,
                                        toolInput: args,
                                        toolCallId: item.id
                                    });
                                });
                                const submitToolOutputs = [];
                                for (let i = 0; i < actions.length; i += 1) {
                                    const tool = tools.find((tool) => tool.name === actions[i].tool);
                                    if (!tool)
                                        continue;
                                    // Start tool analytics
                                    const toolIds = await analyticHandlers.onToolStart(tool.name, actions[i].toolInput, parentIds);
                                    if (options.socketIO && options.socketIOClientId)
                                        options.socketIO.to(options.socketIOClientId).emit('tool', tool.name);
                                    try {
                                        const toolOutput = await tool.call(actions[i].toolInput, undefined, undefined, {
                                            sessionId: threadId,
                                            chatId: options.chatId,
                                            input
                                        });
                                        await analyticHandlers.onToolEnd(toolIds, toolOutput);
                                        submitToolOutputs.push({
                                            tool_call_id: actions[i].toolCallId,
                                            output: toolOutput
                                        });
                                        usedTools.push({
                                            tool: tool.name,
                                            toolInput: actions[i].toolInput,
                                            toolOutput
                                        });
                                    }
                                    catch (e) {
                                        await analyticHandlers.onToolEnd(toolIds, e);
                                        console.error('Error executing tool', e);
                                        clearInterval(timeout);
                                        reject(new Error(`Error processing thread: ${state}, Thread ID: ${threadId}, Run ID: ${runId}, Tool: ${tool.name}`));
                                        break;
                                    }
                                }
                                const newRun = await openai.beta.threads.runs.retrieve(threadId, runId);
                                const newStatus = newRun?.status;
                                try {
                                    if (submitToolOutputs.length && newStatus === 'requires_action') {
                                        await openai.beta.threads.runs.submitToolOutputs(threadId, runId, {
                                            tool_outputs: submitToolOutputs
                                        });
                                        resolve(state);
                                    }
                                    else {
                                        await openai.beta.threads.runs.cancel(threadId, runId);
                                        resolve('requires_action_retry');
                                    }
                                }
                                catch (e) {
                                    clearInterval(timeout);
                                    reject(new Error(`Error submitting tool outputs: ${state}, Thread ID: ${threadId}, Run ID: ${runId}`));
                                }
                            }
                        }
                        else if (state === 'cancelled' || state === 'expired' || state === 'failed') {
                            clearInterval(timeout);
                            reject(new Error(`Error processing thread: ${state}, Thread ID: ${threadId}, Run ID: ${runId}, Status: ${state}`));
                        }
                    }, 500);
                });
            };
            // Polling run status
            let runThreadId = runThread.id;
            let state = await promise(threadId, runThread.id);
            while (state === 'requires_action') {
                state = await promise(threadId, runThread.id);
            }
            let retries = 3;
            while (state === 'requires_action_retry') {
                if (retries > 0) {
                    retries -= 1;
                    const newRunThread = await openai.beta.threads.runs.create(threadId, {
                        assistant_id: retrievedAssistant.id
                    });
                    runThreadId = newRunThread.id;
                    state = await promise(threadId, newRunThread.id);
                }
                else {
                    const errMsg = `Error processing thread: ${state}, Thread ID: ${threadId}`;
                    await analyticHandlers.onChainError(parentIds, errMsg);
                    throw new Error(errMsg);
                }
            }
            // List messages
            const messages = await openai.beta.threads.messages.list(threadId);
            const messageData = messages.data ?? [];
            const assistantMessages = messageData.filter((msg) => msg.role === 'assistant');
            if (!assistantMessages.length)
                return '';
            let returnVal = '';
            const fileAnnotations = [];
            for (let i = 0; i < assistantMessages[0].content.length; i += 1) {
                if (assistantMessages[0].content[i].type === 'text') {
                    const content = assistantMessages[0].content[i];
                    if (content.text.annotations) {
                        const message_content = content.text;
                        const annotations = message_content.annotations;
                        const dirPath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant');
                        // Iterate over the annotations
                        for (let index = 0; index < annotations.length; index++) {
                            const annotation = annotations[index];
                            let filePath = '';
                            // Gather citations based on annotation attributes
                            const file_citation = annotation.file_citation;
                            if (file_citation) {
                                const cited_file = await openai.files.retrieve(file_citation.file_id);
                                // eslint-disable-next-line no-useless-escape
                                const fileName = cited_file.filename.split(/[\/\\]/).pop() ?? cited_file.filename;
                                filePath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', fileName);
                                if (!disableFileDownload) {
                                    await downloadFile(cited_file, filePath, dirPath, openAIApiKey);
                                    fileAnnotations.push({
                                        filePath,
                                        fileName
                                    });
                                }
                            }
                            else {
                                const file_path = annotation.file_path;
                                if (file_path) {
                                    const cited_file = await openai.files.retrieve(file_path.file_id);
                                    // eslint-disable-next-line no-useless-escape
                                    const fileName = cited_file.filename.split(/[\/\\]/).pop() ?? cited_file.filename;
                                    filePath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', fileName);
                                    if (!disableFileDownload) {
                                        await downloadFile(cited_file, filePath, dirPath, openAIApiKey);
                                        fileAnnotations.push({
                                            filePath,
                                            fileName
                                        });
                                    }
                                }
                            }
                            // Replace the text with a footnote
                            message_content.value = message_content.value.replace(`${annotation.text}`, `${disableFileDownload ? '' : filePath}`);
                        }
                        returnVal += message_content.value;
                    }
                    else {
                        returnVal += content.text.value;
                    }
                    const lenticularBracketRegex = /【[^】]*】/g;
                    returnVal = returnVal.replace(lenticularBracketRegex, '');
                }
                else {
                    const content = assistantMessages[0].content[i];
                    const fileId = content.image_file.file_id;
                    const fileObj = await openai.files.retrieve(fileId);
                    const dirPath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant');
                    const filePath = path.join((0, utils_1.getUserHome)(), '.flowise', 'openai-assistant', `${fileObj.filename}.png`);
                    await downloadImg(openai, fileId, filePath, dirPath);
                    const bitmap = fsDefault.readFileSync(filePath);
                    const base64String = Buffer.from(bitmap).toString('base64');
                    // TODO: Use a file path and retrieve image on the fly. Storing as base64 to localStorage and database will easily hit limits
                    const imgHTML = `<img src="data:image/png;base64,${base64String}" width="100%" height="max-content" alt="${fileObj.filename}" /><br/>`;
                    returnVal += imgHTML;
                }
            }
            const imageRegex = /<img[^>]*\/>/g;
            let llmOutput = returnVal.replace(imageRegex, '');
            llmOutput = llmOutput.replace('<br/>', '');
            await analyticHandlers.onLLMEnd(llmIds, llmOutput);
            await analyticHandlers.onChainEnd(parentIds, messageData, true);
            return {
                text: returnVal,
                usedTools,
                fileAnnotations,
                assistant: { assistantId: openAIAssistantId, threadId, runId: runThreadId, messages: messageData }
            };
        }
        catch (error) {
            await analyticHandlers.onChainError(parentIds, error, true);
            throw new Error(error);
        }
    }
}
const downloadImg = async (openai, fileId, filePath, dirPath) => {
    const response = await openai.files.content(fileId);
    // Extract the binary data from the Response object
    const image_data = await response.arrayBuffer();
    // Convert the binary data to a Buffer
    const image_data_buffer = Buffer.from(image_data);
    // Save the image to a specific location
    if (!fsDefault.existsSync(dirPath)) {
        fsDefault.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fsDefault.writeFileSync(filePath, image_data_buffer);
};
const downloadFile = async (fileObj, filePath, dirPath, openAIApiKey) => {
    try {
        const response = await (0, node_fetch_1.default)(`https://api.openai.com/v1/files/${fileObj.id}/content`, {
            method: 'GET',
            headers: { Accept: '*/*', Authorization: `Bearer ${openAIApiKey}` }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await new Promise((resolve, reject) => {
            if (!fsDefault.existsSync(dirPath)) {
                fsDefault.mkdirSync(path.dirname(filePath), { recursive: true });
            }
            const dest = fsDefault.createWriteStream(filePath);
            response.body.pipe(dest);
            response.body.on('end', () => resolve());
            dest.on('error', reject);
        });
        // eslint-disable-next-line no-console
        console.log('File downloaded and written to', filePath);
    }
    catch (error) {
        console.error('Error downloading or writing the file:', error);
    }
};
const formatToOpenAIAssistantTool = (tool) => {
    return {
        type: 'function',
        function: {
            name: tool.name,
            description: tool.description,
            parameters: (0, zod_to_json_schema_1.zodToJsonSchema)(tool.schema)
        }
    };
};
module.exports = { nodeClass: OpenAIAssistant_Agents };
//# sourceMappingURL=OpenAIAssistant.js.map