"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFeedback1707213619308 = void 0;
class AddFeedback1707213619308 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "chat_message_feedback" ("id" varchar PRIMARY KEY NOT NULL, "chatflowid" varchar NOT NULL, "chatId" varchar NOT NULL, "messageId" varchar NOT NULL, "rating" varchar NOT NULL, "content" text, "createdDate" datetime NOT NULL DEFAULT (datetime('now')));`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_e574527322272fd838f4f0f3d3" ON "chat_message_feedback" ("chatflowid") ;`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_e574527322272fd838f4f0f3d3" ON "chat_message_feedback" ("chatId") ;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "chat_message_feedback";`);
    }
}
exports.AddFeedback1707213619308 = AddFeedback1707213619308;
//# sourceMappingURL=1707213619308-AddFeedback.js.map