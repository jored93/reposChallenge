import { MigrationInterface, QueryRunner } from "typeorm"

export class allMigration1657305004139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public.organization" ALTER COLUMN "id_organization" SET DATA TYPE int`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
