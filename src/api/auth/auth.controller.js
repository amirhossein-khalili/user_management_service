import User from '../user/user.model.js';
import AuthService from './auth.service.js';

class AuthController {
  static async signup(req, res, next) {
    try {
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        password: AuthService.encryptPassword(req.body.password),
      });

      if (newUser) res.status(201).json({ success: true });
      else res.status(500).json('an error occurred please try again later');
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async loginWithPassword(req, res, next) {
    try {
      const phone = req.body.phone;
      const password = req.body.password;

      const user = await User.findOne({ phone: phone });
      if (!user) return res.status(401).send({ message: 'please try signup first' });

      const authenticated = AuthService.comparePassword(password, user.password);
      if (!authenticated) return res.status(401).send({ message: 'invalid password' });

      const token = AuthService.generateToken(user);
      res.status(201).json({ success: true, token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async getOtp(req, res, next) {
    try {
      const nationalId = req.body.nationalId;
      const phone = req.body.phone;

      const user = await User.findOne({ nationalId: nationalId, phone: phone });
      if (!user)
        return res.status(401).send({
          message: 'A user with your national id and mobile number is not registered in the system',
        });

      // -----------------------------------------------------------------------------------
      console.log('='.repeat(50));
      console.log('your otp code is :123456');
      console.log('='.repeat(50));
      // -----------------------------------------------------------------------------------

      res.status(201).json({ success: true, message: 'your otp has been sent . ' });
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async loginWithOtp(req, res, next) {
    try {
      const nationalId = req.body.nationalId;
      const phone = req.body.phone;
      const otpUser = req.body.otp;

      const user = await User.findOne({ nationalId: nationalId, phone: phone });
      const otpSend = 123456; // it should read from data base in real app

      if (!user)
        return res.status(401).send({
          message: 'A user with your national id and mobile number is not registered in the system',
        });
      else if (otpUser != otpSend)
        return res.status(401).send({
          message: 'your code is wrong ',
        });
      else {
        const token = AuthService.generateToken(user);
        return res.status(201).json({ success: true, token: token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default AuthController;
