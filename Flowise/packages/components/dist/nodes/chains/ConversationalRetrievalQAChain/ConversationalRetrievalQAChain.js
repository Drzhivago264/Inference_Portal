"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fast_json_patch_1 = require("fast-json-patch");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const messages_1 = require("@langchain/core/messages");
const console_1 = require("@langchain/core/tracers/console");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
const output_parsers_1 = require("@langchain/core/output_parsers");
const chains_1 = require("langchain/chains");
const utils_1 = require("../../../src/utils");
const handler_1 = require("../../../src/handler");
const Interface_1 = require("../../../src/Interface");
const prompts_2 = require("./prompts");
const sourceRunnableName = 'FindDocs';
class ConversationalRetrievalQAChain_Chains {
    constructor(fields) {
        this.label = 'Conversational Retrieval QA Chain';
        this.name = 'conversationalRetrievalQAChain';
        this.version = 3.0;
        this.type = 'ConversationalRetrievalQAChain';
        this.icon = 'qa.svg';
        this.category = 'Chains';
        this.description = 'Document QA - built on RetrievalQAChain to provide a chat history component';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(chains_1.ConversationalRetrievalQAChain)];
        this.inputs = [
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'Vector Store Retriever',
                name: 'vectorStoreRetriever',
                type: 'BaseRetriever'
            },
            {
                label: 'Memory',
                name: 'memory',
                type: 'BaseMemory',
                optional: true,
                description: 'If left empty, a default BufferMemory will be used'
            },
            {
                label: 'Return Source Documents',
                name: 'returnSourceDocuments',
                type: 'boolean',
                optional: true
            },
            {
                label: 'Rephrase Prompt',
                name: 'rephrasePrompt',
                type: 'string',
                description: 'Using previous chat history, rephrase question into a standalone question',
                warning: 'Prompt must include input variables: {chat_history} and {question}',
                rows: 4,
                additionalParams: true,
                optional: true,
                default: prompts_2.REPHRASE_TEMPLATE
            },
            {
                label: 'Response Prompt',
                name: 'responsePrompt',
                type: 'string',
                description: 'Taking the rephrased question, search for answer from the provided context',
                warning: 'Prompt must include input variable: {context}',
                rows: 4,
                additionalParams: true,
                optional: true,
                default: prompts_2.RESPONSE_TEMPLATE
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            }
            /** Deprecated
            {
                label: 'System Message',
                name: 'systemMessagePrompt',
                type: 'string',
                rows: 4,
                additionalParams: true,
                optional: true,
                placeholder:
                    'I want you to act as a document that I am having a conversation with. Your name is "AI Assistant". You will provide me with answers from the given info. If the answer is not included, say exactly "Hmm, I am not sure." and stop after that. Refuse to answer any question not about the info. Never break character.'
            },
            // TODO: create standalone chains for these 3 modes as they are not compatible with memory
            {
                label: 'Chain Option',
                name: 'chainOption',
                type: 'options',
                options: [
                    {
                        label: 'MapReduceDocumentsChain',
                        name: 'map_reduce',
                        description:
                            'Suitable for QA tasks over larger documents and can run the preprocessing step in parallel, reducing the running time'
                    },
                    {
                        label: 'RefineDocumentsChain',
                        name: 'refine',
                        description: 'Suitable for QA tasks over a large number of documents.'
                    },
                    {
                        label: 'StuffDocumentsChain',
                        name: 'stuff',
                        description: 'Suitable for QA tasks over a small number of documents.'
                    }
                ],
                additionalParams: true,
                optional: true
            }
            */
        ];
        this.sessionId = fields?.sessionId;
    }
    async init(nodeData) {
        const model = nodeData.inputs?.model;
        const vectorStoreRetriever = nodeData.inputs?.vectorStoreRetriever;
        const systemMessagePrompt = nodeData.inputs?.systemMessagePrompt;
        const rephrasePrompt = nodeData.inputs?.rephrasePrompt;
        const responsePrompt = nodeData.inputs?.responsePrompt;
        let customResponsePrompt = responsePrompt;
        // If the deprecated systemMessagePrompt is still exists
        if (systemMessagePrompt) {
            customResponsePrompt = `${systemMessagePrompt}\n${prompts_2.QA_TEMPLATE}`;
        }
        const answerChain = createChain(model, vectorStoreRetriever, rephrasePrompt, customResponsePrompt);
        return answerChain;
    }
    async run(nodeData, input, options) {
        const model = nodeData.inputs?.model;
        const externalMemory = nodeData.inputs?.memory;
        const vectorStoreRetriever = nodeData.inputs?.vectorStoreRetriever;
        const systemMessagePrompt = nodeData.inputs?.systemMessagePrompt;
        const rephrasePrompt = nodeData.inputs?.rephrasePrompt;
        const responsePrompt = nodeData.inputs?.responsePrompt;
        const returnSourceDocuments = nodeData.inputs?.returnSourceDocuments;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        const chatflowid = options.chatflowid;
        let customResponsePrompt = responsePrompt;
        // If the deprecated systemMessagePrompt is still exists
        if (systemMessagePrompt) {
            customResponsePrompt = `${systemMessagePrompt}\n${prompts_2.QA_TEMPLATE}`;
        }
        let memory = externalMemory;
        const moderations = nodeData.inputs?.inputModeration;
        if (!memory) {
            memory = new BufferMemory({
                returnMessages: true,
                memoryKey: 'chat_history',
                appDataSource,
                databaseEntities,
                chatflowid
            });
        }
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the Conversational Retrieval QA Chain
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                (0, Moderation_1.streamResponse)(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId);
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const answerChain = createChain(model, vectorStoreRetriever, rephrasePrompt, customResponsePrompt);
        const history = (await memory.getChatMessages(this.sessionId, false)) ?? [];
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const additionalCallback = await (0, handler_1.additionalCallbacks)(nodeData, options);
        let callbacks = [loggerHandler, ...additionalCallback];
        if (process.env.DEBUG === 'true') {
            callbacks.push(new console_1.ConsoleCallbackHandler());
        }
        const stream = answerChain.streamLog({ question: input, chat_history: history }, { callbacks }, {
            includeNames: [sourceRunnableName]
        });
        let streamedResponse = {};
        let sourceDocuments = [];
        let text = '';
        let isStreamingStarted = false;
        const isStreamingEnabled = options.socketIO && options.socketIOClientId;
        for await (const chunk of stream) {
            streamedResponse = (0, fast_json_patch_1.applyPatch)(streamedResponse, chunk.ops).newDocument;
            if (streamedResponse.final_output) {
                text = streamedResponse.final_output?.output;
                if (isStreamingEnabled)
                    options.socketIO.to(options.socketIOClientId).emit('end');
                if (Array.isArray(streamedResponse?.logs?.[sourceRunnableName]?.final_output?.output)) {
                    sourceDocuments = streamedResponse?.logs?.[sourceRunnableName]?.final_output?.output;
                    if (isStreamingEnabled && returnSourceDocuments)
                        options.socketIO.to(options.socketIOClientId).emit('sourceDocuments', sourceDocuments);
                }
            }
            if (Array.isArray(streamedResponse?.streamed_output) &&
                streamedResponse?.streamed_output.length &&
                !streamedResponse.final_output) {
                const token = streamedResponse.streamed_output[streamedResponse.streamed_output.length - 1];
                if (!isStreamingStarted) {
                    isStreamingStarted = true;
                    if (isStreamingEnabled)
                        options.socketIO.to(options.socketIOClientId).emit('start', token);
                }
                if (isStreamingEnabled)
                    options.socketIO.to(options.socketIOClientId).emit('token', token);
            }
        }
        await memory.addChatMessages([
            {
                text: input,
                type: 'userMessage'
            },
            {
                text: text,
                type: 'apiMessage'
            }
        ], this.sessionId);
        if (returnSourceDocuments)
            return { text, sourceDocuments };
        else
            return { text };
    }
}
const createRetrieverChain = (llm, retriever, rephrasePrompt) => {
    // Small speed/accuracy optimization: no need to rephrase the first question
    // since there shouldn't be any meta-references to prior chat history
    const CONDENSE_QUESTION_PROMPT = prompts_1.PromptTemplate.fromTemplate(rephrasePrompt);
    const condenseQuestionChain = runnables_1.RunnableSequence.from([CONDENSE_QUESTION_PROMPT, llm, new output_parsers_1.StringOutputParser()]).withConfig({
        runName: 'CondenseQuestion'
    });
    const hasHistoryCheckFn = runnables_1.RunnableLambda.from((input) => input.chat_history.length > 0).withConfig({
        runName: 'HasChatHistoryCheck'
    });
    const conversationChain = condenseQuestionChain.pipe(retriever).withConfig({
        runName: 'RetrievalChainWithHistory'
    });
    const basicRetrievalChain = runnables_1.RunnableLambda.from((input) => input.question)
        .withConfig({
        runName: 'Itemgetter:question'
    })
        .pipe(retriever)
        .withConfig({ runName: 'RetrievalChainWithNoHistory' });
    return runnables_1.RunnableBranch.from([[hasHistoryCheckFn, conversationChain], basicRetrievalChain]).withConfig({ runName: sourceRunnableName });
};
const formatDocs = (docs) => {
    return docs.map((doc, i) => `<doc id='${i}'>${doc.pageContent}</doc>`).join('\n');
};
const formatChatHistoryAsString = (history) => {
    return history.map((message) => `${message._getType()}: ${message.content}`).join('\n');
};
const serializeHistory = (input) => {
    const chatHistory = input.chat_history || [];
    const convertedChatHistory = [];
    for (const message of chatHistory) {
        if (message.type === 'userMessage') {
            convertedChatHistory.push(new messages_1.HumanMessage({ content: message.message }));
        }
        if (message.type === 'apiMessage') {
            convertedChatHistory.push(new messages_1.AIMessage({ content: message.message }));
        }
    }
    return convertedChatHistory;
};
const createChain = (llm, retriever, rephrasePrompt = prompts_2.REPHRASE_TEMPLATE, responsePrompt = prompts_2.RESPONSE_TEMPLATE) => {
    const retrieverChain = createRetrieverChain(llm, retriever, rephrasePrompt);
    const context = runnables_1.RunnableMap.from({
        context: runnables_1.RunnableSequence.from([
            ({ question, chat_history }) => ({
                question,
                chat_history: formatChatHistoryAsString(chat_history)
            }),
            retrieverChain,
            runnables_1.RunnableLambda.from(formatDocs).withConfig({
                runName: 'FormatDocumentChunks'
            })
        ]),
        question: runnables_1.RunnableLambda.from((input) => input.question).withConfig({
            runName: 'Itemgetter:question'
        }),
        chat_history: runnables_1.RunnableLambda.from((input) => input.chat_history).withConfig({
            runName: 'Itemgetter:chat_history'
        })
    }).withConfig({ tags: ['RetrieveDocs'] });
    const prompt = prompts_1.ChatPromptTemplate.fromMessages([
        ['system', responsePrompt],
        new prompts_1.MessagesPlaceholder('chat_history'),
        ['human', `{question}`]
    ]);
    const responseSynthesizerChain = runnables_1.RunnableSequence.from([prompt, llm, new output_parsers_1.StringOutputParser()]).withConfig({
        tags: ['GenerateResponse']
    });
    const conversationalQAChain = runnables_1.RunnableSequence.from([
        {
            question: runnables_1.RunnableLambda.from((input) => input.question).withConfig({
                runName: 'Itemgetter:question'
            }),
            chat_history: runnables_1.RunnableLambda.from(serializeHistory).withConfig({
                runName: 'SerializeHistory'
            })
        },
        context,
        responseSynthesizerChain
    ]);
    return conversationalQAChain;
};
class BufferMemory extends Interface_1.FlowiseMemory {
    constructor(fields) {
        super(fields);
        this.appDataSource = fields.appDataSource;
        this.databaseEntities = fields.databaseEntities;
        this.chatflowid = fields.chatflowid;
    }
    async getChatMessages(overrideSessionId = '', returnBaseMessages = false) {
        if (!overrideSessionId)
            return [];
        const chatMessage = await this.appDataSource.getRepository(this.databaseEntities['ChatMessage']).find({
            where: {
                sessionId: overrideSessionId,
                chatflowid: this.chatflowid
            },
            order: {
                createdDate: 'ASC'
            }
        });
        if (returnBaseMessages) {
            return (0, utils_1.mapChatMessageToBaseMessage)(chatMessage);
        }
        let returnIMessages = [];
        for (const m of chatMessage) {
            returnIMessages.push({
                message: m.content,
                type: m.role
            });
        }
        return returnIMessages;
    }
    async addChatMessages() {
        // adding chat messages is done on server level
        return;
    }
    async clearChatMessages() {
        // clearing chat messages is done on server level
        return;
    }
}
module.exports = { nodeClass: ConversationalRetrievalQAChain_Chains };
//# sourceMappingURL=ConversationalRetrievalQAChain.js.map