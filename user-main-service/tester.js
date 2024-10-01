const mongoose = require('mongoose');

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
    await mongoose.connect('mongodb://localhost:27017/userDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Function to get 100 random national IDs
async function getRandomNationalIds() {
  try {
    const users = await User.find({}, 'nationalId');
    const nationalIds = users.map((user) => user.nationalId);

    const shuffledIds = nationalIds.sort(() => 0.5 - Math.random());

    const randomIds = shuffledIds.slice(0, 100);

    return randomIds;
    console.log('Random National IDs:', randomIds);
  } catch (error) {
    console.error('Error fetching national IDs:', error);
  }
}

// Main function to run the script
async function main() {
  await connectDB();
  const randomIds = await getRandomNationalIds();
  console.log(randomIds);
  // Close the connection after fetching documents
  mongoose.connection.close();
}

// Execute the main function
main();
