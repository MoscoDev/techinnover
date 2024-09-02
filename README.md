# E-Commerce API

This project is a backend API for an e-commerce system built using NestJS. It includes user authentication, role-based access control (RBAC), product management, and status history tracking for product approvals.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Product Management](#product-management)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register, login, and manage user sessions with JWT tokens.
- **Role-Based Access Control (RBAC)**: Admin and User roles with specific permissions.
- **Product Management**: Create, update, delete, and list products. Admins can approve or reject products.
- **Pagination**: Paginate results for product listings.
- **Swagger API Documentation**: API documentation using Swagger.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Authentication**: JWT
- **Database**: PostgreSQL (TypeORM)
- **API Documentation**: Swagger

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later) or Yarn
- PostgreSQL (or any other supported database)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root of your project and configure the following environment variables:

```env
# Server
PORT=4000

# Database
DB_HOST=dpg-cqph9qtsvqrc73frh6dg-a.oregon-postgres.render.com
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=qDphuo9G0PvQnKA0RnEw76Gr5hOY3Bx9
DB_DATABASE=etap_lms

# JWT
JWT_SECRET=hc1MiUaBVUQZ2ai94cjTxW4tDW3vF0g9
JWT_EXPIRES_IN=3600s
```

### Database Setup

1. **Create the database:**

   ```bash
   createdb your_db_name
   ```

2. **Run migrations:**

   If you are using TypeORM migrations:

   ```bash
   npm run typeorm migration:run
   ```

   or with yarn:

   ```bash
   yarn typeorm migration:run
   ```

### Running the Application

1. **Development mode:**

   ```bash
   npm run start:dev
   ```

   or with yarn:

   ```bash
   yarn start:dev
   ```

2. **Production mode:**

   ```bash
   npm run start:prod
   ```

   or with yarn:

   ```bash
   yarn start:prod
   ```

## API Documentation

The API documentation is automatically generated using Swagger. Once the server is running, you can access the documentation at:
    ```
        http://localhost:3000/api
    ```

## Project Structure

        src/
        │
        ├── auth/                     # Authentication and authorization
        │   ├── jwt.strategy.ts       # JWT strategy for authentication
        │   ├── auth.module.ts        # Authentication module
        │   ├── auth.service.ts       # Authentication service
        │   ├── auth.controller.ts    # Authentication controller
        │
        ├── products/                 # Product management
        │   ├── dto/                  # Data transfer objects for products
        │   ├── product.entity.ts     # Product entity definition
        │   ├── product-status-history.entity.ts # Status history entity definition
        │   ├── product.service.ts    # Product service
        │   ├── product.controller.ts # Product controller
        │
        ├── users/                    # User management
        │   ├── user.entity.ts        # User entity definition
        │   ├── user.service.ts       # User service
        │   ├── user.controller.ts    # User controller
        │
        ├── common/                   # Shared modules and utilities
        │   ├── dto/                  # Shared DTOs for pagination
        │   ├── guards/               # Shared guards (e.g., RolesGuard)
        │
        └── app.module.ts             # Root module

## Usage

### Authentication

- **Register**: `POST /auth/register`
- **Login**: `POST /auth/login`
- **Profile**: `GET /auth/profile` (requires JWT token)

### Product Management

- **Create Product**: `POST /products` (User role required)
- **Get My Products**: `GET /products/my` (User role required)
- **Get All Approved Products**: `GET /products`
- **Get Product by ID**: `GET /products/:id` (User role required)
- **Update Product**: `PATCH /products/:id` (User role required)
- **Delete Product**: `DELETE /products/:id` (User role required)
- **Update Product Status**: `PATCH /products/:id/status` (Admin role required)

### User Management

- **Get User Profile**: `GET /users/profile` (User role required)
- **Get All Users**: `GET /users` (Admin role required)
- **Ban/Unban User**: `PATCH /users/:id/ban` (Admin role required)

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-new-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-new-feature`).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Key Points Covered in the README

- **Project Overview**: Describes the purpose and main features of the project.
- **Tech Stack**: Lists the technologies used.
- **Installation Instructions**: Provides detailed steps to set up the project locally.
- **Environment Variables**: Lists the necessary environment variables.
- **Database Setup**: Instructions on setting up the database.
- **Running the Application**: Details on how to start the application in different modes.
- **API Documentation**: Instructions on accessing the Swagger UI.
- **Project Structure**: A brief overview of the project's directory structure.
- **Usage**: Example API endpoints and their descriptions.
- **Contributing**: Guidelines on how to contribute to the project.
- **License**: Specifies the project's license.

This README serves as a comprehensive guide for both developers setting up the project and users interacting with the API.
