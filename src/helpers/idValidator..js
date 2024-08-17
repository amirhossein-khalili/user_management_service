import mongoose from 'mongoose';

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export { validateObjectId };
