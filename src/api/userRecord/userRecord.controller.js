import UserRecordService from './userRecord.service.js';

class UserRecordController {
  static async getRecord(req, res) {
    try {
      console.log();

      return res.status(200).json('an error occurred please try again later');
      // const newUser = await User.create({
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName,
      //   phone: req.body.phone,
      //   password: AuthService.encryptPassword(req.body.password),
      // });
      // if (newUser) res.status(201).json({ success: true });
      // else res.status(500).json('an error occurred please try again later');
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default UserRecordController;
