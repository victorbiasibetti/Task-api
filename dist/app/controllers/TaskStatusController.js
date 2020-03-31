"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Job = require('../models/Job'); var _Job2 = _interopRequireDefault(_Job);

class TaskStatusController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    try {
      const count = await _Job2.default.count({ where: { deleted_at: null } });
      const tasks_status = await _Job2.default.findAll({
        where: {
          deleted_at: null,
        },
        limit,
        offset: (page - 1) * limit,
        order: ['id'],
      });
      const response = {
        page,
        limit,
        offset: (page - 1) * limit,
        count,
        tasks_status,
      };

      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      is_active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const task_status = await _Job2.default.create(req.body);

    return res.json(task_status);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      is_active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    let task_status = await _Job2.default.findByPk(req.query.id);

    if (!task_status) {
      return res.status(400).json({ error: 'Status não existente.' });
    }

    try {
      task_status = await task_status.update(req.body);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }

    return res.json(task_status);
  }

  async delete(req, res) {
    const task_status = await _Job2.default.findByPk(req.query.id);

    if (!task_status) {
      return res.status(401).json({ error: 'Status não encontrado' });
    }

    try {
      await task_status.destroy({ where: { id: req.query.id } });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível excluír status.' });
    }

    return res.status(200).send();
  }
}

exports. default = new TaskStatusController();
