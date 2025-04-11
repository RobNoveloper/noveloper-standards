# Noveloper Development Guidelines

## Overview

This document establishes standardized development practices, architecture patterns, and collaboration workflows for all Noveloper projects. It serves as a living reference that will evolve as we discover better practices through our collaborations.

## Table of Contents

1. [Technology Stack Standards](#technology-stack-standards)
2. [Architecture Principles](#architecture-principles)
3. [Development Workflow](#development-workflow)
4. [Code Standards](#code-standards)
5. [Infrastructure Setup](#infrastructure-setup)
6. [Component Patterns](#component-patterns)
7. [Performance Guidelines](#performance-guidelines)
8. [Security Standards](#security-standards)
9. [Collaboration Process](#collaboration-process)
10. [Documentation Standards](#documentation-standards)
11. [Reusable Components Library](#reusable-components-library)

## Technology Stack Standards

### Core Technology Stack

We standardize on this technology stack for all Noveloper projects:

#### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Shadcn UI
- **Animation**: Framer Motion
- **State Management**: React Query + Context API
- **Routing**: Wouter
- **Form Handling**: React Hook Form + Zod validation

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **API Style**: RESTful with TypeScript interfaces
- **Authentication**: JWT-based (when needed)
- **Validation**: Zod schemas

#### Database
- **Database**: PostgreSQL via Supabase
- **ORM**: Drizzle ORM
- **Migrations**: Drizzle Kit

#### Hosting
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Railway
- **Database Hosting**: Supabase
- **Domain Management**: Namecheap
- **Email Service**: MailerSend

### Technology Selection Criteria

When evaluating new technologies for our stack:

1. **Developer Experience**: Must provide excellent DX with strong TypeScript support
2. **Community Support**: Must have active community and maintenance
3. **Performance**: Must have minimal impact on application performance
4. **Bundle Size**: Must not significantly increase bundle size (frontend)
5. **Documentation**: Must have comprehensive documentation
6. **License**: Must use compatible open source license
7. **Stability**: Must demonstrate stability in production environments

## Architecture Principles

### Separation of Concerns

1. **Frontend/Backend Separation**: Clear separation between client and server
2. **Component Isolation**: UI components should be isolated and reusable
3. **Business Logic Encapsulation**: Logic encapsulated in dedicated services
4. **Data Access Abstraction**: Storage interfaces abstract database details
5. **Configuration Separation**: Environment-specific configuration segregated

### Frontend Architecture

1. **Component-Based**: Everything is a component
2. **Atomic Design**: Build UIs from atomic components up
3. **Container/Presentation Split**: Separate data fetching from rendering
4. **Prop Drilling Avoidance**: Use context for deeply nested state
5. **State Management Hierarchy**:
   - Local state for component-specific state
   - Context for shared UI state
   - React Query for server state

### Backend Architecture

1. **Layered Architecture**:
   - Routes layer: Request/response handling
   - Service layer: Business logic
   - Data access layer: Database operations
2. **Middleware Pattern**: Use middleware for cross-cutting concerns
3. **Environment Awareness**: Code adapts based on environment

### Data Architecture

1. **Schema-First Development**: Define schema before implementation
2. **Type Safety Throughout**: Consistent types from database to UI
3. **Validation At Boundaries**: Validate all inputs at system boundaries
4. **Optimistic Updates**: Update UI optimistically then confirm

## Development Workflow

### Environment Setup

1. **Consistent Environments**: All developers use similar setup
2. **Environment Variables**: Standardized across environments
3. **Local Development**: Easy setup for local development

### Git Workflow

1. **Branching Strategy**:
   - `main`: Production code
   - `development`: Integration branch
   - Feature branches: New features
2. **Commit Conventions**: Use conventional commits
   - `feat:` for features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for refactoring
   - `test:` for adding tests
   - `chore:` for maintenance
3. **Pull Request Process**:
   - Descriptive PR title and description
   - Link to relevant issues
   - Screenshots for UI changes

### CI/CD Pipeline

1. **Automated Testing**: Tests run on every PR
2. **Preview Deployments**: Every PR gets a preview environment
3. **Automated Deployment**: Automatic deployment on merge
4. **Deployment Verification**: Verify deployment success

## Code Standards

### TypeScript Standards

1. **Strong Typing**: Minimize use of `any` and `unknown`
2. **Interface First**: Define interfaces before implementation
3. **Immutability**: Prefer immutable data structures
4. **Type Inference**: Leverage TypeScript's type inference
5. **Nullability**: Explicit handling of null/undefined values

### React Standards

1. **Functional Components**: Use functional components with hooks
2. **Custom Hooks**: Extract reusable logic into custom hooks
3. **Memoization**: Strategic use of useMemo and useCallback
4. **Component Size**: Keep components focused and reasonably sized
5. **Prop Types**: Use TypeScript interfaces for props
6. **Default Props**: Provide sensible defaults when appropriate

### CSS Standards

1. **Tailwind First**: Use Tailwind utilities whenever possible
2. **Component Classes**: Extract repeated patterns with @apply
3. **BEM for Custom CSS**: When custom CSS is needed, follow BEM
4. **Responsive Design**: Mobile-first responsive approach
5. **Design Token Consistency**: Use Tailwind theme for consistency

### API Standards

1. **RESTful Design**: Follow REST principles for APIs
2. **Status Codes**: Appropriate HTTP status codes
3. **Error Handling**: Consistent error response format
4. **Versioning**: Version APIs when making breaking changes
5. **Documentation**: Document all endpoints

## Infrastructure Setup

### Vercel Setup

1. **Project Configuration**:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
2. **Environment Variables**:
   - Standard set of environment variables
   - Different values per environment
3. **Domain Configuration**:
   - Production: `[project].noveloper.ai`
   - Development: `dev-[project].noveloper.ai`

### Railway Setup

1. **Service Configuration**:
   - Start command: `node railway-start.js`
   - Node.js version: Latest LTS
2. **Environment Variables**:
   - Database connection strings
   - API keys and secrets
   - Environment indicators
3. **Domain Configuration**:
   - Production: `api.[project].noveloper.ai`
   - Development: `dev-api.[project].noveloper.ai`

### Supabase Setup

1. **Database Configuration**:
   - PostgreSQL version: Latest stable
   - Extensions: Enabled as needed
2. **Security Settings**:
   - Row-level security enabled
   - Secure password policies
3. **API Access**:
   - Direct SQL connections for backend
   - API access with proper permissions

### DNS Configuration (Namecheap)

1. **DNS Records**:
   - A records for apex domains
   - CNAME records for subdomains
   - TXT records for verification
2. **HTTPS Setup**:
   - SSL certificates for all domains
   - HSTS configuration

## Component Patterns

### Component Architecture

1. **Component Structure**:
   ```tsx
   // MyComponent.tsx
   type MyComponentProps = {
     // Props definition
   };
   
   export function MyComponent({ prop1, prop2 }: MyComponentProps) {
     // Implementation
     return (
       <div>
         {/* Component JSX */}
       </div>
     );
   }
   ```

2. **Component Organization**:
   - UI components in `components/ui`
   - Page sections in `components/[section-name]`
   - Layout components in `components/layout`
   - Form components in `components/forms`

### Reusable Patterns

1. **Data Fetching Pattern**:
   ```tsx
   const { data, isLoading, error } = useQuery({
     queryKey: ['/api/endpoint', params],
     // Use the default query function
   });
   
   if (isLoading) return <LoadingState />;
   if (error) return <ErrorState error={error} />;
   
   return <SuccessState data={data} />;
   ```

2. **Form Handling Pattern**:
   ```tsx
   const form = useForm<FormType>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       // Default values
     },
   });
   
   const onSubmit = async (data: FormType) => {
     try {
       await apiRequest('/api/endpoint', {
         method: 'POST',
         body: JSON.stringify(data),
       });
       toast.success('Success message');
     } catch (error) {
       toast.error('Error message');
     }
   };
   ```

3. **Layout Pattern**:
   ```tsx
   export function PageLayout({ children }: { children: React.ReactNode }) {
     return (
       <div className="container mx-auto px-4 py-8">
         <Header />
         <main>{children}</main>
         <Footer />
       </div>
     );
   }
   ```

## Performance Guidelines

### Frontend Performance

1. **Code Splitting**: Split code by routes and large components
2. **Lazy Loading**: Lazy load non-critical components
3. **Image Optimization**: Proper sizing and formats for images
4. **Bundle Size Monitoring**: Regular checks on bundle size
5. **Render Optimization**: Avoid unnecessary re-renders

### Backend Performance

1. **Query Optimization**: Efficient database queries
2. **Caching Strategy**: Cache expensive operations
3. **Connection Pooling**: Manage database connections efficiently
4. **Response Compression**: Enable compression for responses
5. **Rate Limiting**: Implement rate limiting for APIs

### Build Optimization

1. **Tree Shaking**: Ensure unused code is removed
2. **Minification**: Minify all production assets
3. **Asset Optimization**: Optimize images and other assets
4. **Dependency Management**: Regular audit of dependencies

## Security Standards

### Frontend Security

1. **XSS Prevention**: Proper context escaping
2. **CSP Implementation**: Content Security Policy headers
3. **Sensitive Data Handling**: No secrets in frontend code
4. **Input Validation**: Client-side validation for all inputs
5. **CSRF Protection**: Anti-CSRF tokens for forms

### Backend Security

1. **Authentication**: Secure authentication patterns
2. **Authorization**: Proper permission checks
3. **Input Validation**: Server-side validation for all inputs
4. **Secrets Management**: Environment variables for secrets
5. **Dependency Security**: Regular security audits

### Database Security

1. **Connection Security**: TLS for all connections
2. **Query Safety**: Parameterized queries / ORM
3. **Backup Strategy**: Regular automated backups
4. **Access Control**: Least privilege principle
5. **Data Encryption**: Encryption for sensitive data

## Collaboration Process

### Communication Channels

1. **Project Management**: Track tasks and progress
2. **Code Review Process**: Expectations for PRs
3. **Knowledge Sharing**: Regular knowledge sharing sessions
4. **Documentation Updates**: Keeping documentation current

### Project Stages

1. **Initiation**: Scoping and requirements gathering
2. **Planning**: Architecture design and task breakdown
3. **Execution**: Development and testing
4. **Review**: Review and refinement
5. **Deployment**: Deployment and post-deployment checks

### Learning and Improvement

1. **Retrospectives**: Regular review of what worked and what didn't
2. **Skill Development**: Focus areas for improvement
3. **Technology Evaluation**: Regular evaluation of new technologies
4. **Pattern Recognition**: Identify recurring patterns for abstraction

## Documentation Standards

### Code Documentation

1. **Comments**: When and how to write comments
2. **JSDoc**: Format for function and component documentation
3. **README Files**: Content requirements for READMEs
4. **Change Logs**: Tracking significant changes

### Project Documentation

1. **Project Overview**: High-level project description
2. **Architecture Docs**: Detailed architecture documentation
3. **API Documentation**: Documentation for all APIs
4. **User Guides**: End-user documentation
5. **Deployment Guides**: Instructions for deployment

### Living Documentation

1. **Update Process**: How and when to update documentation
2. **Documentation Review**: Regular review of documentation
3. **Accessibility**: Making documentation accessible

## Reusable Components Library

### Core Components

1. **UI Elements**: Buttons, inputs, cards, etc.
2. **Layout Components**: Grids, containers, sections
3. **Data Display**: Tables, lists, details views
4. **Feedback Components**: Alerts, toasts, modals
5. **Form Elements**: Form controls and validation

### Usage Guidelines

1. **Component Selection**: When to use each component
2. **Customization**: How to customize components
3. **Composition**: How to compose components together
4. **Accessibility**: Ensuring accessibility

### Library Maintenance

1. **Component Addition**: Process for adding components
2. **Updates**: Keeping components updated
3. **Versioning**: Semantic versioning for the library
4. **Testing**: Ensuring component quality

---

## Conclusion

These guidelines establish a foundation for consistent, efficient development across all Noveloper projects. By following these standards, we can:

1. **Accelerate Development**: Reuse patterns and components
2. **Ensure Quality**: Consistent standards lead to quality
3. **Facilitate Collaboration**: Common language and expectations
4. **Enable Knowledge Transfer**: Easier to share knowledge
5. **Build Reusable Assets**: Components and patterns that can be reused

This is a living document that will evolve as we learn and improve through our collaboration.