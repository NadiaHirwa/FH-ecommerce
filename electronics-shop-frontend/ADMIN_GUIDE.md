# FH-Ecommerce Frontend

Complete React + TypeScript ecommerce platform with public storefront, customer dashboard, employee dashboard, and admin panel.

## Overview

This is a full-featured ecommerce frontend built with React, TypeScript, and Vite. It includes:

- **Public Storefront**: Shop, product details, cart, checkout, order tracking
- **Customer Dashboard**: Orders, wishlist, addresses, profile, support
- **Employee Dashboard**: Orders, inventory, POS, transactions, messages, profile
- **Admin Dashboard**: Product/category/brand management, inventory, orders, customers, employees, promotions, settings

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:5175 by default)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Server (Optional)

A simple Express server is included for file uploads and admin CRUD persistence:

```bash
cd server
npm install
npm start
# Server runs on http://localhost:5176
```

## Project Structure

```
src/
├── components/          # Reusable UI components (Header, Footer, etc.)
├── context/             # React Context (Auth, Cart)
├── pages/               # Page components
│   ├── Dashboard/       # Customer dashboard (Overview, Orders, Wishlist, etc.)
│   ├── EmployeeDashboard/
│   ├── AdminDashboard/  # Admin pages (Products, Orders, Inventory, Customers, etc.)
│   └── [other pages]    # Public pages (Shop, Home, Auth, etc.)
├── utils/               # Utilities (image upload, API helpers)
├── App.tsx              # Main route registry
└── main.tsx             # Entry point
```

## Admin Dashboard Routes

All admin routes require `user.role === 'admin'`.

| Route | Component | Features |
|-------|-----------|----------|
| `/admin` | Overview | KPI cards (Total Products, Stock, Revenue, etc.) |
| `/admin/products` | ProductManagement | CRUD for products, image upload, active/inactive toggle |
| `/admin/categories` | CategoryManagement | CRUD for categories with images/logos |
| `/admin/brands` | BrandManagement | CRUD for brands with images/logos |
| `/admin/inventory` | InventoryAdmin | Stock in/out, low-stock alerts, movement history |
| `/admin/orders` | OrdersAdmin | View/update orders, assign to employees, cancel |
| `/admin/customers` | CustomerManagement | Customer CRUD, view order history, enable/disable |
| `/admin/employees` | EmployeesAdmin | Employee CRUD, role assignment (employee/manager/supervisor) |
| `/admin/promotions` | PromotionsAdmin | Discount codes (CRUD), homepage banners with reordering |
| `/admin/settings` | AdminSettings | Store info, regional settings, payment/delivery methods |

## Employee Dashboard Routes

All employee routes require `user.role === 'employee'` or `user.role === 'admin'`.

| Route | Component | Features |
|--------|-----------|----------|
| `/employee-dashboard` | Overview | Summary of assigned tasks |
| `/employee-dashboard/orders` | AssignedOrders | View & update status of assigned orders |
| `/employee-dashboard/inventory` | Inventory | Add items to inventory, manage stock |
| `/employee-dashboard/sales` | SalesPOS | Point-of-sale system for transactions |
| `/employee-dashboard/transactions` | Transactions | View transaction history (read-only) |
| `/employee-dashboard/messages` | CustomerMessages | View/respond to customer messages |
| `/employee-dashboard/profile` | EmployeeProfile | View & edit profile |
| `/employee-dashboard/password` | ChangePassword | Change password |

## Customer Dashboard Routes

All customer routes require logged-in user (any role).

| Route | Component | Features |
|-------|-----------|----------|
| `/dashboard` | Overview | Account summary |
| `/dashboard/orders` | MyOrders | View all customer orders |
| `/dashboard/wishlist` | Wishlist | Saved products |
| `/dashboard/addresses` | SavedAddresses | Saved delivery addresses |
| `/dashboard/profile` | ProfileSettings | Edit profile info |
| `/dashboard/password` | ChangePassword | Change password |
| `/dashboard/support` | Support | Contact support |

## Authentication

Mock authentication using email-based role assignment:

- **Customer**: Default (no special email substring)
- **Employee**: Email contains "employee" (e.g., `emp@example.com`)
- **Admin**: Email contains "admin" (e.g., `admin@example.com`)

Users are persisted to localStorage via `AuthContext`.

## Data Persistence

All admin/employee/customer data is stored in localStorage with keys:
- `admin_products`, `admin_categories`, `admin_brands`, `admin_orders`, `admin_movements`, `admin_customers`, `admin_employees`, `admin_discounts`, `admin_banners`
- `admin_settings` — store info & regional settings

For persistent server storage, use the included Express server which stores data in JSON files under `server/data/`.

## Image Upload

Images are uploaded via `src/utils/imageUpload.ts`:
- Client-side validation: JPG/PNG/WebP/GIF, max 5MB
- Attempts POST to `/api/upload` (returns URL)
- Falls back to data-URL if server unavailable

## Key Features

### RBAC (Role-Based Access Control)
- AdminDashboardLayout enforces `role === 'admin'`
- EmployeeDashboardLayout enforces `role === 'employee' | 'admin'`
- Non-authorized users redirected to `/login`

### Image Management
- Product thumbnails in management tables
- Banner image uploads with preview
- Category/brand logo uploads

### Inventory Tracking
- Stock in/out with movement history
- Low-stock alerts (<10 units)
- Manual adjustments with reason field

### Promotions
- Discount code CRUD with usage tracking & expiry dates
- Homepage banners with reordering (drag ↑/↓)
- Active/inactive toggles

### Settings
- Store name, email, phone
- Currency & timezone selection
- Tax rate configuration
- Payment method toggles (Card, Bank, UPI)
- Delivery method toggles (Standard, Express, Pickup)

## Development Notes

- **Styling**: Inline CSS (inline-styles) + CSS modules (`.css` files imported)
- **Forms**: Uncontrolled inputs with React state
- **Modals**: Simple overlay pattern with click-outside-to-close
- **Tables**: Responsive tables with inline actions

## Build & Deployment

```bash
# Production build
npm run build

# Output: dist/
#   - index.html
#   - assets/index-*.js (bundled JS)
#   - assets/index-*.css (bundled CSS)
#   - assets/*.jpg (optimized images)
```

Deploy the `dist/` folder to any static hosting (Netlify, Vercel, GitHub Pages, etc.).

## Future Enhancements

- [ ] Unified Transactions page (online + offline)
- [ ] Reports & export (CSV/PDF)
- [ ] Advanced search & filtering across admin pages
- [ ] Real-time notifications (WebSocket)
- [ ] Audit logs for critical actions
- [ ] Integration with payment gateway APIs
- [ ] Email notifications for orders & promotions
- [ ] Mobile app (React Native)

## License

MIT
