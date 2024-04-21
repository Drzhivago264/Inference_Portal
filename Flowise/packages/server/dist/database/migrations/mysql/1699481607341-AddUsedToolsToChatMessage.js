"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUsedToolsToChatMessage1699481607341 = void 0;
class AddUsedToolsToChatMessage1699481607341 {
    async up(queryRunner) {
        const columnExists = await queryRunner.hasColumn('chat_message', 'usedTools');
        if (!columnExists)
            queryRunner.query(`ALTER TABLE \`chat_message\` ADD COLUMN \`usedTools\` TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`chat_message\` DROP COLUMN \`usedTools\`;`);
    }
}
exports.AddUsedToolsToChatMessage1699481607341 = AddUsedToolsToChatMessage1699481607341;
//# sourceMappingURL=1699481607341-AddUsedToolsToChatMessage.js.map