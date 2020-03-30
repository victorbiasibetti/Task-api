"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const users = await _User2.default.findAll({
      where: {
        deleted_at: null,
      },
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const userExists = await _User2.default.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe no sistema.' });
    }

    const { id, name, email, admin } = await _User2.default.create(req.body);
    return res.json({ id, name, email, admin });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const { email, oldPassword } = req.body;

    const user = await _User2.default.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await _User2.default.findOne({
        where: { email },
      });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe no sistema.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password antigo incorreto' });
    }

    const { id, name, admin } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }

  async delete(req, res) {
    const user = await _User2.default.findByPk(req.query.id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    try {
      await _User2.default.destroy({ where: { id: user.id } });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível excluír este usuário' });
    }

    return res.status(200).send();
  }
}

exports. default = new UserController();
