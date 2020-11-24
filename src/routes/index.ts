import { Router } from 'express';
import dependentesRoutes from './dependentes.routes';
import funcionariosRouter from './funcionarios.routes';

const routes = Router();
routes.use('/funcionarios', funcionariosRouter);
routes.use('/dependentes', dependentesRoutes);

export default routes;
