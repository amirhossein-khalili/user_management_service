import User from '../user/user.model.js';

class AuthMiddleware {
  static async checkUniqueSignup(req, res, next) {
    try {
      const phone = req.body.phone;
      const user = await User.find({ phone: phone });

      if (user)
        return res.status(409).send({ error: 'you have already signup , please use sign in ' });
      else return next();
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default AuthMiddleware;
