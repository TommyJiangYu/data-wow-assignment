import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1736329247384 implements MigrationInterface {
  name = 'CreatePostTable1736329247384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`detail\` text NOT NULL, \`communityType\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`post\``);
  }
}
