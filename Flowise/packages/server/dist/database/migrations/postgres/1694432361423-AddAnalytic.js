"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAnalytic1694432361423 = void 0;
class AddAnalytic1694432361423 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" ADD COLUMN IF NOT EXISTS "analytic" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" DROP COLUMN "analytic";`);
    }
}
exports.AddAnalytic1694432361423 = AddAnalytic1694432361423;
//# sourceMappingURL=1694432361423-AddAnalytic.js.map