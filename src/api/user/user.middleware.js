import User from './user.model.js';

class UserMiddleware {
  static async checkUnique(req, res, next) {
    try {
      const phone = req.body.phone;
      const user = await User.findOne({ phone: phone });
      if (user) return res.status(403).send({ error: 'a user with this phone already exist!! ' });
      else return next();
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default UserMiddleware;
