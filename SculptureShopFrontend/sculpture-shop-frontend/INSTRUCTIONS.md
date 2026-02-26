# Frontend Development Instructions

## 🎯 Project Overview

Dhinesh Sculpture Shop - Next.js 16.1.1 frontend with TypeScript, Tailwind CSS, and Zustand state management.

---

## 📁 Project Structure

```
sculpture-shop-frontend/
├── app/                    # Next.js App Router (Pages)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── sculptures/         # Sculpture pages
│   ├── categories/         # Categories page
│   ├── contact/            # Contact form
│   ├── custom-order/       # Custom order form
│   ├── payment/            # Payment info
│   └── admin/              # Admin panel (protected)
│       ├── layout.tsx      # Admin layout with sidebar
│       ├── page.tsx        # Dashboard
│       └── [feature]/      # Admin feature pages
├── components/             # Reusable components
│   ├── index.ts            # Barrel exports
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── api/                    # API service layer
│   ├── client.ts           # Apisauce client config
│   ├── sculptureApi.ts     # Sculpture endpoints
│   ├── categoryApi.ts      # Category endpoints
│   ├── contactApi.ts       # Contact endpoints
│   ├── adminApi.ts         # Admin endpoints
│   └── index.ts            # Barrel exports
├── store/                  # Zustand stores
│   ├── adminStore.ts       # Admin auth state
│   ├── selectedSculpturesStore.ts  # Selection state
│   └── index.ts            # Barrel exports
├── types/                  # TypeScript definitions
│   └── index.ts            # All type definitions
├── utils/                  # Utility functions
│   ├── constants.ts        # App constants
│   ├── helpers.ts          # Helper functions
│   ├── validations.ts      # Form validations
│   └── index.ts            # Barrel exports
└── public/                 # Static assets
```

---

## 🎨 Coding Conventions

### 1. File Naming

- **Pages**: `page.tsx` (Next.js App Router convention)
- **Components**: `PascalCase.tsx` (e.g., `SculptureCard.tsx`)
- **API files**: `camelCase.ts` (e.g., `sculptureApi.ts`)
- **Store files**: `camelCase.ts` (e.g., `adminStore.ts`)
- **Utility files**: `camelCase.ts` (e.g., `helpers.ts`)

### 2. Component Structure

```tsx
"use client"; // Only for client components

// ============================================
// Component Description
// ============================================

import React from "react";
import { ComponentType } from "@/types";
// Import third-party libraries
// Import local components
// Import utilities

interface ComponentProps {
  propName: PropType;
  optional?: PropType;
}

const ComponentName: React.FC<ComponentProps> = ({ propName, optional }) => {
  // State hooks first
  const [state, setState] = useState();

  // Store hooks
  const { data } = useStore();

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Render helpers
  const renderHelper = () => {
    return <div>...</div>;
  };

  // Early returns
  if (!data) return <Loading />;

  // Main render
  return <div className="container">{/* JSX */}</div>;
};

export default ComponentName;
```

### 3. TypeScript Types

All type definitions go in `types/index.ts`:

```typescript
export interface EntityName {
  id: number;
  name: string;
  optional?: string;
  created_at?: string;
}

// Use optional chaining for nullable fields
// Use proper type unions for status fields
type Status = "pending" | "approved" | "rejected";
```

### 4. Import Order

```typescript
// 1. React imports
import React, { useState, useEffect } from "react";

// 2. Next.js imports
import Link from "next/link";
import Image from "next/image";

// 3. Third-party libraries
import { FiHome, FiUser } from "react-icons/fi";

// 4. Types
import { Sculpture, Category } from "@/types";

// 5. Components (using barrel imports)
import { Button, Modal, SculptureCard } from "@/components";

// 6. API functions
import { getSculptures } from "@/api";

// 7. Store hooks
import { useAdminStore } from "@/store";

// 8. Utilities
import { formatPrice, formatDate } from "@/utils";

// 9. Styles (if any)
import styles from "./styles.module.css";
```

---

## 🔌 API Integration Pattern

### API Client Setup (Apisauce)

Location: `api/client.ts`

```typescript
import { create } from "apisauce";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/method";

const apiClient = create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

// Request interceptor for auth token
apiClient.addRequestTransform((request) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  if (token) {
    request.headers = request.headers || {};
    request.headers["Authorization"] = `Bearer ${token}`;
  }
});
```

### API Function Pattern

Location: `api/[feature]Api.ts`

```typescript
import apiClient from "./client";
import { EntityType, ApiResponse } from "@/types";

// GET request with query parameters
export const getEntities = async (filters: FilterType = {}) => {
  return apiClient.get<ApiResponse<EntityType[]>>("/sculpture_shop.api.endpoint_name", {
    param1: filters.param1,
    param2: filters.param2,
    limit: filters.limit || 50,
    offset: filters.offset || 0,
  });
};

// POST request with body
export const createEntity = async (data: Partial<EntityType>) => {
  return apiClient.post<ApiResponse<{ id: number }>>("/sculpture_shop.api.create_endpoint", data);
};

// Always use barrel exports in api/index.ts
```

### API Call Pattern in Components

```typescript
"use client";

import { useState, useEffect } from "react";
import { getSculptures } from "@/api";
import { Sculpture } from "@/types";
import toast from "react-hot-toast";

const SculpturesPage = () => {
  const [sculptures, setSculptures] = useState<Sculpture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSculptures();
  }, []);

  const fetchSculptures = async () => {
    try {
      setLoading(true);
      const response = await getSculptures({ limit: 20 });

      if (response.ok && response.data?.success) {
        setSculptures(response.data.data);
      } else {
        toast.error("Failed to load sculptures");
      }
    } catch (error) {
      console.error("Error fetching sculptures:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      {sculptures.map((sculpture) => (
        <SculptureCard key={sculpture.id} sculpture={sculpture} />
      ))}
    </div>
  );
};
```

### API Response Structure

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
```

---

## 🏪 State Management (Zustand)

### Store Pattern

Location: `store/[feature]Store.ts`

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  // State properties
  data: DataType | null;
  isLoading: boolean;

  // Actions
  setData: (data: DataType) => void;
  clearData: () => void;
  updateData: (updates: Partial<DataType>) => void;
}

export const useFeatureStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      data: null,
      isLoading: false,

      // Actions
      setData: (data) => set({ data }),

      clearData: () => set({ data: null }),

      updateData: (updates) =>
        set((state) => ({
          data: state.data ? { ...state.data, ...updates } : null,
        })),
    }),
    {
      name: "feature-storage", // localStorage key
      // Optional: customize what to persist
      partialize: (state) => ({
        data: state.data,
      }),
    },
  ),
);
```

### Using Stores in Components

```typescript
import { useAdminStore } from "@/store";

const Component = () => {
  // Select only what you need
  const { isAuthenticated, username, login, logout } = useAdminStore();

  // Or select specific fields
  const isAuth = useAdminStore((state) => state.isAuthenticated);

  return <div>{username}</div>;
};
```

---

## 🎨 Styling with Tailwind CSS

### Tailwind Configuration

Use Tailwind utility classes directly in JSX:

```tsx
<div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-4">Title</h1>
  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">Button</button>
</div>
```

### Color Palette

```typescript
// Primary: Amber (Gold theme for sculpture shop)
amber-50, amber-100, ..., amber-900

// Neutral: Gray
gray-50, gray-100, ..., gray-900

// Success: Green
green-500, green-600, green-700

// Danger: Red
red-500, red-600, red-700

// WhatsApp: Green
green-500
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="
  w-full           // Mobile: full width
  md:w-1/2         // Tablet: half width
  lg:w-1/3         // Desktop: third width
  p-4              // Mobile: padding 4
  md:p-6           // Tablet: padding 6
  lg:p-8           // Desktop: padding 8
">
```

---

## 🧩 Component Guidelines

### Button Component

```tsx
import { Button } from "@/components";

<Button
  variant="primary"    // primary | secondary | outline | danger | success | whatsapp
  size="md"            // sm | md | lg
  isLoading={loading}
  leftIcon={<FiPlus />}
  onClick={handleClick}
>
  Click Me
</Button>

// Link button
<Button href="/path" variant="outline">
  Go to Page
</Button>
```

### Loading States

```tsx
import { Loading, PageLoader, SculptureCardSkeleton } from "@/components";

// Full page loader
if (loading) return <PageLoader />;

// Inline loader
{
  loading && <Loading />;
}

// Skeleton loader
{
  loading ? <SculptureCardSkeleton count={6} /> : sculptures.map((s) => <SculptureCard key={s.id} sculpture={s} />);
}
```

### Modal Component

```tsx
import { Modal } from "@/components";

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md" // sm | md | lg | xl
>
  <div>Modal content</div>
</Modal>;
```

---

## 📝 Form Handling (Formik + Yup)

### Form Pattern

```tsx
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, TextArea } from "@/components";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3, "Minimum 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ContactForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await submitContact(values);
      if (response.ok) {
        toast.success("Form submitted successfully");
        resetForm();
      } else {
        toast.error("Submission failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextInput name="name" label="Name" placeholder="Enter your name" />

          <TextInput name="email" type="email" label="Email" placeholder="email@example.com" />

          <TextArea name="message" label="Message" rows={4} />

          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
```

---

## 🔐 Authentication Pattern

### Admin Authentication

```tsx
import { useAdminStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const { isAuthenticated } = useAdminStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <div>Admin Content</div>;
};
```

### Login Flow

```tsx
import { useAdminStore } from "@/store";
import { adminLogin } from "@/api";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login } = useAdminStore();
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      const response = await adminLogin(values.username, values.password);

      if (response.ok && response.data?.success) {
        const { token, admin } = response.data.data;

        // Store token
        localStorage.setItem("admin_token", token);

        // Update store
        login(admin.id, admin.username, admin.full_name);

        toast.success("Login successful");
        router.push("/admin");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};
```

---

## 🖼️ Image Handling

### Next.js Image Component

```tsx
import Image from "next/image";

// External images (configured in next.config.ts)
<Image
  src="https://placehold.co/400x300"
  alt="Sculpture name"
  width={400}
  height={300}
  className="rounded-lg"
  priority  // For above-the-fold images
/>

// Local images
<Image
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={50}
/>

// Responsive images
<div className="relative aspect-video w-full">
  <Image
    src={imageUrl}
    alt={altText}
    fill
    className="object-cover rounded-lg"
  />
</div>
```

### Image Domains (next.config.ts)

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "placehold.co" },
    { protocol: "http", hostname: "localhost" },
    { protocol: "https", hostname: "**.cloudinary.com" },
  ],
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
}
```

---

## 🔍 Error Handling

### API Error Handling

```typescript
try {
  const response = await apiCall();

  if (response.ok && response.data?.success) {
    // Success
    return response.data.data;
  } else {
    // API returned error
    const errorMsg = response.data?.message || "Operation failed";
    toast.error(errorMsg);
    return null;
  }
} catch (error) {
  // Network or unexpected error
  console.error("Error:", error);
  toast.error("An unexpected error occurred");
  return null;
}
```

### Error Boundaries (for production)

```tsx
// app/error.tsx
"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <button onClick={() => reset()} className="bg-amber-600 text-white px-6 py-2 rounded-lg">
        Try again
      </button>
    </div>
  );
}
```

---

## 🚀 Performance Best Practices

### 1. Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <Loading />,
  ssr: false, // Disable SSR if not needed
});
```

### 2. Memoization

```tsx
import { useMemo, useCallback } from "react";

// Memoize expensive calculations
const filteredData = useMemo(() => {
  return data.filter((item) => item.price > minPrice);
}, [data, minPrice]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 3. Skeleton Loading

```tsx
// Show skeleton while loading
{
  loading ? <SculptureCardSkeleton count={6} /> : <SculptureGrid sculptures={sculptures} />;
}
```

---

## 📱 Responsive Design Guidelines

### Breakpoints (Tailwind)

```
sm:  640px  - Mobile landscape
md:  768px  - Tablet
lg:  1024px - Desktop
xl:  1280px - Large desktop
2xl: 1536px - Extra large desktop
```

### Mobile-First Approach

```tsx
<div className="
  grid
  grid-cols-1      {/* Mobile: 1 column */}
  sm:grid-cols-2   {/* Small: 2 columns */}
  md:grid-cols-3   {/* Medium: 3 columns */}
  lg:grid-cols-4   {/* Large: 4 columns */}
  gap-4
">
```

---

## 🔒 Security Best Practices

### 1. Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/method

# Only NEXT_PUBLIC_* variables are exposed to browser
# Others are server-side only
```

### 2. XSS Prevention

```tsx
// Never use dangerouslySetInnerHTML unless absolutely necessary
// If required, sanitize first
import DOMPurify from "isomorphic-dompurify";

const sanitized = DOMPurify.sanitize(htmlContent);
<div dangerouslySetInnerHTML={{ __html: sanitized }} />;
```

### 3. Auth Token Storage

```typescript
// Store JWT in localStorage (for admin only)
localStorage.setItem("admin_token", token);

// Add token to API requests via interceptor
apiClient.addRequestTransform((request) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
});
```

---

## 🧪 Testing Checklist

- [ ] Test on mobile, tablet, and desktop
- [ ] Test with slow network (throttling)
- [ ] Test with browser back/forward buttons
- [ ] Test all form validations
- [ ] Test loading states
- [ ] Test error states
- [ ] Test with and without data
- [ ] Test authentication flows
- [ ] Test image loading and fallbacks
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

---

## 📦 Build & Deployment

### Development

```bash
npm run dev        # Start dev server on port 3000
```

### Production Build

```bash
npm run build      # Build for production
npm start          # Start production server
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/method
```

---

## 🎯 Key Principles

1. **Type Safety**: Use TypeScript everywhere, avoid `any`
2. **Component Reusability**: Build generic, reusable components
3. **Barrel Exports**: Use index.ts for cleaner imports
4. **Error Handling**: Always handle API errors gracefully
5. **Loading States**: Show loading indicators for async operations
6. **Responsive Design**: Mobile-first approach
7. **Accessibility**: Use semantic HTML, alt texts, ARIA labels
8. **Performance**: Lazy load, code split, optimize images
9. **Consistency**: Follow established patterns
10. **Documentation**: Add comments for complex logic

---

## 📚 Quick Reference

### Common Commands

```bash
npm run dev        # Start development
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

### Common Imports

```typescript
// Components
import { Button, Modal, Loading } from "@/components";

// API
import { getSculptures, createSculpture } from "@/api";

// Store
import { useAdminStore, useSelectedStore } from "@/store";

// Types
import { Sculpture, Category, Material } from "@/types";

// Utils
import { formatPrice, formatDate } from "@/utils";

// Toast notifications
import toast from "react-hot-toast";

// Icons
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
```

---

## ❓ Common Patterns

### Fetch and Display Data

```typescript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await getApiData();
    if (response.ok && response.data?.success) {
      setData(response.data.data);
    }
  } catch (error) {
    toast.error("Failed to load data");
  } finally {
    setLoading(false);
  }
};
```

### Conditional Rendering

```tsx
{
  loading && <Loading />;
}
{
  error && <ErrorMessage />;
}
{
  !loading && !error && data.length === 0 && <EmptyState />;
}
{
  !loading && !error && data.length > 0 && <DataList data={data} />;
}
```

### Pagination

```tsx
const [page, setPage] = useState(1);
const limit = 20;

const fetchPage = async () => {
  const response = await getData({
    limit,
    offset: (page - 1) * limit,
  });
};

<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />;
```

---

**Remember**: Consistency is key! Follow these patterns for all new features and modifications.
