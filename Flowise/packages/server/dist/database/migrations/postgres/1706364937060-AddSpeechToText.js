"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSpeechToText1706364937060 = void 0;
class AddSpeechToText1706364937060 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" ADD COLUMN IF NOT EXISTS "speechToText" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" DROP COLUMN "speechToText";`);
    }
}
exports.AddSpeechToText1706364937060 = AddSpeechToText1706364937060;
//# sourceMappingURL=1706364937060-AddSpeechToText.js.map