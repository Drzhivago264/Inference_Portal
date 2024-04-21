"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const core_1 = require("./core");
class ChainTool_Tools {
    constructor() {
        this.label = 'Chain Tool';
        this.name = 'chainTool';
        this.version = 1.0;
        this.type = 'ChainTool';
        this.icon = 'chaintool.svg';
        this.category = 'Tools';
        this.description = 'Use a chain as allowed tool for agent';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(core_1.ChainTool)];
        this.inputs = [
            {
                label: 'Chain Name',
                name: 'name',
                type: 'string',
                placeholder: 'state-of-union-qa'
            },
            {
                label: 'Chain Description',
                name: 'description',
                type: 'string',
                rows: 3,
                placeholder: 'State of the Union QA - useful for when you need to ask questions about the most recent state of the union address.'
            },
            {
                label: 'Return Direct',
                name: 'returnDirect',
                type: 'boolean',
                optional: true
            },
            {
                label: 'Base Chain',
                name: 'baseChain',
                type: 'BaseChain'
            }
        ];
    }
    async init(nodeData) {
        const name = nodeData.inputs?.name;
        const description = nodeData.inputs?.description;
        const baseChain = nodeData.inputs?.baseChain;
        const returnDirect = nodeData.inputs?.returnDirect;
        const obj = {
            name,
            description,
            chain: baseChain
        };
        if (returnDirect)
            obj.returnDirect = returnDirect;
        const tool = new core_1.ChainTool(obj);
        return tool;
    }
}
module.exports = { nodeClass: ChainTool_Tools };
//# sourceMappingURL=ChainTool.js.map