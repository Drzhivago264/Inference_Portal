"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAssistantEntity1699325775451 = void 0;
class AddAssistantEntity1699325775451 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS assistant (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                "credential" varchar NOT NULL,
                "details" text NOT NULL,
                "iconSrc" varchar NULL,
                "createdDate" timestamp NOT NULL DEFAULT now(),
                "updatedDate" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3c7cea7a044ac4c92764576cdbf" PRIMARY KEY (id)
            );`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE assistant`);
    }
}
exports.AddAssistantEntity1699325775451 = AddAssistantEntity1699325775451;
//# sourceMappingURL=1699325775451-AddAssistantEntity.js.map