import { getRepository } from 'typeorm';
import Funcionarios from '../models/Funcionarios';


interface IRequest {
  nome: string;
  email: string;
  avatar: string;
  departamento: string;
  funcao: string;
  telefone: string;
}

interface IFuncionarios {
  nome: string;
  email: string;
  avatar: string;
  departamento: string;
  funcao: string;
  likes: string;
  dislikes: string;
  telefone: string;
}

class FuncionariosControllers {
  public async store({ nome, email, avatar, departamento, funcao, telefone }: IRequest): Promise<IFuncionarios> {
    const funcionariosRepository = getRepository(Funcionarios);

    const verificaFuncionarios = await funcionariosRepository.findOne({
      where: { email },
    });

    if (verificaFuncionarios) {
      throw new Error('Email ja cadastrado!');
    }

    const funcionarios = funcionariosRepository.create({
      nome,
      email,
      avatar,
      departamento,
      funcao,
      telefone
    });

    await funcionariosRepository.save(funcionarios);

    return funcionarios;
  }
}

export default FuncionariosControllers;
