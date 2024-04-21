"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyTool1693924207475 = void 0;
class ModifyTool1693924207475 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temp_tool" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "color" varchar NOT NULL, "iconSrc" varchar, "schema" text, "func" text, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')));`);
        await queryRunner.query(`INSERT INTO "temp_tool" ("id", "name", "description", "color", "iconSrc", "schema", "func", "createdDate", "updatedDate") SELECT "id", "name", "description", "color", "iconSrc", "schema", "func", "createdDate", "updatedDate" FROM "tool";`);
        await queryRunner.query(`DROP TABLE tool;`);
        await queryRunner.query(`ALTER TABLE temp_tool RENAME TO tool;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE temp_tool`);
    }
}
exports.ModifyTool1693924207475 = ModifyTool1693924207475;
//# sourceMappingURL=1693924207475-ModifyTool.js.map