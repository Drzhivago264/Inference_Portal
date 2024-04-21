import { INodeOptionsValue } from './Interface';
export declare enum MODEL_TYPE {
    CHAT = "chat",
    LLM = "llm",
    EMBEDDING = "embedding"
}
export declare const getModels: (category: MODEL_TYPE, name: string) => Promise<INodeOptionsValue[]>;
export declare const getRegions: (category: MODEL_TYPE, name: string) => Promise<INodeOptionsValue[]>;
