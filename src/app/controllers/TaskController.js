import * as Yup from 'yup';
import { Op } from 'sequelize';
import Task from '../models/Task';
import User from '../models/User';
import Departament from '../models/Departament';

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
      [Op.eq]: null,
    };

    if (id_responsable_departaments) {
      where.id_responsable_departaments = {
        [Op.eq]: id_responsable_departaments,
      };
    }

    if (id_responsable_users) {
      where.id_responsable_users = {
        [Op.eq]: id_responsable_users,
      };
    }

    if (started_at) {
      where.started_at = {
        [Op.eq]: started_at,
      };
    }

    if (finished_at) {
      where.finished_at = {
        [Op.eq]: finished_at,
      };
    }

    if (description) {
      where.description = {
        [Op.like]: `%${description}%`,
      };
    }
    if (id_tasks_status) {
      where.id_tasks_status = {
        [Op.eq]: id_tasks_status,
      };
    }

    if (id_tasks_types) {
      where.id_tasks_types = {
        [Op.eq]: id_tasks_types,
      };
    }

    try {
      const tasks = await Task.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: ['id'],
      });

      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      id_responsable_departaments: Yup.number(),
      id_responsable_users: Yup.number(),
      started_at: Yup.date(),
      finished_at: Yup.date(),
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
      const user = await User.findOne({ where: { id: id_responsable_users } });
      if (!user) {
        return res.status(400).json({
          error: 'Usuário não existe.',
        });
      }
    }

    if (id_responsable_departaments) {
      const departament = await Departament.findOne({
        where: { id: id_responsable_departaments },
      });
      if (!departament) {
        return res.status(400).json({
          error: 'Departamento não existe.',
        });
      }
    }

    const task = await Task.create(req.body);

    return res.json(task);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      id_responsable_departaments: Yup.number(),
      id_responsable_users: Yup.number(),
      started_at: Yup.date(),
      finished_at: Yup.date(),
      id_tasks_status: Yup.number(),
      id_tasks_types: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    let task = await Task.findByPk(req.query.id);

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
      const user = await User.findOne({ where: { id: id_responsable_users } });
      if (!user) {
        return res.status(400).json({
          error: 'Usuário não existe.',
        });
      }
    }

    if (id_responsable_departaments) {
      const departament = await Departament.findOne({
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
    const task = await Task.findByPk(req.query.id);

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

export default new TaskController();
