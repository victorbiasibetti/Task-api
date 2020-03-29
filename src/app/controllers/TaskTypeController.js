import * as Yup from 'yup';
import TaskType from '../models/TaskType';

class TaskStatusController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const tasks_type = await TaskType.findAll({
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

    const task_type = await TaskType.create(req.body);

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

    let task_type = await TaskType.findByPk(req.query.id);

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
    const task_type = await TaskType.findByPk(req.query.id);

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

export default new TaskStatusController();
