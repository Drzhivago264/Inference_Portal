"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddApiConfig1694099200729 = void 0;
class AddApiConfig1694099200729 {
    async up(queryRunner) {
        const columnExists = await queryRunner.hasColumn('chat_flow', 'apiConfig');
        if (!columnExists)
            queryRunner.query(`ALTER TABLE \`chat_flow\` ADD COLUMN \`apiConfig\` TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`chat_flow\` DROP COLUMN \`apiConfig\`;`);
    }
}
exports.AddApiConfig1694099200729 = AddApiConfig1694099200729;
//# sourceMappingURL=1694099200729-AddApiConfig.js.map