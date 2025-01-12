import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1736329669785 implements MigrationInterface {
  name = 'CreateCommentTable1736329669785';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`commentMessage\` text NOT NULL, \`createdTime\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`comment\``);
  }
}
