import { Schema, model } from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2';

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  password: String,
  nationalId: Number,
});

userSchema.plugin(mongoosePagination);

export default model('User', userSchema);
