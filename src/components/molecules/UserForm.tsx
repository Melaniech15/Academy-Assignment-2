import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserStatus } from '../../types/user';

const userFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  dateOfBirth: z.string().refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
    message: 'Date must be in YYYY-MM-DD format',
  }),
  status: z.enum([UserStatus.ACTIVE, UserStatus.LOCKED], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  initialValues?: Partial<UserFormValues>;
  onSubmit: (data: UserFormValues) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSubmit, isLoading, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: undefined, 
      status: UserStatus.ACTIVE,
      ...initialValues,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
      });
    }
  }, [initialValues, reset]);

  const handleFormSubmit = async (data: UserFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-md mx-auto p-6 bg-white dark:bg-white/10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
        {initialValues?.firstName ? 'Edit User' : 'Add New User'}
      </h2>

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          First Name*
        </label>
        <input
          type="text"
          id="firstName"
          {...register('firstName')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Last Name (Optional)
        </label>
        <input
          type="text"
          id="lastName"
          {...register('lastName')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email*
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date of Birth*
        </label>
        <input
          type="date"
          id="dateOfBirth"
          {...register('dateOfBirth')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Status*
        </label>
        <select
          id="status"
          {...register('status')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value={UserStatus.ACTIVE}>Active</option>
          <option value={UserStatus.LOCKED}>Locked</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;