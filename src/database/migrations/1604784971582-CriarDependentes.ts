import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarDependentes1604784971582  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Dependentes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome_parente',
            type: 'varchar',
          },
          {
            name: 'data_nasc',
            type: 'varchar',
          },

          {
            name: 'grau_parentesco',
            type: 'varchar',
          },

          {
            name: 'avatar_parente',
            type: 'varchar',
          },

          {
            name: 'id_funcionario',
            type: 'uuid',
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
    await queryRunner.createForeignKey('Dependentes', new TableForeignKey({
      referencedTableName: 'Funcionarios',
      referencedColumnNames: ['id'],
      columnNames: ['id_funcionario'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));

  }



  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Dependentes');
  }
}
