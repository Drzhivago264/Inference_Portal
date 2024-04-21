"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVariableEntity1699325775451 = void 0;
class AddVariableEntity1699325775451 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "variable" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "value" text NOT NULL, "type" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')));`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE variable`);
    }
}
exports.AddVariableEntity1699325775451 = AddVariableEntity1699325775451;
//# sourceMappingURL=1702200925471-AddVariableEntity.js.map