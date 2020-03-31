import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';
import TaskStatusController from './app/controllers/TaskStatusController';
import TaskTypeController from './app/controllers/TaskTypeController';
import DepartamentController from './app/controllers/DepartamentController';
import JobController from './app/controllers/JobController';
import ReportController from './app/controllers/ReportController';

import Auth from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(Auth.Authorization);

routes.put('/users', Auth.UserPermission, UserController.update);
routes.delete('/users', Auth.UserPermission, UserController.delete);
routes.get('/users', Auth.UserPermission, UserController.index);

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.put('/tasks', TaskController.update);
routes.delete('/tasks', Auth.UserPermission, TaskController.delete);

routes.get('/tasks-status', Auth.UserPermission, TaskStatusController.index);
routes.post('/tasks-status', Auth.UserPermission, TaskStatusController.store);
routes.put('/tasks-status', Auth.UserPermission, TaskStatusController.update);
routes.delete(
  '/tasks-status',
  Auth.UserPermission,
  TaskStatusController.delete
);

routes.get('/tasks-type', Auth.UserPermission, TaskTypeController.index);
routes.post('/tasks-type', Auth.UserPermission, TaskTypeController.store);
routes.put('/tasks-type', Auth.UserPermission, TaskTypeController.update);
routes.delete('/tasks-type', Auth.UserPermission, TaskTypeController.delete);

routes.get('/departament', Auth.UserPermission, DepartamentController.index);
routes.post('/departament', Auth.UserPermission, DepartamentController.store);
routes.put('/departament', Auth.UserPermission, DepartamentController.update);
routes.delete(
  '/departament',
  Auth.UserPermission,
  DepartamentController.delete
);

routes.get('/job', JobController.index);
routes.post('/job', JobController.store);
routes.put('/job', JobController.update);
routes.delete('/job', Auth.UserPermission, JobController.delete);

routes.get(
  '/report',
  Auth.UserPermission,
  ReportController.CountCompletedTasks
);
routes.get(
  '/report/time',
  Auth.UserPermission,
  ReportController.TimeOfClosionTasks
);

export default routes;
