import Nullable from '@/types/nullable.ts';

export interface User {
  userID: number;
  userName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  isPhoneVerified: boolean;
  isMailVerified: boolean;
  isAdmin: boolean;
  lockedAt: Nullable<string>;
}
export interface GetUserParams {
  userID?: string | number;
}
