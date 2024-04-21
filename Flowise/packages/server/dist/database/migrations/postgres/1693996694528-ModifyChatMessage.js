"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyChatMessage1693996694528 = void 0;
class ModifyChatMessage1693996694528 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "sourceDocuments" TYPE TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "sourceDocuments" TYPE VARCHAR;`);
    }
}
exports.ModifyChatMessage1693996694528 = ModifyChatMessage1693996694528;
//# sourceMappingURL=1693996694528-ModifyChatMessage.js.map