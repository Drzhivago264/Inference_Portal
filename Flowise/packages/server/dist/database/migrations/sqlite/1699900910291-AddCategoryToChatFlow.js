"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCategoryToChatFlow1699900910291 = void 0;
class AddCategoryToChatFlow1699900910291 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" ADD COLUMN "category" TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "chat_flow" DROP COLUMN "category";`);
    }
}
exports.AddCategoryToChatFlow1699900910291 = AddCategoryToChatFlow1699900910291;
//# sourceMappingURL=1699900910291-AddCategoryToChatFlow.js.map