import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import User from '../models/User';

class Auth {
  async Authorization(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token ausente' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
      req.userId = decoded.id;
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }

  async UserPermission(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token ausente' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const { id } = await promisify(jwt.verify)(token, authConfig.secret);
      const user = await User.findOne({ where: { id, admin: true } });
      if (!user) {
        return res.status(401).json({ error: 'Usuário sem permissão' });
      }
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
}
export default new Auth();
