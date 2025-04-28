export interface User {
  name: string; 
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

export type UserFormData = Omit<User, 'id'>;