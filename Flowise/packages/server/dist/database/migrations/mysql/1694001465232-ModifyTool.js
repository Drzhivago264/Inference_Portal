"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyTool1694001465232 = void 0;
class ModifyTool1694001465232 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tool\` MODIFY \`schema\` TEXT, MODIFY \`func\` TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tool\` MODIFY \`schema\` VARCHAR, MODIFY \`func\` VARCHAR;`);
    }
}
exports.ModifyTool1694001465232 = ModifyTool1694001465232;
//# sourceMappingURL=1694001465232-ModifyTool.js.map