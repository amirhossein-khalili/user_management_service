const mongoose = require('mongoose');
const axios = require('axios');

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  nationalId: { type: String, required: true },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

async function createUsers() {}

function compareResults(original, newResults) {
  if (JSON.stringify(original) === JSON.stringify(newResults)) {
    return 'Results are identical';
  } else {
    const differences = {};
    const allKeys = new Set([...Object.keys(original), ...Object.keys(newResults)]);

    allKeys.forEach((key) => {
      const originalValue = original[key];
      const newValue = newResults[key];
      if (originalValue !== newValue) {
        differences[key] = { original: originalValue, new: newValue };
      }
    });
    return differences;
  }
}

async function main() {
  await connectDB();

  await createUsers();

  mongoose.connection.close();
}

main();
