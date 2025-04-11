import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from './utils';

/**
 * Standard Noveloper Modal Component
 * 
 * This template provides a standardized approach to modal dialogs
 * with built-in accessibility, animations, and customization options.
 */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  className = '',
  contentClassName = '',
  showCloseButton = true,
}: ModalProps) {
  // Handle ESC key press to close the modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Don't render anything if the modal is not open
  if (!isOpen) {
    return null;
  }

  // Size classes mapping
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      {/* Modal Content */}
      <div 
        className={cn(
          'w-full bg-background rounded-lg shadow-lg overflow-hidden transform transition-all',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              {title && (
                <h3 
                  id="modal-title" 
                  className="text-lg font-semibold text-foreground"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p 
                  id="modal-description" 
                  className="text-sm text-muted-foreground mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className={cn('px-6 py-4', contentClassName)}>
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-border bg-muted/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Usage example:
// 
// function App() {
//   const [isOpen, setIsOpen] = useState(false);
//
//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Open Modal</button>
//
//       <Modal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         title="Example Modal"
//         description="This is an example of the Noveloper standard modal component."
//         footer={
//           <div className="flex justify-end space-x-2">
//             <button 
//               onClick={() => setIsOpen(false)}
//               className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 rounded-md"
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={() => {
//                 console.log('Confirm action');
//                 setIsOpen(false);
//               }}
//               className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
//             >
//               Confirm
//             </button>
//           </div>
//         }
//       >
//         <p>Modal content goes here.</p>
//       </Modal>
//     </div>
//   );
// }