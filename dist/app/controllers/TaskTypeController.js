"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _TaskType = require('../models/TaskType'); var _TaskType2 = _interopRequireDefault(_TaskType);

class TaskStatusController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const tasks_type = await _TaskType2.default.findAll({
      where: {
        deleted_at: null,
      },
      limit,
      offset: (page - 1) * limit,
      order: ['id'],
    });

    return res.json(tasks_type);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      is_active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const task_type = await _TaskType2.default.create(req.body);

    return res.json(task_type);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      is_active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    let task_type = await _TaskType2.default.findByPk(req.query.id);

    if (!task_type) {
      return res.status(400).json({ error: 'Tipo não existente.' });
    }

    try {
      task_type = await task_type.update(req.body);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }

    return res.json(task_type);
  }

  async delete(req, res) {
    const task_type = await _TaskType2.default.findByPk(req.query.id);

    if (!task_type) {
      return res.status(401).json({ error: 'Tipo não encontrado' });
    }

    try {
      await task_type.destroy({ where: { id: req.query.id } });
    } catch (err) {
      return res.status(400).json({ error: 'Não foi possível excluír tipo.' });
    }

    return res.status(200).send();
  }
}

exports. default = new TaskStatusController();
