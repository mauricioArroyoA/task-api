# TaskMaster Pro - SaaS Task Management API MVP

A professional Node.js REST API for task management, built with Clean Architecture and Cursor AI.

## 🚀 Quick Start

### 1. Install & Setup (1 minute)
```bash
npm install
npx prisma migrate dev
```

### 2. Start Server
```bash
npm run dev
```

Server: **http://localhost:3000**

### 3. Test API
```bash
curl http://localhost:3000/health
```

## 📚 API Examples

**Create Task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

**List Tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Get One Task:**
```bash
curl http://localhost:3000/api/tasks/{TASK_ID}
```

**Update Task:**
```bash
curl -X PUT http://localhost:3000/api/tasks/{TASK_ID} \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

**Delete Task:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/{TASK_ID}
```

**Filter by Status:**
```bash
curl http://localhost:3000/api/tasks/filter/by-status?status=PENDING
```

## 📋 Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get one task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/filter/by-status?status=PENDING` | Filter by status |

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

## 🤖 Cursor AI Prompts Used

### Prompt 1: Project Setup & Rules
```
Generate a .cursorrules file for a professional Node.js API project.
Include: Clean Architecture, strict TypeScript, proper folder structure,
naming conventions (PascalCase classes, camelCase functions), and RESTful 
API best practices. All controllers should handle HTTP requests, services 
should contain business logic, and middleware should handle cross-cutting concerns.
```

**Result:** Created `.cursorrules` file with architecture rules and coding standards.

---

### Prompt 2: Database Schema with Prisma
```
Create a Prisma schema for a task management application with:
- Task model with fields: id (cuid), title (required string), 
  description (optional string), status (PENDING/COMPLETED enum), 
  createdAt and updatedAt timestamps
- Add indexes on status and createdAt for query performance
- Include TaskStatus enum
- Add JSDoc comments for all fields
```

**Result:** Generated `prisma/schema.prisma` with optimized schema and indexes.

---

### Prompt 3: TypeScript Type Definitions
```
Create TypeScript interfaces in src/types/:
- Task interface matching Prisma model
- CreateTaskInput (title required, description optional)
- UpdateTaskInput (all fields optional)
- TaskFilterOptions (status filter, pagination with limit/offset)
- ApiResponse<T> generic wrapper for consistent responses
- PaginatedResponse<T> for paginated endpoints

Export each from appropriate type files with JSDoc comments.
```

**Result:** Type-safe API contracts in `src/types/task.types.ts` and `src/types/api.types.ts`.

---

### Prompt 4: Input Validation with Zod
```
Create Zod validation schemas in src/utils/validation.ts:
- createTaskSchema: title (required, 1-200 chars), description (optional, max 5000)
- updateTaskSchema: all fields optional with same constraints
- taskFilterSchema: status enum, limit (1-100, default 10), offset (min 0, default 0)

Also create global error handling middleware that:
- Catches async errors in route handlers
- Returns consistent JSON error responses
- Uses proper HTTP status codes (400 for validation, 404 for not found, 500 for server)
- Doesn't expose stack traces in production
```

**Result:** Complete validation and error handling in `src/middleware/errorHandler.ts`.

---

### Prompt 5: Service Layer (Business Logic)
```
Create TaskService class in src/services/task.service.ts that:
- Takes PrismaClient in constructor
- Has methods: createTask, getTaskById (throw 404 if not found), 
  listTasks with pagination/filtering, updateTask, deleteTask, 
  getTasksByStatus
- Uses Prisma for database operations
- Throws ApiError for errors
- Orders results by createdAt descending
- Includes JSDoc comments for each method
```

**Result:** Enterprise-grade business logic layer with proper error handling.

---

### Prompt 6: Controllers & HTTP Handlers
```
Create TaskController class in src/controllers/task.controller.ts that:
- Takes PrismaClient and initializes TaskService
- Has methods for each CRUD operation (createTask, getTask, listTasks, 
  updateTask, deleteTask, getTasksByStatus)
- Uses asyncHandler to wrap async methods and catch errors
- Validates input with Zod schemas
- Uses TaskService for business logic
- Returns ApiResponse with proper HTTP status (201 for create, 200 for others)
- Includes success messages on create/update/delete
- Binds methods to instance (arrow functions)
```

**Result:** Clean HTTP handler layer in `src/controllers/task.controller.ts`.

---

### Prompt 7: Routes & Server Setup
```
Create:
1. src/routes/task.routes.ts - Router factory function that creates 
   Express routes for all CRUD endpoints
2. src/index.ts - Express server setup that:
   - Initializes Express app and PrismaClient
   - Uses express.json() and express.urlencoded() middleware
   - Mounts routes at /api/tasks
   - Has /health endpoint returning {status: "OK"}
   - Adds global error handling middleware
   - Handles graceful shutdown on SIGINT
   - Loads config from src/config/config.ts
   - Listens on PORT from environment
```

**Result:** Working API server with proper middleware order and graceful shutdown.

---

## 💡 Key Features

✅ **Clean Architecture** - Separated concerns (controllers, services, routes)  
✅ **Type Safe** - Strict TypeScript, no `any` types  
✅ **Validated** - Zod schemas on all inputs  
✅ **Error Handling** - Consistent error responses  
✅ **Professional** - Production-ready code patterns  
✅ **Testable** - Jest setup included  

## 📖 API Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error description"
}
```

**Paginated:**
```json
{
  "success": true,
  "data": [ /* items */ ],
  "total": 42,
  "limit": 10,
  "offset": 0
}
```

## 🔐 Security

- Input validation on all endpoints
- No stack traces in production errors
- SQL injection prevention via Prisma
- Type safety prevents runtime errors
- Environment variables for secrets

## 🏗️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript (strict mode)
- **Framework**: Express.js
- **Database**: SQLite + Prisma ORM
- **Validation**: Zod
- **Testing**: Jest
- **Dev**: ts-node-dev

## 📝 Note

This project demonstrates how to use **Cursor AI effectively** to build enterprise applications:

1. ✅ Define project rules upfront (`.cursorrules`)
2. ✅ Generate database schema iteratively
3. ✅ Create type definitions before implementation
4. ✅ Add validation at the boundaries
5. ✅ Build service layer with business logic
6. ✅ Implement controllers as HTTP handlers
7. ✅ Wire everything together with routes

Each prompt is focused, incremental, and builds upon previous work.

## 📄 License

ISC

---

**Built with ❤️ using Cursor AI**
