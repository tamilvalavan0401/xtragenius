import axiosInstance from '../axiosInstance';
import { AK } from '../endpoints';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string | null;
      created_at: string;
      updated_at: string;
    };
    token: string;
  };
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('Calling login API with:', credentials);
    const response = await axiosInstance.post<LoginResponse>(AK.LOGIN, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async (token: string): Promise<LogoutResponse> => {
  try {
    console.log('Calling logout API with token:', token);
    const response = await axiosInstance.post<LogoutResponse>(
      AK.LOGOUT,
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
