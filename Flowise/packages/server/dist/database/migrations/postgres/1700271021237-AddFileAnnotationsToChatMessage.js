"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFileAnnotationsToChatMessage1700271021237 = void 0;
class AddFileAnnotationsToChatMessage1700271021237 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" ADD COLUMN IF NOT EXISTS "fileAnnotations" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "fileAnnotations";`);
    }
}
exports.AddFileAnnotationsToChatMessage1700271021237 = AddFileAnnotationsToChatMessage1700271021237;
//# sourceMappingURL=1700271021237-AddFileAnnotationsToChatMessage.js.map