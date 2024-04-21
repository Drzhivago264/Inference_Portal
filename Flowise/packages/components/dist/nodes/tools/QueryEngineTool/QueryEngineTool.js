"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llamaindex_1 = require("llamaindex");
class QueryEngine_Tools {
    constructor() {
        this.label = 'QueryEngine Tool';
        this.name = 'queryEngineToolLlamaIndex';
        this.version = 2.0;
        this.type = 'QueryEngineTool';
        this.icon = 'queryEngineTool.svg';
        this.category = 'Tools';
        this.tags = ['LlamaIndex'];
        this.description = 'Tool used to invoke query engine';
        this.baseClasses = [this.type, 'Tool_LlamaIndex'];
        this.inputs = [
            {
                label: 'Base QueryEngine',
                name: 'baseQueryEngine',
                type: 'BaseQueryEngine'
            },
            {
                label: 'Tool Name',
                name: 'toolName',
                type: 'string',
                description: 'Tool name must be small capital letter with underscore. Ex: my_tool'
            },
            {
                label: 'Tool Description',
                name: 'toolDesc',
                type: 'string',
                rows: 4
            }
        ];
    }
    async init(nodeData) {
        const baseQueryEngine = nodeData.inputs?.baseQueryEngine;
        const toolName = nodeData.inputs?.toolName;
        const toolDesc = nodeData.inputs?.toolDesc;
        const queryEngineTool = new llamaindex_1.QueryEngineTool({
            queryEngine: baseQueryEngine,
            metadata: {
                name: toolName,
                description: toolDesc
            }
        });
        return queryEngineTool;
    }
}
module.exports = { nodeClass: QueryEngine_Tools };
//# sourceMappingURL=QueryEngineTool.js.map