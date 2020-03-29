import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';
import TaskStatusController from './app/controllers/TaskStatusController';
import TaskTypeController from './app/controllers/TaskTypeController';
import DepartamentController from './app/controllers/DepartamentController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);
routes.get('/users', UserController.index);

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.put('/tasks', TaskController.update);
routes.delete('/tasks', TaskController.delete);

routes.get('/tasks-status', TaskStatusController.index);
routes.post('/tasks-status', TaskStatusController.store);
routes.put('/tasks-status', TaskStatusController.update);
routes.delete('/tasks-status', TaskStatusController.delete);

routes.get('/tasks-type', TaskTypeController.index);
routes.post('/tasks-type', TaskTypeController.store);
routes.put('/tasks-type', TaskTypeController.update);
routes.delete('/tasks-type', TaskTypeController.delete);

routes.get('/departament', DepartamentController.index);
routes.post('/departament', DepartamentController.store);
routes.put('/departament', DepartamentController.update);
routes.delete('/departament', DepartamentController.delete);

export default routes;
