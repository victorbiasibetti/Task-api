import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const users = await User.findAll({
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

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe no sistema.' });
    }

    try {
      const { id, name, email, admin } = await User.create(req.body);
      return res.json({ id, name, email, admin });
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Houve um problema, tenta novamente mais tarde' });
    }
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

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe no sistema.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password antigo incorreto' });
    }

    try {
      const { id, name, admin } = await user.update(req.body);

      return res.json({
        id,
        name,
        email,
        admin,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Houve um problema, tenta novamente mais tarde' });
    }
  }

  async delete(req, res) {
    const user = await User.findByPk(req.query.id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    try {
      await User.destroy({ where: { id: user.id } });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível excluír este usuário' });
    }

    return res.status(200).send();
  }
}

export default new UserController();
