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

// Base Profile Interface with common fields
export interface BaseProfile {
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
  bio?: string;
  profilePicture?: string;
  preferences: ProfilePreferences;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  
  // Common Religious & Family Fields
  isPrayerRegular: boolean; // هل منتظم في الصلاة
  areParentsAlive: "both" | "father" | "mother" | "none"; // هل الوالدين موجودين
  parentRelationship: "excellent" | "good" | "average" | "poor"; // بر الوالدين
  wantsChildren: "yes" | "no" | "maybe"; // رغبة في الأطفال
  
  // Physical Appearance (Common)
  height: number; // الطول (cm)
  weight: number; // الوزن (kg)
  appearance: "very-attractive" | "attractive" | "average" | "simple"; // المظهر
  skinColor: "fair" | "medium" | "olive" | "dark"; // لون البشرة
  bodyType: "slim" | "average" | "athletic" | "heavy"; // بنية الجسم
  
  // Personal Information
  interests: string[]; // الاهتمامات
  marriageGoals: string; // أهدافك من الزواج
  personalityDescription: string; // تحدث عن شخصيتك
  familyPlans: string; // خطط الأسرة
  relocationPlans: string; // خطط الانتقال
  marriageTimeline: string; // خطط الزواج
}

// Female-specific Profile Interface
export interface FemaleProfile extends BaseProfile {
  gender: "female";
  
  // Guardian Information (Required for females)
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  guardianRelationship: "father" | "brother" | "uncle" | "other";
  guardianNotes?: string;
  
  // Religious Practice (Female-specific)
  wearHijab: boolean; // حجاب
  wearNiqab: boolean; // نقاب
  clothingStyle: "conservative" | "modest" | "traditional"; // نوع اللبس
  prayingLocation: "home" | "mosque-when-possible"; // مكان الصلاة
}

// Male-specific Profile Interface
export interface MaleProfile extends BaseProfile {
  gender: "male";
  
  // Religious Practice (Male-specific)
  hasBeard: boolean; // لحية
  prayingLocation: "mosque" | "home" | "both"; // الصلاة في المسجد أم البيت
  isRegularAtMosque: boolean; // الانتظام في المسجد
  
  // Lifestyle
  smokes: boolean; // التدخين
  
  // Financial & Housing
  financialSituation: "excellent" | "good" | "average" | "struggling"; // الوضع المادي
  housingLocation: string; // بيت الزوجية أين
  housingOwnership: "owned" | "rented" | "family-owned"; // هل تمليك أم إيجار
  housingType: "independent" | "with-family" | "shared"; // بيت مع الأهل أم مستقل
  monthlyIncome?: number; // الدخل الشهري
}

// Union type for Profile
export type Profile = MaleProfile | FemaleProfile;

export interface ProfilePreferences {
  ageRange: {
    min: number;
    max: number;
  };
  country?: string;
  cities?: string[];
  nationalities?: string[];
  maritalStatusPreference?: string[];
  educationPreference?: string[];
  occupationPreference?: string[];
  religiousLevel?: string[];
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

// Base Registration Request
export interface BaseRegisterRequest {
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
  bio?: string;
  profilePicture?: File;
  preferences: ProfilePreferences;
  
  // Common Religious & Family Fields
  isPrayerRegular: boolean;
  areParentsAlive: "both" | "father" | "mother" | "none";
  parentRelationship: "excellent" | "good" | "average" | "poor";
  wantsChildren: "yes" | "no" | "maybe";
  
  // Physical Appearance
  height: number;
  weight: number;
  appearance: "very-attractive" | "attractive" | "average" | "simple";
  skinColor: "fair" | "medium" | "olive" | "dark";
  bodyType: "slim" | "average" | "athletic" | "heavy";
  
  // Personal Information
  interests: string[];
  marriageGoals: string;
  personalityDescription: string;
  familyPlans: string;
  relocationPlans: string;
  marriageTimeline: string;
}

// Female Registration Request
export interface FemaleRegisterRequest extends BaseRegisterRequest {
  gender: "female";
  
  // Guardian Information (Required)
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  guardianRelationship: "father" | "brother" | "uncle" | "other";
  guardianNotes?: string;
  
  // Female-specific fields
  wearHijab: boolean;
  wearNiqab: boolean;
  clothingStyle: "conservative" | "modest" | "traditional";
  prayingLocation: "home" | "mosque-when-possible";
}

// Male Registration Request
export interface MaleRegisterRequest extends BaseRegisterRequest {
  gender: "male";
  
  // Male-specific fields
  hasBeard: boolean;
  prayingLocation: "mosque" | "home" | "both";
  isRegularAtMosque: boolean;
  smokes: boolean;
  financialSituation: "excellent" | "good" | "average" | "struggling";
  housingLocation: string;
  housingOwnership: "owned" | "rented" | "family-owned";
  housingType: "independent" | "with-family" | "shared";
  monthlyIncome?: number;
}

// Union type for RegisterRequest
export type RegisterRequest = MaleRegisterRequest | FemaleRegisterRequest;

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

// Utility Types for Gender-specific Profiles
export type ProfileByGender<T extends "male" | "female"> = T extends "male" 
  ? MaleProfile 
  : T extends "female" 
  ? FemaleProfile 
  : never;

export type RegisterRequestByGender<T extends "male" | "female"> = T extends "male" 
  ? MaleRegisterRequest 
  : T extends "female" 
  ? FemaleRegisterRequest 
  : never;

// Validation helper types
export interface ProfileValidationRules {
  common: {
    name: { required: boolean; minLength: number; maxLength: number };
    age: { required: boolean; min: number; max: number };
    height: { required: boolean; min: number; max: number };
    weight: { required: boolean; min: number; max: number };
    interests: { required: boolean; minItems: number; maxItems: number };
    marriageGoals: { required: boolean; minLength: number; maxLength: number };
    personalityDescription: { required: boolean; minLength: number; maxLength: number };
  };
  female: {
    guardianName: { required: boolean; minLength: number; maxLength: number };
    guardianPhone: { required: boolean; pattern: string };
    wearHijab: { required: boolean };
  };
  male: {
    hasBeard: { required: boolean };
    financialSituation: { required: boolean };
    housingLocation: { required: boolean; minLength: number; maxLength: number };
    monthlyIncome: { required: boolean; min: number };
  };
}

// Profile completion status
export interface ProfileCompletionStatus {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
  sectionsStatus: {
    basicInfo: boolean;
    religiousInfo: boolean;
    physicalInfo: boolean;
    personalInfo: boolean;
    specificInfo: boolean; // gender-specific fields
    preferences: boolean;
  };
}

// Search and matching types
export interface ProfileSearchFilters {
  gender: "male" | "female";
  ageRange: { min: number; max: number };
  countries?: string[];
  cities?: string[];
  religiousLevels?: string[];
  maritalStatuses?: string[];
  educationLevels?: string[];
  heightRange?: { min: number; max: number };
  // Gender-specific filters
  maleFilters?: {
    hasBeard?: boolean;
    smokingStatus?: boolean;
    financialSituation?: string[];
    housingType?: string[];
  };
  femaleFilters?: {
    wearHijab?: boolean;
    wearNiqab?: boolean;
    clothingStyle?: string[];
  };
}

export interface ProfileMatch {
  profile: Profile;
  compatibilityScore: number;
  matchReasons: string[];
  commonInterests: string[];
}

// Enums and Constants for Profile Fields
export const RELIGIOUS_LEVELS = {
  BASIC: "basic",
  PRACTICING: "practicing", 
  VERY_RELIGIOUS: "very-religious"
} as const;

export const MARITAL_STATUS = {
  SINGLE: "single",
  DIVORCED: "divorced",
  WIDOWED: "widowed"
} as const;

export const PARENT_STATUS = {
  BOTH: "both",
  FATHER: "father", 
  MOTHER: "mother",
  NONE: "none"
} as const;

export const PARENT_RELATIONSHIP = {
  EXCELLENT: "excellent",
  GOOD: "good",
  AVERAGE: "average", 
  POOR: "poor"
} as const;

export const CHILDREN_PREFERENCE = {
  YES: "yes",
  NO: "no",
  MAYBE: "maybe"
} as const;

export const APPEARANCE_LEVELS = {
  VERY_ATTRACTIVE: "very-attractive",
  ATTRACTIVE: "attractive",
  AVERAGE: "average",
  SIMPLE: "simple"
} as const;

export const SKIN_COLORS = {
  FAIR: "fair",
  MEDIUM: "medium", 
  OLIVE: "olive",
  DARK: "dark"
} as const;

export const BODY_TYPES = {
  SLIM: "slim",
  AVERAGE: "average",
  ATHLETIC: "athletic", 
  HEAVY: "heavy"
} as const;

// Female-specific constants
export const CLOTHING_STYLES = {
  CONSERVATIVE: "conservative",
  MODEST: "modest",
  TRADITIONAL: "traditional"
} as const;

export const FEMALE_PRAYER_LOCATIONS = {
  HOME: "home",
  MOSQUE_WHEN_POSSIBLE: "mosque-when-possible"
} as const;

export const GUARDIAN_RELATIONSHIPS = {
  FATHER: "father",
  BROTHER: "brother",
  UNCLE: "uncle", 
  OTHER: "other"
} as const;

// Male-specific constants
export const MALE_PRAYER_LOCATIONS = {
  MOSQUE: "mosque",
  HOME: "home",
  BOTH: "both"
} as const;

export const FINANCIAL_SITUATIONS = {
  EXCELLENT: "excellent",
  GOOD: "good", 
  AVERAGE: "average",
  STRUGGLING: "struggling"
} as const;

export const HOUSING_OWNERSHIP = {
  OWNED: "owned",
  RENTED: "rented",
  FAMILY_OWNED: "family-owned"
} as const;

export const HOUSING_TYPES = {
  INDEPENDENT: "independent", 
  WITH_FAMILY: "with-family",
  SHARED: "shared"
} as const;

// Preference importance levels
export const IMPORTANCE_LEVELS = {
  VERY_IMPORTANT: "very-important",
  IMPORTANT: "important",
  MODERATE: "moderate", 
  FLEXIBLE: "flexible"
} as const;

export const PREFERENCE_LEVELS = {
  REQUIRED: "required",
  PREFERRED: "preferred",
  NO_PREFERENCE: "no-preference",
  NOT_PREFERRED: "not-preferred"
} as const;

export const TOLERANCE_LEVELS = {
  NO_TOLERANCE: "no-tolerance",
  FLEXIBLE: "flexible"
} as const;

export const COMPATIBILITY_LEVELS = {
  MUST_MATCH: "must-match", 
  FLEXIBLE: "flexible",
  NOT_IMPORTANT: "not-important"
} as const;
