"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyCredential1693999261583 = void 0;
class ModifyCredential1693999261583 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`credential\` MODIFY \`encryptedData\` TEXT NOT NULL;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`credential\` MODIFY \`encryptedData\` VARCHAR NOT NULL;`);
    }
}
exports.ModifyCredential1693999261583 = ModifyCredential1693999261583;
//# sourceMappingURL=1693999261583-ModifyCredential.js.map