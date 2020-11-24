import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import uploadConfig from '../config/upload';
import FuncionariosController from '../app/controllers/FuncionariosController';
import FuncionariosAvatarController from '../app/controllers/FuncionariosAvatarController';
import Funcionarios from '../app/models/Funcionarios';

const funcionariosRouter = Router();
// const funcionariosAvatarController = new FuncionariosAvatarController();
const upload = multer(uploadConfig);

const removerAvatar = async (filename: string): Promise<void> => {
  const diretorioAvatar = path.join(__dirname, '..', '..', 'tmp', filename);
  await fs.promises.unlink(diretorioAvatar);
}

funcionariosRouter.post('/', upload.single('avatar'), async (request, response) => {
  try {
    const { nome, email, funcao, departamento ,telefone} = request.body;
    const funcionariosController = new FuncionariosController();

    const user = await funcionariosController.store({
      nome,
      email,
      avatar: request.file.filename,
      funcao,
      departamento,
      telefone,
    });

    return response.json(user);
  } catch (erro) {
    // remover foto cadastrada quando da erro
    await removerAvatar(request.file.filename);
    return response.status(400).json({ error: erro.message });
  }
});

funcionariosRouter.get('/', async (request, response) => {
  const funcionariosRepository = getRepository(Funcionarios);
  const user = await funcionariosRepository.find();
  return response.json(user);
});

funcionariosRouter.get('/:id', async (request, response) => {
  try {
    const funcionariosRepository = getRepository(Funcionarios);
    const { id } = request.params;
    const user = await funcionariosRepository.findOne(id);

    if (!user) {
      throw new Error('Nenhum funcionario com esse id foi encontrado');
    }

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

funcionariosRouter.delete('/:id', async (request, response) => {
  try {
    const funcionariosRepository = getRepository(Funcionarios);
    const { id } = request.params;
    const funcionario = await funcionariosRepository.findOne(id);

    if (!funcionario) {
      throw new Error('Nenhum funcionario com esse id foi encontrado');
    };

    await funcionariosRepository.delete(id);
    removerAvatar(funcionario.avatar);
    return response.send();

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

funcionariosRouter.put('/:id', upload.single('avatar'), async (request, response) => {
  try {
    const funcionariosRepository = getRepository(Funcionarios);
    const { nome, email, funcao, departamento, telefone} = request.body;
    const { id } = request.params;
    const funcionario = await funcionariosRepository.findOne(id);

    if (!funcionario) {
      throw new Error('Nenhum funcionario com esse id foi encontrado');
    };

    // CHECAR CAMPOS
    // CHECAR CAMPOS
    // CHECAR CAMPOS
    // CHECAR CAMPOS
    // CHECAR CAMPOS
    // CHECAR CAMPOS
    // CHECAR CAMPOS
    // CHECAR CAMPOS
    // CHECAR CAMPOS
    // CHECAR CAMPOS


    removerAvatar(funcionario.avatar);

    funcionario.nome = nome;
    funcionario.email = email;
    funcionario.funcao = funcao;
    funcionario.departamento = departamento;
    funcionario.telefone = telefone
    funcionario.avatar = request.file.filename;


    await funcionariosRepository.save(funcionario);

    return response.status(200).json(funcionario);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

funcionariosRouter.patch('/likes/:id', async (request, response) => {
  try {
    const funcionariosRepository = getRepository(Funcionarios);
    const { id } = request.params;
    const funcionario = await funcionariosRepository.findOne(id);

    if (!funcionario) {
      throw new Error('Nenhum funcionario com esse id foi encontrado');
    };

    funcionario.likes = `${+funcionario.likes + 1}`;

    await funcionariosRepository.save(funcionario);

    return response.status(200).json(funcionario.likes);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


funcionariosRouter.patch('/dislikes/:id', async (request, response) => {
  try {
    const funcionariosRepository = getRepository(Funcionarios);
    const { id } = request.params;
    const funcionario = await funcionariosRepository.findOne(id);

    if (!funcionario) {
      throw new Error('Nenhum funcionario com esse id foi encontrado');
    };

    funcionario.dislikes = `${+funcionario.dislikes + 1}`;

    await funcionariosRepository.save(funcionario);

    return response.status(200).json(funcionario.dislikes);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});



export default funcionariosRouter;
