"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddChatHistory1694658756136 = void 0;
class AddChatHistory1694658756136 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" ADD COLUMN IF NOT EXISTS "chatType" VARCHAR NOT NULL DEFAULT 'INTERNAL', ADD COLUMN IF NOT EXISTS "chatId" VARCHAR, ADD COLUMN IF NOT EXISTS "memoryType" VARCHAR, ADD COLUMN IF NOT EXISTS "sessionId" VARCHAR;`);
        const results = await queryRunner.query(`WITH RankedMessages AS (
                SELECT
                    "chatflowid",
                    "id",
                    "createdDate",
                    ROW_NUMBER() OVER (PARTITION BY "chatflowid" ORDER BY "createdDate") AS row_num
                FROM "chat_message"
            )
            SELECT "chatflowid", "id"
            FROM RankedMessages
            WHERE row_num = 1;`);
        for (const chatMessage of results) {
            await queryRunner.query(`UPDATE "chat_message" SET "chatId" = '${chatMessage.id}' WHERE "chatflowid" = '${chatMessage.chatflowid}'`);
        }
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "chatId" SET NOT NULL;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "chatType", DROP COLUMN "chatId", DROP COLUMN "memoryType", DROP COLUMN "sessionId";`);
    }
}
exports.AddChatHistory1694658756136 = AddChatHistory1694658756136;
//# sourceMappingURL=1694658756136-AddChatHistory.js.map