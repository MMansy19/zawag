// Authentication Types
export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "moderator";
  status: "active" | "pending" | "suspended";
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: "male" | "female";
  country: string;
  city: string;
  nationality: string;
  maritalStatus: "single" | "divorced" | "widowed";
  education?: string;
  occupation?: string;
  religiousLevel: "basic" | "practicing" | "very-religious";
  prays: boolean;
  fasts: boolean;
  hasHijab?: boolean;
  hasBeard?: boolean;
  bio?: string;
  profilePicture?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  preferences: ProfilePreferences;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface ProfilePreferences {
  ageRange: {
    min: number;
    max: number;
  };
  country?: string;
  religiousLevel?: string[];
  education?: string[];
}

// Auth API Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  profile?: Profile;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  country: string;
  city: string;
  nationality: string;
  maritalStatus: "single" | "divorced" | "widowed";
  education?: string;
  occupation?: string;
  religiousLevel: "basic" | "practicing" | "very-religious";
  prays: boolean;
  fasts: boolean;
  hasHijab?: boolean;
  hasBeard?: boolean;
  bio?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  guardianRelationship?: string;
  guardianNotes?: string;
  hasGuardian?: boolean;
  preferences: ProfilePreferences;
  profilePicture?: File;
}

export interface RegisterResponse {
  user: User;
  message: string;
  requiresVerification: boolean;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  user: User;
  profile: Profile;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

// Auth State Types
export interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  error: string | null;
}

// Auth Error Types
export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export class AuthenticationError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, any>,
  ) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

// Form Data Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationStepData {
  step: number;
  data: Partial<RegisterRequest>;
  isValid: boolean;
}

export interface OTPFormData {
  otp: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

// Registration Step Props
export interface RegistrationStepProps {
  data: Partial<RegisterRequest>;
  updateData: (updates: Partial<RegisterRequest>) => void;
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
  error: string | null;
  clearError: () => void;
}
