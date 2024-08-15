import User from './user.model.js';
import AuthService from '../auth/auth.service.js';

class UserController {
  static selectionUser = 'firstName lastName phone';
  static selectionUsers = 'firstName lastName phone';

  static async create(req, res) {
    try {
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        password: AuthService.encryptPassword(req.body.password),
      });

      if (newUser) res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async findAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        select: UserController.selectionUsers,
      };

      const users = await User.paginate({}, options);

      return res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async findOne(req, res) {
    try {
      const user = await User.findById(req.params.id).select(UserController.selectionUsers);
      if (!user) return res.status(404).json({ message: 'user not found ' });
      return res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async edit(req, res) {
    try {
      const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: false,
      });
      if (!userUpdated) return res.status(404).json({ message: 'user not found ' });

      res.json(userUpdated);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async destroy(req, res) {
    try {
      const userRemoved = await User.findByIdAndDelete(req.params.id);
      if (!userRemoved) return res.status(404).json({ message: 'user not found ' });
      res.json(userRemoved);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default UserController;
