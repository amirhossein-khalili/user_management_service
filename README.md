
---

# User Management Service

This project is a user management service that includes the following features:

- **OTP Code Request & Login:** Users can request an OTP code and log in using it.
- **User Records:** Authenticated users can view their own records.
- **Admin Section:** Admin users can add, edit, or delete user records. This section is restricted to users with admin privileges.

## Features

1. **OTP Code Request & Login**
   - Users can request an OTP code via the `/otp` endpoint.
   - The OTP code is used to authenticate and log in the user.

2. **User Records**
   - Authenticated users can view their own user records.
   - This data is only accessible to the user who is logged in.

3. **Admin Section**
   - Admin users have additional privileges to manage user records.
   - Admins can add, edit, or delete user records via the admin section.

## Prerequisites

- **Docker**: Ensure Docker is installed on your system.
- **Node.js**: If not using Docker, Node.js and npm should be installed.
- **MongoDB**: The service uses MongoDB as the database.

## Installation

### 1. Using Docker

1. **Build the Docker image**:
   ```bash
   docker build -t user-management-service .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -d -p 4000:4000 --env-file .env user-management-service
   ```

3. **Access the service**: The service will be running at `http://localhost:4000`.

### 2. Without Docker

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy the `.example.env` file to `.env`:
     ```bash
     cp .example.env .env
     ```
   - Modify the `.env` file with your specific configuration.

3. **Start the application**:
   ```bash
   npm start
   ```

4. **Access the service**: The service will be running at `http://localhost:4000`.

## postman

you can use the postman collection for testing apis 

the collection is in the docs directory


## Environment Variables

Ensure the following environment variables are set in your `.env` file:

- `PORT`: The port on which the server will run (default is 3000).
- `DB`: The connection string for MongoDB.
- `JWT_SECRET`: Secret key used for JWT authentication.

## API Endpoints

- **/api/auth/otp**: Request an OTP code.
- **/api/auth/login**: Login using the OTP code.
- **/api/userRecords/**: Get the logged-in user's records.
- **Users**: Admin endpoint for managing users .

## Admin Access

To access the admin features, your user account must have admin privileges. This is typically determined by a role attribute in the user data.


## Contact

For any inquiries or issues, please contact [amir1378khalili@gmail.com](mailto:amir1378khalili@gmail.com).

---
