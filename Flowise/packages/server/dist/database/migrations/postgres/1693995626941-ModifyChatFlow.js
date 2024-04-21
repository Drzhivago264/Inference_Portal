"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyChatFlow1693995626941 = void 0;
class ModifyChatFlow1693995626941 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" ALTER COLUMN "chatbotConfig" TYPE TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" ALTER COLUMN "chatbotConfig" TYPE VARCHAR;`);
    }
}
exports.ModifyChatFlow1693995626941 = ModifyChatFlow1693995626941;
//# sourceMappingURL=1693995626941-ModifyChatFlow.js.map