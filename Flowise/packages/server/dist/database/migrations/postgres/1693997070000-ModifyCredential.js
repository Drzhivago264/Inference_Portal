"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyCredential1693997070000 = void 0;
class ModifyCredential1693997070000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "encryptedData" TYPE TEXT;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "credential" ALTER COLUMN "encryptedData" TYPE VARCHAR;`);
    }
}
exports.ModifyCredential1693997070000 = ModifyCredential1693997070000;
//# sourceMappingURL=1693997070000-ModifyCredential.js.map