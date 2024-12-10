import { UserRole } from '@/enums/roles.enums';

export interface GetMeApiResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  dob?: string | null;
  last_login?: string | null;
  created_at: string;
  updated_at: string;
}
