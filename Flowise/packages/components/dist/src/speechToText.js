"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSpeechToText = void 0;
const utils_1 = require("./utils");
const openai_1 = require("@langchain/openai");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const assemblyai_1 = require("assemblyai");
const convertSpeechToText = async (upload, speechToTextConfig, options) => {
    if (speechToTextConfig) {
        const credentialId = speechToTextConfig.credentialId;
        const credentialData = await (0, utils_1.getCredentialData)(credentialId ?? '', options);
        const filePath = path_1.default.join((0, utils_1.getStoragePath)(), options.chatflowid, options.chatId, upload.name);
        const audio_file = fs_1.default.createReadStream(filePath);
        if (speechToTextConfig.name === 'openAIWhisper') {
            const openAIClientOptions = {
                apiKey: credentialData.openAIApiKey
            };
            const openAIClient = new openai_1.OpenAIClient(openAIClientOptions);
            const transcription = await openAIClient.audio.transcriptions.create({
                file: audio_file,
                model: 'whisper-1',
                language: speechToTextConfig?.language,
                temperature: speechToTextConfig?.temperature ? parseFloat(speechToTextConfig.temperature) : undefined,
                prompt: speechToTextConfig?.prompt
            });
            if (transcription?.text) {
                return transcription.text;
            }
        }
        else if (speechToTextConfig.name === 'assemblyAiTranscribe') {
            const client = new assemblyai_1.AssemblyAI({
                apiKey: credentialData.assemblyAIApiKey
            });
            const params = {
                audio: audio_file,
                speaker_labels: false
            };
            const transcription = await client.transcripts.transcribe(params);
            if (transcription?.text) {
                return transcription.text;
            }
        }
    }
    else {
        throw new Error('Speech to text is not selected, but found a recorded audio file. Please fix the chain.');
    }
    return undefined;
};
exports.convertSpeechToText = convertSpeechToText;
//# sourceMappingURL=speechToText.js.map