import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Funcionarios from '../models/Funcionarios';

const Temporario = path.resolve(__dirname, '..', '..', '..', 'tmp');

interface IRequest {
  funcionario_id: string;
  avatarFileName: string;
}

class FuncionariosAvatarController {
  public async update({
    funcionario_id,
    avatarFileName,
  }: IRequest): Promise<Funcionarios> {
    const funcionariosRepository = getRepository(Funcionarios);
    const func = await funcionariosRepository.findOne(funcionario_id);



    if (func.avatar) {
      const funcAvatarFilePath = path.join(Temporario, func.avatar);
      const funcAvatarFileExists = await fs.promises.stat(funcAvatarFilePath);
      if (funcAvatarFileExists) {
        await fs.promises.unlink(funcAvatarFilePath);
      }
    }

    func.avatar = avatarFileName;
    await funcionariosRepository.save(func);

    return func;
  }
}

export default FuncionariosAvatarController;
