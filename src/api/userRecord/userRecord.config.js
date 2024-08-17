import dotenv from 'dotenv';
dotenv.config();

const userRecordBaseUrl = process.env.USER_RECOES_SERVICE_BASE_URL;

export { userRecordBaseUrl };
