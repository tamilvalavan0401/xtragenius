import axios from 'axios';

export const AK = Object.freeze({
  ACCOUNTCHECK: '/account/check',
  KYC_FETCH: '/kyc/verification/fetch',
  KYC_VERIFICATION: '/kyc/verification',
  LOGIN: '/login',
  LOGIN_REQUEST_OTP: '/login/request-otp',
  FORGOT_PASSWORD_REQUEST_OTP: '/password/request-otp',
  FORGOT_PASSWORD_VERIFY: '/password/verify-otp',
  RESET_PASSWORD: '/password/reset',
  CHANGE_PASSWORD: '/password/change',
  LOGIN_VERIFY_OTP: '/login/verify-otp',
  REGISTER: '/register',
  LOGOUT: '/logout',
  PAYMENTS: '/payments',
  PAYOUTS: '/payouts',
  REPORTS: '/reports',
  INVOICE: '/invoices',
  DEVELOPER_SETTINGS: '/developer/settings',
  UPDATE_SETTINGS: '/developer/settings/update', 

});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized, please log in again');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
