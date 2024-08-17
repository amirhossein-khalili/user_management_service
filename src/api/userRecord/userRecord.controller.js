import UserRecordService from './userRecord.service.js';

class UserRecordController {
  static async getRecord(req, res) {
    try {
      const user = req.user;
      if (user) {
        const nationalId = user?.nationalId;

        if (nationalId) {
          const result = UserRecordService.fetchRecordWithNationalId(nationalId);

          if (result.status == 'success') {
            const userRecord = result.userRecord;
            return res.status(200).json({ userRecord: userRecord });
          }
          if (result.status == 'fail')
            return res.status(500).json('an error occurred please try again later.');
        }
      }

      return res.status(500).json('please try again later  ');
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default UserRecordController;
