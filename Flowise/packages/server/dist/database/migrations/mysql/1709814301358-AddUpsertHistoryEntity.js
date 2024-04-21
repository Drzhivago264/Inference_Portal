"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUpsertHistoryEntity1709814301358 = void 0;
class AddUpsertHistoryEntity1709814301358 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`upsert_history\` (
                \`id\` varchar(36) NOT NULL,
                \`chatflowid\` varchar(255) NOT NULL,
                \`result\` text NOT NULL,
                \`flowData\` text NOT NULL,
                \`date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`),
                KEY \`IDX_a0b59fd66f6e48d2b198123cb6\` (\`chatflowid\`)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE upsert_history`);
    }
}
exports.AddUpsertHistoryEntity1709814301358 = AddUpsertHistoryEntity1709814301358;
//# sourceMappingURL=1709814301358-AddUpsertHistoryEntity.js.map