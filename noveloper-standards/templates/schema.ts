import { pgTable, serial, text, timestamp, integer, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Standard Noveloper database schema template
 * 
 * This template demonstrates our standard approach to defining database schemas
 * using Drizzle ORM with PostgreSQL.
 */

// Example of an enum type
export const userRoleEnum = pgEnum('user_role', ['admin', 'user', 'guest']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: userRoleEnum("role").default('user').notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Profile settings table - one-to-one relation with users
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  theme: text("theme").default('light'),
  language: text("language").default('en'),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  isResolved: boolean("is_resolved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Newsletter subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

// Define type inference from the schema
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

// Create validation schemas with Zod
export const insertUserSchema = createInsertSchema(users);
export const insertProfileSchema = createInsertSchema(profiles);
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions);
export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers);

// Create extended validation schemas with additional rules
export const userValidationSchema = insertUserSchema.extend({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Example of relations - this would be added to the original schema
// but shown separately here for clarity
export const usersRelations = {
  profiles: profiles
};