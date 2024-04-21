import { z } from 'zod';
import { StructuredTool, ToolParams } from '@langchain/core/tools';
import { Serializable } from '@langchain/core/load/serializable';
declare abstract class BaseFileStore extends Serializable {
    abstract readFile(path: string): Promise<string>;
    abstract writeFile(path: string, contents: string): Promise<void>;
}
interface ReadFileParams extends ToolParams {
    store: BaseFileStore;
}
/**
 * Class for reading files from the disk. Extends the StructuredTool
 * class.
 */
export declare class ReadFileTool extends StructuredTool {
    static lc_name(): string;
    schema: z.ZodObject<{
        file_path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        file_path: string;
    }, {
        file_path: string;
    }>;
    name: string;
    description: string;
    store: BaseFileStore;
    constructor({ store }: ReadFileParams);
    _call({ file_path }: z.infer<typeof this.schema>): Promise<string>;
}
export {};
