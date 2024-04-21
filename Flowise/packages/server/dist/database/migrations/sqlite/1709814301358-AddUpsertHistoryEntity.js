"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUpsertHistoryEntity1709814301358 = void 0;
class AddUpsertHistoryEntity1709814301358 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "upsert_history" ("id" varchar PRIMARY KEY NOT NULL, "chatflowid" varchar NOT NULL, "result" text NOT NULL, "flowData" text NOT NULL, "date" datetime NOT NULL DEFAULT (datetime('now')));`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE upsert_history`);
    }
}
exports.AddUpsertHistoryEntity1709814301358 = AddUpsertHistoryEntity1709814301358;
//# sourceMappingURL=1709814301358-AddUpsertHistoryEntity.js.map