import * as Yup from 'yup';
import Departament from '../models/Departament';

class DepartamentController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const departament = await Departament.findAll({
      where: {
        deleted_at: null,
      },
      limit,
      offset: (page - 1) * limit,
      order: ['id'],
    });

    return res.json(departament);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      is_active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const departament = await Departament.create(req.body);

    return res.json(departament);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      is_active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    let departament = await Departament.findByPk(req.query.id);

    if (!departament) {
      return res.status(400).json({ error: 'Departamento não existente.' });
    }

    try {
      departament = await departament.update(req.body);
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }

    return res.json(departament);
  }

  async delete(req, res) {
    const departament = await Departament.findByPk(req.query.id);

    if (!departament) {
      return res.status(401).json({ error: 'Departamento não encontrado' });
    }

    try {
      await departament.destroy({ where: { id: req.query.id } });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível excluír departamento.' });
    }

    return res.status(200).send();
  }
}

export default new DepartamentController();
