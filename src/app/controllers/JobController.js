import * as Yup from 'yup';
import Job from '../models/Job';

class JobController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const job = await Job.findAll({
      where: {
        deleted_at: null,
      },
      limit,
      offset: (page - 1) * limit,
      order: ['id'],
    });

    return res.json(job);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      id_task: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const job = await Job.create(req.body);

    return res.json(job);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      id_task: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    let job = await Job.findByPk(req.query.id);

    if (!job) {
      return res.status(400).json({ error: 'Atividade não existente.' });
    }

    try {
      job = await job.update(req.body);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }

    return res.json(job);
  }

  async delete(req, res) {
    const job = await Job.findByPk(req.query.id);

    if (!job) {
      return res.status(401).json({ error: 'Atividade não encontrado' });
    }

    try {
      await job.destroy({ where: { id: req.query.id } });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível excluír atividade.' });
    }

    return res.status(200).send();
  }
}

export default new JobController();
