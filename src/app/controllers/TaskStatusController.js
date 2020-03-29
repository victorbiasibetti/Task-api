import * as Yup from 'yup';
import TaskStatus from '../models/TaskStatus';

class TaskStatusController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const tasks_status = await TaskStatus.findAll({
      where: {
        deleted_at: null,
      },
      limit,
      offset: (page - 1) * limit,
      order: ['id'],
    });

    return res.json(tasks_status);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      is_active: Yup.boolean(),
    });

    schema.validate(req.body).catch((err) => {
      console.log(err.name);
      console.log(err.erros);
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const task_status = await TaskStatus.create(req.body);

    return res.json(task_status);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      is_active: Yup.boolean(),
    });

    schema.validate(req.body).catch((err) => {
      console.log(err.name);
      console.log(err.erros);
    });
    /* if (!(await schema.isValid(req.body))) {
      console.log(schema.error);
      return res.status(400).json({ error: 'Falha na validação' });
    } */

    let task_status = await TaskStatus.findByPk(req.query.id);

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
    const task_status = await TaskStatus.findByPk(req.query.id);

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

export default new TaskStatusController();
