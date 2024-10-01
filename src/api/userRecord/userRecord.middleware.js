/*


this part is without caching
















*/

// import { userRecordBaseUrl } from './userRecord.config.js';
// import axios from 'axios';

// class UserRecordMiddleware {
//   constructor() {}

//   static async nationalIdParser(req, res, next) {
//     try {
//       const nationalId = req.query.nationalId;

//       if (nationalId) {
//         const response = await axios.get(`${userRecordBaseUrl}/${nationalId}`);

//         if (response && response.data.success !== false) {
//           req.user = response.data.user;
//           return next();
//         } else return res.json({ message: 'user not founded ' });
//       }

//       return res.json({ message: 'user not founded ' });
//     } catch (err) {
//       console.log('Error fetching user record:', err);
//       return {
//         status: 'fail',
//         message: err.message || 'An error occurred while fetching the user record.',
//       };
//     }
//   }
// }

// export default UserRecordMiddleware;

/*


this part is with caching
















*/
import { userRecordBaseUrl } from './userRecord.config.js';
import axios from 'axios';
import Redis from 'ioredis';

// Initialize Redis client
const redis = new Redis();

class UserRecordMiddleware {
  constructor() {}

  static async nationalIdParser(req, res, next) {
    try {
      const nationalId = req.query.nationalId;

      if (nationalId) {
        const cachedUser = await redis.get(nationalId);

        if (cachedUser) {
          req.user = JSON.parse(cachedUser);
          return next();
        }

        const response = await axios.get(`${userRecordBaseUrl}/${nationalId}`);

        if (response && response.data.success !== false) {
          await redis.set(nationalId, JSON.stringify(response.data.user), 'EX', 3600);

          req.user = response.data.user;
          return next();
        } else {
          return res.json({ message: 'User not found' });
        }
      }

      return res.json({ message: 'User not found' });
    } catch (err) {
      console.log('Error fetching user record:', err);
      return res.status(500).json({
        status: 'fail',
        message: err.message || 'An error occurred while fetching the user record.',
      });
    }
  }
}

export default UserRecordMiddleware;
