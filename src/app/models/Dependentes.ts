import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Funcionarios from './Funcionarios';

@Entity('Dependentes')
class Dependentes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_parente: string;

  @Column()
  data_nasc: string;

  @Column()
  grau_parentesco: string;

  @Column()
  avatar_parente: string;

  @Column('uuid')
  id_funcionario: string;

  @ManyToOne(() => Funcionarios)
  @JoinColumn({ name: 'id_funcionario' })
  id_func: Funcionarios;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
export default Dependentes;
