import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe no sistema.' });
    }

    const { id, name, email, admin } = await User.create(req.body);
    return res.json({ id, name, email, admin });
  }

  async update(req, res) {
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

    const { id, name, admin } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();
