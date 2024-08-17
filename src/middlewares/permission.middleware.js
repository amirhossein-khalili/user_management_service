class PermissionMiddleware {
  static async checkAdminAccess(req, res, next) {
    try {
      const user = req.user;

      if (user.role == 'admin') return next();
      else return res.status(403).json('access denied !');
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default PermissionMiddleware;
