export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  language: "en" | "ne";
  hasOnboarded: boolean;
  token: string;
  avatar?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface OnboardingInput {
  language: "en" | "ne";
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  _id?: string;
  name?: string;
  isAdmin?: boolean;
  email?: string;
  token?: string;
  language?: "en" | "ne";
  hasOnboarded?: boolean;
}
