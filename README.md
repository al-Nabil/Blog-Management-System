#  Blog Management System (Backend API)

A RESTful Backend API for managing blogs with user authentication. Built using Node.js, Express.js, MongoDB, and JWT authentication.

---

##  Features

###  User Authentication
- User Registration
- User Login (JWT + Cookie Authentication)
- Get Logged-in User Profile
- Update User Profile
- Logout User

###  Blog Management
- Create Blog Post
- Get All Blogs
- Get Single Blog by ID
- Update Blog (Only Author)
- Delete Blog (Only Author)

###  Security
- Protected Routes using JWT
- Only authenticated users can access blog APIs
- Only blog creators can update/delete their blogs

---

##  Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- cookie-parser
- dotenv
- multer

---

##  Project Structure
```bash
blog-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── blogController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Blog.js
│
├── routes/
│   ├── authRoutes.js
│   └── blogRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── uploads/
│   └── blogImages/
│
├── .env
├── server.js
└── package.json
```

---

##  Installation & Setup

### 1 Clone the repository

```bash
git clone https://github.com/al-Nabil/Blog-Management-System
cd blog-backend-API
```
### 2 Install dependencies

npm install

### 3 Create .env file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Run the Project

npm run dev
http://localhost:5000

###  API Endpoints

Auth Routes
| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register user    |
| POST   | /api/auth/login    | Login user       |
| GET    | /api/auth/me       | Get user profile |
| PUT    | /api/auth/me       | Update profile   |
| POST   | /api/auth/logout   | Logout user      |

Blog Routes (Protected)
| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /api/blogs     | Create blog     |
| GET    | /api/blogs     | Get all blogs   |
| GET    | /api/blogs/:id | Get single blog |
| PUT    | /api/blogs/:id | Update blog     |
| DELETE | /api/blogs/:id | Delete blog     |

---
### Authentication
JWT token is stored in HTTP-only cookies
Protected routes require a valid token
Token is verified using middleware

---

### Testing

Use Postman to test APIs:

1. Register a user
2. Login user
3. Use token/cookie for protected routes
4. Create / Update / Delete blogs

---

### Notes
Only the creator of a blog can update or delete it
Passwords are hashed using bcrypt
MongoDB is used as the database

---

### Author

Md Nabil Al Rahman

---

⭐ License

This project is for educational purposes.