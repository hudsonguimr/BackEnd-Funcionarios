import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CriarFuncionarios1604783580556
  implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'Funcionarios',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'nome',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'avatar',
              type: 'varchar',
            },
            {
              name: 'departamento',
              type: 'varchar',
            },
            {
              name: 'funcao',
              type: 'varchar',
            },
            {
              name: 'telefone',
              type: 'varchar',
            },
            {
              name: 'likes',
              type: 'varchar',
              default: '0'
            },
            {
              name: 'dislikes',
              type: 'varchar',
              default: '0'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'update_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('Funcionarios');
    }
  }

