"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUsedToolsToChatMessage1699481607341 = void 0;
class AddUsedToolsToChatMessage1699481607341 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temp_chat_message" ("id" varchar PRIMARY KEY NOT NULL, "role" varchar NOT NULL, "chatflowid" varchar NOT NULL, "content" text NOT NULL, "sourceDocuments" text, "usedTools" text, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "chatType" VARCHAR NOT NULL DEFAULT 'INTERNAL', "chatId" VARCHAR NOT NULL, "memoryType" VARCHAR, "sessionId" VARCHAR);`);
        await queryRunner.query(`INSERT INTO "temp_chat_message" ("id", "role", "chatflowid", "content", "sourceDocuments", "createdDate", "chatType", "chatId", "memoryType", "sessionId") SELECT "id", "role", "chatflowid", "content", "sourceDocuments", "createdDate", "chatType", "chatId", "memoryType", "sessionId" FROM "chat_message";`);
        await queryRunner.query(`DROP TABLE "chat_message";`);
        await queryRunner.query(`ALTER TABLE "temp_chat_message" RENAME TO "chat_message";`);
        await queryRunner.query(`CREATE INDEX "IDX_e574527322272fd838f4f0f3d3" ON "chat_message" ("chatflowid") ;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "temp_chat_message";`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "usedTools";`);
    }
}
exports.AddUsedToolsToChatMessage1699481607341 = AddUsedToolsToChatMessage1699481607341;
//# sourceMappingURL=1699481607341-AddUsedToolsToChatMessage.js.map