import userRecordBaseUrl from './userRecord.config.js';
import { axios } from 'axios';

class UserRecordService {
  static async fetchRecordWithNationalId(nationalId) {
    try {
      const userRecord = axios.get(`${userRecordBaseUrl}?nationalId=${nationalId}`);

      return { status: 'success', userRecord: userRecord };
    } catch (err) {
      console.log(err);
      return { status: 'fail' };
    }
  }
}

export default UserRecordService;
