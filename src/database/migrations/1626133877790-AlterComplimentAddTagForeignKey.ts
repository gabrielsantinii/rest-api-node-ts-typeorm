import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from "typeorm";

export class AlterComplimentAddTagForeignKey1626133877790
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			"compliments",
			new TableForeignKey({
				name: "FKTagCompliment",
				referencedTableName: "tags",
				referencedColumnNames: ["id"],
				columnNames: ["tag_id"],
				onUpdate: "SET NULL",
				onDelete: "SET NULL",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("compliments", "FKTagCompliment");
	}
}
