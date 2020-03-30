"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Job = require('../models/Job'); var _Job2 = _interopRequireDefault(_Job);

class JobController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const job = await _Job2.default.findAll({
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

    const job = await _Job2.default.create(req.body);

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

    let job = await _Job2.default.findByPk(req.query.id);

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
    const job = await _Job2.default.findByPk(req.query.id);

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

exports. default = new JobController();
