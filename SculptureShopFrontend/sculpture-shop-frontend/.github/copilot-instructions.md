# Dhinesh Sculpture Shop - Project Documentation

> **For AI Agents & Developers**: This document provides comprehensive information about the Sculpture Shop project to enable accurate code generation, modifications, and assistance.

---

## 📋 Project Overview

**Dhinesh Sculpture Shop** is a full-stack e-commerce web application for showcasing and selling handcrafted sculptures. The shop is based in Tamil Nadu, India, and specializes in God statues, custom sculptures, and memorial pieces.

### Business Context

- **Owner**: Selvaraj & Son (Dhinesh)
- **Location**: Tamil Nadu, India
- **Contact**: 9159948127, 9150235455
- **WhatsApp**: +91 9150235455
- **Email**: selvaraj2031974@gmail.com

---

## 🛠️ Technology Stack

### Frontend

| Technology              | Version | Purpose                                        |
| ----------------------- | ------- | ---------------------------------------------- |
| **Next.js**             | 16.x    | React framework with App Router                |
| **React**               | 19.x    | UI library                                     |
| **TypeScript**          | 5.x     | Type-safe JavaScript                           |
| **Tailwind CSS**        | 4.x     | Utility-first CSS framework                    |
| **Zustand**             | 4.5.x   | State management                               |
| **Apisauce**            | 3.x     | API client (wrapper around Axios)              |
| **Formik + Yup**        | Latest  | Form handling & validation                     |
| **Framer Motion**       | 11.x    | Animations                                     |
| **React Icons**         | 5.x     | Icon library (using Feather icons - Fi prefix) |
| **React Hot Toast**     | 2.x     | Toast notifications                            |
| **React Image Gallery** | 1.3.x   | Image gallery component                        |

### Backend

| Technology            | Version | Purpose                                  |
| --------------------- | ------- | ---------------------------------------- |
| **Node.js**           | 18+     | JavaScript runtime environment           |
| **Express.js**        | 4.x     | Web framework for API routes             |
| **MySQL**             | 8.0+    | Relational database                      |
| **mysql2**            | 3.x     | MySQL driver with Promise support        |
| **JWT**               | 9.x     | JSON Web Token for authentication        |
| **bcryptjs**          | 2.x     | Password hashing                         |
| **Stored Procedures** | -       | All database operations executed via SPs |
| **cors**              | 2.x     | Cross-Origin Resource Sharing            |
| **dotenv**            | 16.x    | Environment variable management          |

---

## 📁 Project Structure

### Frontend Structure

```
sculpture-shop-frontend/
├── .github/
│   └── copilot-instructions.md    # This file
├── api/                           # API layer
│   ├── client.ts                  # Apisauce client configuration
│   ├── index.ts                   # API exports
│   ├── sculptureApi.ts            # Sculpture-related APIs
│   ├── categoryApi.ts             # Category & Material APIs
│   ├── contactApi.ts              # Contact & Custom request APIs
│   └── adminApi.ts                # Admin-only APIs
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                 # Root layout with Header, Footer
│   ├── page.tsx                   # Homepage
│   ├── globals.css                # Global styles (Tailwind)
│   ├── sculptures/
│   │   ├── page.tsx               # Sculptures listing
│   │   └── [slug]/page.tsx        # Sculpture detail page
│   ├── categories/page.tsx        # Categories listing
│   ├── contact/page.tsx           # Contact form
│   ├── custom-order/page.tsx      # Custom sculpture request
│   ├── payment/page.tsx           # Payment information
│   ├── selected/page.tsx          # Selected sculptures cart
│   └── admin/                     # Admin panel
│       ├── layout.tsx             # Admin layout with auth check
│       ├── page.tsx               # Admin dashboard
│       ├── login/page.tsx         # Admin login
│       ├── sculptures/
│       │   ├── page.tsx           # Manage sculptures
│       │   └── new/page.tsx       # Add new sculpture
│       ├── categories/page.tsx    # Manage categories
│       ├── inquiries/page.tsx     # View contact requests
│       └── custom-requests/page.tsx
├── components/
│   ├── index.ts                   # Component exports
│   ├── layout/
│   │   ├── Header.tsx             # Site header with navigation
│   │   └── Footer.tsx             # Site footer
│   └── ui/
│       ├── Button.tsx             # Reusable button component
│       ├── FormInputs.tsx         # Form input components
│       ├── ImageGallery.tsx       # Image gallery wrapper
│       ├── Loading.tsx            # Loading spinner/skeleton
│       ├── Modal.tsx              # Modal dialog component
│       ├── SculptureCard.tsx      # Sculpture card for listings
│       ├── SearchFilter.tsx       # Search & filter component
│       └── WhatsAppButton.tsx     # WhatsApp floating button
├── store/                         # Zustand state stores
│   ├── index.ts                   # Store exports
│   ├── selectedSculpturesStore.ts # Cart/selection state
│   └── adminStore.ts              # Admin auth state
├── types/
│   └── index.ts                   # TypeScript interfaces
├── utils/
│   ├── index.ts                   # Utility exports
│   ├── constants.ts               # App constants
│   ├── helpers.ts                 # Utility functions
│   └── validations.ts             # Yup validation schemas
└── public/                        # Static assets
```

### Backend Structure

```
SculptureShopBackend/
├── database/                      # SQL files
│   ├── 01_create_database.sql    # Database creation
│   ├── 02_create_tables.sql      # Table definitions
│   ├── 03_stored_procedures.sql  # All stored procedures
│   ├── 04_views.sql              # Database views
│   └── 05_seed_data.sql          # Initial data
├── src/
│   ├── server.js                 # Express server entry point
│   ├── config/
│   │   └── database.js           # MySQL connection pool
│   ├── routes/                   # API route handlers
│   │   ├── sculptureRoutes.js   # Sculpture endpoints
│   │   ├── categoryRoutes.js    # Category & Material endpoints
│   │   ├── contactRoutes.js     # Contact & Custom request endpoints
│   │   ├── adminRoutes.js       # Admin & auth endpoints
│   │   └── paymentRoutes.js     # Payment info endpoints
│   └── scripts/
│       └── setupDatabase.js      # Database setup utility
├── uploads/                       # File upload directory
├── .env                          # Environment variables
├── .env.example                  # Environment template
├── package.json                  # Dependencies
└── README.md                     # Backend documentation
```

---

## 🎨 Coding Patterns & Conventions

### Frontend Patterns

#### 1. Component Structure

```tsx
"use client"; // Only for client components

// ============================================
// Component Name
// ============================================

import React from "react";
// External imports first
import { FiIcon } from "react-icons/fi";
// Internal imports
import { ComponentName } from "@/components";
import { useStoreName } from "@/store";
import { TypeName } from "@/types";
import { helperFunction } from "@/utils";

interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // Hooks first
  const { storeValue } = useStoreName();

  // Event handlers
  const handleClick = () => {};

  return <div className="tailwind-classes">{/* JSX content */}</div>;
};

export default ComponentName;
```

#### 2. API Call Pattern

```typescript
// Always use typed responses
const response = await getSculptures(filters);

if (response.ok && response.data?.data) {
  // Handle success
  const sculptures = response.data.data;
} else {
  // Handle error
  toast.error(response.data?.message || "Error occurred");
}
```

#### 3. Path Aliases

Always use path aliases for imports:

- `@/components` - Components
- `@/api` - API functions
- `@/store` - Zustand stores
- `@/types` - TypeScript types
- `@/utils` - Utility functions

#### 4. Styling Conventions

- Use **Tailwind CSS** for all styling
- Color scheme: **Amber** (primary), **Gray** (neutral)
- Common classes:
  - Primary button: `bg-amber-800 hover:bg-amber-900 text-white`
  - Secondary button: `bg-gray-200 hover:bg-gray-300 text-gray-800`
  - Card shadow: `shadow-md hover:shadow-xl`
  - Transitions: `transition-all duration-300`

#### 5. Icon Usage

Use **React Icons** with **Feather icons** (Fi prefix):

```tsx
import { FiPlus, FiEdit, FiTrash2, FiEye, FiCheck } from "react-icons/fi";
```

### Backend Patterns

#### 1. Route Handler Structure

```javascript
// ============================================
// Route Description
// ============================================

const express = require("express");
const router = express.Router();
const { callProcedure } = require("../config/database");

// GET /api/method/sculpture_shop.api.endpoint_name
router.get("/sculpture_shop.api.endpoint_name", async (req, res) => {
  try {
    const { param1, param2 } = req.query;

    // Validate required parameters
    if (!param1) {
      return res.status(400).json({
        success: false,
        message: "Parameter is required",
      });
    }

    // Call stored procedure
    const results = await callProcedure("sp_procedure_name", [param1, param2 || null]);

    // Return response
    res.json({
      success: true,
      message: "Data retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Operation failed",
    });
  }
});

module.exports = router;
```

#### 2. Database Operations

All database operations use **stored procedures**:

```javascript
// Call a stored procedure
const { callProcedure } = require("../config/database");

// Execute with parameters
const results = await callProcedure("sp_get_sculptures", [
  categoryId || null,
  materialId || null,
  minPrice || null,
  maxPrice || null,
]);

// Results are returned as array
// Access first result: results[0]
// Access all results: results
```

#### 3. Response Format

All API responses follow this structure:

```javascript
// Success response
res.json({
  success: true,
  message: "Operation successful",
  data: results, // Can be object, array, or null
});

// Error response
res.status(errorCode).json({
  success: false,
  message: "Error description",
});
```

#### 4. Authentication Middleware

```javascript
// JWT token verification
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
```

#### 5. Environment Variables

Always use environment variables for configuration:

```javascript
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const DB_HOST = process.env.DB_HOST || "localhost";
const JWT_SECRET = process.env.JWT_SECRET;
```

---

## 📊 Data Types

### Core Interfaces

```typescript
interface Sculpture {
  id: number;
  name: string;
  slug: string;
  description?: string;
  dimensions?: string;
  height_cm?: number;
  width_cm?: number;
  depth_cm?: number;
  weight_kg?: number;
  price: number;
  is_featured: boolean;
  is_available: boolean;
  view_count: number;
  category_id?: number;
  category_name?: string;
  material_id?: number;
  material_name?: string;
  primary_image?: string;
  images?: SculptureImage[];
  created_at?: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  display_order: number;
  sculpture_count?: number;
}

interface Material {
  id: number;
  name: string;
  description?: string;
}

interface ContactRequest {
  id?: number;
  customer_name: string;
  mobile_number: string;
  email?: string;
  message?: string;
  selected_sculpture_ids?: number[];
  request_type?: "general" | "inquiry" | "quotation";
  status?: "pending" | "contacted" | "completed" | "cancelled";
}

interface CustomRequest {
  id?: number;
  customer_name: string;
  mobile_number: string;
  email?: string;
  reference_image_url?: string;
  sculpture_type?: string;
  preferred_material?: string;
  expected_height?: string;
  expected_width?: string;
  expected_depth?: string;
  expected_price?: number;
  description?: string;
  special_requirements?: string;
  status?: "pending" | "reviewed" | "quoted" | "accepted" | "in_progress" | "completed" | "cancelled";
}

interface SculptureFilters {
  category_id?: number;
  material_id?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  is_featured?: boolean;
  limit?: number;
  offset?: number;
}
```

---

## 🔌 API Reference

### Base Configuration

- **Base URL**: `http://localhost:8000/api/method`
- **Timeout**: 30 seconds
- **Auth**: Bearer token in `Authorization` header

### API Endpoints

#### Sculptures

| Function                          | Endpoint                                      | Method |
| --------------------------------- | --------------------------------------------- | ------ |
| `getSculptures(filters)`          | `/sculpture_shop.api.get_sculptures`          | GET    |
| `getSculpturesCount(filters)`     | `/sculpture_shop.api.get_sculptures_count`    | GET    |
| `getSculptureById(id)`            | `/sculpture_shop.api.get_sculpture_by_id`     | GET    |
| `getSculptureBySlug(slug)`        | `/sculpture_shop.api.get_sculpture_by_slug`   | GET    |
| `getSculptureImages(id)`          | `/sculpture_shop.api.get_sculpture_images`    | GET    |
| `getFeaturedSculptures(limit)`    | `/sculpture_shop.api.get_featured_sculptures` | GET    |
| `getRelatedSculptures(id, limit)` | `/sculpture_shop.api.get_related_sculptures`  | GET    |
| `addSculpture(data)`              | `/sculpture_shop.api.add_sculpture`           | POST   |
| `updateSculpture(id, data)`       | `/sculpture_shop.api.update_sculpture`        | POST   |
| `deleteSculpture(id)`             | `/sculpture_shop.api.delete_sculpture`        | POST   |

#### Categories & Materials

| Function                   | Endpoint                                 | Method |
| -------------------------- | ---------------------------------------- | ------ |
| `getCategories()`          | `/sculpture_shop.api.get_categories`     | GET    |
| `getCategoryById(id)`      | `/sculpture_shop.api.get_category_by_id` | GET    |
| `getMaterials()`           | `/sculpture_shop.api.get_materials`      | GET    |
| `addCategory(data)`        | `/sculpture_shop.api.add_category`       | POST   |
| `updateCategory(id, data)` | `/sculpture_shop.api.update_category`    | POST   |

#### Contact & Custom Requests

| Function                                        | Endpoint                                            | Method |
| ----------------------------------------------- | --------------------------------------------------- | ------ |
| `submitContactRequest(data)`                    | `/sculpture_shop.api.create_contact_request`        | POST   |
| `getContactRequests(status, limit, offset)`     | `/sculpture_shop.api.get_contact_requests`          | GET    |
| `updateContactRequestStatus(id, status, notes)` | `/sculpture_shop.api.update_contact_request_status` | POST   |
| `submitCustomRequest(data)`                     | `/sculpture_shop.api.create_custom_request`         | POST   |
| `getCustomRequests(status, limit, offset)`      | `/sculpture_shop.api.get_custom_requests`           | GET    |

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
```

---

## 🗃️ State Management (Zustand)

### Selected Sculptures Store

Manages the "cart" of sculptures users want to inquire about:

```typescript
const {
  selectedSculptures, // Array of selected sculptures
  addSculpture, // Add sculpture to selection
  removeSculpture, // Remove by ID
  clearSculptures, // Clear all
  isSculptureSelected, // Check if selected
  getSelectedCount, // Get count
} = useSelectedSculpturesStore();
```

### Admin Store

Manages admin authentication state:

```typescript
const {
  isAuthenticated, // Auth status
  adminId, // Admin user ID
  username, // Admin username
  fullName, // Admin full name
  login, // Login function
  logout, // Logout function
} = useAdminStore();
```

Both stores use `persist` middleware for localStorage persistence.

---

## 🧰 Utility Functions

Located in `utils/helpers.ts`:

| Function                             | Description                         |
| ------------------------------------ | ----------------------------------- |
| `formatPrice(price)`                 | Format as Indian Rupees (₹1,00,000) |
| `formatDate(dateString)`             | Format date (01 Jan 2025)           |
| `formatDateTime(dateString)`         | Format with time                    |
| `generateSlug(text)`                 | Generate URL-safe slug              |
| `truncateText(text, maxLength)`      | Truncate with ellipsis              |
| `validateMobileNumber(mobile)`       | Validate Indian mobile              |
| `validateEmail(email)`               | Validate email format               |
| `getPlaceholderImage(width, height)` | Get placeholder image URL           |
| `formatDimensions(h, w, d)`          | Format dimensions string            |

---

## 🗄️ Database Schema

### Tables

1. **categories** - Product categories
2. **materials** - Sculpture materials (marble, granite, etc.)
3. **sculptures** - Main product table
4. **sculpture_images** - Multiple images per sculpture
5. **contact_requests** - Customer inquiries
6. **custom_requests** - Custom sculpture requests
7. **admin_users** - Admin authentication
8. **payment_info** - Payment methods (UPI, bank)
9. **site_settings** - Configurable settings

### Key Relationships

- Sculpture → Category (many-to-one)
- Sculpture → Material (many-to-one)
- Sculpture → SculptureImages (one-to-many)

---

## 🔐 Authentication

### Admin Authentication Flow

1. Admin submits credentials on `/admin/login`
2. Backend validates and returns token
3. Token stored in `localStorage` as `admin_token`
4. Zustand store updated with admin info
5. All admin API calls include Bearer token
6. Admin layout checks auth state, redirects if not authenticated

---

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Common responsive patterns:

```tsx
// Grid layouts
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

// Responsive text
className = "text-2xl md:text-3xl lg:text-4xl";

// Hide/show on mobile
className = "hidden md:block"; // Hide on mobile
className = "block md:hidden"; // Show only on mobile
```

---

## 🚀 Development Commands

### Frontend

```bash
# Navigate to frontend
cd SculptureShopFrontend/sculpture-shop-frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Backend

```bash
# Navigate to backend
cd SculptureShopBackend

# Install dependencies
npm install

# Set up database (first time only)
npm run db:setup

# Run development server (with auto-reload)
npm run dev

# Run production server
npm start
```

---

## 📝 Common Tasks for AI Agents

### Frontend Tasks

#### Adding a New Page

1. Create file in `app/` directory following Next.js App Router conventions
2. Use `"use client"` directive if client-side interactivity needed
3. Import components from `@/components`
4. Follow existing component structure pattern

#### Adding a New API Function

1. Add to appropriate file in `api/` directory
2. Use typed generics with `ApiResponse<T>`
3. Export from `api/index.ts`
4. Follow existing naming conventions

#### Adding a New Component

1. Create in `components/ui/` for reusable UI components
2. Create in `components/layout/` for layout components
3. Export from `components/index.ts`
4. Use TypeScript interfaces for props
5. Follow existing styling patterns with Tailwind

#### Adding to Store

1. Create new store in `store/` directory
2. Use Zustand's `create` function
3. Add `persist` middleware if data should survive refresh
4. Export from `store/index.ts`

### Backend Tasks

#### Adding a New API Endpoint

1. Identify the appropriate route file in `src/routes/`
2. Create route handler following the pattern:
   ```javascript
   router.get("/sculpture_shop.api.endpoint_name", async (req, res) => {
     try {
       const results = await callProcedure("sp_name", [params]);
       res.json({ success: true, message: "Success", data: results });
     } catch (error) {
       res.status(500).json({ success: false, message: error.message });
     }
   });
   ```
3. Export the router: `module.exports = router;`
4. If new route file, add to `src/server.js`

#### Creating a New Stored Procedure

1. Add to `database/03_stored_procedures.sql`
2. Follow existing SP naming: `sp_verb_noun` (e.g., `sp_get_sculptures`)
3. Use delimiter syntax:
   ```sql
   DELIMITER //
   DROP PROCEDURE IF EXISTS sp_name//
   CREATE PROCEDURE sp_name(IN p_param1 INT)
   BEGIN
     -- SQL logic
   END//
   DELIMITER ;
   ```
4. Run `npm run db:setup` to apply changes

#### Adding Database Tables

1. Add to `database/02_create_tables.sql`
2. Follow naming conventions (lowercase with underscores)
3. Always include: `created_at`, `updated_at`, `is_active`
4. Run `npm run db:setup` to create table

---

## ⚠️ Important Notes for AI Agents

### Frontend Rules

1. **Always use TypeScript** - No plain JavaScript files in frontend
2. **Use path aliases** - Never use relative imports like `../../`
3. **Follow existing patterns** - Check similar files for conventions
4. **Tailwind only** - No inline styles or CSS modules
5. **Feather icons** - Use `Fi` prefix icons from react-icons
6. **Toast notifications** - Use `react-hot-toast` for user feedback
7. **API responses** - Always check `response.ok` before accessing data
8. **Form handling** - Use Formik + Yup for forms
9. **State persistence** - Zustand stores use localStorage
10. **Indian locale** - Prices in INR, Indian date formats, Indian mobile validation

### Backend Rules

1. **Use JavaScript (CommonJS)** - Backend uses Node.js with `require/module.exports`
2. **All DB operations via SPs** - Never write raw SQL queries in routes
3. **Always use try-catch** - Wrap all async operations
4. **Consistent responses** - Use `{ success, message, data }` format
5. **Validate inputs** - Check required parameters before SP calls
6. **Use environment variables** - Access via `process.env.VAR_NAME`
7. **JWT for auth** - Use Bearer token in Authorization header
8. **CORS configured** - Frontend URL allowed in CORS origin
9. **Error logging** - Always log errors with `console.error()`
10. **Stored procedures return arrays** - Access results with `results[0]` or iterate

---

## 🔗 External Resources

### Frontend

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Apisauce](https://github.com/infinitered/apisauce)
- [Formik](https://formik.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

### Backend

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [mysql2 Package](https://github.com/sidorares/node-mysql2)
- [JWT Documentation](https://jwt.io/introduction)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
