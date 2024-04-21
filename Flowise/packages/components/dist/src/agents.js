"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolCallingAgentOutputParser = exports.XMLAgentOutputParser = exports.createReactAgent = exports.formatAgentSteps = exports.AgentExecutor = exports.AgentExecutorIterator = exports.SOURCE_DOCUMENTS_PREFIX = void 0;
const lodash_1 = require("lodash");
const messages_1 = require("@langchain/core/messages");
const output_parsers_1 = require("@langchain/core/output_parsers");
const manager_1 = require("@langchain/core/callbacks/manager");
const tools_1 = require("@langchain/core/tools");
const runnables_1 = require("@langchain/core/runnables");
const serializable_1 = require("@langchain/core/load/serializable");
const prompts_1 = require("@langchain/core/prompts");
const chains_1 = require("langchain/chains");
const agents_1 = require("langchain/agents");
const log_1 = require("langchain/agents/format_scratchpad/log");
exports.SOURCE_DOCUMENTS_PREFIX = '\n\n----FLOWISE_SOURCE_DOCUMENTS----\n\n';
//TODO: stream tools back
class AgentExecutorIterator extends serializable_1.Serializable {
    get finalOutputs() {
        return this._finalOutputs;
    }
    /** Intended to be used as a setter method, needs to be async. */
    async setFinalOutputs(value) {
        this._finalOutputs = undefined;
        if (value) {
            const preparedOutputs = await this.agentExecutor.prepOutputs(this.inputs, value, true);
            this._finalOutputs = preparedOutputs;
        }
    }
    get nameToToolMap() {
        const toolMap = this.agentExecutor.tools.map((tool) => ({
            [tool.name]: tool
        }));
        return Object.assign({}, ...toolMap);
    }
    constructor(fields) {
        super(fields);
        this.lc_namespace = ['langchain', 'agents', 'executor_iterator'];
        this.intermediateSteps = [];
        this.iterations = 0;
        this.agentExecutor = fields.agentExecutor;
        this.inputs = fields.inputs;
        this.tags = fields.tags;
        this.metadata = fields.metadata;
        this.runName = fields.runName;
        this.runManager = fields.runManager;
    }
    /**
     * Reset the iterator to its initial state, clearing intermediate steps,
     * iterations, and the final output.
     */
    reset() {
        this.intermediateSteps = [];
        this.iterations = 0;
        this._finalOutputs = undefined;
    }
    updateIterations() {
        this.iterations += 1;
    }
    async *streamIterator() {
        this.reset();
        // Loop to handle iteration
        while (true) {
            try {
                if (this.iterations === 0) {
                    await this.onFirstStep();
                }
                const result = await this._callNext();
                yield result;
            }
            catch (e) {
                if ('message' in e && e.message.startsWith('Final outputs already reached: ')) {
                    if (!this.finalOutputs) {
                        throw e;
                    }
                    return this.finalOutputs;
                }
                if (this.runManager) {
                    await this.runManager.handleChainError(e);
                }
                throw e;
            }
        }
    }
    /**
     * Perform any necessary setup for the first step
     * of the asynchronous iterator.
     */
    async onFirstStep() {
        if (this.iterations === 0) {
            const callbackManager = await manager_1.CallbackManager.configure(this.callbacks, this.agentExecutor.callbacks, this.tags, this.agentExecutor.tags, this.metadata, this.agentExecutor.metadata, {
                verbose: this.agentExecutor.verbose
            });
            this.runManager = await callbackManager?.handleChainStart(this.agentExecutor.toJSON(), this.inputs, undefined, undefined, this.tags, this.metadata, this.runName);
        }
    }
    /**
     * Execute the next step in the chain using the
     * AgentExecutor's _takeNextStep method.
     */
    async _executeNextStep(runManager) {
        return this.agentExecutor._takeNextStep(this.nameToToolMap, this.inputs, this.intermediateSteps, runManager);
    }
    /**
     * Process the output of the next step,
     * handling AgentFinish and tool return cases.
     */
    async _processNextStepOutput(nextStepOutput, runManager) {
        if ('returnValues' in nextStepOutput) {
            const output = await this.agentExecutor._return(nextStepOutput, this.intermediateSteps, runManager);
            if (this.runManager) {
                await this.runManager.handleChainEnd(output);
            }
            await this.setFinalOutputs(output);
            return output;
        }
        this.intermediateSteps = this.intermediateSteps.concat(nextStepOutput);
        let output = {};
        if (Array.isArray(nextStepOutput) && nextStepOutput.length === 1) {
            const nextStep = nextStepOutput[0];
            const toolReturn = await this.agentExecutor._getToolReturn(nextStep);
            if (toolReturn) {
                output = await this.agentExecutor._return(toolReturn, this.intermediateSteps, runManager);
                if (this.runManager) {
                    await this.runManager.handleChainEnd(output);
                }
                await this.setFinalOutputs(output);
            }
        }
        output = { intermediateSteps: nextStepOutput };
        return output;
    }
    async _stop() {
        const output = await this.agentExecutor.agent.returnStoppedResponse(this.agentExecutor.earlyStoppingMethod, this.intermediateSteps, this.inputs);
        const returnedOutput = await this.agentExecutor._return(output, this.intermediateSteps, this.runManager);
        await this.setFinalOutputs(returnedOutput);
        return returnedOutput;
    }
    async _callNext() {
        // final output already reached: stopiteration (final output)
        if (this.finalOutputs) {
            throw new Error(`Final outputs already reached: ${JSON.stringify(this.finalOutputs, null, 2)}`);
        }
        // timeout/max iterations: stopiteration (stopped response)
        if (!this.agentExecutor.shouldContinueGetter(this.iterations)) {
            return this._stop();
        }
        const nextStepOutput = await this._executeNextStep(this.runManager);
        const output = await this._processNextStepOutput(nextStepOutput, this.runManager);
        this.updateIterations();
        return output;
    }
}
exports.AgentExecutorIterator = AgentExecutorIterator;
class AgentExecutor extends chains_1.BaseChain {
    static lc_name() {
        return 'AgentExecutor';
    }
    get lc_namespace() {
        return ['langchain', 'agents', 'executor'];
    }
    get inputKeys() {
        return this.agent.inputKeys;
    }
    get outputKeys() {
        return this.agent.returnValues;
    }
    constructor(input) {
        let agent;
        if (runnables_1.Runnable.isRunnable(input.agent)) {
            agent = new agents_1.RunnableAgent({ runnable: input.agent });
        }
        else {
            agent = input.agent;
        }
        super(input);
        this.returnIntermediateSteps = false;
        this.maxIterations = 15;
        this.earlyStoppingMethod = 'force';
        /**
         * How to handle errors raised by the agent's output parser.
            Defaults to `False`, which raises the error.
    
            If `true`, the error will be sent back to the LLM as an observation.
            If a string, the string itself will be sent to the LLM as an observation.
            If a callable function, the function will be called with the exception
            as an argument, and the result of that function will be passed to the agent
            as an observation.
        */
        this.handleParsingErrors = false;
        this.agent = agent;
        this.tools = input.tools;
        this.handleParsingErrors = input.handleParsingErrors ?? this.handleParsingErrors;
        /* Getting rid of this because RunnableAgent doesnt allow return direct
        if (this.agent._agentActionType() === "multi") {
            for (const tool of this.tools) {
              if (tool.returnDirect) {
                throw new Error(
                  `Tool with return direct ${tool.name} not supported for multi-action agent.`
                );
              }
            }
        }*/
        this.returnIntermediateSteps = input.returnIntermediateSteps ?? this.returnIntermediateSteps;
        this.maxIterations = input.maxIterations ?? this.maxIterations;
        this.earlyStoppingMethod = input.earlyStoppingMethod ?? this.earlyStoppingMethod;
        this.sessionId = input.sessionId;
        this.chatId = input.chatId;
        this.input = input.input;
        this.isXML = input.isXML;
    }
    static fromAgentAndTools(fields) {
        const newInstance = new AgentExecutor(fields);
        if (fields.sessionId)
            newInstance.sessionId = fields.sessionId;
        if (fields.chatId)
            newInstance.chatId = fields.chatId;
        if (fields.input)
            newInstance.input = fields.input;
        if (fields.isXML)
            newInstance.isXML = fields.isXML;
        return newInstance;
    }
    get shouldContinueGetter() {
        return this.shouldContinue.bind(this);
    }
    /**
     * Method that checks if the agent execution should continue based on the
     * number of iterations.
     * @param iterations The current number of iterations.
     * @returns A boolean indicating whether the agent execution should continue.
     */
    shouldContinue(iterations) {
        return this.maxIterations === undefined || iterations < this.maxIterations;
    }
    async _call(inputs, runManager) {
        const toolsByName = Object.fromEntries(this.tools.map((t) => [t.name.toLowerCase(), t]));
        const steps = [];
        let iterations = 0;
        let sourceDocuments = [];
        const usedTools = [];
        const getOutput = async (finishStep) => {
            const { returnValues } = finishStep;
            const additional = await this.agent.prepareForOutput(returnValues, steps);
            if (sourceDocuments.length)
                additional.sourceDocuments = (0, lodash_1.flatten)(sourceDocuments);
            if (usedTools.length)
                additional.usedTools = usedTools;
            if (this.returnIntermediateSteps) {
                return { ...returnValues, intermediateSteps: steps, ...additional };
            }
            await runManager?.handleAgentEnd(finishStep);
            return { ...returnValues, ...additional };
        };
        while (this.shouldContinue(iterations)) {
            let output;
            try {
                output = await this.agent.plan(steps, inputs, runManager?.getChild());
            }
            catch (e) {
                if (e instanceof output_parsers_1.OutputParserException) {
                    let observation;
                    let text = e.message;
                    if (this.handleParsingErrors === true) {
                        if (e.sendToLLM) {
                            observation = e.observation;
                            text = e.llmOutput ?? '';
                        }
                        else {
                            observation = 'Invalid or incomplete response';
                        }
                    }
                    else if (typeof this.handleParsingErrors === 'string') {
                        observation = this.handleParsingErrors;
                    }
                    else if (typeof this.handleParsingErrors === 'function') {
                        observation = this.handleParsingErrors(e);
                    }
                    else {
                        throw e;
                    }
                    output = {
                        tool: '_Exception',
                        toolInput: observation,
                        log: text
                    };
                }
                else {
                    throw e;
                }
            }
            // Check if the agent has finished
            if ('returnValues' in output) {
                return getOutput(output);
            }
            let actions;
            if (Array.isArray(output)) {
                actions = output;
            }
            else {
                actions = [output];
            }
            const newSteps = await Promise.all(actions.map(async (action) => {
                await runManager?.handleAgentAction(action);
                const tool = action.tool === '_Exception' ? new ExceptionTool() : toolsByName[action.tool?.toLowerCase()];
                let observation;
                try {
                    /* Here we need to override Tool call method to include sessionId, chatId, input as parameter
                     * Tool Call Parameters:
                     * - arg: z.output<T>
                     * - configArg?: RunnableConfig | Callbacks
                     * - tags?: string[]
                     * - flowConfig?: { sessionId?: string, chatId?: string, input?: string }
                     */
                    if (tool) {
                        observation = await tool.call(this.isXML && typeof action.toolInput === 'string' ? { input: action.toolInput } : action.toolInput, runManager?.getChild(), undefined, {
                            sessionId: this.sessionId,
                            chatId: this.chatId,
                            input: this.input
                        });
                        usedTools.push({
                            tool: tool.name,
                            toolInput: action.toolInput,
                            toolOutput: observation.includes(exports.SOURCE_DOCUMENTS_PREFIX)
                                ? observation.split(exports.SOURCE_DOCUMENTS_PREFIX)[0]
                                : observation
                        });
                    }
                    else {
                        observation = `${action.tool} is not a valid tool, try another one.`;
                    }
                }
                catch (e) {
                    if (e instanceof tools_1.ToolInputParsingException) {
                        if (this.handleParsingErrors === true) {
                            observation = 'Invalid or incomplete tool input. Please try again.';
                        }
                        else if (typeof this.handleParsingErrors === 'string') {
                            observation = this.handleParsingErrors;
                        }
                        else if (typeof this.handleParsingErrors === 'function') {
                            observation = this.handleParsingErrors(e);
                        }
                        else {
                            throw e;
                        }
                        observation = await new ExceptionTool().call(observation, runManager?.getChild());
                        return { action, observation: observation ?? '' };
                    }
                }
                if (observation?.includes(exports.SOURCE_DOCUMENTS_PREFIX)) {
                    const observationArray = observation.split(exports.SOURCE_DOCUMENTS_PREFIX);
                    observation = observationArray[0];
                    const docs = observationArray[1];
                    try {
                        const parsedDocs = JSON.parse(docs);
                        sourceDocuments.push(parsedDocs);
                    }
                    catch (e) {
                        console.error('Error parsing source documents from tool');
                    }
                }
                return { action, observation: observation ?? '' };
            }));
            steps.push(...newSteps);
            const lastStep = steps[steps.length - 1];
            const lastTool = toolsByName[lastStep.action.tool?.toLowerCase()];
            if (lastTool?.returnDirect) {
                return getOutput({
                    returnValues: { [this.agent.returnValues[0]]: lastStep.observation },
                    log: ''
                });
            }
            iterations += 1;
        }
        const finish = await this.agent.returnStoppedResponse(this.earlyStoppingMethod, steps, inputs);
        return getOutput(finish);
    }
    async _takeNextStep(nameToolMap, inputs, intermediateSteps, runManager) {
        let output;
        try {
            output = await this.agent.plan(intermediateSteps, inputs, runManager?.getChild());
        }
        catch (e) {
            if (e instanceof output_parsers_1.OutputParserException) {
                let observation;
                let text = e.message;
                if (this.handleParsingErrors === true) {
                    if (e.sendToLLM) {
                        observation = e.observation;
                        text = e.llmOutput ?? '';
                    }
                    else {
                        observation = 'Invalid or incomplete response';
                    }
                }
                else if (typeof this.handleParsingErrors === 'string') {
                    observation = this.handleParsingErrors;
                }
                else if (typeof this.handleParsingErrors === 'function') {
                    observation = this.handleParsingErrors(e);
                }
                else {
                    throw e;
                }
                output = {
                    tool: '_Exception',
                    toolInput: observation,
                    log: text
                };
            }
            else {
                throw e;
            }
        }
        if ('returnValues' in output) {
            return output;
        }
        let actions;
        if (Array.isArray(output)) {
            actions = output;
        }
        else {
            actions = [output];
        }
        const result = [];
        for (const agentAction of actions) {
            let observation = '';
            if (runManager) {
                await runManager?.handleAgentAction(agentAction);
            }
            if (agentAction.tool in nameToolMap) {
                const tool = nameToolMap[agentAction.tool];
                try {
                    /* Here we need to override Tool call method to include sessionId, chatId, input as parameter
                     * Tool Call Parameters:
                     * - arg: z.output<T>
                     * - configArg?: RunnableConfig | Callbacks
                     * - tags?: string[]
                     * - flowConfig?: { sessionId?: string, chatId?: string, input?: string }
                     */
                    observation = await tool.call(this.isXML && typeof agentAction.toolInput === 'string' ? { input: agentAction.toolInput } : agentAction.toolInput, runManager?.getChild(), undefined, {
                        sessionId: this.sessionId,
                        chatId: this.chatId,
                        input: this.input
                    });
                    if (observation?.includes(exports.SOURCE_DOCUMENTS_PREFIX)) {
                        const observationArray = observation.split(exports.SOURCE_DOCUMENTS_PREFIX);
                        observation = observationArray[0];
                    }
                }
                catch (e) {
                    if (e instanceof tools_1.ToolInputParsingException) {
                        if (this.handleParsingErrors === true) {
                            observation = 'Invalid or incomplete tool input. Please try again.';
                        }
                        else if (typeof this.handleParsingErrors === 'string') {
                            observation = this.handleParsingErrors;
                        }
                        else if (typeof this.handleParsingErrors === 'function') {
                            observation = this.handleParsingErrors(e);
                        }
                        else {
                            throw e;
                        }
                        observation = await new ExceptionTool().call(observation, runManager?.getChild());
                    }
                }
            }
            else {
                observation = `${agentAction.tool} is not a valid tool, try another available tool: ${Object.keys(nameToolMap).join(', ')}`;
            }
            result.push({
                action: agentAction,
                observation
            });
        }
        return result;
    }
    async _return(output, intermediateSteps, runManager) {
        if (runManager) {
            await runManager.handleAgentEnd(output);
        }
        const finalOutput = output.returnValues;
        if (this.returnIntermediateSteps) {
            finalOutput.intermediateSteps = intermediateSteps;
        }
        return finalOutput;
    }
    async _getToolReturn(nextStepOutput) {
        const { action, observation } = nextStepOutput;
        const nameToolMap = Object.fromEntries(this.tools.map((t) => [t.name.toLowerCase(), t]));
        const [returnValueKey = 'output'] = this.agent.returnValues;
        // Invalid tools won't be in the map, so we return False.
        if (action.tool in nameToolMap) {
            if (nameToolMap[action.tool].returnDirect) {
                return {
                    returnValues: { [returnValueKey]: observation },
                    log: ''
                };
            }
        }
        return null;
    }
    _returnStoppedResponse(earlyStoppingMethod) {
        if (earlyStoppingMethod === 'force') {
            return {
                returnValues: {
                    output: 'Agent stopped due to iteration limit or time limit.'
                },
                log: ''
            };
        }
        throw new Error(`Got unsupported early_stopping_method: ${earlyStoppingMethod}`);
    }
    async *_streamIterator(inputs) {
        const agentExecutorIterator = new AgentExecutorIterator({
            inputs,
            agentExecutor: this,
            metadata: this.metadata,
            tags: this.tags,
            callbacks: this.callbacks
        });
        const iterator = agentExecutorIterator.streamIterator();
        for await (const step of iterator) {
            if (!step) {
                continue;
            }
            yield step;
        }
    }
    _chainType() {
        return 'agent_executor';
    }
    serialize() {
        throw new Error('Cannot serialize an AgentExecutor');
    }
}
exports.AgentExecutor = AgentExecutor;
class ExceptionTool extends tools_1.Tool {
    constructor() {
        super(...arguments);
        this.name = '_Exception';
        this.description = 'Exception tool';
    }
    async _call(query) {
        return query;
    }
}
const formatAgentSteps = (steps) => steps.flatMap(({ action, observation }) => {
    const create_function_message = (observation, action) => {
        let content;
        if (typeof observation !== 'string') {
            content = JSON.stringify(observation);
        }
        else {
            content = observation;
        }
        return new messages_1.FunctionMessage(content, action.tool);
    };
    if ('messageLog' in action && action.messageLog !== undefined) {
        const log = action.messageLog;
        return log.concat(create_function_message(observation, action));
    }
    else {
        return [new messages_1.AIMessage(action.log)];
    }
});
exports.formatAgentSteps = formatAgentSteps;
const renderTextDescription = (tools) => {
    return tools.map((tool) => `${tool.name}: ${tool.description}`).join('\n');
};
const createReactAgent = async ({ llm, tools, prompt }) => {
    const missingVariables = ['tools', 'tool_names', 'agent_scratchpad'].filter((v) => !prompt.inputVariables.includes(v));
    if (missingVariables.length > 0) {
        throw new Error(`Provided prompt is missing required input variables: ${JSON.stringify(missingVariables)}`);
    }
    const toolNames = tools.map((tool) => tool.name);
    const partialedPrompt = await prompt.partial({
        tools: renderTextDescription(tools),
        tool_names: toolNames.join(', ')
    });
    // TODO: Add .bind to core runnable interface.
    const llmWithStop = llm.bind({
        stop: ['\nObservation:']
    });
    const agent = runnables_1.RunnableSequence.from([
        runnables_1.RunnablePassthrough.assign({
            //@ts-ignore
            agent_scratchpad: (input) => (0, log_1.formatLogToString)(input.steps)
        }),
        partialedPrompt,
        llmWithStop,
        new ReActSingleInputOutputParser({
            toolNames
        })
    ]);
    return agent;
};
exports.createReactAgent = createReactAgent;
class ReActSingleInputOutputParser extends agents_1.AgentActionOutputParser {
    constructor(fields) {
        super(...arguments);
        this.lc_namespace = ['langchain', 'agents', 'react'];
        this.FINAL_ANSWER_ACTION = 'Final Answer:';
        this.FINAL_ANSWER_AND_PARSABLE_ACTION_ERROR_MESSAGE = 'Parsing LLM output produced both a final answer and a parse-able action:';
        this.FORMAT_INSTRUCTIONS = `Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question`;
        this.toolNames = fields.toolNames;
    }
    /**
     * Parses the given text into an AgentAction or AgentFinish object. If an
     * output fixing parser is defined, uses it to parse the text.
     * @param text Text to parse.
     * @returns Promise that resolves to an AgentAction or AgentFinish object.
     */
    async parse(text) {
        const includesAnswer = text.includes(this.FINAL_ANSWER_ACTION);
        const regex = /Action\s*\d*\s*:[\s]*(.*?)[\s]*Action\s*\d*\s*Input\s*\d*\s*:[\s]*(.*)/;
        const actionMatch = text.match(regex);
        if (actionMatch) {
            if (includesAnswer) {
                throw new Error(`${this.FINAL_ANSWER_AND_PARSABLE_ACTION_ERROR_MESSAGE}: ${text}`);
            }
            const action = actionMatch[1];
            const actionInput = actionMatch[2];
            const toolInput = actionInput.trim().replace(/"/g, '');
            return {
                tool: action,
                toolInput,
                log: text
            };
        }
        if (includesAnswer) {
            const finalAnswerText = text.split(this.FINAL_ANSWER_ACTION)[1].trim();
            return {
                returnValues: {
                    output: finalAnswerText
                },
                log: text
            };
        }
        // Instead of throwing Error, we return a AgentFinish object
        return { returnValues: { output: text }, log: text };
    }
    /**
     * Returns the format instructions as a string. If the 'raw' option is
     * true, returns the raw FORMAT_INSTRUCTIONS.
     * @param options Options for getting the format instructions.
     * @returns Format instructions as a string.
     */
    getFormatInstructions() {
        return (0, prompts_1.renderTemplate)(this.FORMAT_INSTRUCTIONS, 'f-string', {
            tool_names: this.toolNames.join(', ')
        });
    }
}
class XMLAgentOutputParser extends agents_1.AgentActionOutputParser {
    constructor() {
        super(...arguments);
        this.lc_namespace = ['langchain', 'agents', 'xml'];
    }
    static lc_name() {
        return 'XMLAgentOutputParser';
    }
    /**
     * Parses the output text from the agent and returns an AgentAction or
     * AgentFinish object.
     * @param text The output text from the agent.
     * @returns An AgentAction or AgentFinish object.
     */
    async parse(text) {
        if (text.includes('</tool>')) {
            const [tool, toolInput] = text.split('</tool>');
            const _tool = tool.split('<tool>')[1];
            const _toolInput = toolInput.split('<tool_input>')[1];
            return { tool: _tool, toolInput: _toolInput, log: text };
        }
        else if (text.includes('<final_answer>')) {
            const [, answer] = text.split('<final_answer>');
            return { returnValues: { output: answer }, log: text };
        }
        else {
            // Instead of throwing Error, we return a AgentFinish object
            return { returnValues: { output: text }, log: text };
        }
    }
    getFormatInstructions() {
        throw new Error('getFormatInstructions not implemented inside XMLAgentOutputParser.');
    }
}
exports.XMLAgentOutputParser = XMLAgentOutputParser;
class AgentMultiActionOutputParser extends output_parsers_1.BaseOutputParser {
}
function parseAIMessageToToolAction(message) {
    const stringifiedMessageContent = typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
    let toolCalls = [];
    if (message.tool_calls !== undefined && message.tool_calls.length > 0) {
        toolCalls = message.tool_calls;
    }
    else {
        if (message.additional_kwargs.tool_calls === undefined || message.additional_kwargs.tool_calls.length === 0) {
            return {
                returnValues: { output: message.content },
                log: stringifiedMessageContent
            };
        }
        // Best effort parsing
        for (const toolCall of message.additional_kwargs.tool_calls ?? []) {
            const functionName = toolCall.function?.name;
            try {
                const args = JSON.parse(toolCall.function.arguments);
                toolCalls.push({ name: functionName, args, id: toolCall.id });
            }
            catch (e) {
                throw new output_parsers_1.OutputParserException(`Failed to parse tool arguments from chat model response. Text: "${JSON.stringify(toolCalls)}". ${e}`);
            }
        }
    }
    return toolCalls.map((toolCall, i) => {
        const messageLog = i === 0 ? [message] : [];
        const log = `Invoking "${toolCall.name}" with ${JSON.stringify(toolCall.args ?? {})}\n${stringifiedMessageContent}`;
        return {
            tool: toolCall.name,
            toolInput: toolCall.args,
            toolCallId: toolCall.id ?? '',
            log,
            messageLog
        };
    });
}
class ToolCallingAgentOutputParser extends AgentMultiActionOutputParser {
    constructor() {
        super(...arguments);
        this.lc_namespace = ['langchain', 'agents', 'tool_calling'];
    }
    static lc_name() {
        return 'ToolCallingAgentOutputParser';
    }
    async parse(text) {
        throw new Error(`ToolCallingAgentOutputParser can only parse messages.\nPassed input: ${text}`);
    }
    async parseResult(generations) {
        if ('message' in generations[0] && (0, messages_1.isBaseMessage)(generations[0].message)) {
            return parseAIMessageToToolAction(generations[0].message);
        }
        throw new Error('parseResult on ToolCallingAgentOutputParser only works on ChatGeneration output');
    }
    getFormatInstructions() {
        throw new Error('getFormatInstructions not implemented inside ToolCallingAgentOutputParser.');
    }
}
exports.ToolCallingAgentOutputParser = ToolCallingAgentOutputParser;
//# sourceMappingURL=agents.js.map