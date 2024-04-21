"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqliteMigrations = void 0;
const _1693835579790_Init_1 = require("./1693835579790-Init");
const _1693920824108_ModifyChatFlow_1 = require("./1693920824108-ModifyChatFlow");
const _1693921865247_ModifyChatMessage_1 = require("./1693921865247-ModifyChatMessage");
const _1693923551694_ModifyCredential_1 = require("./1693923551694-ModifyCredential");
const _1693924207475_ModifyTool_1 = require("./1693924207475-ModifyTool");
const _1694090982460_AddApiConfig_1 = require("./1694090982460-AddApiConfig");
const _1694432361423_AddAnalytic_1 = require("./1694432361423-AddAnalytic");
const _1694657778173_AddChatHistory_1 = require("./1694657778173-AddChatHistory");
const _1699325775451_AddAssistantEntity_1 = require("./1699325775451-AddAssistantEntity");
const _1699481607341_AddUsedToolsToChatMessage_1 = require("./1699481607341-AddUsedToolsToChatMessage");
const _1699900910291_AddCategoryToChatFlow_1 = require("./1699900910291-AddCategoryToChatFlow");
const _1700271021237_AddFileAnnotationsToChatMessage_1 = require("./1700271021237-AddFileAnnotationsToChatMessage");
const _1701788586491_AddFileUploadsToChatMessage_1 = require("./1701788586491-AddFileUploadsToChatMessage");
const _1702200925471_AddVariableEntity_1 = require("./1702200925471-AddVariableEntity");
const _1706364937060_AddSpeechToText_1 = require("./1706364937060-AddSpeechToText");
const _1709814301358_AddUpsertHistoryEntity_1 = require("./1709814301358-AddUpsertHistoryEntity");
const _1707213619308_AddFeedback_1 = require("./1707213619308-AddFeedback");
exports.sqliteMigrations = [
    _1693835579790_Init_1.Init1693835579790,
    _1693920824108_ModifyChatFlow_1.ModifyChatFlow1693920824108,
    _1693921865247_ModifyChatMessage_1.ModifyChatMessage1693921865247,
    _1693923551694_ModifyCredential_1.ModifyCredential1693923551694,
    _1693924207475_ModifyTool_1.ModifyTool1693924207475,
    _1694090982460_AddApiConfig_1.AddApiConfig1694090982460,
    _1694432361423_AddAnalytic_1.AddAnalytic1694432361423,
    _1694657778173_AddChatHistory_1.AddChatHistory1694657778173,
    _1699325775451_AddAssistantEntity_1.AddAssistantEntity1699325775451,
    _1699481607341_AddUsedToolsToChatMessage_1.AddUsedToolsToChatMessage1699481607341,
    _1699900910291_AddCategoryToChatFlow_1.AddCategoryToChatFlow1699900910291,
    _1700271021237_AddFileAnnotationsToChatMessage_1.AddFileAnnotationsToChatMessage1700271021237,
    _1701788586491_AddFileUploadsToChatMessage_1.AddFileUploadsToChatMessage1701788586491,
    _1702200925471_AddVariableEntity_1.AddVariableEntity1699325775451,
    _1706364937060_AddSpeechToText_1.AddSpeechToText1706364937060,
    _1709814301358_AddUpsertHistoryEntity_1.AddUpsertHistoryEntity1709814301358,
    _1707213619308_AddFeedback_1.AddFeedback1707213619308
];
//# sourceMappingURL=index.js.map