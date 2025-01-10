import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedTimeAndUpdateToPostTable1736415646902 implements MigrationInterface {
    name = 'AddCreatedTimeAndUpdateToPostTable1736415646902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`created_at\``);
    }

}
