import { TaskStatusEnum } from "src/task/task.dto";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TaskTable1713354706731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await queryRunner.createTable(new Table({
            name: 'task',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['TODO', 'PROGRESS', 'DONE'],
                    default: `'TODO'`
                },
                {
                    name: 'expiration_date',
                    type: 'timestamp with time zone',
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task');
    }

}
