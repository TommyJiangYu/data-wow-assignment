import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedTimeAndUpdateToCommentTable1736416787948
  implements MigrationInterface
{
  name = 'AddCreatedTimeAndUpdateToCommentTable1736416787948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`createdTime\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD \`createdTime\` datetime NOT NULL`,
    );
  }
}
