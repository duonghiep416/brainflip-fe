import { Role } from "@/enums/roles.enums";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  accessToken: {
    value: string;
    expiresIn: string;
  };
  refreshToken: {
    value: string;
    expiresIn: string;
  };
}

export interface RegisterCredentials {
  email: string;
  username: string;
  fullName: string;
  password: string;
}

export interface RegisterApiResponse {
  user: {
    email: string;
    username: string;
    fullName: string;
    refreshToken: string | null;
    id: string;
    roles: Role[];
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RequestResetPasswordCredentials {
  email: string;
}

export interface RequestResetPasswordApiResponse {
  message: string;
}

export interface ConfirmResetPasswordCredentials {
  newPassword: string;
}

export interface ConfirmResetPasswordApiResponse extends RegisterApiResponse {}

export interface LogoutCredentials {
  refreshToken: string;
}
