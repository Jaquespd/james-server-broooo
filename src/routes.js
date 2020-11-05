import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import HouseController from './app/controllers/HouseController';
import UserController from './app/controllers/UserController';
import PhotoController from './app/controllers/PhotoController';
import EvaluationController from './app/controllers/EvaluationController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store); // Upload de arquivos

// Rotas de casas
routes.post('/houses', HouseController.store);
routes.put('/houses/:id', HouseController.update);
routes.get('/houses', HouseController.index);
routes.get('/houses/:id', HouseController.show);
routes.delete('/houses/:id', HouseController.destroy);

// Rotas de usuarios
// routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.destroy);

// Rotas de avaliação
routes.post(
	'/evaluations/user/:user_id/house/:house_id',
	EvaluationController.store
);
routes.put('/evaluations/:id', EvaluationController.update);
routes.get('/evaluations', EvaluationController.index);
// routes.get('/evaluations/:id', EvaluationController.show);
routes.delete('/evaluations/:id', EvaluationController.destroy);

// Upload de fotos para casas
routes.post('/photos', upload.single('file'), PhotoController.store); // Upload de arquivos
routes.put('/photos/:id', PhotoController.update); // Upload de arquivos

// Rotas de agendamentos
routes.post('/appointments', AppointmentController.store);
// routes.put('/appointments/:id', AppointmentController.update);
routes.get('/appointments', AppointmentController.index);
// routes.get('/appointments/:id', AppointmentController.show);
routes.delete('/appointments/:id', AppointmentController.destroy);

export default routes;
