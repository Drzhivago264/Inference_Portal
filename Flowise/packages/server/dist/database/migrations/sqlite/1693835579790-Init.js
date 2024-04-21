"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1693835579790 = void 0;
class Init1693835579790 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "chat_flow" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "flowData" text NOT NULL, "deployed" boolean, "isPublic" boolean, "apikeyid" varchar, "chatbotConfig" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')));`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "chat_message" ("id" varchar PRIMARY KEY NOT NULL, "role" varchar NOT NULL, "chatflowid" varchar NOT NULL, "content" text NOT NULL, "sourceDocuments" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')));`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_e574527322272fd838f4f0f3d3" ON "chat_message" ("chatflowid") ;`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "credential" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "credentialName" varchar NOT NULL, "encryptedData" varchar NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')));`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "tool" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "color" varchar NOT NULL, "iconSrc" varchar, "schema" varchar, "func" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')));`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE chat_flow`);
        await queryRunner.query(`DROP TABLE chat_message`);
        await queryRunner.query(`DROP TABLE credential`);
        await queryRunner.query(`DROP TABLE tool`);
    }
}
exports.Init1693835579790 = Init1693835579790;
//# sourceMappingURL=1693835579790-Init.js.map