import { getRepository } from 'typeorm';
import path from 'path';
import Dependentes from '../models/Dependentes';

const Temporario = path.resolve(__dirname, '..', '..', '..', 'tmp');

interface Request {
  id_funcionario: string;
  nome_parente:string;
  data_nasc: string;
  avatar_parente:string;
  grau_parentesco:string;

}

class DependentesController {

  public async update({ id_funcionario,nome_parente, data_nasc, avatar_parente, grau_parentesco}: Request): Promise<Dependentes> {
    const dependentesRepository = getRepository(Dependentes);

    const verificarParente = await dependentesRepository.findOne({
      where: {nome_parente},
    });

    if (verificarParente) {
      throw new Error('Parente já cadastrado para esse funcionario');
    }

    const users_parantes = dependentesRepository.create({
      id_funcionario,
      nome_parente,
      data_nasc,
      grau_parentesco,
      avatar_parente
    });

    await dependentesRepository.save(users_parantes);

    return users_parantes;
  }
}

export default DependentesController;
