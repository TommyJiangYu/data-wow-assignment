import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationWithUserPost1736329586215 implements MigrationInterface {
    name = 'CreateRelationWithUserPost1736329586215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_post\` (\`user_id\` int NOT NULL, \`post_id\` int NOT NULL, INDEX \`IDX_0597fe5ab2363ed386be037172\` (\`user_id\`), INDEX \`IDX_bfc00203f5eb4caa1c0ea94b00\` (\`post_id\`), PRIMARY KEY (\`user_id\`, \`post_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_post\` ADD CONSTRAINT \`FK_0597fe5ab2363ed386be0371720\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_post\` ADD CONSTRAINT \`FK_bfc00203f5eb4caa1c0ea94b002\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_post\` DROP FOREIGN KEY \`FK_bfc00203f5eb4caa1c0ea94b002\``);
        await queryRunner.query(`ALTER TABLE \`user_post\` DROP FOREIGN KEY \`FK_0597fe5ab2363ed386be0371720\``);
        await queryRunner.query(`DROP INDEX \`IDX_bfc00203f5eb4caa1c0ea94b00\` ON \`user_post\``);
        await queryRunner.query(`DROP INDEX \`IDX_0597fe5ab2363ed386be037172\` ON \`user_post\``);
        await queryRunner.query(`DROP TABLE \`user_post\``);
    }

}
