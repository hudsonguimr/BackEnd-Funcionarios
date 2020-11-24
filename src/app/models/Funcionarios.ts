import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Funcionarios')
class Funcionarios {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  departamento: string;

  @Column()
  funcao: string;

  @Column()
  telefone: string;

  @Column()
  likes: string;

  @Column()
  dislikes: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
export default Funcionarios;
