import React, { ReactNode } from 'react';

/**
 * Standard Noveloper Layout Component
 * 
 * This template provides a standardized approach to page layouts
 * with built-in responsive behavior and common sections.
 */

interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  showSidebar?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

/**
 * Main layout component
 */
export function Layout({
  children,
  header,
  footer,
  sidebar,
  showSidebar = false,
  maxWidth = '2xl',
  className = '',
}: LayoutProps) {
  // Map maxWidth to actual Tailwind classes
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      {header && (
        <header className="w-full bg-background border-b border-border">
          <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8`}>
            {header}
          </div>
        </header>
      )}
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar - when enabled */}
        {sidebar && showSidebar && (
          <aside className="w-full md:w-64 shrink-0 border-r border-border">
            <div className="sticky top-0 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
              {sidebar}
            </div>
          </aside>
        )}
        
        {/* Main content */}
        <main className={`flex-1 ${className}`}>
          <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8 py-6`}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      {footer && (
        <footer className="w-full bg-background border-t border-border">
          <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8`}>
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}

/**
 * Container component for consistent content width
 */
export function Container({
  children,
  maxWidth = '2xl',
  className = '',
}: {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}) {
  // Map maxWidth to actual Tailwind classes
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section component for page sections with consistent spacing
 */
export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      {children}
    </section>
  );
}

/**
 * Grid component for responsive layouts
 */
export function Grid({
  children,
  columns = 3,
  gap = 6,
  className = '',
}: {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: 4 | 6 | 8 | 10;
  className?: string;
}) {
  // Map columns to Tailwind classes
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };
  
  // Map gap to Tailwind classes
  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Card component for content containers
 */
export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-card text-card-foreground rounded-lg border border-border p-6 ${className}`}>
      {children}
    </div>
  );
}