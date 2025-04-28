export interface User {
  name: string; // Changed from ReactNode to string
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: UserStatus;
  dateOfBirth: string;
}
export enum UserStatus {
  ACTIVE = 'active',
  LOCKED = 'locked'
}

// Type for form data (without ID)
export type UserFormData = Omit<User, 'id'>;