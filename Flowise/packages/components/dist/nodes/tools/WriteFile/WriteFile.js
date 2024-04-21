"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteFileTool = void 0;
const zod_1 = require("zod");
const tools_1 = require("@langchain/core/tools");
const serializable_1 = require("@langchain/core/load/serializable");
const node_1 = require("langchain/stores/file/node");
const utils_1 = require("../../../src/utils");
class BaseFileStore extends serializable_1.Serializable {
}
class WriteFile_Tools {
    constructor() {
        this.label = 'Write File';
        this.name = 'writeFile';
        this.version = 1.0;
        this.type = 'WriteFile';
        this.icon = 'writefile.svg';
        this.category = 'Tools';
        this.description = 'Write file to disk';
        this.baseClasses = [this.type, 'Tool', ...(0, utils_1.getBaseClasses)(WriteFileTool)];
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
        return new WriteFileTool({ store });
    }
}
/**
 * Class for writing data to files on the disk. Extends the StructuredTool
 * class.
 */
class WriteFileTool extends tools_1.StructuredTool {
    static lc_name() {
        return 'WriteFileTool';
    }
    constructor({ store, ...rest }) {
        super(rest);
        this.schema = zod_1.z.object({
            file_path: zod_1.z.string().describe('name of file'),
            text: zod_1.z.string().describe('text to write to file')
        });
        this.name = 'write_file';
        this.description = 'Write file from disk';
        this.store = store;
    }
    async _call({ file_path, text }) {
        await this.store.writeFile(file_path, text);
        return 'File written to successfully.';
    }
}
exports.WriteFileTool = WriteFileTool;
module.exports = { nodeClass: WriteFile_Tools };
//# sourceMappingURL=WriteFile.js.map