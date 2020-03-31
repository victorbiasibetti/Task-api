"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');
var _Task = require('../models/Task'); var _Task2 = _interopRequireDefault(_Task);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Departament = require('../models/Departament'); var _Departament2 = _interopRequireDefault(_Departament);

class TaskController {
  async index(req, res) {
    const {
      page = 1,
      limit = 20,
      id_responsable_departaments,
      id_responsable_users,
      started_at,
      finished_at,
      description,
      id_tasks_status,
      id_tasks_types,
    } = req.query;

    const where = {};

    where.deleted_at = {
      [_sequelize.Op.eq]: null,
    };

    if (id_responsable_departaments) {
      where.id_responsable_departaments = {
        [_sequelize.Op.eq]: id_responsable_departaments,
      };
    }

    if (id_responsable_users) {
      where.id_responsable_users = {
        [_sequelize.Op.eq]: id_responsable_users,
      };
    }

    // Aqui poderia ser um between dependendo de como o frontend
    // apresentasse os dados

    if (started_at) {
      where.started_at = {
        [_sequelize.Op.eq]: started_at,
      };
    }

    if (finished_at) {
      where.finished_at = {
        [_sequelize.Op.eq]: finished_at,
      };
    }
    //---------------------------------

    if (description) {
      where.description = {
        [_sequelize.Op.like]: `%${description}%`,
      };
    }
    if (id_tasks_status) {
      where.id_tasks_status = {
        [_sequelize.Op.eq]: id_tasks_status,
      };
    }

    if (id_tasks_types) {
      where.id_tasks_types = {
        [_sequelize.Op.eq]: id_tasks_types,
      };
    }

    try {
      const count = await _Task2.default.count({ where });
      const tasks = await _Task2.default.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: ['id'],
      });
      const response = {
        page,
        limit,
        offset: (page - 1) * limit,
        count,
        tasks,
      };

      return res.json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Houve um problema, tente novamente mais tarde' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      id_responsable_departaments: Yup.number().nullable(),
      id_responsable_users: Yup.number().nullable(),
      started_at: Yup.date().nullable(),
      finished_at: Yup.date().nullable(),
      id_tasks_status: Yup.number(),
      id_tasks_types: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { id_responsable_departaments, id_responsable_users } = req.body;
    if (!id_responsable_departaments && !id_responsable_users) {
      return res.status(400).json({
        error: 'A tarefa deve ser atribuída a um usuário ou departamento.',
      });
    }

    if (id_responsable_users) {
      const user = await _User2.default.findOne({ where: { id: id_responsable_users } });
      if (!user) {
        return res.status(400).json({
          error: 'Usuário não existe.',
        });
      }
    }

    if (id_responsable_departaments) {
      const departament = await _Departament2.default.findOne({
        where: { id: id_responsable_departaments },
      });
      if (!departament) {
        return res.status(400).json({
          error: 'Departamento não existe.',
        });
      }
    }

    const task = await _Task2.default.create(req.body);

    return res.json(task);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      id_responsable_departaments: Yup.number().nullable(),
      id_responsable_users: Yup.number().nullable(),
      started_at: Yup.date().nullable(),
      finished_at: Yup.date().nullable(),
      id_tasks_status: Yup.number(),
      id_tasks_types: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    let task = await _Task2.default.findByPk(req.query.id);

    if (!task) {
      return res.status(400).json({ error: 'Tarefa não existente.' });
    }

    const { id_responsable_departaments, id_responsable_users } = req.body;
    if (!id_responsable_departaments && !id_responsable_users) {
      return res.status(400).json({
        error: 'A tarefa deve ser atribuída a um usuário ou departamento.',
      });
    }

    if (id_responsable_users) {
      const user = await _User2.default.findOne({ where: { id: id_responsable_users } });
      if (!user) {
        return res.status(400).json({
          error: 'Usuário não existe.',
        });
      }
    }

    if (id_responsable_departaments) {
      const departament = await _Departament2.default.findOne({
        where: { id: id_responsable_departaments },
      });
      if (!departament) {
        return res.status(400).json({
          error: 'Departamento não existe.',
        });
      }
    }

    try {
      task = await task.update(req.body);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }

    return res.json(task);
  }

  async delete(req, res) {
    const task = await _Task2.default.findByPk(req.query.id);

    if (!task) {
      return res.status(401).json({ error: 'Tarefa não encontrada' });
    }

    try {
      await task.destroy({ where: { id: req.query.id } });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível excluír tarefa.' });
    }

    return res.status(200).send();
  }
}

exports. default = new TaskController();
