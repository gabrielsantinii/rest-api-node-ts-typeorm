import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterComplimentAddDefaultTimeCreate1626134640080
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			"compliments",
			"created_at",
			new TableColumn({
				name: "created_at",
				type: "timestamp",
				default: "now()",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
			"compliments",
			"created_at",
			new TableColumn({
				name: "created_at",
				type: "timestamp",
			})
		);
    }
}
