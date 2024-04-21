"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUsedToolsToChatMessage1699481607341 = void 0;
class AddUsedToolsToChatMessage1699481607341 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" ADD COLUMN IF NOT EXISTS "usedTools" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "usedTools";`);
    }
}
exports.AddUsedToolsToChatMessage1699481607341 = AddUsedToolsToChatMessage1699481607341;
//# sourceMappingURL=1699481607341-AddUsedToolsToChatMessage.js.map