"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadFileTool = void 0;
const zod_1 = require("zod");
const tools_1 = require("@langchain/core/tools");
const serializable_1 = require("@langchain/core/load/serializable");
const node_1 = require("langchain/stores/file/node");
const utils_1 = require("../../../src/utils");
class BaseFileStore extends serializable_1.Serializable {
}
class ReadFile_Tools {
    constructor() {
        this.label = 'Read File';
        this.name = 'readFile';
        this.version = 1.0;
        this.type = 'ReadFile';
        this.icon = 'readfile.svg';
        this.category = 'Tools';
        this.description = 'Read file from disk';
        this.baseClasses = [this.type, 'Tool', ...(0, utils_1.getBaseClasses)(ReadFileTool)];
        this.inputs = [
            {
                label: 'Base Path',
                name: 'basePath',
                placeholder: `C:\\Users\\User\\Desktop`,
                type: 'string',
                optional: true
            }
        ];
    }
    async init(nodeData) {
        const basePath = nodeData.inputs?.basePath;
        const store = basePath ? new node_1.NodeFileStore(basePath) : new node_1.NodeFileStore();
        return new ReadFileTool({ store });
    }
}
/**
 * Class for reading files from the disk. Extends the StructuredTool
 * class.
 */
class ReadFileTool extends tools_1.StructuredTool {
    static lc_name() {
        return 'ReadFileTool';
    }
    constructor({ store }) {
        super(...arguments);
        this.schema = zod_1.z.object({
            file_path: zod_1.z.string().describe('name of file')
        });
        this.name = 'read_file';
        this.description = 'Read file from disk';
        this.store = store;
    }
    async _call({ file_path }) {
        return await this.store.readFile(file_path);
    }
}
exports.ReadFileTool = ReadFileTool;
module.exports = { nodeClass: ReadFile_Tools };
//# sourceMappingURL=ReadFile.js.map