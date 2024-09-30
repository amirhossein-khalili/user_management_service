import { userRecordBaseUrl } from './userRecord.config.js';
import axios from 'axios';
// import { redis } from '../../config/redis.config.js';

class UserRecordService {
  constructor() {}

  static async fetchRecordWithNationalId(nationalId) {
    try {
      /*

      this part check if cache exist then return data from cache
      
      */
      // const cachedRecord = await redis.get(nationalId);
      // if (cachedRecord) return { status: 'success', userRecord: JSON.parse(cachedRecord) };

      /*

      this part check if cache not exist it will fetch it from another service 

      then save it with other method of the class in out cache 

      and return data to controller

      */

      const response = await axios.get(`${userRecordBaseUrl}/${nationalId}`);

      return { status: 'success', userRecord: response.data.user };
    } catch (err) {
      console.log('Error fetching user record:', err);
      return {
        status: 'fail',
        message: err.message || 'An error occurred while fetching the user record.',
      };
    }
  }

  // async _updateCache(nationalId, data) {
  //   /*

  //     this part will check records and update them

  //     and remove old keys from redis

  //     this part work with LRU‌

  //     */
  //   const cacheCount = await redis.dbsize();
  //   if (cacheCount >= this.cacheSize) await redis.ltrim('keys', 1, -1);

  //   /*

  //     this part check add new key to the cache and

  //     it will update the list of keys

  //     */

  //   await redis.set(nationalId, JSON.stringify(data));
  //   await redis.rpush('keys', nationalId);
  // }
}

export default UserRecordService;
