"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFeedback1707213626553 = void 0;
class AddFeedback1707213626553 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`chat_message_feedback\` (
                \`id\` varchar(36) NOT NULL,
                \`chatflowid\` varchar(255) NOT NULL,
                \`content\` text,
                \`chatId\` varchar(255) NOT NULL,
                \`messageId\` varchar(255) NOT NULL,
                \`rating\` varchar(255) NOT NULL,
                \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE chat_message_feedback`);
    }
}
exports.AddFeedback1707213626553 = AddFeedback1707213626553;
//# sourceMappingURL=1707213626553-AddFeedback.js.map