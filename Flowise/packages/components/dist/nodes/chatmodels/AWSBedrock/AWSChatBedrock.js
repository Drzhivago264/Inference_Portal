"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const FlowiseAWSChatBedrock_1 = require("./FlowiseAWSChatBedrock");
const modelLoader_1 = require("../../../src/modelLoader");
/**
 * @author Michael Connor <mlconnor@yahoo.com>
 */
class AWSChatBedrock_ChatModels {
    constructor() {
        //@ts-ignore
        this.loadMethods = {
            async listModels() {
                return await (0, modelLoader_1.getModels)(modelLoader_1.MODEL_TYPE.CHAT, 'awsChatBedrock');
            },
            async listRegions() {
                return await (0, modelLoader_1.getRegions)(modelLoader_1.MODEL_TYPE.CHAT, 'awsChatBedrock');
            }
        };
        this.label = 'AWS ChatBedrock';
        this.name = 'awsChatBedrock';
        this.version = 5.0;
        this.type = 'AWSChatBedrock';
        this.icon = 'aws.svg';
        this.category = 'Chat Models';
        this.description = 'Wrapper around AWS Bedrock large language models that use the Chat endpoint';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(FlowiseAWSChatBedrock_1.BedrockChat)];
        this.credential = {
            label: 'AWS Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['awsApi'],
            optional: true
        };
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Region',
                name: 'region',
                type: 'asyncOptions',
                loadMethod: 'listRegions',
                default: 'us-east-1'
            },
            {
                label: 'Model Name',
                name: 'model',
                type: 'asyncOptions',
                loadMethod: 'listModels',
                default: 'anthropic.claude-3-haiku'
            },
            {
                label: 'Custom Model Name',
                name: 'customModel',
                description: 'If provided, will override model selected from Model Name option',
                type: 'string',
                optional: true
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                description: 'Temperature parameter may not apply to certain model. Please check available model parameters',
                optional: true,
                additionalParams: true,
                default: 0.7
            },
            {
                label: 'Max Tokens to Sample',
                name: 'max_tokens_to_sample',
                type: 'number',
                step: 10,
                description: 'Max Tokens parameter may not apply to certain model. Please check available model parameters',
                optional: true,
                additionalParams: true,
                default: 200
            },
            {
                label: 'Allow Image Uploads',
                name: 'allowImageUploads',
                type: 'boolean',
                description: 'Only works with claude-3-* models when image is being uploaded from chat. Compatible with LLMChain, Conversation Chain, ReAct Agent, and Conversational Agent',
                default: false,
                optional: true
            }
        ];
    }
    async init(nodeData, _, options) {
        const iRegion = nodeData.inputs?.region;
        const iModel = nodeData.inputs?.model;
        const customModel = nodeData.inputs?.customModel;
        const iTemperature = nodeData.inputs?.temperature;
        const iMax_tokens_to_sample = nodeData.inputs?.max_tokens_to_sample;
        const cache = nodeData.inputs?.cache;
        const streaming = nodeData.inputs?.streaming;
        const obj = {
            region: iRegion,
            model: customModel ? customModel : iModel,
            maxTokens: parseInt(iMax_tokens_to_sample, 10),
            temperature: parseFloat(iTemperature),
            streaming: streaming ?? true
        };
        /**
         * Long-term credentials specified in LLM configuration are optional.
         * Bedrock's credential provider falls back to the AWS SDK to fetch
         * credentials from the running environment.
         * When specified, we override the default provider with configured values.
         * @see https://github.com/aws/aws-sdk-js-v3/blob/main/packages/credential-provider-node/README.md
         */
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        if (credentialData && Object.keys(credentialData).length !== 0) {
            const credentialApiKey = (0, utils_1.getCredentialParam)('awsKey', credentialData, nodeData);
            const credentialApiSecret = (0, utils_1.getCredentialParam)('awsSecret', credentialData, nodeData);
            const credentialApiSession = (0, utils_1.getCredentialParam)('awsSession', credentialData, nodeData);
            obj.credentials = {
                accessKeyId: credentialApiKey,
                secretAccessKey: credentialApiSecret,
                sessionToken: credentialApiSession
            };
        }
        if (cache)
            obj.cache = cache;
        const allowImageUploads = nodeData.inputs?.allowImageUploads;
        const multiModalOption = {
            image: {
                allowImageUploads: allowImageUploads ?? false
            }
        };
        const amazonBedrock = new FlowiseAWSChatBedrock_1.BedrockChat(nodeData.id, obj);
        if (obj.model.includes('anthropic.claude-3'))
            amazonBedrock.setMultiModalOption(multiModalOption);
        return amazonBedrock;
    }
}
module.exports = { nodeClass: AWSChatBedrock_ChatModels };
//# sourceMappingURL=AWSChatBedrock.js.map