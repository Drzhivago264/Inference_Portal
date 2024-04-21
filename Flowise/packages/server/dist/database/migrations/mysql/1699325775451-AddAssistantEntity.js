"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAssistantEntity1699325775451 = void 0;
class AddAssistantEntity1699325775451 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`assistant\` (
                \`id\` varchar(36) NOT NULL,
                \`credential\` varchar(255) NOT NULL,
                \`details\` text NOT NULL,
                \`iconSrc\` varchar(255) DEFAULT NULL,
                \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE assistant`);
    }
}
exports.AddAssistantEntity1699325775451 = AddAssistantEntity1699325775451;
//# sourceMappingURL=1699325775451-AddAssistantEntity.js.map