/**
 * Standard Noveloper Utility Functions
 * 
 * This file contains common utility functions that can be used
 * across Noveloper projects.
 */

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and tailwind classes
 * without conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string or Date object into a localized string
 * 
 * @param date The date to format
 * @param locale The locale to use (defaults to browser locale)
 * @param options The Intl.DateTimeFormat options
 */
export function formatDate(
  date: Date | string,
  locale?: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatDate:', date);
    return 'Invalid date';
  }
  
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Formats a number as currency
 * 
 * @param amount The amount to format
 * @param currency The currency code (defaults to EUR)
 * @param locale The locale to use (defaults to browser locale)
 */
export function formatCurrency(
  amount: number,
  currency = 'EUR',
  locale?: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * 
 * @param text The text to truncate
 * @param length The maximum length
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) {
    return text;
  }
  
  return text.slice(0, length).trim() + '...';
}

/**
 * Generates a random ID string
 * 
 * @param length The length of the ID
 */
export function generateId(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Debounces a function call
 * 
 * @param func The function to debounce
 * @param wait The wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

/**
 * Throttles a function call
 * 
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Creates a URL-friendly slug from a string
 * 
 * @param text The text to slugify
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/&/g, '-and-')   // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

/**
 * Checks if an object is empty
 * 
 * @param obj The object to check
 */
export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Extracts an error message from various error types
 * 
 * @param error The error object
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String(error.message);
  }
  
  return 'An unknown error occurred';
}

/**
 * Safely access nested object properties without errors
 * 
 * @param obj The object to access
 * @param path The path to the property
 * @param defaultValue The default value if the property doesn't exist
 */
export function getNestedValue<T>(
  obj: Record<string, any>,
  path: string,
  defaultValue: T
): T {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return (result === undefined) ? defaultValue : result as T;
}

/**
 * Groups an array of objects by a specific key
 * 
 * @param array The array to group
 * @param key The key to group by
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Creates a deep copy of an object
 * 
 * @param obj The object to clone
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as any;
  }
  
  if (typeof obj === 'object') {
    const copy: any = {};
    
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as any)[key]);
    });
    
    return copy;
  }
  
  return obj;
}