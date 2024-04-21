"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUpsertHistoryEntity1709814301358 = void 0;
class AddUpsertHistoryEntity1709814301358 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS upsert_history (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                "chatflowid" varchar NOT NULL,
                "result" text NOT NULL,
                "flowData" text NOT NULL,
                "date" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_37327b22b6e246319bd5eeb0e88" PRIMARY KEY (id)
            );`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE upsert_history`);
    }
}
exports.AddUpsertHistoryEntity1709814301358 = AddUpsertHistoryEntity1709814301358;
//# sourceMappingURL=1709814301358-AddUpsertHistoryEntity.js.map