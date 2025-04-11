import React from 'react';
import { cn } from '../utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

/**
 * Standard Noveloper Toast Component
 * 
 * This template provides a standardized approach to displaying toast notifications
 * with various styles and variants.
 */

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "success group border-green-200 bg-green-50 text-green-900",
        destructive: "destructive group border-red-200 bg-red-50 text-red-900",
        warning: "warning group border-yellow-200 bg-yellow-50 text-yellow-900",
        info: "info group border-blue-200 bg-blue-50 text-blue-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
}

export function Toast({
  className,
  variant,
  title,
  description,
  action,
  onClose,
  ...props
}: ToastProps) {
  return (
    <div
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && (
          <div className="text-sm opacity-90">{description}</div>
        )}
      </div>
      
      {action && <div>{action}</div>}
      
      {onClose && (
        <button
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:text-foreground hover:opacity-100"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

interface ToastProviderProps {
  children: React.ReactNode;
  swipeDirection?: 'right' | 'left' | 'up' | 'down';
  swipeThreshold?: number;
}

export function ToastProvider({
  children,
  swipeDirection = 'right',
  swipeThreshold = 50,
}: ToastProviderProps) {
  return (
    <div className="fixed bottom-0 z-[100] flex flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {children}
    </div>
  );
}

// Usage example:
// 
// function App() {
//   const [toasts, setToasts] = useState<Array<{ id: string; props: ToastProps }>>([]);
// 
//   const addToast = (props: Omit<ToastProps, 'onClose'>) => {
//     const id = Math.random().toString(36).substring(2, 9);
//     setToasts((prev) => [...prev, { id, props }]);
//     
//     // Auto-dismiss after 5 seconds
//     setTimeout(() => {
//       dismissToast(id);
//     }, 5000);
//   };
// 
//   const dismissToast = (id: string) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };
// 
//   return (
//     <div>
//       <button onClick={() => addToast({ title: 'Success!', description: 'Your action was completed', variant: 'success' })}>
//         Show Success Toast
//       </button>
//       
//       <ToastProvider>
//         {toasts.map(({ id, props }) => (
//           <Toast key={id} {...props} onClose={() => dismissToast(id)} />
//         ))}
//       </ToastProvider>
//     </div>
//   );
// }