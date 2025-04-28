import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import UserForm, { UserFormValues } from '../components/molecules/UserForm';
import { createUser } from '../services/api';
import { UserStatus } from '../types/user';

const NewUserPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createUserMutation = useMutation({
        mutationFn: (userData: UserFormValues) => createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User created successfully');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            console.error("Create user error:", error);
            toast.error(error.message || 'Failed to create user');
        },
    });

    const handleSubmit = async (formData: UserFormValues) => {
        try {
            console.log("Creating user with data:", formData);
            await createUserMutation.mutateAsync(formData);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    return (
        <div className="max-w-4xl mx-auto py-8 ">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"></h1>
            <UserForm
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    status: undefined,
                    dateOfBirth: undefined, 
                }}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={createUserMutation.isPending}
            />
        </div>
    );
};

export default NewUserPage;