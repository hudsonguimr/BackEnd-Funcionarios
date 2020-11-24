import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import uploadConfig from '../config/upload';
import DependentesController from '../app/controllers/DependentesController';
import Dependentes from '../app/models/Dependentes';

const upload = multer(uploadConfig);
const dependentesRoutes = Router();

const removerAvatar = async (filename: string): Promise<void> => {
  const diretorioAvatar = path.join(__dirname, '..', '..', 'tmp', filename);
  await fs.promises.unlink(diretorioAvatar);
}

dependentesRoutes.post('/', upload.single('avatar_parente'), async (request, response) => {
  try {
    const { id_funcionario, nome_parente, data_nasc, grau_parentesco} = request.body;
    const dependentesController = new DependentesController();

    const dependente = await dependentesController.update({
      id_funcionario,
      nome_parente,
      data_nasc,
      grau_parentesco,
      avatar_parente: request.file.filename,
    });

    return response.json(dependente);
  } catch (erro) {
    await removerAvatar(request.file.filename);
    return response.status(400).json({ error: erro.message });
  }
});

dependentesRoutes.get('/', async (request, response) => {
  const dependentesRepository = getRepository(Dependentes);
  const dependentes = await dependentesRepository.find();
  return response.json(dependentes);
});

dependentesRoutes.get('/:id', async (request, response) => {
  try {
    const dependentesRepository = getRepository(Dependentes);
    const { id } = request.params;
    const dependentes = await dependentesRepository.findOne(id);
    return response.status(200).json(dependentes);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

dependentesRoutes.delete('/:id', async (request, response) => {
  try {
    const dependentesRepository = getRepository(Dependentes);
    const { id } = request.params;
    const dependente = await dependentesRepository.findOne(id);

    if (!dependente) {
      throw new Error('Nenhum dependente com esse id encontrado');
    }
    await removerAvatar(dependente.avatar_parente);

    await dependentesRepository.delete(id);

    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

dependentesRoutes.get('/Listar/:id', async (request, response) => {
  try {
    const dependentesRepository = getRepository(Dependentes);
    const { id } = request.params;
    const dependentes = await dependentesRepository.find({
      where: { id_funcionario: id }
    });
    return response.status(200).json(dependentes);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

dependentesRoutes.put('/:id', upload.single('avatar_parente'), async (request, response) => {
  try {
    const dependentesRepository = getRepository(Dependentes);
    const { nome_parente, data_nasc, grau_parentesco, id_funcionario} = request.body;
    const { id } = request.params;
    const dependente = await dependentesRepository.findOne(id);

    if (!dependente) {
      throw new Error('Nenhum dependente com esse id foi encontrado');
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



    removerAvatar(dependente.avatar_parente);

    dependente.nome_parente = nome_parente;
    dependente.data_nasc = data_nasc;
    dependente.grau_parentesco = grau_parentesco;
    dependente.id_funcionario = id_funcionario;


    await dependentesRepository.save(dependente);

    return response.status(200).json(dependente);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


export default dependentesRoutes;
