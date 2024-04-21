"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAssistantEntity1699325775451 = void 0;
class AddAssistantEntity1699325775451 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "assistant" ("id" varchar PRIMARY KEY NOT NULL, "details" text NOT NULL, "credential" varchar NOT NULL, "iconSrc" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')));`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE assistant`);
    }
}
exports.AddAssistantEntity1699325775451 = AddAssistantEntity1699325775451;
//# sourceMappingURL=1699325775451-AddAssistantEntity.js.map