# Dhinesh Sculpture Shop - Project Setup & Run Instructions

## Project Overview

A showcase website for Dhinesh Sculpture Shop located in Tamil Nadu, India. This is **NOT** an e-commerce website - it's a showcase platform where:

- Customers can browse sculptures
- Select sculptures they're interested in
- Contact the shop via WhatsApp or contact form
- Request custom sculptures
- View payment information (GPay/UPI)

---

## Tech Stack

### Frontend

- **Framework**: Next.js 16.1.1 (React 19.2.3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand with persist middleware
- **Form Handling**: Formik + Yup
- **API Client**: Apisauce
- **Notifications**: react-hot-toast
- **Icons**: react-icons

### Backend

- **Runtime**: Node.js 18.x+
- **Framework**: Express.js 4.21.0
- **Database**: MySQL2 (MySQL 8.x)
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer
- **API Style**: REST API with stored procedures

---

## Frontend Setup

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd SculptureShopFrontend/sculpture-shop-frontend

# Install dependencies
npm install
```

### Dependencies (package.json)

```json
{
  "dependencies": {
    "next": "^16.1.1",
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "formik": "^2.4.6",
    "yup": "^1.6.1",
    "apisauce": "^3.1.1",
    "zustand": "^5.0.5",
    "react-hot-toast": "^2.5.2",
    "react-icons": "^5.5.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "typescript": "^5",
    "@tailwindcss/postcss": "^4"
  }
}
```

### Running the Frontend

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start
```

The frontend will be available at: `http://localhost:3000`

### Environment Configuration

Create `.env.local` in the frontend root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/method
```

**Note**: The backend runs on port 8000, frontend on port 3000.

---

## Database Setup

### Prerequisites

- MySQL 8.x

### Database Configuration

- Host: 127.0.0.1
- Port: 3306
- Database: sculptureShop
- Username: root
- Password: Dj@28112003

### Running SQL Scripts

Execute the SQL files in order:

```bash
# Connect to MySQL
mysql -u root -p

# Run scripts in order
source database/01_create_database.sql
source database/02_create_tables.sql
source database/03_stored_procedures.sql
source database/04_views.sql
source database/05_seed_data.sql
```

### Database Tables

1. **categories** - Sculpture categories
2. **materials** - Stone materials (Granite, Marble, etc.)
3. **sculptures** - Main sculpture records
4. **sculpture_images** - Multiple images per sculpture
5. **contact_requests** - Customer inquiries
6. **custom_requests** - Custom sculpture orders
7. **admin_users** - Admin login credentials
8. **site_settings** - Website settings
9. **payment_info** - UPI/Payment details

### Default Admin Credentials

- Username: `admin`
- Password: `admin123`

---

## Backend Setup (Node.js + Express)

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MySQL 8.x installed and running

### Installation

```bash
# Navigate to backend directory
cd SculptureShopBackend

# Install dependencies
npm install
```

### Dependencies (package.json)

```json
{
  "dependencies": {
    "express": "^4.21.0",
    "mysql2": "^3.11.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.4.5",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

### Environment Configuration

Create a `.env` file in the `SculptureShopBackend` root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Dj@28112003
DB_NAME=sculptureShop

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### Database Setup

Before running the backend, ensure the database is set up:

```bash
# Option 1: Run the setup script (automatically runs all SQL files)
node src/scripts/setupDatabase.js

# Option 2: Manual setup via MySQL CLI
mysql -u root -p < database/01_create_database.sql
mysql -u root -p < database/02_create_tables.sql
mysql -u root -p < database/03_stored_procedures.sql
mysql -u root -p < database/04_views.sql
mysql -u root -p < database/05_seed_data.sql
```

### Running the Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will be available at: `http://localhost:8000`

### API Endpoints

All APIs are prefixed with `/api/method/` to maintain compatibility:

**Public Endpoints:**

- `GET /api/method/sculptures.get_sculptures` - List sculptures with filters
- `GET /api/method/sculptures.get_sculpture_by_slug` - Get sculpture details
- `GET /api/method/categories.get_categories` - List categories
- `POST /api/method/contact.submit_contact_request` - Submit inquiry
- `POST /api/method/contact.submit_custom_request` - Submit custom order
- `GET /api/method/payment.get_payment_info` - Get payment details

**Admin Endpoints (require JWT token):**

- `POST /api/method/admin.login` - Admin login
- `GET /api/method/admin.get_dashboard_stats` - Dashboard statistics
- `POST /api/method/sculptures.create_sculpture` - Add sculpture
- `PUT /api/method/sculptures.update_sculpture` - Update sculpture
- `DELETE /api/method/sculptures.delete_sculpture` - Delete sculpture
- `GET /api/method/contact.get_contact_requests` - List inquiries
- `GET /api/method/contact.get_custom_requests` - List custom orders
- `PUT /api/method/contact.update_contact_request_status` - Update inquiry status

### Backend Architecture

```
SculptureShopBackend/
├── src/
│   ├── server.js              # Main entry point
│   ├── config/
│   │   └── database.js        # MySQL connection & stored procedure helper
│   ├── routes/
│   │   ├── sculptureRoutes.js # Sculpture endpoints
│   │   ├── categoryRoutes.js  # Category endpoints
│   │   ├── contactRoutes.js   # Contact/Custom request endpoints
│   │   ├── adminRoutes.js     # Admin authentication & management
│   │   └── paymentRoutes.js   # Payment info endpoints
│   └── scripts/
│       └── setupDatabase.js   # Database initialization script
├── database/                   # SQL schema & seed data
├── uploads/                    # Uploaded sculpture images
├── .env                        # Environment variables (create this)
├── .env.example               # Environment template
└── package.json               # Dependencies
```

### Testing the Backend

```bash
# Test if server is running
curl http://localhost:8000/api/health

# Test getting sculptures
curl http://localhost:8000/api/method/sculptures.get_sculptures

# Test getting categories
curl http://localhost:8000/api/method/categories.get_categories
```

---

## Project Structure

```
SculptureShopFrontend/
└── sculpture-shop-frontend/
    ├── app/                    # Next.js App Router pages
    │   ├── layout.tsx          # Root layout
    │   ├── page.tsx            # Home page
    │   ├── sculptures/         # Sculptures listing & detail
    │   ├── categories/         # Categories page
    │   ├── selected/           # Selected sculptures
    │   ├── contact/            # Contact form
    │   ├── custom-order/       # Custom order form
    │   ├── payment/            # Payment info page
    │   └── admin/              # Admin pages (protected)
    │       ├── layout.tsx      # Admin layout with sidebar
    │       ├── login/          # Admin login
    │       ├── page.tsx        # Dashboard
    │       ├── sculptures/     # Manage sculptures
    │       ├── categories/     # Manage categories
    │       ├── inquiries/      # Customer inquiries
    │       └── custom-requests/# Custom orders
    ├── components/             # Reusable components
    │   ├── layout/             # Header, Footer
    │   └── ui/                 # Button, Modal, Forms, etc.
    ├── api/                    # API service layer
    ├── store/                  # Zustand stores
    ├── types/                  # TypeScript interfaces
    └── utils/                  # Helpers, validations, constants

SculptureShopBackend/
└── database/
    ├── 01_create_database.sql
    ├── 02_create_tables.sql
    ├── 03_stored_procedures.sql
    ├── 04_views.sql
    └── 05_seed_data.sql
```

---

## Features

### Public Features

- ✅ Browse sculptures with search & filters
- ✅ View sculpture details with image gallery
- ✅ Add sculptures to selection (like cart, but for inquiry)
- ✅ Contact form with selected sculptures context
- ✅ Custom sculpture request form
- ✅ WhatsApp integration for direct contact
- ✅ Payment information page (UPI/GPay)
- ✅ Responsive design for all devices

### Admin Features

- ✅ Protected admin routes
- ✅ Dashboard with stats overview
- ✅ Manage sculptures (Add/Edit/Delete)
- ✅ Manage categories
- ✅ View and respond to inquiries
- ✅ Manage custom sculpture requests
- ✅ Update status tracking

---

## Shop Contact Information

- **Shop Name**: Dhinesh Sculpture Shop
- **Phone 1**: 9159948127
- **Phone 2**: 9150235455
- **Email**: selvaraj2031974@gmail.com
- **WhatsApp**: +91 9159948127
- **Location**: Tamil Nadu, India
- **UPI ID**: selvaraj2031974@okicici

---

## Development Notes

### Running in Development

1. **Start the database (MySQL)**

   ```bash
   # Ensure MySQL is running on port 3306
   ```

2. **Setup and run the backend:**

   ```bash
   cd SculptureShopBackend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run dev
   # Backend runs on http://localhost:8000
   ```

3. **Setup and run the frontend:**

   ```bash
   cd SculptureShopFrontend/sculpture-shop-frontend
   npm install
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

4. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`
   - Backend API: `http://localhost:8000/api/method`

### Current State

**✅ Completed:**

- Frontend (Next.js + TypeScript + Tailwind CSS)
- Backend (Node.js + Express.js)
- Database schema with stored procedures
- Admin authentication with JWT
- File upload handling with Multer
- All CRUD operations for sculptures, categories, inquiries
- API integration between frontend and backend

**🔄 Ready to Use:**
Both frontend and backend are fully functional and ready for deployment.

### Testing Admin Access

1. Go to `http://localhost:3000/admin/login`
2. Use credentials: `admin` / `admin123`
3. Access dashboard and manage content

---

## Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 3000
npx kill-port 3000
```

**Module not found errors:**

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**TypeScript errors:**

```bash
# Check types
npm run lint
```

---

## Future Enhancements

1. Image optimization and compression
2. Email notifications for inquiries
3. SMS notifications via Twilio/similar service
4. Enhanced analytics dashboard
5. SEO optimization with metadata
6. PWA support for offline access
7. Multi-language support (Tamil/English)
8. CDN integration for image delivery
9. Rate limiting and API security enhancements
10. Automated backup system
