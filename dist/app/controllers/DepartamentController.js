"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Departament = require('../models/Departament'); var _Departament2 = _interopRequireDefault(_Departament);

class DepartamentController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const departament = await _Departament2.default.findAll({
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

    const departament = await _Departament2.default.create(req.body);

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

    let departament = await _Departament2.default.findByPk(req.query.id);

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
    const departament = await _Departament2.default.findByPk(req.query.id);

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

exports. default = new DepartamentController();
