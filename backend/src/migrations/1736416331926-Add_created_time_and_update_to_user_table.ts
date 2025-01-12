import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedTimeAndUpdateToUserTable1736416331926
  implements MigrationInterface
{
  name = 'AddCreatedTimeAndUpdateToUserTable1736416331926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
  }
}
