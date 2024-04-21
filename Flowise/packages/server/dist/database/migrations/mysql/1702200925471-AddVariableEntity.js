"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVariableEntity1699325775451 = void 0;
class AddVariableEntity1699325775451 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`variable\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`value\` text NOT NULL,
                \`type\` varchar(255) DEFAULT NULL,
                \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE variable`);
    }
}
exports.AddVariableEntity1699325775451 = AddVariableEntity1699325775451;
//# sourceMappingURL=1702200925471-AddVariableEntity.js.map