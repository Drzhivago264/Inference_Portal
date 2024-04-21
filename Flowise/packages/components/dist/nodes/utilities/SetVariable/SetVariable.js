"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SetVariable_Utilities {
    constructor() {
        this.label = 'Set Variable';
        this.name = 'setVariable';
        this.version = 1.0;
        this.type = 'SetVariable';
        this.icon = 'setvar.svg';
        this.category = 'Utilities';
        this.description = `Set variable which can be retrieved at a later stage. Variable is only available during runtime.`;
        this.baseClasses = [this.type, 'Utilities'];
        this.inputs = [
            {
                label: 'Input',
                name: 'input',
                type: 'string | number | boolean | json | array',
                optional: true,
                list: true
            },
            {
                label: 'Variable Name',
                name: 'variableName',
                type: 'string',
                placeholder: 'var1'
            }
        ];
        this.outputs = [
            {
                label: 'Output',
                name: 'output',
                baseClasses: ['string', 'number', 'boolean', 'json', 'array']
            }
        ];
    }
    async init(nodeData) {
        let inputRaw = nodeData.inputs?.input;
        const variableName = nodeData.inputs?.variableName;
        if (Array.isArray(inputRaw) && inputRaw.length === 1) {
            inputRaw = inputRaw[0];
        }
        return { output: inputRaw, dynamicVariables: { [variableName]: inputRaw } };
    }
}
module.exports = { nodeClass: SetVariable_Utilities };
//# sourceMappingURL=SetVariable.js.map