"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddApiConfig1694099183389 = void 0;
class AddApiConfig1694099183389 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" ADD COLUMN IF NOT EXISTS "apiConfig" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" DROP COLUMN "apiConfig";`);
    }
}
exports.AddApiConfig1694099183389 = AddApiConfig1694099183389;
//# sourceMappingURL=1694099183389-AddApiConfig.js.map