"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyChatFlow1693997791471 = void 0;
class ModifyChatFlow1693997791471 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`chat_flow\` MODIFY \`chatbotConfig\` TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`chat_flow\` MODIFY \`chatbotConfig\` VARCHAR;`);
    }
}
exports.ModifyChatFlow1693997791471 = ModifyChatFlow1693997791471;
//# sourceMappingURL=1693997791471-ModifyChatFlow.js.map