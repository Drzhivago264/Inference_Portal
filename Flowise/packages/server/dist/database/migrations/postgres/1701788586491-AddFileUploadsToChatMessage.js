"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFileUploadsToChatMessage1701788586491 = void 0;
class AddFileUploadsToChatMessage1701788586491 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" ADD COLUMN IF NOT EXISTS "fileUploads" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "fileUploads";`);
    }
}
exports.AddFileUploadsToChatMessage1701788586491 = AddFileUploadsToChatMessage1701788586491;
//# sourceMappingURL=1701788586491-AddFileUploadsToChatMessage.js.map