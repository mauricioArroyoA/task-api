# TaskMaster Pro - SaaS Task Management API MVP

A professional-grade Node.js REST API for task management, built with Clean Architecture principles and Cursor AI. This project demonstrates how to leverage AI tools to design and implement a scalable microservice MVP.

## 🎯 Project Overview

**TaskMaster Pro** is a minimal viable product (MVP) for a corporate task management tool. It showcases:

- ✅ Clean Architecture with proper separation of concerns
- ✅ Strong TypeScript typing throughout the codebase
- ✅ SQLite database with Prisma ORM for data persistence
- ✅ RESTful API with comprehensive CRUD operations
- ✅ Input validation using Zod schemas
- ✅ Global error handling with proper HTTP status codes
- ✅ Professional documentation and code structure
- ✅ Jest testing framework setup

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript (strict mode)
- **Framework**: Express.js
- **Database**: SQLite with Prisma ORM
- **Validation**: Zod
- **Testing**: Jest
- **Development**: ts-node-dev for hot reloading

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Copy the example environment file:

```bash
cp .env.example .env
```

The default configuration uses SQLite locally:

```
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
```

### 3. Setup Database

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

This creates the SQLite database and initializes the schema.

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### 5. Check API Health

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "success": true,
  "data": {
    "status": "OK"
  }
}
```

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Tasks Endpoints

#### 1. Create Task

**POST** `/tasks`

Create a new task.

**Request Body:**

```json
{
  "title": "Complete project proposal",
  "description": "Write and send the Q1 project proposal to stakeholders"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "cm1a2b3c4d5e6f7g8h",
    "title": "Complete project proposal",
    "description": "Write and send the Q1 project proposal to stakeholders",
    "status": "PENDING",
    "createdAt": "2026-02-05T10:30:00.000Z",
    "updatedAt": "2026-02-05T10:30:00.000Z"
  },
  "message": "Task created successfully"
}
```

#### 2. List All Tasks

**GET** `/tasks`

Retrieve all tasks with optional filtering and pagination.

**Query Parameters:**

- `status` (optional): Filter by status - `PENDING` or `COMPLETED`
- `limit` (optional): Number of results per page (default: 10, max: 100)
- `offset` (optional): Pagination offset (default: 0)

**Example:**

```bash
curl "http://localhost:3000/api/tasks?status=PENDING&limit=10&offset=0"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "cm1a2b3c4d5e6f7g8h",
      "title": "Complete project proposal",
      "description": "Write and send the Q1 project proposal to stakeholders",
      "status": "PENDING",
      "createdAt": "2026-02-05T10:30:00.000Z",
      "updatedAt": "2026-02-05T10:30:00.000Z"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

#### 3. Get Single Task

**GET** `/tasks/:id`

Retrieve a specific task by ID.

**Example:**

```bash
curl http://localhost:3000/api/tasks/cm1a2b3c4d5e6f7g8h
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "cm1a2b3c4d5e6f7g8h",
    "title": "Complete project proposal",
    "description": "Write and send the Q1 project proposal to stakeholders",
    "status": "PENDING",
    "createdAt": "2026-02-05T10:30:00.000Z",
    "updatedAt": "2026-02-05T10:30:00.000Z"
  }
}
```

#### 4. Update Task

**PUT** `/tasks/:id`

Update an existing task.

**Request Body:**

```json
{
  "status": "COMPLETED",
  "description": "Updated description"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "cm1a2b3c4d5e6f7g8h",
    "title": "Complete project proposal",
    "description": "Updated description",
    "status": "COMPLETED",
    "createdAt": "2026-02-05T10:30:00.000Z",
    "updatedAt": "2026-02-05T10:31:00.000Z"
  },
  "message": "Task updated successfully"
}
```

#### 5. Delete Task

**DELETE** `/tasks/:id`

Delete a task.

**Example:**

```bash
curl -X DELETE http://localhost:3000/api/tasks/cm1a2b3c4d5e6f7g8h
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "cm1a2b3c4d5e6f7g8h",
    "title": "Complete project proposal",
    "description": "Updated description",
    "status": "COMPLETED",
    "createdAt": "2026-02-05T10:30:00.000Z",
    "updatedAt": "2026-02-05T10:31:00.000Z"
  },
  "message": "Task deleted successfully"
}
```

#### 6. Filter Tasks by Status

**GET** `/tasks/filter/by-status`

Get all tasks with a specific status.

**Query Parameters:**

- `status` (required): Either `PENDING` or `COMPLETED`

**Example:**

```bash
curl "http://localhost:3000/api/tasks/filter/by-status?status=PENDING"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "cm1a2b3c4d5e6f7g8h",
      "title": "Complete project proposal",
      "description": "Write and send the Q1 project proposal to stakeholders",
      "status": "PENDING",
      "createdAt": "2026-02-05T10:30:00.000Z",
      "updatedAt": "2026-02-05T10:30:00.000Z"
    }
  ]
}
```

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Test Coverage

```bash
npm test -- --coverage
```

## 🔧 Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run compiled code
npm start

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (visual database browser)
npm run prisma:studio

# Run tests
npm test
```

## 📁 Project Structure

```
task-api/
├── src/
│   ├── controllers/          # HTTP request handlers
│   │   └── task.controller.ts
│   ├── services/             # Business logic layer
│   │   └── task.service.ts
│   ├── routes/               # API route definitions
│   │   └── task.routes.ts
│   ├── middleware/           # Express middleware
│   │   └── errorHandler.ts
│   ├── types/                # TypeScript interfaces & types
│   │   ├── task.types.ts
│   │   └── api.types.ts
│   ├── utils/                # Utility functions
│   │   └── validation.ts     # Zod schemas
│   ├── config/               # Configuration files
│   │   └── config.ts
│   └── index.ts              # Application entry point
├── prisma/
│   └── schema.prisma         # Database schema
├── .cursorrules              # Cursor AI configuration
├── .env                      # Environment variables
├── .env.example              # Example environment file
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest testing configuration
└── README.md                 # This file
```

## 🤖 How This Was Built with Cursor AI

### Step 1: Setup and Context
**Prompt Used:**
```
Generate rules for this project: use Clean Architecture, strong typing, and 
professional documentation standards. Create a .cursorrules file that enforces 
REST API best practices, TypeScript strict mode, and proper folder structure.
```

**Result:** Created `.cursorrules` file defining architecture patterns, naming conventions, and coding standards.

### Step 2: Data Modeling
**Prompt Used:**
```
Create a data model in SQLite using Prisma ORM for a task app with fields:
- id (primary key)
- title (required, text)
- description (optional, large text)
- status (enum: pending/completed)
- creation date (auto-generated)
- update date (auto-updated)

Add proper indexes and relationships.
```

**Result:** Generated `prisma/schema.prisma` with:
- Task model with all required fields
- Proper enum for TaskStatus
- Indexes on status and createdAt for query performance

### Step 3: CRUD and Business Logic
**Prompt Used:**
```
Generate API endpoints to manage tasks with:
- Create a new task (POST)
- Get all tasks with filtering by status
- Get single task by ID
- Update task
- Delete task
Include comprehensive data validation and global error handling middleware.
Also create a function to filter tasks by status.
```

**Result:** Complete CRUD implementation with:
- TaskService with all business logic
- TaskController with 6 endpoints
- Zod validation schemas
- Error handling middleware
- Proper HTTP status codes

### Step 4: Validation & Error Handling
**Prompt Used:**
```
Add input validation to all endpoints using Zod. Create schemas for:
- Creating tasks (title required, description optional)
- Updating tasks (all fields optional)
- Filtering tasks (status, pagination)

Also implement centralized error handling that catches async errors
and returns consistent JSON responses.
```

**Result:**
- Zod schemas in `src/utils/validation.ts`
- ApiError class for structured errors
- Error handling middleware for global error catching
- Async handler wrapper for route handlers

## 💡 Key Features

### Clean Architecture

The project follows Clean Architecture principles:

- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Types**: Define data structures
- **Middleware**: Cross-cutting concerns
- **Utils**: Helper functions

### Type Safety

- Strict TypeScript configuration enabled
- All functions have explicit types
- No `any` types used
- Interfaces for all data structures

### Data Validation

- Zod schemas for all inputs
- Custom error messages
- Length limits on text fields
- Enum validation for status

### Error Handling

- Structured error responses
- Proper HTTP status codes
- Request validation errors (400)
- Resource not found (404)
- Server errors (500)

### Database Efficiency

- Indexed fields for fast queries
- Pagination support for large datasets
- Proper relationships and constraints
- SQLite for lightweight deployment

## 📖 API Response Format

All responses follow a consistent format:

**Success Response:**

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Error description"
}
```

**Paginated Response:**

```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "total": 42,
  "limit": 10,
  "offset": 0
}
```

## 🐛 Error Handling Examples

### Validation Error (400 Bad Request)

**Request:**

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": ""}'
```

**Response:**

```json
{
  "success": false,
  "error": "Title is required"
}
```

### Not Found Error (404)

**Request:**

```bash
curl http://localhost:3000/api/tasks/invalid-id
```

**Response:**

```json
{
  "success": false,
  "error": "Task with ID invalid-id not found"
}
```

## 🔐 Security Features

- Input validation on all endpoints
- Proper error messages (no stack traces in production)
- Environment variables for configuration
- SQL injection prevention via Prisma ORM
- Type safety prevents many runtime errors

## 📝 Database Schema

### Task Model

```prisma
model Task {
  id          String   @id @default(cuid())
  title       String   @db.Text
  description String?  @db.Text
  status      TaskStatus @default(PENDING)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([status])
  @@index([createdAt])
}

enum TaskStatus {
  PENDING
  COMPLETED
}
```

## 🚂 Migration Workflow

When you make schema changes:

```bash
# Update prisma/schema.prisma

# Create a migration
npx prisma migrate dev --name describe_change

# This will:
# 1. Create SQL migration files
# 2. Apply changes to database
# 3. Regenerate Prisma Client
```

## 📊 Example Usage Flow

### Create multiple tasks

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Task 1", "description": "First task"}'

curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Task 2", "description": "Second task"}'
```

### Mark as completed

```bash
curl -X PUT http://localhost:3000/api/tasks/[TASK_ID] \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

### Filter completed tasks

```bash
curl "http://localhost:3000/api/tasks/filter/by-status?status=COMPLETED"
```

## 🎓 Learning Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev)
- [REST API Best Practices](https://restfulapi.net/)

## 🚀 Next Steps for Production

To extend this MVP for production:

1. **Add Authentication**: JWT tokens, OAuth2
2. **Add Authorization**: Role-based access control (RBAC)
3. **Add Logging**: Structured logging (Winston, Pino)
4. **Add Rate Limiting**: Prevent abuse
5. **Add CORS**: Proper cross-origin handling
6. **Add Caching**: Redis for performance
7. **Add Monitoring**: APM tools, error tracking
8. **Add Tests**: Comprehensive unit and integration tests
9. **Add CI/CD**: Automated testing and deployment
10. **Add Documentation**: OpenAPI/Swagger specs

## 📄 License

ISC

## 👨‍💻 Author

Built with Cursor AI assistance demonstrating modern Node.js API development practices.

---

**Built with ❤️ using Cursor AI**
