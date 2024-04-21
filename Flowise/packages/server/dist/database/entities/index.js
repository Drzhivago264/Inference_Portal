"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const ChatFlow_1 = require("./ChatFlow");
const ChatMessage_1 = require("./ChatMessage");
const ChatMessageFeedback_1 = require("./ChatMessageFeedback");
const Credential_1 = require("./Credential");
const Tool_1 = require("./Tool");
const Assistant_1 = require("./Assistant");
const Variable_1 = require("./Variable");
const UpsertHistory_1 = require("./UpsertHistory");
exports.entities = {
    ChatFlow: ChatFlow_1.ChatFlow,
    ChatMessage: ChatMessage_1.ChatMessage,
    ChatMessageFeedback: ChatMessageFeedback_1.ChatMessageFeedback,
    Credential: Credential_1.Credential,
    Tool: Tool_1.Tool,
    Assistant: Assistant_1.Assistant,
    Variable: Variable_1.Variable,
    UpsertHistory: UpsertHistory_1.UpsertHistory
};
//# sourceMappingURL=index.js.map