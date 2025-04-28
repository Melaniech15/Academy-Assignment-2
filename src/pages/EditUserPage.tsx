import React, { useEffect, useState } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import UserForm, { UserFormValues } from '../components/molecules/UserForm';
import { getUserById, updateUser } from '../services/api';
import { User } from '../types/user';

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getUserById(id);
        console.log("Fetched user data:", data);
        setUser(data.user || data);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(error instanceof Error ? error.message : 'Failed to fetch user');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (userData: UserFormValues) => updateUser(id!, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      console.error("Update error:", error);
      toast.error(error.message || 'Failed to update user');
    },
  });

  const handleSubmit = async (formData: UserFormValues) => {
    if (!id) return;
    
    try {
      console.log("Submitting form data:", formData);
      await updateUserMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading user data...</div>;
  }

  if (!user) {
    return <div className="text-center py-8">User not found</div>;
  }

  console.log("Rendering EditUserPage with user:", user);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"></h1>
      <UserForm
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName || '',
          email: user.email,
          status: user.status,
          dateOfBirth: user.dateOfBirth,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateUserMutation.isPending}
      />
    </div>
  );
};

export default EditUserPage;