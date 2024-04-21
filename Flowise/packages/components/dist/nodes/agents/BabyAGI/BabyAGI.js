"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
class BabyAGI_Agents {
    constructor() {
        this.label = 'BabyAGI';
        this.name = 'babyAGI';
        this.version = 2.0;
        this.type = 'BabyAGI';
        this.category = 'Agents';
        this.icon = 'babyagi.svg';
        this.description = 'Task Driven Autonomous Agent which creates new task and reprioritizes task list based on objective';
        this.baseClasses = ['BabyAGI'];
        this.inputs = [
            {
                label: 'Chat Model',
                name: 'model',
                type: 'BaseChatModel'
            },
            {
                label: 'Vector Store',
                name: 'vectorStore',
                type: 'VectorStore'
            },
            {
                label: 'Task Loop',
                name: 'taskLoop',
                type: 'number',
                default: 3
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            }
        ];
    }
    async init(nodeData) {
        const model = nodeData.inputs?.model;
        const vectorStore = nodeData.inputs?.vectorStore;
        const taskLoop = nodeData.inputs?.taskLoop;
        const k = vectorStore?.k ?? 4;
        const babyAgi = core_1.BabyAGI.fromLLM(model, vectorStore, parseInt(taskLoop, 10), k);
        return babyAgi;
    }
    async run(nodeData, input) {
        const executor = nodeData.instance;
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the BabyAGI agent
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                //streamResponse(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId)
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const objective = input;
        const res = await executor.call({ objective });
        return res;
    }
}
module.exports = { nodeClass: BabyAGI_Agents };
//# sourceMappingURL=BabyAGI.js.map