import { createClient } from 'redis';
import { Embeddings } from '@langchain/core/embeddings';
import { VectorStore } from '@langchain/core/vectorstores';
import { Document } from '@langchain/core/documents';
import { ICommonObject, INodeData, INodeOutputsValue, INodeParams } from '../../../src';
export declare abstract class RedisSearchBase {
    label: string;
    name: string;
    version: number;
    description: string;
    type: string;
    icon: string;
    category: string;
    badge: string;
    baseClasses: string[];
    inputs: INodeParams[];
    credential: INodeParams;
    outputs: INodeOutputsValue[];
    redisClient: ReturnType<typeof createClient>;
    protected constructor();
    abstract constructVectorStore(embeddings: Embeddings, indexName: string, replaceIndex: boolean, docs: Document<Record<string, any>>[] | undefined): Promise<VectorStore>;
    init(nodeData: INodeData, _: string, options: ICommonObject, docs: Document<Record<string, any>>[] | undefined): Promise<any>;
}
