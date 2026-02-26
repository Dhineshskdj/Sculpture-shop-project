# Dhinesh Sculpture Shop - Backend API

Node.js/Express backend API for the Sculpture Shop e-commerce application.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **mysql2** - MySQL driver with Promise support
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
SculptureShopBackend/
├── database/                    # SQL files
│   ├── 01_create_database.sql
│   ├── 02_create_tables.sql
│   ├── 03_stored_procedures.sql
│   ├── 04_views.sql
│   └── 05_seed_data.sql
├── src/
│   ├── server.js               # Main entry point
│   ├── config/
│   │   └── database.js         # MySQL connection pool
│   ├── routes/
│   │   ├── sculptureRoutes.js  # Sculpture APIs
│   │   ├── categoryRoutes.js   # Category & Material APIs
│   │   ├── contactRoutes.js    # Contact & Custom Request APIs
│   │   ├── adminRoutes.js      # Admin & Auth APIs
│   │   └── paymentRoutes.js    # Payment Info APIs
│   └── scripts/
│       └── setupDatabase.js    # Database setup script
├── uploads/                     # File uploads directory
├── .env                        # Environment variables
├── .env.example                # Example environment file
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   cd SculptureShopBackend
   npm install
   ```

2. **Configure environment variables:**

   ```bash
   # Copy the example file
   cp .env.example .env

   # Edit .env with your database credentials
   ```

3. **Set up the database:**

   ```bash
   # This will create database, tables, stored procedures, and default admin
   npm run db:setup
   ```

4. **Start the server:**

   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

5. **Server will be running at:** `http://localhost:8000`

## 🔐 Default Admin Credentials

After running `npm run db:setup`:

- **Username:** admin
- **Password:** admin123

⚠️ **Please change this password after first login!**

## 📡 API Endpoints

All endpoints are prefixed with `/api/method/sculpture_shop.api.`

### Sculptures

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| GET    | `get_sculptures`          | Get sculptures with filters |
| GET    | `get_sculptures_count`    | Get count with filters      |
| GET    | `get_sculpture_by_id`     | Get by ID                   |
| GET    | `get_sculpture_by_slug`   | Get by slug                 |
| GET    | `get_sculpture_images`    | Get sculpture images        |
| GET    | `get_featured_sculptures` | Get featured sculptures     |
| GET    | `get_related_sculptures`  | Get related sculptures      |
| POST   | `add_sculpture`           | Add new sculpture           |
| POST   | `update_sculpture`        | Update sculpture            |
| POST   | `delete_sculpture`        | Soft delete sculpture       |

### Categories

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| GET    | `get_categories`            | Get all categories       |
| GET    | `get_category_by_id`        | Get by ID                |
| GET    | `get_categories_with_count` | Get with sculpture count |
| POST   | `add_category`              | Add new category         |
| POST   | `update_category`           | Update category          |
| POST   | `delete_category`           | Soft delete category     |

### Materials

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `get_materials` | Get all materials |
| POST   | `add_material`  | Add new material  |

### Contact Requests

| Method | Endpoint                        | Description     |
| ------ | ------------------------------- | --------------- |
| POST   | `create_contact_request`        | Submit inquiry  |
| GET    | `get_contact_requests`          | Get all (admin) |
| POST   | `update_contact_request_status` | Update status   |

### Custom Requests

| Method | Endpoint                | Description         |
| ------ | ----------------------- | ------------------- |
| POST   | `create_custom_request` | Submit custom order |
| GET    | `get_custom_requests`   | Get all (admin)     |
| POST   | `update_custom_request` | Update request      |

### Admin

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | `admin_login`         | Admin login          |
| GET    | `verify_token`        | Verify JWT token     |
| GET    | `get_dashboard_stats` | Dashboard statistics |
| GET    | `get_site_settings`   | Get site settings    |
| POST   | `update_site_setting` | Update setting       |

### Payment

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `get_payment_info` | Get payment methods |

## 🔒 Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📝 Environment Variables

| Variable       | Description         | Default               |
| -------------- | ------------------- | --------------------- |
| PORT           | Server port         | 8000                  |
| NODE_ENV       | Environment         | development           |
| DB_HOST        | MySQL host          | localhost             |
| DB_PORT        | MySQL port          | 3306                  |
| DB_USER        | MySQL user          | root                  |
| DB_PASSWORD    | MySQL password      |                       |
| DB_NAME        | Database name       | sculptureShop         |
| JWT_SECRET     | JWT signing secret  |                       |
| JWT_EXPIRES_IN | Token expiry        | 7d                    |
| CORS_ORIGIN    | Allowed CORS origin | http://localhost:3000 |

## 🧪 Health Check

```bash
curl http://localhost:8000/api/health
```

Response:

```json
{
  "success": true,
  "message": "Sculpture Shop API is running",
  "timestamp": "2025-01-31T10:00:00.000Z"
}
```

## 📄 License

ISC
