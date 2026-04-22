# Primetrade API

A scalable REST API with Authentication, Role-Based Access Control, and Task Management.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs
- **Frontend:** React.js
- **Docs:** Swagger UI

## Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the backend folder:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Documentation
Visit: `http://localhost:5000/api-docs`

## API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/v1/auth/register | Public |
| POST | /api/v1/auth/login | Public |
| GET | /api/v1/auth/me | Private |
| GET | /api/v1/auth/users | Admin only |

### Tasks
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/v1/tasks | Private |
| POST | /api/v1/tasks | Private |
| GET | /api/v1/tasks/:id | Private |
| PUT | /api/v1/tasks/:id | Private |
| DELETE | /api/v1/tasks/:id | Private |

## Scalability Notes
- **Modular structure** — new features added as separate modules
- **API versioning** (/api/v1/) — future versions won't break existing clients
- **Role-based access** — easily extendable to more roles
- **MongoDB** — horizontally scalable for large datasets
- **Future:** Redis caching, Docker containerization, microservices split