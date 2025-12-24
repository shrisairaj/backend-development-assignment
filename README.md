# Backend Development Assignment – Dynamic API Gateway

## Overview

This project implements a dynamic API Gateway using Node.js, Express, and TypeScript that routes incoming HTTP requests to multiple backend services based on a configurable routing table. The gateway centrally manages authentication, rate limiting, request validation, and request forwarding, demonstrating a clean and scalable backend architecture similar to real-world microservices systems.

---

## Architecture

Client requests are sent to a single API Gateway. The gateway validates and processes the request, then dynamically forwards it to the appropriate backend service based on routing rules defined in a configuration file. The response from the backend service is returned directly to the client.

Services involved:
- API Gateway (Port 3000)
- User Service (Port 4001)
- Task Service (Port 4002)

---

## Services Description

### User Service
Runs on port 4001 and exposes the following endpoints:
- GET /users
- GET /profiles

Each endpoint returns a simple JSON response to verify routing.

### Task Service
Runs on port 4002 and exposes the following endpoints:
- GET /tasks
- GET /projects

Each endpoint returns a JSON response confirming successful access.

### API Gateway
Runs on port 3000 and provides:
- Dynamic routing using a configuration file
- JWT-based authentication
- Rate limiting per client/IP
- Request validation
- Request forwarding (headers, query params, body)
- Graceful error handling
- Hot reload support for route configuration

---

## Folder Structure

# Backend Development Assignment – Dynamic API Gateway

## Overview

This project implements a dynamic API Gateway using Node.js, Express, and TypeScript that routes incoming HTTP requests to multiple backend services based on a configurable routing table. The gateway centrally manages authentication, rate limiting, request validation, and request forwarding, demonstrating a clean and scalable backend architecture similar to real-world microservices systems.

---

## Architecture

Client requests are sent to a single API Gateway. The gateway validates and processes the request, then dynamically forwards it to the appropriate backend service based on routing rules defined in a configuration file. The response from the backend service is returned directly to the client.

Services involved:
- API Gateway (Port 3000)
- User Service (Port 4001)
- Task Service (Port 4002)

---

## Services Description

### User Service
Runs on port 4001 and exposes the following endpoints:
- GET /users
- GET /profiles

Each endpoint returns a simple JSON response to verify routing.

### Task Service
Runs on port 4002 and exposes the following endpoints:
- GET /tasks
- GET /projects

Each endpoint returns a JSON response confirming successful access.

### API Gateway
Runs on port 3000 and provides:
- Dynamic routing using a configuration file
- JWT-based authentication
- Rate limiting per client/IP
- Request validation
- Request forwarding (headers, query params, body)
- Graceful error handling
- Hot reload support for route configuration

---

## Folder Structure

Services/
├── user-service/
│ ├── src/
│ │ └── index.ts
│ └── package.json
├── task-service/
│ ├── src/
│ │ └── index.ts
│ └── package.json
└── gateway/
├── src/
│ ├── middleware/
│ │ ├── auth.middleware.ts
│ │ ├── rateLimit.middleware.ts
│ │ └── validate.middleware.ts
│ ├── utils/
│ │ └── loadRoutes.ts
│ ├── config/
│ │ └── routes.json
│ └── index.ts
└── package.json

---

## Dynamic Routing Configuration

Routing is fully driven by a configuration file located at `gateway/src/config/routes.json`.  
Adding or modifying routes does not require any gateway code changes.

Example `routes.json`:

```json
{
  "/users": {
    "target": "http://localhost:4001",
    "methods": ["GET"]
  },
  "/profiles": {
    "target": "http://localhost:4001",
    "methods": ["GET"]
  },
  "/tasks": {
    "target": "http://localhost:4002",
    "methods": ["GET"]
  },
  "/projects": {
    "target": "http://localhost:4002",
    "methods": ["GET"]
  }
}

## Authentication 

All gateway routes are protected using JWT authentication.
Clients must send a valid token in the Authorization header.

Authorization: Bearer <JWT_TOKEN>
Requests without a valid token return 401 Unauthorized.

## Rate Limiting

Rate limiting is applied at the gateway level to restrict the number of requests per client/IP per minute.
If the limit is exceeded, the gateway responds with 429 Too Many Requests.


## Request Validation

The gateway validates incoming requests including headers, query parameters, and request bodies (where applicable).
Invalid requests are rejected with structured JSON error responses.

## Request Forwarding and Error Handling

The gateway forwards all necessary request data (headers, query parameters, and body) to the target backend service.
Responses from backend services are returned directly to the client.
If a backend service is unreachable or times out, the gateway responds with 502 Bad Gateway.

## Hot Reload Support

The gateway supports hot reloading of routing configuration.
Any changes made to routes.json are automatically detected and reloaded without restarting the gateway.

Example log output:
✓ Routes configuration reloaded

## Example Requests

- Get Users (via Gateway) 
- GET http://localhost:3000/users
- Authorization: Bearer <JWT_TOKEN>
- x-client-id: test-client

Response:
{
  "service": "user-service",
  "endpoint": "/users",
  "message": "Users endpoint is working"
}

- Get Tasks (via Gateway)

    GET http://localhost:3000/tasks

Response:
{
  "service": "task-service",
  "endpoint": "/tasks",
  "message": "Tasks endpoint is working"
}


## How to Run the Project
Step 1: Install Dependencies
    Run inside each service folder:
    - npm install
Step 2: Start Backend Services
    - cd user-service
    - npm run dev

    = cd task-service
    = npm run dev
    
Step 3: Start API Gateway  
    - cd gateway
    - npm run dev



