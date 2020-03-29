import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const tasks = await Task.findAll({
      where: {
        deleted_at: null,
      },
      limit,
      offset: (page - 1) * limit,
      order: ['id'],
    });

    return res.json(tasks);
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
