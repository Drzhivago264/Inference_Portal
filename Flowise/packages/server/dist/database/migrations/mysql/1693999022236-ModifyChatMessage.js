"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyChatMessage1693999022236 = void 0;
class ModifyChatMessage1693999022236 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`chat_message\` MODIFY \`sourceDocuments\` TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`chat_message\` MODIFY \`sourceDocuments\` VARCHAR;`);
    }
}
exports.ModifyChatMessage1693999022236 = ModifyChatMessage1693999022236;
//# sourceMappingURL=1693999022236-ModifyChatMessage.js.map