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
  birthDate?: string; // Optional birth date field
  gender: "male" | "female";
  country: string;
  city: string;
  nationality: string;
  maritalStatus: "single" | "divorced" | "widowed";
  education?: string;
  occupation?: string;
  religiousLevel: "basic" | "practicing" | "very-religious" | "moderate";
  bio?: string;
  profilePicture?: string;
  preferences: ProfilePreferences;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;

  // Verification and Completion Status
  isComplete?: boolean;
  isApproved?: boolean;
  isVerified?: boolean;

  // Privacy Settings
  privacySettings?: {
    showProfilePicture: "everyone" | "matches-only" | "none";
    showAge: boolean;
    showLocation: boolean;
    showOccupation: boolean;
    allowMessagesFrom: "everyone" | "matches-only" | "none";
  };

  // Common Religious & Family Fields
  isPrayerRegular: boolean;
  // Legacy compatibility fields for old components
  prays?: boolean; // Maps to isPrayerRegular
  fasts?: boolean; // Can be derived from religiousLevel
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

  // Additional Religious Fields
  quranMemorization?:
    | "none"
    | "less-than-juz"
    | "one-juz"
    | "two-juz"
    | "three-juz"
    | "less-than-quarter"
    | "more-than-quarter"
    | "half"
    | "than-quarter-half"
    | "full";
  quranReadingFrequency?:
    | "daily"
    | "weekly"
    | "monthly"
    | "occasionally"
    | "rarely";

  // Family Background
  family?: {
    siblings: number;
    birthOrder: "eldest" | "middle" | "youngest" | "only";
    values: "very important" | "important" | "moderate" | "not important";
  };

  // Cultural and Personal
  ethnicity?: string;
  hobbies?: string[];
  health?: {
    chronicConditions?: string; // e.g., "Diabetes"
    ongoingTreatment?: boolean; // Requires regular medication/treatment
    dailyLifeImpact?: string; // e.g., "Limited mobility"
    additionalNotes?: string; // Other health-related info
  };

  // Education and Career
  educationLevel?:
    | "high school"
    | "associate"
    | "bachelor"
    | "master"
    | "doctorate"
    | "other";
  fieldOfStudy?: string;
  currentOccupation?: string;
  careerGoals?: string;

  // Marriage Expectations
  spouseQualities?: string[];
  dealBreakers?: string[];
  marriageExpectations?: string;
  conflictResolution?: string;

  // Family and Marriage Details
  familyAndMarriage?: {
    marriageVision?: string; // Vision for marital relationship
    livingWithInLaws?: "prefer" | "neutral" | "avoid"; // Preference for living with in-laws
    parentingPriorities?: string[]; // Priorities in raising children
    childrenEducation?: "religious" | "secular" | "mixed" | "undecided"; // Preferred education type
    decisionMaking?: "shared" | "husband-led" | "wife-led" | "flexible"; // Family decision-making style
    familyFinancialGoals?: string; // Financial plans for family
  };
}

// Female-specific Profile Interface
export interface FemaleProfile extends BaseProfile {
  gender: "female";

  // Guardian Information
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  guardianRelationship: "father" | "brother" | "uncle" | "other";
  guardianNotes?: string;

  // Religious Practice
  wearHijab: boolean;
  wearNiqab: boolean;
  clothingStyle: "niqab-full" | "niqab-hands" | "khimar" | "tarha-loose" | "tarha-fitted" | "hijab-conservative" | "hijab-modest" | "hijab-modern" | "loose-covering" | "modest-covering";
  prayingLocation: "home" | "mosque-when-possible";

  // Legacy compatibility fields
  hasHijab?: boolean; // Maps to wearHijab
  hijab?: boolean; // Maps to wearHijab

  // Additional Female-specific Fields
  mahramAvailable?: boolean;
  workAfterMarriage?: "yes" | "no" | "undecided";
  childcarePreference?: "self" | "family" | "nanny" | "daycare";
}

// Male-specific Profile Interface
export interface MaleProfile extends BaseProfile {
  gender: "male";

  // Religious Practice
  hasBeard: boolean;
  prayingLocation: "mosque" | "home" | "both";
  isRegularAtMosque: boolean;

  // Legacy compatibility fields
  beard?: boolean; // Maps to hasBeard

  // Lifestyle
  smokes: boolean;

  // Financial & Housing
  financialSituation: "excellent" | "good" | "average" | "struggling";
  housingLocation: string;
  housingOwnership: "owned" | "rented" | "family-owned";
  housingType: "independent" | "with-family" | "shared";
  monthlyIncome?: number;

  // Additional Male-specific Fields
  providerView?: "sole provider" | "shared responsibility" | "flexible";
  householdChores?: "willing" | "not willing" | "depends";
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
  education?: string[];
  occupationPreference?: string[];
  religiousLevel?: string[];
  quranMemorizationPreference?: string[];
  hobbiesPreference?: string[];
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
  religiousLevel: "basic" | "practicing" | "very-religious" | "moderate";
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

  // Additional Religious Fields
  quranMemorization?:
    | "none"
    | "less-than-juz"
    | "one-juz"
    | "two-juz"
    | "three-juz"
    | "less-than-quarter"
    | "more-than-quarter"
    | "half"
    | "more-than-half"
    | "full";
  quranReadingFrequency?:
    | "daily"
    | "weekly"
    | "monthly"
    | "occasionally"
    | "rarely";

  // Family Background
  family?: {
    siblings: number;
    birthOrder: "eldest" | "middle" | "youngest" | "only";
    values: "very important" | "important" | "moderate" | "not important";
  };

  // Cultural and Personal
  ethnicity?: string;
  hobbies?: string[];
  health?: {
    chronicConditions?: string;
    ongoingTreatment?: boolean;
    dailyLifeImpact?: string;
    additionalNotes?: string;
  };

  // Education and Career
  educationLevel?:
    | "high school"
    | "associate"
    | "bachelor"
    | "master"
    | "doctorate"
    | "other";
  fieldOfStudy?: string;
  currentOccupation?: string;
  careerGoals?: string;

  // Marriage Expectations
  spouseQualities?: string[];
  dealBreakers?: string[];
  marriageExpectations?: string;
  conflictResolution?: string;

  // Family and Marriage Details
  familyAndMarriage?: {
    marriageVision?: string;
    livingWithInLaws?: "prefer" | "neutral" | "avoid";
    parentingPriorities?: string[];
    childrenEducation?: "religious" | "secular" | "mixed" | "undecided";
    decisionMaking?: "shared" | "husband-led" | "wife-led" | "flexible";
    familyFinancialGoals?: string;
  };
}

// Female Registration Request
export interface FemaleRegisterRequest extends BaseRegisterRequest {
  gender: "female";

  // Guardian Information
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  guardianRelationship: "father" | "brother" | "uncle" | "other";
  guardianNotes?: string;

  // Female-specific fields
  wearHijab: boolean;
  wearNiqab: boolean;
  clothingStyle: "niqab-full" | "niqab-hands" | "khimar" | "tarha-loose" | "tarha-fitted" | "hijab-conservative" | "hijab-modest" | "hijab-modern" | "loose-covering" | "modest-covering";
  prayingLocation: "home" | "mosque-when-possible";

  // Additional Female-specific Fields
  mahramAvailable?: boolean;
  workAfterMarriage?: "yes" | "no" | "undecided";
  childcarePreference?: "self" | "family" | "nanny" | "daycare";
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

  // Additional Male-specific Fields
  providerView?: "sole provider" | "shared responsibility" | "flexible";
  householdChores?: "willing" | "not willing" | "depends";
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

export type RegisterRequestByGender<T extends "male" | "female"> =
  T extends "male"
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
    personalityDescription: {
      required: boolean;
      minLength: number;
      maxLength: number;
    };
  };
  female: {
    guardianName: { required: boolean; minLength: number; maxLength: number };
    guardianPhone: { required: boolean; pattern: string };
    wearHijab: { required: boolean };
  };
  male: {
    hasBeard: { required: boolean };
    financialSituation: { required: boolean };
    housingLocation: {
      required: boolean;
      minLength: number;
      maxLength: number;
    };
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
  VERY_RELIGIOUS: "very-religious",
  MODERATE: "moderate",
} as const;

export const MARITAL_STATUS = {
  SINGLE: "single",
  DIVORCED: "divorced",
  WIDOWED: "widowed",
} as const;

export const PARENT_STATUS = {
  BOTH: "both",
  FATHER: "father",
  MOTHER: "mother",
  NONE: "none",
} as const;

export const PARENT_RELATIONSHIP = {
  EXCELLENT: "excellent",
  GOOD: "good",
  AVERAGE: "average",
  POOR: "poor",
} as const;

export const CHILDREN_PREFERENCE = {
  YES: "yes",
  NO: "no",
  MAYBE: "maybe",
} as const;

export const APPEARANCE_LEVELS = {
  VERY_ATTRACTIVE: "very-attractive",
  ATTRACTIVE: "attractive",
  AVERAGE: "average",
  SIMPLE: "simple",
} as const;

export const SKIN_COLORS = {
  FAIR: "fair",
  MEDIUM: "medium",
  OLIVE: "olive",
  DARK: "dark",
} as const;

export const BODY_TYPES = {
  SLIM: "slim",
  AVERAGE: "average",
  ATHLETIC: "athletic",
  HEAVY: "heavy",
} as const;

// Female-specific constants
export const CLOTHING_STYLES = {
  NIQAB_FULL: "niqab-full", // نقاب كامل - تغطية الوجه والكفين
  NIQAB_HANDS: "niqab-hands", // نقاب مع كشف الكفين فقط
  KHIMAR: "khimar", // خمار - غطاء رأس طويل يغطي الصدر مع ملابس واسعة
  TARHA_LOOSE: "tarha-loose", // غطاء رأس مع ملابس واسعة وطويلة
  HIJAB_CONSERVATIVE: "hijab-conservative", // حجاب مع ملابس واسعة لا تُظهر تفاصيل الجسم
  HIJAB_MODEST: "hijab-modest", // حجاب مع ملابس مناسبة الحجم وليست ضيقة
  TARHA_FITTED: "tarha-fitted", // غطاء رأس مع ملابس مناسبة الحجم
  HIJAB_MODERN: "hijab-modern", // حجاب مع ملابس عصرية قد تُظهر شكل الجسم
  LOOSE_COVERING: "loose-covering", // ملابس واسعة وطويلة بدون غطاء رأس
  MODEST_COVERING: "modest-covering", // ملابس عادية تُظهر الذراعين أو جزء من الساقين
} as const;

export const FEMALE_PRAYER_LOCATIONS = {
  HOME: "home",
  MOSQUE_WHEN_POSSIBLE: "mosque-when-possible",
} as const;

export const GUARDIAN_RELATIONSHIPS = {
  FATHER: "father",
  BROTHER: "brother",
  UNCLE: "uncle",
  OTHER: "other",
} as const;

// Male-specific constants
export const MALE_PRAYER_LOCATIONS = {
  MOSQUE: "mosque",
  HOME: "home",
  BOTH: "both",
} as const;

export const FINANCIAL_SITUATIONS = {
  EXCELLENT: "excellent",
  GOOD: "good",
  AVERAGE: "average",
  STRUGGLING: "struggling",
} as const;

export const HOUSING_OWNERSHIP = {
  OWNED: "owned",
  RENTED: "rented",
  FAMILY_OWNED: "family-owned",
} as const;

export const HOUSING_TYPES = {
  INDEPENDENT: "independent",
  WITH_FAMILY: "with-family",
  SHARED: "shared",
} as const;

// Type Guards
export function isMaleProfile(profile: Profile): profile is MaleProfile {
  return profile.gender === "male";
}

export function isFemaleProfile(profile: Profile): profile is FemaleProfile {
  return profile.gender === "female";
}

export function isMaleRegisterRequest(
  request: RegisterRequest,
): request is MaleRegisterRequest {
  return request.gender === "male";
}

export function isFemaleRegisterRequest(
  request: RegisterRequest,
): request is FemaleRegisterRequest {
  return request.gender === "female";
}
