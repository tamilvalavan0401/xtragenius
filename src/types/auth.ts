export type AuthStep = "welcome" | "verify" | "personal" | "password" | "forgot-password" | "login" | "reset-password" | "dashboard";

export interface AuthData {
  email: string;
  otp: string;
  fullName: string;
  mobileNumber: string;
  password: string;
  reset_token: string;
  country_id: number;
}
