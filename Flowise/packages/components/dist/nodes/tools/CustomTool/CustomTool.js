"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const core_1 = require("./core");
const zod_1 = require("zod");
class CustomTool_Tools {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listTools(_, options) {
                const returnData = [];
                const appDataSource = options.appDataSource;
                const databaseEntities = options.databaseEntities;
                if (appDataSource === undefined || !appDataSource) {
                    return returnData;
                }
                const tools = await appDataSource.getRepository(databaseEntities['Tool']).find();
                for (let i = 0; i < tools.length; i += 1) {
                    const data = {
                        label: tools[i].name,
                        name: tools[i].id,
                        description: tools[i].description
                    };
                    returnData.push(data);
                }
                return returnData;
            }
        };
        this.label = 'Custom Tool';
        this.name = 'customTool';
        this.version = 1.0;
        this.type = 'CustomTool';
        this.icon = 'customtool.svg';
        this.category = 'Tools';
        this.description = `Use custom tool you've created in Flowise within chatflow`;
        this.inputs = [
            {
                label: 'Select Tool',
                name: 'selectedTool',
                type: 'asyncOptions',
                loadMethod: 'listTools'
            }
        ];
        this.baseClasses = [this.type, 'Tool', ...(0, utils_1.getBaseClasses)(core_1.DynamicStructuredTool)];
    }
    async init(nodeData, _, options) {
        const selectedToolId = nodeData.inputs?.selectedTool;
        const customToolFunc = nodeData.inputs?.customToolFunc;
        const customToolName = nodeData.inputs?.customToolName;
        const customToolDesc = nodeData.inputs?.customToolDesc;
        const customToolSchema = nodeData.inputs?.customToolSchema;
        const appDataSource = options.appDataSource;
        const databaseEntities = options.databaseEntities;
        try {
            const tool = await appDataSource.getRepository(databaseEntities['Tool']).findOneBy({
                id: selectedToolId
            });
            if (!tool)
                throw new Error(`Tool ${selectedToolId} not found`);
            const obj = {
                name: tool.name,
                description: tool.description,
                schema: zod_1.z.object((0, utils_1.convertSchemaToZod)(tool.schema)),
                code: tool.func
            };
            if (customToolFunc)
                obj.code = customToolFunc;
            if (customToolName)
                obj.name = customToolName;
            if (customToolDesc)
                obj.description = customToolDesc;
            if (customToolSchema) {
                const zodSchemaFunction = new Function('z', `return ${customToolSchema}`);
                obj.schema = zodSchemaFunction(zod_1.z);
            }
            const variables = await (0, utils_1.getVars)(appDataSource, databaseEntities, nodeData);
            const flow = { chatflowId: options.chatflowid };
            let dynamicStructuredTool = new core_1.DynamicStructuredTool(obj);
            dynamicStructuredTool.setVariables(variables);
            dynamicStructuredTool.setFlowObject(flow);
            return dynamicStructuredTool;
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = { nodeClass: CustomTool_Tools };
//# sourceMappingURL=CustomTool.js.map