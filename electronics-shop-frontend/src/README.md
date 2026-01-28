# ElectroShop Frontend - Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Site header with navigation
│   ├── Footer/         # Site footer
│   ├── ProductCard/    # Product card component
│   ├── Cart/           # Cart-related components
│   └── Navigation/     # Navigation components
├── pages/              # Page components (routes)
│   ├── Home/           # Home page
│   ├── ProductDetail/  # Product detail page
│   ├── Cart/           # Shopping cart page
│   ├── Checkout/       # Checkout page
│   └── Profile/        # User profile page
├── context/            # React Context for state management
│   └── CartContext.tsx # Cart context and provider
├── hooks/              # Custom React hooks
│   └── useProducts.ts  # Products fetching hook
├── services/           # API services
│   └── api.ts          # API client
├── types/              # TypeScript type definitions
│   └── index.ts        # All app types
├── utils/              # Utility functions
│   └── helpers.ts      # Helper functions
├── styles/             # Global styles
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global CSS with Tailwind
```

## Component Structure

Each component folder typically contains:
- `ComponentName.tsx` - Component file
- `ComponentName.css` - Component styles
- `index.ts` (optional) - For easier imports

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file:
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Recharts** - Data visualization
- **Vite** - Build tool

## Features

- Product listing with filtering
- Shopping cart management
- User authentication
- Order tracking
- Responsive design

## API Integration

The app communicates with a backend API through the `services/api.ts` file. Update the `API_BASE_URL` environment variable to point to your backend server.

## State Management

Currently using React Context for cart management. Can be extended to Redux or Zustand if needed.

## Best Practices

- Keep components small and focused
- Use custom hooks for shared logic
- Type all props with TypeScript interfaces
- Use utility-first CSS with Tailwind
- Follow the existing folder structure
