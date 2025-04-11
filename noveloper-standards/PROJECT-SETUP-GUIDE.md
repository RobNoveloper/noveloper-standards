# Noveloper Project Setup Guide

This guide walks through the process of setting up a new Noveloper project following our standards. Use this guide to quickly bootstrap a new project with our standard architecture and tools.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Step 1: Initialize Project

Start by creating a new directory for your project and initializing it:

```bash
# Create project directory
mkdir project-name
cd project-name

# Initialize Git repository
git init

# Initialize npm project
npm init -y

# Add .gitignore
cat > .gitignore << EOF
node_modules/
.env
.env.local
.DS_Store
dist/
build/
*.log
.vscode/
EOF
```

## Step 2: Install Core Dependencies

Install the core dependencies for the project:

```bash
# Install dependencies
npm install react react-dom wouter tailwindcss postcss autoprefixer
npm install @tanstack/react-query framer-motion zod react-hook-form @hookform/resolvers
npm install express cors

# Install dev dependencies
npm install -D typescript @types/react @types/react-dom @types/express @types/node
npm install -D vite @vitejs/plugin-react
```

## Step 3: Set Up TypeScript

Create a TypeScript configuration file:

```bash
cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"],
      "@server/*": ["./server/*"],
      "@assets/*": ["./client/src/assets/*"]
    }
  },
  "include": ["client/src", "server", "shared"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

cat > tsconfig.node.json << EOF
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF
```

## Step 4: Set Up Project Structure

Create the basic project structure:

```bash
# Create directories
mkdir -p client/src/{assets,components,contexts,hooks,lib,pages,styles,types}
mkdir -p server/{controllers,middleware,services,utils}
mkdir -p shared
mkdir -p scripts

# Create basic files
touch client/src/main.tsx
touch client/src/App.tsx
touch server/index.ts
touch server/routes.ts
touch shared/schema.ts
```

## Step 5: Configure Tailwind CSS

Set up Tailwind CSS:

```bash
# Create Tailwind configuration
cat > tailwind.config.js << EOF
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './client/src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOF

cat > postcss.config.js << EOF
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
```

## Step 6: Create Theme Configuration

Create a theme.json file for the application's theme:

```bash
cat > theme.json << EOF
{
  "primary": "#6D28D9",
  "variant": "professional",
  "appearance": "light",
  "radius": 8
}
EOF
```

## Step 7: Set Up Vite Configuration

Configure Vite for the project:

```bash
cat > vite.config.ts << EOF
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
      '@server': path.resolve(__dirname, './server'),
      '@assets': path.resolve(__dirname, './client/src/assets'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
EOF
```

## Step 8: Set Up CSS Variables

Create a global styles file with CSS variables:

```bash
cat > client/src/styles/globals.css << EOF
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    
    --primary: 267 70% 50%;
    --primary-foreground: 210 40% 98%;
    
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    
    --accent: 267 70% 95%;
    --accent-foreground: 222.2 47.4% 11.2%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 267 70% 50%;
    
    --radius: 0.5rem;
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    
    --primary: 267 70% 50%;
    --primary-foreground: 210 40% 98%;
    
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    
    --accent: 267 70% 30%;
    --accent-foreground: 210 40% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 267 70% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
EOF
```

## Step 9: Create Basic Frontend Files

Create the main application files:

```bash
# Create main.tsx
cat > client/src/main.tsx << EOF
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create App.tsx
cat > client/src/App.tsx << EOF
import React from 'react';
import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

// Home page component
function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Welcome to Noveloper
        </h1>
        <p className="text-lg text-muted-foreground">
          Your new project is ready to go!
        </p>
      </div>
    </div>
  );
}

// Main App component
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </QueryClientProvider>
  );
}
EOF
```

## Step 10: Create Basic Backend Files

Set up the Express server:

```bash
# Create server/index.ts
cat > server/index.ts << EOF
import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Register API routes
registerRoutes(app);

// Start the server
app.listen(PORT, () => {
  console.log(\`Server is now listening on port \${PORT}\`);
});
EOF

# Create server/routes.ts
cat > server/routes.ts << EOF
import { Express, Request, Response } from 'express';

export function registerRoutes(app: Express) {
  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'API is running' });
  });
  
  // Example endpoint
  app.get('/api/example', (req: Request, res: Response) => {
    res.json({
      success: true,
      data: {
        message: 'This is an example API response',
        timestamp: new Date(),
      },
    });
  });
}
EOF
```

## Step 11: Create Basic Shared Schema

Set up the database schema:

```bash
# Create shared/schema.ts
cat > shared/schema.ts << EOF
import { z } from 'zod';

// Example user schema
export const userSchema = z.object({
  id: z.number(),
  username: z.string().min(3),
  email: z.string().email(),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
EOF
```

## Step 12: Set Up Package.json Scripts

Update package.json with the necessary scripts:

```bash
npm pkg set scripts.dev="concurrently \"npm run dev:client\" \"npm run dev:server\""
npm pkg set scripts.dev:client="vite"
npm pkg set scripts.dev:server="tsx watch server/index.ts"
npm pkg set scripts.build="npm run build:client && npm run build:server"
npm pkg set scripts.build:client="vite build"
npm pkg set scripts.build:server="tsc -p tsconfig.server.json"
npm pkg set scripts.start="node dist/server/index.js"
npm pkg set scripts.preview="vite preview"
npm pkg set scripts.lint="eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"

# Install additional dependencies for development scripts
npm install -D concurrently tsx
```

## Step 13: Initialize Git Repository

Commit the initial project setup:

```bash
git add .
git commit -m "Initial project setup"
```

## Step 14: Add Standard Components

Copy the standard components from the noveloper-standards repository:

1. Copy `noveloper-standards/templates/Button.tsx` to `client/src/components/ui/Button.tsx`
2. Copy `noveloper-standards/templates/Form.tsx` to `client/src/components/ui/Form.tsx`
3. Copy `noveloper-standards/templates/Layout.tsx` to `client/src/components/ui/Layout.tsx`
4. Copy `noveloper-standards/templates/api-client.ts` to `client/src/lib/api-client.ts`

## Step 15: Start Development

Start the development server:

```bash
npm run dev
```

Your project is now set up according to Noveloper standards and ready for development!

## Next Steps

1. Implement authentication if needed
2. Set up database connections
3. Create additional pages and components
4. Update the README with project-specific information

Refer to the other guides in the noveloper-standards repository for more detailed information on specific aspects of development.