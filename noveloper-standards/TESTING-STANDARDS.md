# Noveloper Testing Standards

This document outlines the standard testing practices for all Noveloper projects. Following these testing standards ensures reliability, maintainability, and quality across our applications.

## Testing Philosophy

Our approach to testing is guided by the following principles:

1. **Test for confidence, not coverage**: Focus on testing critical paths and business logic rather than arbitrary coverage metrics
2. **Shift left**: Catch issues as early as possible in the development process
3. **Test at the right level**: Use the appropriate testing strategy for each component or function
4. **Maintainable tests**: Write tests that are easy to understand and maintain
5. **Automated where possible**: Automate testing processes to ensure consistency

## Testing Layers

Noveloper projects implement testing at multiple layers:

### 1. Unit Tests

Unit tests verify individual functions, components, or modules in isolation.

**When to use**: For pure functions, utility methods, isolated components, and complex business logic.

**Tools**:
- Jest for JavaScript/TypeScript logic
- React Testing Library for React components
- Vitest for Vite-based projects

**Example**:

```tsx
// utils.test.ts
import { formatCurrency } from './utils';

describe('formatCurrency', () => {
  it('formats a number as EUR by default', () => {
    expect(formatCurrency(1000)).toBe('€1,000.00');
  });

  it('formats a number using the specified currency', () => {
    expect(formatCurrency(1000, 'USD')).toBe('$1,000.00');
  });
});
```

### 2. Integration Tests

Integration tests verify that multiple units work together correctly.

**When to use**: For testing interactions between components, API integrations, form submissions, and complex user interactions.

**Tools**:
- Jest + React Testing Library for component integration
- MSW (Mock Service Worker) for API mocking
- Supertest for API endpoints

**Example**:

```tsx
// ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ContactForm from './ContactForm';

const server = setupServer(
  rest.post('/api/contact', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('submits the form and shows success message', async () => {
  render(<ContactForm />);
  
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/message sent/i)).toBeInTheDocument();
  });
});
```

### 3. End-to-End Tests

E2E tests verify the entire application from the user's perspective.

**When to use**: For critical user flows, multi-step processes, and scenarios requiring a fully running application.

**Tools**:
- Cypress
- Playwright

**Example**:

```js
// cypress/e2e/contact.cy.js
describe('Contact Page', () => {
  it('submits the contact form and shows success message', () => {
    cy.visit('/contact');
    
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('Test message');
    
    cy.get('button[type="submit"]').click();
    
    cy.contains('Message Sent!').should('be.visible');
  });
});
```

## Code Coverage Guidelines

While we don't enforce strict coverage percentages, we recommend:

1. **Business Logic**: Aim for >90% coverage
2. **UI Components**: Focus on user interactions and state changes
3. **API Routes**: Test both successful and error cases
4. **Utility Functions**: High coverage, especially for edge cases

## Testing Best Practices

### Writing Maintainable Tests

1. **Arrange-Act-Assert**: Structure tests in a clear, logical fashion
2. **Descriptive Names**: Use descriptive test names that explain expected behavior
3. **Avoid Test Interdependence**: Tests should not depend on each other
4. **Consistent Patterns**: Use consistent patterns and helper functions

### Component Testing

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **User-Centric**: Test from the user's perspective using screen queries
3. **Accessibility**: Include testing for accessibility concerns
4. **State Changes**: Verify correct state transitions

### API Testing

1. **Test Happy Path**: Verify correct behavior for valid inputs
2. **Test Error Handling**: Verify proper error responses for invalid inputs
3. **Test Authorization**: Verify access control if applicable
4. **Mock External Dependencies**: Use mocks for external services

### End-to-End Testing

1. **Critical Paths**: Focus on critical user journeys
2. **Cross-Browser**: Test on multiple browsers when relevant
3. **Performance Aspects**: Include basic performance checks when needed
4. **Data Setup**: Create proper test data with minimal dependencies

## Test Organization

Structure your tests as follows:

```
project/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx  // Unit/component tests alongside source
│   ├── pages/
│   │   ├── Contact.tsx
│   │   └── Contact.test.tsx
│   └── utils/
│       ├── format.ts
│       └── format.test.ts
├── tests/
│   ├── integration/  // Separate folder for complex integration tests
│   │   └── forms.test.tsx
│   └── setup.ts      // Test setup files
└── cypress/          // E2E tests
    └── e2e/
        └── contact.cy.js
```

## Continuous Integration

All tests should run automatically on:

1. **Pull Requests**: Unit and integration tests
2. **Merges to Main**: All tests including E2E
3. **Nightly**: Complete test suite with extended E2E tests

## Mocking Strategies

### API Mocking

Use MSW (Mock Service Worker) for API mocking:

```js
// Setup MSW server
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'User 1' }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Component Mocking

Use Jest mocks for child components when needed:

```js
// Mock a complex child component
jest.mock('../ChildComponent', () => {
  return {
    ChildComponent: ({ onAction }) => (
      <div data-testid="mocked-child" onClick={onAction}>
        Mocked Component
      </div>
    ),
  };
});
```

## Test-Driven Development

While not strictly required, consider TDD for:

1. Bug fixes (write a test that reproduces the bug)
2. Complex business logic
3. Refactoring existing functionality

## Testing Complex State

For components using React context or Redux:

```tsx
// Testing a component that uses context
function renderWithContext(ui, { providerProps, ...renderOptions }) {
  return render(
    <AuthProvider {...providerProps}>{ui}</AuthProvider>,
    renderOptions
  );
}

test('shows user profile when logged in', () => {
  renderWithContext(<ProfilePage />, {
    providerProps: {
      value: { user: { id: 1, name: 'Test User' }, isAuthenticated: true }
    }
  });
  
  expect(screen.getByText('Test User')).toBeInTheDocument();
});
```

## Accessibility Testing

Include accessibility checks in your tests:

```js
import { axe } from 'jest-axe';

test('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Test Documentation

Document complex test scenarios:

```js
/**
 * Tests the user registration flow.
 * 
 * Test steps:
 * 1. User fills out registration form
 * 2. Validation occurs on submit
 * 3. API request is sent with form data
 * 4. Success message is shown
 * 
 * Edge cases covered:
 * - Email already in use
 * - Password too short
 * - Network error during submission
 */
describe('User Registration', () => {
  // Test cases here
});
```

## Troubleshooting Common Issues

1. **Flaky Tests**: Add retry logic, improve assertions, or check for race conditions
2. **Slow Tests**: Use more focused tests, improve mocking, or parallelize test execution
3. **Memory Leaks**: Ensure proper cleanup in afterEach blocks
4. **Test Interference**: Isolate tests and reset state between tests

By following these testing standards, we ensure reliable, maintainable, and high-quality applications across all Noveloper projects.