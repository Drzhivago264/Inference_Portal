import { ChainValues } from '@langchain/core/utils/types';
import { AgentStep, AgentAction } from '@langchain/core/agents';
import { BaseMessage } from '@langchain/core/messages';
import { OutputParserException, BaseOutputParser } from '@langchain/core/output_parsers';
import { CallbackManagerForChainRun, Callbacks } from '@langchain/core/callbacks/manager';
import { ToolInputParsingException, Tool } from '@langchain/core/tools';
import { RunnableSequence } from '@langchain/core/runnables';
import { Serializable } from '@langchain/core/load/serializable';
import { ChatGeneration } from '@langchain/core/outputs';
import { BaseChain, SerializedLLMChain } from 'langchain/chains';
import { CreateReactAgentParams, AgentExecutorInput, AgentActionOutputParser, BaseSingleActionAgent, BaseMultiActionAgent, StoppingMethod } from 'langchain/agents';
export declare const SOURCE_DOCUMENTS_PREFIX = "\n\n----FLOWISE_SOURCE_DOCUMENTS----\n\n";
type AgentFinish = {
    returnValues: Record<string, any>;
    log: string;
};
type AgentExecutorOutput = ChainValues;
interface AgentExecutorIteratorInput {
    agentExecutor: AgentExecutor;
    inputs: Record<string, string>;
    callbacks?: Callbacks;
    tags?: string[];
    metadata?: Record<string, unknown>;
    runName?: string;
    runManager?: CallbackManagerForChainRun;
}
export declare class AgentExecutorIterator extends Serializable implements AgentExecutorIteratorInput {
    lc_namespace: string[];
    agentExecutor: AgentExecutor;
    inputs: Record<string, string>;
    callbacks: Callbacks;
    tags: string[] | undefined;
    metadata: Record<string, unknown> | undefined;
    runName: string | undefined;
    private _finalOutputs;
    get finalOutputs(): Record<string, unknown> | undefined;
    /** Intended to be used as a setter method, needs to be async. */
    setFinalOutputs(value: Record<string, unknown> | undefined): Promise<void>;
    runManager: CallbackManagerForChainRun | undefined;
    intermediateSteps: AgentStep[];
    iterations: number;
    get nameToToolMap(): Record<string, Tool>;
    constructor(fields: AgentExecutorIteratorInput);
    /**
     * Reset the iterator to its initial state, clearing intermediate steps,
     * iterations, and the final output.
     */
    reset(): void;
    updateIterations(): void;
    streamIterator(): AsyncGenerator<Record<string, unknown>, Record<string, unknown>, unknown>;
    /**
     * Perform any necessary setup for the first step
     * of the asynchronous iterator.
     */
    onFirstStep(): Promise<void>;
    /**
     * Execute the next step in the chain using the
     * AgentExecutor's _takeNextStep method.
     */
    _executeNextStep(runManager?: CallbackManagerForChainRun): Promise<AgentFinish | AgentStep[]>;
    /**
     * Process the output of the next step,
     * handling AgentFinish and tool return cases.
     */
    _processNextStepOutput(nextStepOutput: AgentFinish | AgentStep[], runManager?: CallbackManagerForChainRun): Promise<Record<string, string | AgentStep[]>>;
    _stop(): Promise<Record<string, unknown>>;
    _callNext(): Promise<Record<string, unknown>>;
}
export declare class AgentExecutor extends BaseChain<ChainValues, AgentExecutorOutput> {
    static lc_name(): string;
    get lc_namespace(): string[];
    agent: BaseSingleActionAgent | BaseMultiActionAgent;
    tools: this['agent']['ToolType'][];
    returnIntermediateSteps: boolean;
    maxIterations?: number;
    earlyStoppingMethod: StoppingMethod;
    sessionId?: string;
    chatId?: string;
    input?: string;
    isXML?: boolean;
    /**
     * How to handle errors raised by the agent's output parser.
        Defaults to `False`, which raises the error.

        If `true`, the error will be sent back to the LLM as an observation.
        If a string, the string itself will be sent to the LLM as an observation.
        If a callable function, the function will be called with the exception
        as an argument, and the result of that function will be passed to the agent
        as an observation.
    */
    handleParsingErrors: boolean | string | ((e: OutputParserException | ToolInputParsingException) => string);
    get inputKeys(): string[];
    get outputKeys(): string[];
    constructor(input: AgentExecutorInput & {
        sessionId?: string;
        chatId?: string;
        input?: string;
        isXML?: boolean;
    });
    static fromAgentAndTools(fields: AgentExecutorInput & {
        sessionId?: string;
        chatId?: string;
        input?: string;
        isXML?: boolean;
    }): AgentExecutor;
    get shouldContinueGetter(): (iterations: number) => boolean;
    /**
     * Method that checks if the agent execution should continue based on the
     * number of iterations.
     * @param iterations The current number of iterations.
     * @returns A boolean indicating whether the agent execution should continue.
     */
    private shouldContinue;
    _call(inputs: ChainValues, runManager?: CallbackManagerForChainRun): Promise<AgentExecutorOutput>;
    _takeNextStep(nameToolMap: Record<string, Tool>, inputs: ChainValues, intermediateSteps: AgentStep[], runManager?: CallbackManagerForChainRun): Promise<AgentFinish | AgentStep[]>;
    _return(output: AgentFinish, intermediateSteps: AgentStep[], runManager?: CallbackManagerForChainRun): Promise<AgentExecutorOutput>;
    _getToolReturn(nextStepOutput: AgentStep): Promise<AgentFinish | null>;
    _returnStoppedResponse(earlyStoppingMethod: StoppingMethod): AgentFinish;
    _streamIterator(inputs: Record<string, any>): AsyncGenerator<ChainValues>;
    _chainType(): "agent_executor";
    serialize(): SerializedLLMChain;
}
export declare const formatAgentSteps: (steps: AgentStep[]) => BaseMessage[];
export declare const createReactAgent: ({ llm, tools, prompt }: CreateReactAgentParams) => Promise<RunnableSequence<Record<string, unknown>, import("langchain/agents").AgentFinish | AgentAction>>;
export declare class XMLAgentOutputParser extends AgentActionOutputParser {
    lc_namespace: string[];
    static lc_name(): string;
    /**
     * Parses the output text from the agent and returns an AgentAction or
     * AgentFinish object.
     * @param text The output text from the agent.
     * @returns An AgentAction or AgentFinish object.
     */
    parse(text: string): Promise<AgentAction | AgentFinish>;
    getFormatInstructions(): string;
}
declare abstract class AgentMultiActionOutputParser extends BaseOutputParser<AgentAction[] | AgentFinish> {
}
type ToolsAgentAction = AgentAction & {
    toolCallId: string;
    messageLog?: BaseMessage[];
};
export type ToolsAgentStep = AgentStep & {
    action: ToolsAgentAction;
};
export declare class ToolCallingAgentOutputParser extends AgentMultiActionOutputParser {
    lc_namespace: string[];
    static lc_name(): string;
    parse(text: string): Promise<AgentAction[] | AgentFinish>;
    parseResult(generations: ChatGeneration[]): Promise<AgentFinish | ToolsAgentAction[]>;
    getFormatInstructions(): string;
}
export {};
