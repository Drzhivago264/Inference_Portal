"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyCredential1693923551694 = void 0;
class ModifyCredential1693923551694 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temp_credential" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "credentialName" varchar NOT NULL, "encryptedData" text NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')));`);
        await queryRunner.query(`INSERT INTO "temp_credential" ("id", "name", "credentialName", "encryptedData", "createdDate", "updatedDate") SELECT "id", "name", "credentialName", "encryptedData", "createdDate", "updatedDate" FROM "credential";`);
        await queryRunner.query(`DROP TABLE credential;`);
        await queryRunner.query(`ALTER TABLE temp_credential RENAME TO credential;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE temp_credential`);
    }
}
exports.ModifyCredential1693923551694 = ModifyCredential1693923551694;
//# sourceMappingURL=1693923551694-ModifyCredential.js.map