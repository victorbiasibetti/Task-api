"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _TaskController = require('./app/controllers/TaskController'); var _TaskController2 = _interopRequireDefault(_TaskController);
var _TaskStatusController = require('./app/controllers/TaskStatusController'); var _TaskStatusController2 = _interopRequireDefault(_TaskStatusController);
var _TaskTypeController = require('./app/controllers/TaskTypeController'); var _TaskTypeController2 = _interopRequireDefault(_TaskTypeController);
var _DepartamentController = require('./app/controllers/DepartamentController'); var _DepartamentController2 = _interopRequireDefault(_DepartamentController);
var _JobController = require('./app/controllers/JobController'); var _JobController2 = _interopRequireDefault(_JobController);

var _auth = require('./app/middleware/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);

routes.use(_auth2.default);

routes.put('/users', _UserController2.default.update);
routes.delete('/users', _UserController2.default.delete);
routes.get('/users', _UserController2.default.index);

routes.get('/tasks', _TaskController2.default.index);
routes.post('/tasks', _TaskController2.default.store);
routes.put('/tasks', _TaskController2.default.update);
routes.delete('/tasks', _TaskController2.default.delete);

routes.get('/tasks-status', _TaskStatusController2.default.index);
routes.post('/tasks-status', _TaskStatusController2.default.store);
routes.put('/tasks-status', _TaskStatusController2.default.update);
routes.delete('/tasks-status', _TaskStatusController2.default.delete);

routes.get('/tasks-type', _TaskTypeController2.default.index);
routes.post('/tasks-type', _TaskTypeController2.default.store);
routes.put('/tasks-type', _TaskTypeController2.default.update);
routes.delete('/tasks-type', _TaskTypeController2.default.delete);

routes.get('/departament', _DepartamentController2.default.index);
routes.post('/departament', _DepartamentController2.default.store);
routes.put('/departament', _DepartamentController2.default.update);
routes.delete('/departament', _DepartamentController2.default.delete);

routes.get('/job', _JobController2.default.index);
routes.post('/job', _JobController2.default.store);
routes.put('/job', _JobController2.default.update);
routes.delete('/job', _JobController2.default.delete);

exports. default = routes;
