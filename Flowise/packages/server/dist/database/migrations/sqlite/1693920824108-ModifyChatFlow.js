"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyChatFlow1693920824108 = void 0;
class ModifyChatFlow1693920824108 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temp_chat_flow" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "flowData" text NOT NULL, "deployed" boolean, "isPublic" boolean, "apikeyid" varchar, "chatbotConfig" text, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')));`);
        await queryRunner.query(`INSERT INTO "temp_chat_flow" ("id", "name", "flowData", "deployed", "isPublic", "apikeyid", "chatbotConfig", "createdDate", "updatedDate") SELECT "id", "name", "flowData", "deployed", "isPublic", "apikeyid", "chatbotConfig", "createdDate", "updatedDate" FROM "chat_flow";`);
        await queryRunner.query(`DROP TABLE chat_flow;`);
        await queryRunner.query(`ALTER TABLE temp_chat_flow RENAME TO chat_flow;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE temp_chat_flow`);
    }
}
exports.ModifyChatFlow1693920824108 = ModifyChatFlow1693920824108;
//# sourceMappingURL=1693920824108-ModifyChatFlow.js.map