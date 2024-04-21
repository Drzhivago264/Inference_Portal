"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyTool1693997339912 = void 0;
class ModifyTool1693997339912 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tool" ALTER COLUMN "schema" TYPE TEXT, ALTER COLUMN "func" TYPE TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tool" ALTER COLUMN "schema" TYPE VARCHAR, ALTER COLUMN "func" TYPE VARCHAR;`);
    }
}
exports.ModifyTool1693997339912 = ModifyTool1693997339912;
//# sourceMappingURL=1693997339912-ModifyTool.js.map