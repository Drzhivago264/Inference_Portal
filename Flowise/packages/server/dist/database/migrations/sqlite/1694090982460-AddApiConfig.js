"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddApiConfig1694090982460 = void 0;
class AddApiConfig1694090982460 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" ADD COLUMN "apiConfig" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" DROP COLUMN "apiConfig";`);
    }
}
exports.AddApiConfig1694090982460 = AddApiConfig1694090982460;
//# sourceMappingURL=1694090982460-AddApiConfig.js.map