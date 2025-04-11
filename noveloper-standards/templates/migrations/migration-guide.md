# Database Migration Guide

This document outlines the standard approach to database migrations for Noveloper projects. Following these migration patterns ensures consistency, safety, and maintainability when updating database schemas.

## Migration Strategy

Noveloper projects use Drizzle ORM with a "push" migration strategy for development and schema-versioned migrations for production changes.

### Development Workflow

During development, use the `drizzle-kit push` command to automatically update your database schema to match your code:

```bash
npm run db:push
```

This command:
1. Compares your current schema definition in `shared/schema.ts` with the database
2. Generates the necessary SQL to update the database
3. Applies the changes directly to the database

### Production Workflow

For production changes, we use versioned migrations:

1. Create a migration:
   ```bash
   npm run db:generate
   ```

2. Review the generated SQL in the `drizzle` folder

3. Apply the migration:
   ```bash
   npm run db:migrate
   ```

## Setup Instructions

### 1. Configure Drizzle

Create a `drizzle.config.ts` file in your project root using the template in this repository.

### 2. Add Scripts to package.json

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "db:push": "drizzle-kit push:pg",
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "tsx scripts/migrate.ts",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 3. Create Migration Script

Create a `scripts/migrate.ts` file:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import 'dotenv/config';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('Running migrations...');
  
  // For one-off script execution, close the connection at the end
  const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient);
  
  // This will run all pending migrations
  await migrate(db, { migrationsFolder: 'drizzle' });
  
  console.log('Migrations completed successfully');
  
  // Close the connection when done
  await migrationClient.end();
  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
```

## Best Practices

### Schema Changes

When changing your schema:

1. **Add Columns**: Always add new columns as nullable or with default values
2. **Rename**: Use a two-step process (add new column, migrate data, drop old column)
3. **Data Types**: Be cautious when changing column types; ensure data compatibility
4. **Constraints**: Add constraints carefully, considering existing data

### Migration Safety

1. **Backup**: Always backup your database before migrations
2. **Test**: Test migrations on a staging database before production
3. **Downtime**: For large tables or critical changes, consider maintenance windows
4. **Rollback**: Have a rollback plan for every migration

### Handling Conflicts

If you encounter conflicts between local schema and database:

1. Use `drizzle-kit studio` to inspect current database structure
2. Review the differences between your schema and database
3. Adjust your schema or create a focused migration to resolve the conflict

## Common Migration Patterns

### Adding Features

When adding new features:

1. Add new tables or columns to `shared/schema.ts`
2. Run `npm run db:push` during development
3. Before deployment, generate a proper migration with `npm run db:generate`

### Renaming Elements

When renaming entities:

1. Add the new column/table
2. Create a data migration script to copy data
3. Update application code to use the new column/table
4. After deployment, create another migration to remove the old column/table

### Data Migrations

For complex data transformations:

1. Create a separate script in `scripts/migrations/`
2. Execute the script separately from schema migrations
3. Document the process for reproducibility

## Troubleshooting

### Migration Failures

If a migration fails:

1. Check the error message for specific issues
2. Use `drizzle-kit studio` to inspect the current state
3. Fix the issue in your schema or create a targeted migration
4. For serious issues, restore from backup and try again

### Schema Drift

If your schemas drift out of sync:

1. Generate a new migration with current state
2. Review differences and reconcile manually if needed
3. Consider using `db:push` with `--forcePush` in development (with caution)