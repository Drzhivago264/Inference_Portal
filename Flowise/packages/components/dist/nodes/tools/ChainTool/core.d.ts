import { DynamicTool, DynamicToolInput } from '@langchain/core/tools';
import { BaseChain } from 'langchain/chains';
export interface ChainToolInput extends Omit<DynamicToolInput, 'func'> {
    chain: BaseChain;
}
export declare class ChainTool extends DynamicTool {
    chain: BaseChain;
    constructor({ chain, ...rest }: ChainToolInput);
}
