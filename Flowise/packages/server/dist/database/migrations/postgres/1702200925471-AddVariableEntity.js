"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVariableEntity1699325775451 = void 0;
class AddVariableEntity1699325775451 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS variable (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" varchar NOT NULL,
                "value" text NOT NULL,
                "type" text NULL,
                "createdDate" timestamp NOT NULL DEFAULT now(),
                "updatedDate" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_98419043dd704f54-9830ab78f8" PRIMARY KEY (id)
            );`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE variable`);
    }
}
exports.AddVariableEntity1699325775451 = AddVariableEntity1699325775451;
//# sourceMappingURL=1702200925471-AddVariableEntity.js.map