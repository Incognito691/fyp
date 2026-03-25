// Risk level enumeration
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

// Request payload for POST /api/verify
export interface VerificationRequest {
  phoneNumber: string;
}

// Response from POST /api/verify
export interface VerificationResponse {
  success: boolean;
  isScam: boolean;
  riskLevel: RiskLevel;
  riskScore: number;
  totalReports: number;
  aiDetections: number;
  manualReports: number;
  scamTypes: string[];
  message?: string;
  firstDetected?: string;
  lastActivity?: string;
  status?: string;
}

// Response from GET /api/verify/:number
export interface NumberDetailsResponse {
  success: boolean;
  data: {
    phoneNumber: string;
    countryCode?: string;
    riskLevel: RiskLevel;
    riskScore: number;
    totalReports: number;
    aiDetections: number;
    manualReports: number;
    scamTypes: string[];
    status: string;
    firstDetected: string;
    lastActivity: string;
    reportedBy: Array<{
      _id: string;
      name: string;
      email: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
}

// Individual phone number record
export interface PhoneNumberRecord {
  phoneNumber: string;
  countryCode?: string;
  riskLevel: RiskLevel;
  riskScore: number;
  totalReports: number;
  aiDetections: number;
  manualReports: number;
  scamTypes: string[];
  status: string;
  firstDetected: string;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

// Response from GET /api/verify/recent
export interface RecentScamsResponse {
  success: boolean;
  count: number;
  data: PhoneNumberRecord[];
}

// Response from GET /api/verify/stats
export interface StatsResponse {
  success: boolean;
  stats: {
    totalNumbers: number;
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    totalReports: number;
  };
}

// API error response
export interface VerificationError {
  success: false;
  message: string;
}

// Component Props
export interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface ResultCardProps {
  riskLevel: RiskLevel;
  riskScore: number;
  totalReports: number;
  scamTypes: string[];
}
