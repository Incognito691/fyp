import api from "@/shared/api/client";
import type {
  LoginInput,
  RegisterInput,
  OnboardingInput,
  AuthResponse,
} from "../types/auth.types";

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  googleLogin: async (token: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/google", { token });
    return response.data;
  },

  completeOnboarding: async (data: OnboardingInput): Promise<AuthResponse> => {
    const response = await api.put("/auth/onboarding", data);
    return response.data;
  },
};
