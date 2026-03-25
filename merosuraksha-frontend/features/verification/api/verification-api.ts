import api from "@/shared/api/client";
import type {
  VerificationResponse,
  NumberDetailsResponse,
  RecentScamsResponse,
  StatsResponse,
} from "../types/verification.types";

export const verificationApi = {
  // Primary verification endpoint
  verifyNumber: async (phoneNumber: string): Promise<VerificationResponse> => {
    const response = await api.post("/verify", { phoneNumber });
    return response.data;
  },

  // Get detailed information about a specific number
  getNumberDetails: async (phoneNumber: string): Promise<NumberDetailsResponse> => {
    const response = await api.get(`/verify/${phoneNumber}`);
    return response.data;
  },

  // Get recent scam numbers
  getRecentScams: async (limit: number = 10): Promise<RecentScamsResponse> => {
    const response = await api.get("/verify/recent", { params: { limit } });
    return response.data;
  },

  // Get aggregate statistics
  getStats: async (): Promise<StatsResponse> => {
    const response = await api.get("/verify/stats");
    return response.data;
  },
};
