"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFeedback1707213601923 = void 0;
class AddFeedback1707213601923 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS chat_message_feedback (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                "chatflowid" varchar NOT NULL,
                "content" text,
                "chatId" varchar NOT NULL,
                "messageId" varchar NOT NULL,
                "rating" varchar NOT NULL,
                "createdDate" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_98419043dd704f54-9830ab78f9" PRIMARY KEY (id)
            );`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE chat_message_feedback`);
    }
}
exports.AddFeedback1707213601923 = AddFeedback1707213601923;
//# sourceMappingURL=1707213601923-AddFeedback.js.map