# Noveloper Development Standard

## About This Document

This document serves as the definitive reference for all Noveloper development projects. It contains our standardized architecture patterns, technology choices, development practices, and collaboration methodologies. This is a project-independent guide that should be referenced before starting any new project and consulted throughout the development process.

## Table of Contents

1. [Technical Stack](#technical-stack)
2. [Architecture Principles](#architecture-principles)
3. [Infrastructure Setup](#infrastructure-setup)
4. [Development Workflow](#development-workflow)
5. [Code Standards](#code-standards)
6. [Component Patterns](#component-patterns)
7. [Database Approach](#database-approach)
8. [API Design](#api-design)
9. [Email Integration](#email-integration)
10. [Deployment Strategy](#deployment-strategy)
11. [Performance Optimization](#performance-optimization)
12. [Security Standards](#security-standards)
13. [Testing Methodology](#testing-methodology)
14. [Documentation Guidelines](#documentation-guidelines)
15. [Collaboration Process](#collaboration-process)
16. [Reusable Components Library](#reusable-components-library)

## Technical Stack

### The Noveloper Standard Stack

For all new projects, we use this carefully selected technology stack:

#### Frontend Technologies

| Category | Technology | Justification |
|----------|------------|---------------|
| **Framework** | React with TypeScript | Type safety, component model, extensive ecosystem |
| **Build Tool** | Vite | Fast development experience, optimized builds |
| **Styling** | Tailwind CSS + Shadcn UI | Utility-first approach, consistent design system |
| **Animation** | Framer Motion | Performant animations, intuitive API |
| **State Management** | React Query + Context API | Optimal server state + UI state management |
| **Routing** | Wouter | Lightweight, easy to use router |
| **Form Handling** | React Hook Form + Zod | Performance, validation, type safety |

#### Backend Technologies

| Category | Technology | Justification |
|----------|------------|---------------|
| **Runtime** | Node.js | JavaScript ecosystem consistency |
| **Framework** | Express.js with TypeScript | Flexible, widely adopted, type safety |
| **API Style** | RESTful with TypeScript interfaces | Clear contracts, widely understood |
| **Authentication** | JWT-based when needed | Stateless, scalable |
| **Validation** | Zod schemas | Type safety, consistent validation |

#### Database Solution

| Category | Technology | Justification |
|----------|------------|---------------|
| **Database** | PostgreSQL via Supabase | Robust, relational, managed service |
| **ORM** | Drizzle ORM | Type-safe, lightweight, modern |
| **Migrations** | Drizzle Kit | Seamless schema evolution |

#### Hosting Infrastructure

| Service | Provider | Justification |
|---------|----------|---------------|
| **Frontend Hosting** | Vercel | Performance, developer experience, preview deployments |
| **Backend Hosting** | Railway | Simplicity, dedicated environment, easy scaling |
| **Database Hosting** | Supabase | Managed PostgreSQL, additional features |
| **Domain Management** | Namecheap | User-friendly, fair pricing, good support |
| **Email Service** | MailerSend | Deliverability, developer-friendly API, analytics |

### Technology Evaluation Criteria

When considering new additions to our technology stack:

1. **Developer Experience**: Must provide excellent DX with strong TypeScript support
2. **Community Support**: Must have active community and maintenance
3. **Performance**: Must have minimal impact on application performance
4. **Bundle Size**: Must not significantly increase bundle size (frontend)
5. **Documentation**: Must have comprehensive documentation
6. **License**: Must use compatible open source license
7. **Stability**: Must demonstrate stability in production environments

## Architecture Principles

### Architectural Philosophy

All Noveloper projects follow these fundamental architecture principles:

1. **Separation of Concerns**: Clearly separate frontend, backend, and data layers
2. **Type Safety Throughout**: Consistent types from database to UI
3. **API-First Design**: Well-defined API contracts between frontend and backend
4. **Environment Awareness**: Code that adapts based on environment (dev/prod)
5. **Component-Based Approach**: Everything is a composable component
6. **Stateless When Possible**: Prefer stateless components and functions
7. **Progressive Enhancement**: Core functionality works without JS, enhanced with it

### Frontend Architecture

```
client/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Shadcn UI components
│   │   └── [section].tsx   # Page-specific components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and helpers
│   ├── pages/              # Page components
│   ├── translations/       # Multilingual content
│   └── main.tsx            # Application entry point
```

Key frontend architectural patterns:

1. **Component Hierarchy**:
   - Atomic components (buttons, inputs)
   - Compound components (forms, cards)
   - Section components (page sections)
   - Page components (full pages)

2. **State Management Hierarchy**:
   - Local state for component-specific state
   - Context for shared UI state
   - React Query for server state

3. **Data Flow**:
   - Props for parent-to-child communication
   - Callbacks for child-to-parent communication
   - Context for distant component communication

### Backend Architecture

```
server/
├── index.ts               # Entry point
├── routes.ts              # API route definitions
├── db.ts                  # Database connection
├── storage.ts             # Data access layer
├── emailService.ts        # Email functionality
└── vite.ts                # Dev server integration
```

Key backend architectural patterns:

1. **Layered Architecture**:
   - Routes layer: Request/response handling
   - Service layer: Business logic
   - Data access layer: Database operations

2. **Middleware Pattern**: Use middleware for cross-cutting concerns
   - Authentication/Authorization
   - Request logging
   - Error handling
   - CORS configuration

3. **Environment Adaptation**: Different behavior based on environment
   - Development vs. Production
   - Testing environments

### Shared Code

```
shared/
└── schema.ts              # Shared type definitions
```

Principles for shared code:

1. **Minimal Dependencies**: Limited external dependencies
2. **Type Definitions**: Focus on type definitions and interfaces
3. **Pure Functions**: Stateless utility functions
4. **Framework Agnostic**: Not tied to specific frameworks

## Infrastructure Setup

### Vercel Configuration

Standard setup for all Noveloper frontend projects:

1. **Project Configuration**:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

2. **Environment Variables**:
   - `VITE_API_URL`: Backend API URL
   - `VITE_ENV`: Environment indicator (development/production)
   - `VITE_ANALYTICS_ID`: Analytics ID (when applicable)

3. **Domain Configuration**:
   - Production: `[project].noveloper.ai`
   - Development: `dev-[project].noveloper.ai`

4. **Build Settings**:
   - Node.js version: Latest LTS
   - Included files: Customize as needed
   - Build cache: Enabled

### Railway Configuration

Standard setup for all Noveloper backend projects:

1. **Service Configuration**:
   - Start command: `node railway-start.js`
   - Node.js version: Latest LTS
   - Health check path: `/api/health`

2. **Environment Variables**:
   - `DATABASE_URL`: Database connection string
   - `NODE_ENV`: Environment indicator
   - `PORT`: Server port (usually auto-assigned)
   - `MAILERSEND_API_KEY`: Email service API key
   - `CORS_ORIGIN`: Allowed CORS origins

3. **Domain Configuration**:
   - Production: `api.[project].noveloper.ai`
   - Development: `dev-api.[project].noveloper.ai`

### Supabase Configuration

Standard database setup:

1. **Project Settings**:
   - Region: Choose closest to target audience
   - Pricing plan: Based on project needs
   - Database password: Strong, generated password

2. **Database Settings**:
   - PostgreSQL version: Latest stable
   - Extensions: Enable as needed (e.g., uuid-ossp)

3. **Access Control**:
   - Row-level security: Enabled
   - API access: Restricted to backend service

4. **Environments**:
   - Separate projects for development and production

### Domain Configuration (Namecheap)

Standard DNS configuration for all projects:

1. **DNS Records**:
   - Vercel frontend:
     - `[project].noveloper.ai` → CNAME to Vercel
     - `dev-[project].noveloper.ai` → CNAME to Vercel
   - Railway backend:
     - `api.[project].noveloper.ai` → CNAME to Railway
     - `dev-api.[project].noveloper.ai` → CNAME to Railway

2. **DNS Configuration**:
   - TTL: 5 minutes for development, 1 hour for production
   - HTTPS: Enforced for all domains
   - HSTS: Enabled for production domains

### Email Service (MailerSend)

Standard email service configuration:

1. **Domain Verification**:
   - Verify `noveloper.ai` domain in MailerSend
   - Set up SPF, DKIM, and DMARC records

2. **Sender Identity**:
   - Production: `no-reply@noveloper.ai`
   - Development: `dev@noveloper.ai`

3. **API Configuration**:
   - Create separate API keys for development and production
   - Set appropriate permissions

## Development Workflow

### Environment Setup

Standard local development environment:

1. **Node.js**: Latest LTS version
2. **Package Manager**: npm
3. **Editor**: VSCode with recommended extensions
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript support

4. **Environment Variables**:
   - `.env.local` for local overrides
   - Template `.env.example` provided

### Project Initialization

Steps for starting a new project:

1. **Repository Setup**:
   - Create GitHub repository
   - Set up branch protection rules
   - Configure GitHub Actions

2. **Project Scaffolding**:
   - Clone the Noveloper starter template
   - Update project-specific details
   - Initialize dependencies

3. **Infrastructure Setup**:
   - Set up Vercel project
   - Set up Railway service
   - Create Supabase database
   - Configure domains in Namecheap

### Git Workflow

Standard Git workflow for all projects:

1. **Branching Strategy**:
   - `main`: Production code
   - `development`: Integration branch
   - Feature branches: `feature/feature-name`
   - Bug fixes: `fix/bug-description`

2. **Commit Conventions**:
   - Format: `type(scope): description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Example: `feat(auth): add login form`

3. **Pull Request Process**:
   - Descriptive title and description
   - Link to relevant issues
   - Screenshots for UI changes
   - Passing tests and linting

### CI/CD Workflow

Standard continuous integration and deployment:

1. **On Pull Request**:
   - Run tests
   - Run linters
   - Build check
   - Deploy preview environment

2. **On Merge to Development**:
   - Deploy to development environment
   - Run integration tests
   - Notify team of deployment

3. **On Merge to Main**:
   - Deploy to production environment
   - Run production verification tests
   - Notify team of production deployment

## Code Standards

### TypeScript Standards

1. **Type Definitions**:
   ```typescript
   // Prefer interfaces for object definitions
   interface User {
     id: number;
     username: string;
     email: string;
     createdAt: Date;
   }
   
   // Use type aliases for unions, intersections
   type Status = 'pending' | 'active' | 'inactive';
   ```

2. **Nullability**:
   ```typescript
   // Explicitly handle nullability
   function getUserName(user: User | null): string {
     return user ? user.username : 'Guest';
   }
   ```

3. **Type Assertions**:
   ```typescript
   // Use as for type assertions when necessary
   const element = document.getElementById('root') as HTMLElement;
   ```

4. **Generics**:
   ```typescript
   // Use generics for reusable components/functions
   function getFirst<T>(array: T[]): T | undefined {
     return array[0];
   }
   ```

### React Standards

1. **Component Definition**:
   ```tsx
   // Function component with TypeScript props
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     children: React.ReactNode;
     onClick?: () => void;
   }
   
   export function Button({
     variant = 'primary',
     children,
     onClick,
   }: ButtonProps) {
     return (
       <button
         className={`btn btn-${variant}`}
         onClick={onClick}
       >
         {children}
       </button>
     );
   }
   ```

2. **Hooks Usage**:
   ```tsx
   // State hooks
   const [count, setCount] = useState<number>(0);
   
   // Effect hooks with dependencies
   useEffect(() => {
     document.title = `Count: ${count}`;
   }, [count]);
   
   // Custom hooks
   function useUser(userId: number) {
     return useQuery({
       queryKey: ['/api/users', userId],
     });
   }
   ```

3. **Event Handling**:
   ```tsx
   // Typed event handlers
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setName(e.target.value);
   };
   ```

### CSS Standards

1. **Tailwind Usage**:
   ```tsx
   // Component with Tailwind classes
   <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md">
     <h2 className="text-xl font-bold text-gray-800">Title</h2>
     <p className="text-gray-600">Content goes here</p>
   </div>
   ```

2. **Responsive Design**:
   ```tsx
   // Mobile-first responsive approach
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {/* Grid items */}
   </div>
   ```

3. **Component Classes with @apply**:
   ```css
   /* For repeating patterns */
   .card {
     @apply p-6 bg-white rounded-lg shadow-md;
   }
   ```

### API Standards

1. **Endpoint Structure**:
   - Format: `/api/resource/:id`
   - Example: `/api/users/123`

2. **Request/Response Format**:
   - Content-Type: `application/json`
   - Response structure:
     ```json
     {
       "success": true,
       "data": { /* Result data */ },
       "error": null
     }
     ```

3. **Error Handling**:
   - Use appropriate status codes
   - Error response structure:
     ```json
     {
       "success": false,
       "data": null,
       "error": {
         "code": "VALIDATION_ERROR",
         "message": "Invalid input"
       }
     }
     ```

## Component Patterns

### UI Component Patterns

1. **Button Component**:
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'secondary' | 'danger';
     size?: 'sm' | 'md' | 'lg';
     children: React.ReactNode;
     onClick?: () => void;
     disabled?: boolean;
     fullWidth?: boolean;
   }
   
   export function Button({
     variant = 'primary',
     size = 'md',
     children,
     onClick,
     disabled = false,
     fullWidth = false,
   }: ButtonProps) {
     return (
       <button
         className={cn(
           'rounded font-medium transition-colors',
           {
             'bg-primary text-white hover:bg-primary/90': variant === 'primary',
             'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
             'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
             'px-2 py-1 text-sm': size === 'sm',
             'px-4 py-2': size === 'md',
             'px-6 py-3 text-lg': size === 'lg',
             'w-full': fullWidth,
           }
         )}
         onClick={onClick}
         disabled={disabled}
       >
         {children}
       </button>
     );
   }
   ```

2. **Card Component**:
   ```tsx
   interface CardProps {
     title?: string;
     children: React.ReactNode;
     footer?: React.ReactNode;
   }
   
   export function Card({ title, children, footer }: CardProps) {
     return (
       <div className="bg-white rounded-lg shadow-md overflow-hidden">
         {title && (
           <div className="px-6 py-4 border-b">
             <h3 className="text-lg font-medium">{title}</h3>
           </div>
         )}
         <div className="p-6">{children}</div>
         {footer && (
           <div className="px-6 py-4 bg-gray-50 border-t">
             {footer}
           </div>
         )}
       </div>
     );
   }
   ```

### Form Patterns

1. **Input Component**:
   ```tsx
   interface InputProps {
     label: string;
     name: string;
     type?: string;
     placeholder?: string;
     error?: string;
     value: string;
     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
     required?: boolean;
   }
   
   export function Input({
     label,
     name,
     type = 'text',
     placeholder,
     error,
     value,
     onChange,
     required = false,
   }: InputProps) {
     return (
       <div className="mb-4">
         <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
           {label}{required && <span className="text-red-500">*</span>}
         </label>
         <input
           id={name}
           name={name}
           type={type}
           className={cn(
             'w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary',
             { 'border-red-500': error }
           )}
           placeholder={placeholder}
           value={value}
           onChange={onChange}
           required={required}
         />
         {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
       </div>
     );
   }
   ```

2. **Form Component with React Hook Form**:
   ```tsx
   interface FormData {
     name: string;
     email: string;
     message: string;
   }
   
   const formSchema = z.object({
     name: z.string().min(2, 'Name is too short'),
     email: z.string().email('Invalid email address'),
     message: z.string().min(10, 'Message is too short'),
   });
   
   export function ContactForm() {
     const form = useForm<FormData>({
       resolver: zodResolver(formSchema),
       defaultValues: {
         name: '',
         email: '',
         message: '',
       },
     });
     
     const onSubmit = async (data: FormData) => {
       try {
         await fetch('/api/contact', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data),
         });
         toast.success('Form submitted successfully!');
         form.reset();
       } catch (error) {
         toast.error('Failed to submit form');
       }
     };
     
     return (
       <form onSubmit={form.handleSubmit(onSubmit)}>
         {/* Form fields */}
       </form>
     );
   }
   ```

### Data Fetching Patterns

1. **React Query Pattern**:
   ```tsx
   function UserProfile({ userId }: { userId: number }) {
     const { data, isLoading, error } = useQuery({
       queryKey: ['/api/users', userId],
     });
     
     if (isLoading) return <LoadingSpinner />;
     if (error) return <ErrorMessage error={error} />;
     
     return (
       <div>
         <h1>{data.name}</h1>
         <p>{data.email}</p>
       </div>
     );
   }
   ```

2. **Mutation Pattern**:
   ```tsx
   function CreatePost() {
     const queryClient = useQueryClient();
     const mutation = useMutation({
       mutationFn: (newPost) => {
         return fetch('/api/posts', {
           method: 'POST',
           body: JSON.stringify(newPost),
         });
       },
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
         toast.success('Post created!');
       },
     });
     
     return (
       <form onSubmit={(e) => {
         e.preventDefault();
         mutation.mutate({ title, content });
       }}>
         {/* Form fields */}
       </form>
     );
   }
   ```

## Database Approach

### Drizzle Schema Definition

Standard approach to schema definition:

```typescript
// shared/schema.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// User table definition
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Derived types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

// Validation schemas
export const insertUserSchema = createInsertSchema(users);
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions);
```

### Storage Interface Pattern

Standard approach to data access:

```typescript
// server/storage.ts
import { users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface definition
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Additional methods as needed
}

// Database implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
}

// Memory implementation for development/testing
export class MemoryStorage implements IStorage {
  // Implementation details...
}

// Export based on environment
export const storage = process.env.NODE_ENV === 'production' 
  ? new DatabaseStorage() 
  : new MemoryStorage();
```

### Database Connection Pattern

Standard database connection setup:

```typescript
// server/db.ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// WebSocket configuration for Neon serverless
neonConfig.webSocketConstructor = ws;

// Validate database URL
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create connection pool
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// Initialize Drizzle with our schema
export const db = drizzle({ client: pool, schema });
```

### Migration Approach

Standard approach to database migrations:

1. **Migration Generation**:
   ```bash
   # Generate migrations based on schema changes
   npm run db:generate
   ```

2. **Migration Application**:
   ```bash
   # Apply migrations to the database
   npm run db:push
   ```

3. **Migration Structure**:
   - Migrations stored in `drizzle` directory
   - Each migration in separate file with timestamp
   - Migration tracking table in database

## API Design

### Route Definition Pattern

Standard approach to API routes:

```typescript
// server/routes.ts
import { Express, Request, Response } from "express";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { sendContactFormEmail } from "./emailService";

export async function registerRoutes(app: Express) {
  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });
  
  // Contact form submission
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const result = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid form data',
            details: result.error.errors,
          },
        });
      }
      
      // Store in database
      await storage.createContactSubmission(result.data);
      
      // Send email notification
      await sendContactFormEmail(result.data);
      
      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Failed to process contact form',
        },
      });
    }
  });
  
  // Additional routes...
}
```

### CORS Configuration

Standard CORS setup:

```typescript
// server/index.ts
import cors from 'cors';

// Determine allowed origins
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://noveloper.ai']
  : ['http://localhost:5000', 'http://localhost:3000'];

// Configure CORS
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'), false);
    }
    
    return callback(null, true);
  },
  credentials: true,
}));
```

### Error Handling Middleware

Standard error handling:

```typescript
// server/index.ts
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('API Error:', err);
  
  // Default error response
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';
  
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: message,
    },
  });
});
```

## Email Integration

### Email Service Pattern

Standard email service implementation:

```typescript
// server/emailService.ts
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// Initialize MailerSend
const apiKey = process.env.MAILERSEND_API_KEY;
if (!apiKey) {
  throw new Error('MAILERSEND_API_KEY must be set');
}

const mailerSend = new MailerSend({ apiKey });

// Create email sender
const createSender = (): Sender => {
  return new Sender(
    process.env.EMAIL_FROM || 'no-reply@noveloper.ai',
    process.env.EMAIL_FROM_NAME || 'Noveloper'
  );
};

// Contact form email interface
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Send contact form email
export async function sendContactFormEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const recipients = [
      new Recipient(process.env.CONTACT_EMAIL || 'contact@noveloper.ai', 'Noveloper Contact')
    ];
    
    const emailParams = new EmailParams()
      .setFrom(createSender())
      .setTo(recipients)
      .setReplyTo(new Recipient(formData.email, formData.name))
      .setSubject('New Contact Form Submission')
      .setHtml(`
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `)
      .setText(`
        New Contact Form Submission
        
        Name: ${formData.name}
        Email: ${formData.email}
        
        Message:
        ${formData.message}
      `);
    
    await mailerSend.email.send(emailParams);
    return true;
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    return false;
  }
}

// Newsletter subscription email
export async function sendNewsletterConfirmation(email: string): Promise<boolean> {
  try {
    const recipients = [new Recipient(email)];
    
    const emailParams = new EmailParams()
      .setFrom(createSender())
      .setTo(recipients)
      .setSubject('Newsletter Subscription Confirmation')
      .setHtml(`
        <h1>Thank you for subscribing!</h1>
        <p>You've been added to our newsletter. We'll keep you updated with our latest news and updates.</p>
      `)
      .setText(`
        Thank you for subscribing!
        
        You've been added to our newsletter. We'll keep you updated with our latest news and updates.
      `);
    
    await mailerSend.email.send(emailParams);
    return true;
  } catch (error) {
    console.error('Failed to send newsletter confirmation:', error);
    return false;
  }
}
```

## Deployment Strategy

### Environment Separation

Standard environment architecture:

1. **Production Environment**:
   - Frontend: `[project].noveloper.ai` (Vercel)
   - Backend API: `api.[project].noveloper.ai` (Railway)
   - Database: Production PostgreSQL instance (Supabase)

2. **Development Environment**:
   - Frontend: `dev-[project].noveloper.ai` (Vercel)
   - Backend API: `dev-api.[project].noveloper.ai` (Railway)
   - Database: Development PostgreSQL instance (Supabase)

3. **Local Development**:
   - Frontend + Backend: `localhost:5000` (Vite + Express)
   - Database: Local or development instance

### Deployment Workflow

Standard deployment process:

1. **Code Changes**:
   - Developer makes changes in feature branch
   - Developer creates pull request to development

2. **Review Process**:
   - Automated tests and checks run
   - Preview environment deployed
   - Code review conducted

3. **Development Deployment**:
   - PR merged to development branch
   - Automatic deployment to development environment
   - QA testing in development environment

4. **Production Deployment**:
   - Development merged to main
   - Automatic deployment to production
   - Verification of production deployment

### Rollback Strategy

Standard rollback process:

1. **Identify Issue**:
   - Monitor for errors post-deployment
   - Confirm issue is related to recent deployment

2. **Immediate Rollback**:
   - Revert the problematic changes in GitHub
   - Automatic redeployment of previous version

3. **Database Handling**:
   - If schema changes occurred, determine rollback approach
   - Execute appropriate schema rollback if needed

4. **Post-Rollback**:
   - Verify system stability after rollback
   - Investigate root cause of the issue

## Performance Optimization

### Frontend Performance

Standard frontend optimizations:

1. **Code Splitting**:
   ```typescript
   // Lazy loaded route
   import { lazy, Suspense } from 'react';
   
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   
   function App() {
     return (
       <Suspense fallback={<Loading />}>
         <Routes>
           <Route path="/dashboard" element={<Dashboard />} />
         </Routes>
       </Suspense>
     );
   }
   ```

2. **Image Optimization**:
   ```tsx
   // Responsive images
   <img
     src={imagePath}
     srcSet={`${smallImage} 400w, ${mediumImage} 800w, ${largeImage} 1200w`}
     sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
     loading="lazy"
     alt="Description"
   />
   ```

3. **Component Memoization**:
   ```tsx
   // Memoized component
   import { memo } from 'react';
   
   function ExpensiveComponent({ data }) {
     // Complex rendering logic
   }
   
   export default memo(ExpensiveComponent);
   ```

### Backend Performance

Standard backend optimizations:

1. **Query Optimization**:
   ```typescript
   // Select only needed fields
   const users = await db
     .select({
       id: users.id,
       username: users.username,
     })
     .from(users)
     .limit(10);
   ```

2. **Indexing Strategy**:
   ```typescript
   // Add index to frequently queried column
   email: text("email").notNull().unique().index(),
   ```

3. **Response Compression**:
   ```typescript
   // Enable compression
   import compression from 'compression';
   
   app.use(compression());
   ```

### Database Performance

Standard database optimizations:

1. **Connection Pooling**:
   ```typescript
   // Configured connection pool
   export const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     max: 20, // Maximum connections
     idleTimeoutMillis: 30000, // Connection timeout
   });
   ```

2. **Batched Operations**:
   ```typescript
   // Batch insert
   await db
     .insert(table)
     .values(largeArrayOfValues);
   ```

3. **Transaction Usage**:
   ```typescript
   // Use transactions for multiple operations
   await db.transaction(async (tx) => {
     await tx.insert(users).values(newUser);
     await tx.insert(profiles).values(newProfile);
   });
   ```

## Security Standards

### Authentication Pattern

Standard authentication implementation:

```typescript
// server/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set');
}

// Generate token
export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// Verify token
export function verifyToken(token: string): { userId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Authentication middleware
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      },
    });
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      },
    });
  }
  
  // Get user from database
  const user = await storage.getUser(decoded.userId);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      },
    });
  }
  
  // Attach user to request
  req.user = user;
  next();
}
```

### Input Validation Pattern

Standard input validation:

```typescript
// Validate request body with Zod
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

app.post('/api/users', (req, res) => {
  const result = userSchema.safeParse(req.body);
  
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input',
        details: result.error.errors,
      },
    });
  }
  
  // Process valid data
});
```

### Security Headers

Standard security headers:

```typescript
// Add security headers
import helmet from 'helmet';

app.use(helmet());
app.use((req, res, next) => {
  // Custom CSP
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  next();
});
```

## Testing Methodology

### Component Testing Pattern

Standard component testing approach:

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('renders disabled state', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### API Testing Pattern

Standard API testing approach:

```typescript
// contact.test.ts
import request from 'supertest';
import { app } from '../server';
import { storage } from '../server/storage';

jest.mock('../server/emailService', () => ({
  sendContactFormEmail: jest.fn().mockResolvedValue(true),
}));

describe('Contact API', () => {
  test('creates contact submission with valid data', async () => {
    const mockSubmission = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message',
    };
    
    const response = await request(app)
      .post('/api/contact')
      .send(mockSubmission)
      .expect(200);
    
    expect(response.body.success).toBe(true);
    
    // Verify database call
    expect(storage.createContactSubmission).toHaveBeenCalledWith(mockSubmission);
    
    // Verify email was sent
    expect(sendContactFormEmail).toHaveBeenCalledWith(mockSubmission);
  });
  
  test('returns validation error with invalid data', async () => {
    const invalidSubmission = {
      name: '',
      email: 'not-an-email',
      message: '',
    };
    
    const response = await request(app)
      .post('/api/contact')
      .send(invalidSubmission)
      .expect(400);
    
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
```

## Documentation Guidelines

### Code Documentation

Standard code documentation patterns:

1. **Function Documentation**:
   ```typescript
   /**
    * Sends a contact form submission via email
    * 
    * @param formData - The contact form data
    * @returns A promise that resolves to a boolean indicating success
    */
   export async function sendContactFormEmail(formData: ContactFormData): Promise<boolean> {
     // Implementation
   }
   ```

2. **Component Documentation**:
   ```typescript
   /**
    * Button component for user interactions
    * 
    * @example
    * <Button variant="primary" onClick={handleClick}>
    *   Submit
    * </Button>
    */
   export function Button({ variant, children, onClick }: ButtonProps) {
     // Implementation
   }
   ```

3. **Interface Documentation**:
   ```typescript
   /**
    * Represents a user in the system
    * 
    * @property id - Unique identifier
    * @property username - User's username
    * @property email - User's email address
    * @property createdAt - When the user was created
    */
   interface User {
     id: number;
     username: string;
     email: string;
     createdAt: Date;
   }
   ```

### Project Documentation

Standard project documentation structure:

1. **README.md**:
   - Project overview
   - Getting started
   - Development workflow
   - Environment setup
   - Deployment instructions

2. **PROJECT-OVERVIEW.md**:
   - Detailed project description
   - Architecture overview
   - Key features
   - Technical decisions

3. **DEVELOPMENT-GUIDE.md**:
   - Development workflow
   - Code standards
   - Testing approach
   - Common patterns

4. **DEPLOYMENT-GUIDE.md**:
   - Deployment process
   - Environment setup
   - Monitoring and logging
   - Troubleshooting

## Collaboration Process

### Communication Channels

Standard collaboration channels:

1. **Project Management**:
   - GitHub Projects for task tracking
   - Clear task descriptions and acceptance criteria
   - Priority labels for task importance

2. **Code Review Process**:
   - Pull request templates
   - Required reviews before merging
   - Automated checks for quality

3. **Knowledge Sharing**:
   - Documentation updates with code changes
   - Sharing of learnings and patterns
   - Regular collaboration sessions

### Project Stages

Standard project lifecycle:

1. **Initiation**:
   - Requirement gathering
   - Architecture planning
   - Technology selection

2. **Setup**:
   - Repository creation
   - Infrastructure setup
   - CI/CD configuration

3. **Development**:
   - Feature implementation
   - Progressive enhancement
   - Continuous integration

4. **Testing**:
   - Automated testing
   - Manual verification
   - Performance testing

5. **Deployment**:
   - Staging deployment
   - Final verification
   - Production deployment

6. **Maintenance**:
   - Monitoring and logging
   - Bug fixes and improvements
   - Documentation updates

## Reusable Components Library

Noveloper maintains a growing library of reusable components that can be leveraged across projects:

### UI Components

1. **Buttons**: Standard button styles and behaviors
2. **Forms**: Input components with validation
3. **Layout**: Containers, grids, and spacing components
4. **Navigation**: Menus, tabs, and breadcrumbs
5. **Feedback**: Alerts, toasts, and modals
6. **Data Display**: Tables, lists, and cards

### Functional Components

1. **Authentication**: Login, registration, and profile management
2. **Data Fetching**: Standardized data fetching patterns
3. **Forms**: Form handling with validation
4. **Internationalization**: Language selection and content translation
5. **Theme Switching**: Light/dark mode and theme customization

### Utility Hooks

1. **useForm**: Form handling with validation
2. **useLocalStorage**: Persistent local storage state
3. **useMediaQuery**: Responsive design helpers
4. **useDebounce**: Debounced value updates
5. **usePrevious**: Access previous state values

---

## Conclusion

This Noveloper Development Standard serves as the foundation for all our development projects. By adhering to these patterns, practices, and principles, we ensure:

1. **Consistency**: Uniform approach across all projects
2. **Quality**: High-quality, maintainable code
3. **Efficiency**: Rapid development through reuse
4. **Scalability**: Architecture that supports growth
5. **Security**: Built-in security best practices
6. **Performance**: Optimized for user experience
7. **Maintainability**: Easy to understand and extend

As we continue to build projects together, this document will evolve to incorporate new learnings, patterns, and best practices.