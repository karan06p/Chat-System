# Messaging System

A real-time messaging system built with Node.js, Express, and PostgreSQL.

## Tech Stack

- **Backend**: Node.js with Express 
- **Database**: PostgreSQL with node-pg driver
- **Authentication**: Bcrypt and JWT 
- **Environment**: dotenv for configuration management
- **Development**: Nodemon for hot reloading

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
PORT=3000
```

## Project Structure

```
src/
├── app.js                    # Main Express application
├── controllers/
│   ├── userController.js     # User-related controller
│   └── auth/
│       ├── sign-up.js        # User registration
│       ├── sign-in.js        # User login
│       └── delete-account.js # Account deletion
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   └── userRoutes.js         # User routes
├── db/
│   ├── index.js              # PostgreSQL pool setup
│   └── Queries/
│       ├── authQuery.js      # Authentication queries
│       └── userQuery.js      # User queries
└── utils/
    └── password.js           # Password hashing utilities
```

## API Endpoints

### Authentication

- **POST** `/auth/sign-up` - Register a new user
  - Request body:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Response: User creation confirmation or error


    IN PROGRESS (
        
- **POST** `/auth/sign-in` - Login user
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **DELETE** `/auth/delete-account` - Delete user account

    )

### Users

- **GET** `/users` - Fetch all users
  - Response: Array of all user objects

## Key Features

- **Secure Password Hashing**: Using bcrypt for password hashing
- **Email Validation**: Regex-based email format validation
- **Duplicate Email Prevention**: Checks for existing email before registration
- **Async/Await Pattern**: Modern promise-based password operations
- **Error Handling**: Comprehensive try-catch blocks with detailed error messages
- **PostgreSQL Integration**: Parameterized queries to prevent SQL injection

## Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with Nodemon, which automatically restarts on file changes.

### Production Mode
```bash
node src/app.js
```

The server will start on the port specified in `.env` (default: 3000).

## Error Handling

The application includes comprehensive error handling:
- Invalid email format validation
- Duplicate user prevention
- Database operation error catching
- HTTP status codes (200, 201, 500)
- Detailed error messages with location information

## Code Quality Improvements

- Async/await pattern for all asynchronous operations
- Proper error handling with try-catch blocks
- Parameterized database queries for security
- Consistent response JSON format
- Early returns to prevent code fallthrough

## Future Enhancements

- Real-time messaging functionality
- JWT token-based authentication
- Message encryption
- User profiles and avatars
- Typing indicators
- Message read receipts
