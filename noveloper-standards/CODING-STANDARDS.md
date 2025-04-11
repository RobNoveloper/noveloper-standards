# Noveloper Coding Standards

This document outlines the coding standards and best practices for all Noveloper projects. Adherence to these standards ensures consistency, maintainability, and quality across our projects.

## General Principles

1. **Readability Over Cleverness**: Write code that is easy to understand, even if it's slightly more verbose.
2. **Consistency**: Follow established patterns within the project and across Noveloper projects.
3. **Documentation**: Document the "why" behind decisions, not just the "what" and "how".
4. **Testing**: Write tests for all business logic and critical functionality.
5. **Accessibility**: Ensure all user interfaces are accessible to people with disabilities.

## JavaScript/TypeScript Standards

### Naming Conventions

- **Variables and Functions**: Use camelCase (e.g., `userName`, `calculateTotal`)
- **Classes and Components**: Use PascalCase (e.g., `UserProfile`, `ButtonComponent`)
- **Constants**: Use UPPER_SNAKE_CASE for true constants (e.g., `MAX_RETRY_COUNT`)
- **Files**: Use kebab-case for files (e.g., `user-profile.ts`, `button-component.tsx`)
- **Folders**: Use kebab-case for folders (e.g., `user-profiles`, `button-components`)

### Code Organization

- Group related functionality in the same file or adjacent files
- Limit file size to maintain readability (aim for <300 lines where possible)
- Order imports: React/external libraries first, then internal modules, then relative imports
- Place type definitions at the top of files, before the implementation
- Separate business logic from UI components

### Type Safety

- Use TypeScript for all new code
- Minimize use of `any` and `unknown` types
- Define explicit interfaces/types for all data structures
- Use type inference where appropriate, but include explicit return types for functions
- Create centralized type definitions for shared data structures

### Component Structure

- One component per file (except for small, closely related components)
- Use functional components with hooks instead of class components
- Keep components focused on a single responsibility
- Extract complex logic into custom hooks
- Use composition over inheritance

### State Management

- Use React Query for server state
- Use Context API for global app state
- Use useState/useReducer for local component state
- Maintain clear boundaries between different types of state

## CSS/Styling Standards

### Approach

- Use Tailwind CSS for styling
- Follow utility-first CSS approach
- Extract common patterns into reusable component classes
- Maintain design system tokens in `theme.json`

### Organization

- Define global styles in a central location
- Use CSS variables for theming
- Follow responsive design principles (mobile-first)
- Implement proper dark mode support

### Accessibility

- Ensure color contrast meets WCAG AA standards at minimum
- Use semantic HTML elements
- Include appropriate ARIA attributes where needed
- Ensure keyboard navigability

## Database Standards

### Schema Design

- Follow the schema template in `templates/schema.ts`
- Use singular names for table names (`user` not `users`)
- Include `created_at` and `updated_at` fields on all tables
- Define explicit relationships using foreign keys

### Query Patterns

- Use Drizzle ORM for all database interactions
- Write type-safe queries using Drizzle's query builder
- Handle errors appropriately
- Use transactions for multi-step operations

## API Standards

### Endpoint Design

- Follow RESTful principles
- Use plural nouns for collections (`/users` not `/user`)
- Include versioning in API paths (`/api/v1/users`)
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)

### Response Format

- Return consistent response structures:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Optional success message"
  }
  ```
  or for errors:
  ```json
  {
    "success": false,
    "message": "Error description",
    "errors": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
  ```

### Security

- Validate all input data with Zod schemas
- Use CSRF protection for form submissions
- Implement proper authentication and authorization checks
- Sanitize output data to prevent XSS

## Testing Standards

### Unit Tests

- Write tests for all business logic
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names that explain the expected behavior
- Mock external dependencies appropriately

### Integration Tests

- Test critical user flows
- Verify correct component interactions
- Ensure proper API integration

### End-to-End Tests

- Test complete user journeys
- Verify application behavior in a production-like environment

## Documentation Standards

### Code Documentation

- Document complex logic with clear comments
- Add JSDoc comments for all public functions/methods
- Include examples for complex functionality
- Document architecture decisions

### User Documentation

- Provide clear, concise user guides
- Include troubleshooting information
- Update documentation when features change

## Git Workflow

### Commit Messages

- Use conventional commits format: `type(scope): description`
  - E.g., `feat(auth): add password reset functionality`
  - Types: feat, fix, docs, style, refactor, test, chore
- Write descriptive commit messages in the imperative mood
- Reference issue numbers where applicable

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for feature development
- Feature branches: `feature/description-of-feature`
- Bugfix branches: `fix/description-of-bug`

### Pull Requests

- Keep PRs focused on a single concern
- Include adequate description of changes
- Reference related issues
- Ensure all tests pass before requesting review