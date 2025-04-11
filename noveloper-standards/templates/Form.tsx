import React from 'react';
import { useForm, SubmitHandler, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './Button';

/**
 * Standard Noveloper Form component
 * 
 * This template provides a standardized approach to forms with
 * built-in validation, error handling, and accessibility features.
 */

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  form: UseFormReturn<T>;
  type?: string;
  required?: boolean;
}

/**
 * Form field component with error handling
 */
export function FormField<T extends FieldValues>({
  name,
  label,
  placeholder,
  form,
  type = 'text',
  required = false,
}: FormFieldProps<T>) {
  const { register, formState: { errors } } = form;
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name)}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Form textarea component with error handling
 */
export function FormTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  form,
  required = false,
}: Omit<FormFieldProps<T>, 'type'>) {
  const { register, formState: { errors } } = form;
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="mb-4">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        rows={5}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name)}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormProps<T extends FieldValues> {
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
  schema: z.ZodType<T>;
  children: React.ReactNode | ((form: UseFormReturn<T>) => React.ReactNode);
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
  className?: string;
}

/**
 * Main form component with Zod schema validation
 */
export function Form<T extends FieldValues>({
  defaultValues,
  onSubmit,
  schema,
  children,
  submitText = 'Submit',
  resetText = 'Reset',
  showReset = false,
  className = '',
}: FormProps<T>) {
  const form = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { handleSubmit, reset, formState: { isSubmitting, isDirty } } = form;

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={`space-y-6 ${className}`}
      noValidate
    >
      {typeof children === 'function' ? children(form) : children}
      
      <div className="flex space-x-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </Button>
        
        {showReset && (
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={!isDirty || isSubmitting}
            className="w-full"
          >
            {resetText}
          </Button>
        )}
      </div>
    </form>
  );
}