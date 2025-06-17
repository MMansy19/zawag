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

// Profile Preferences
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
  dealBreakers?: string[];
}

// Base Registration Request with all comprehensive fields
export interface BaseRegisterRequest {
  // Authentication
  email: string;
  password: string;
  phone: string;

  // Declaration
  acceptDeclaration: boolean;

  // Basic Information
  applicantStatus: "self" | "parent" | "guardian" | "other";
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

  // Divorce Information (if applicable)
  divorceDetails?: string;
  previousMarriages?: number;
  divorceReason?: string;

  // Children Information
  hasChildren: "yes" | "no";
  childrenCount?: number;
  childrenAges?: string;
  childrenLiveWithMe?: "yes" | "no" | "partial";
  childrenDetails?: string;

  // Parents Status
  areParentsAlive: "both" | "father" | "mother" | "none";
  parentRelationship: "excellent" | "good" | "average" | "poor";
  relationshipWithFamily: string;

  // Health Information
  healthConditions?: string;
  healthDetails?: string;

  // Physical Appearance
  height: number;
  weight: number;
  appearance: "very-attractive" | "attractive" | "average" | "simple";
  skinColor: "fair" | "medium" | "olive" | "dark";
  bodyType: "slim" | "average" | "athletic" | "heavy";
  personalHygiene: "excellent" | "good" | "average";
  exerciseFrequency: "daily" | "weekly" | "monthly" | "rarely" | "never";

  // Housing & Financial
  financialStatus: "excellent" | "good" | "average" | "struggling";
  housingStatus: "owned" | "rented" | "with-family";
  housingLocation?: string;
  hasPersonalCar: "yes" | "no";

  // Education Level
  educationLevel:
    | "primary"
    | "secondary"
    | "high-school"
    | "diploma"
    | "bachelor"
    | "master"
    | "doctorate"
    | "other";

  // Personal Traits (multi-select)
  personalityTraits: string[];
  personalityDescription: string;
  personalFlaws?: string;

  // Religious Information
  religion: "islam";
  sect: "sunni" | "other";
  religiousLevel: "basic" | "practicing" | "very-religious" | "moderate";
  isPrayerRegular: boolean;

  // Quran Knowledge
  quranMemorization:
    | "none"
    | "less-than-juz"
    | "one-juz"
    | "few-juz"
    | "less-than-quarter"
    | "quarter"
    | "half"
    | "more-than-half"
    | "full";
  quranReadingFrequency:
    | "daily"
    | "weekly"
    | "monthly"
    | "occasionally"
    | "rarely";
  religiousKnowledge: "basic" | "intermediate" | "advanced" | "scholar";

  // Social Interactions
  mixingWithOppositeGender: string[];
  charityWork: "regularly" | "occasionally" | "rarely" | "never";
  communityInvolvement: string;
  familyImportance:
    | "very-important"
    | "important"
    | "moderate"
    | "not-important";
  friendsCircle: string;
  qualitiesInFriends: string;

  // Entertainment & Lifestyle
  musicListening: "never" | "rarely" | "sometimes" | "often";
  watchingTvShows: "never" | "rarely" | "sometimes" | "often";
  smokingStatus: "never" | "quit" | "occasionally" | "regularly";
  alcoholConsumption: "never" | "rarely" | "occasionally" | "regularly";
  drugUse: "never" | "past" | "current";
  prisonHistory?: string;

  // Life Goals & Values
  marriageVision: string;
  weddingVision: string;
  marriageGoals: string;
  childrenPlans: string;
  childRearingVision: string;
  lifeAmbitions: string;
  hobbiesAndInterests: string;
  religiousScholarsFollowed: string;

  // Additional Personal Information
  interests: string[];
  familyPlans: string;
  relocationPlans: string;
  marriageTimeline: string;
  wantsChildren: "yes" | "no" | "maybe";

  // Preferences
  preferences: ProfilePreferences;

  // Profile Picture
  profilePicture?: File;
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

  // Female-specific religious fields
  wearHijab: boolean;
  wearNiqab: boolean;
  clothingStyle: string;
  prayingLocation: "home" | "mosque-when-possible";

  // Female-specific questions
  beautyLevel: "very-beautiful" | "beautiful" | "average" | "simple";
  cookingSkills: "excellent" | "good" | "basic" | "learning";
  householdManagement: "excellent" | "good" | "basic" | "learning";
  workAfterMarriage?: "yes" | "no" | "undecided";
  islamicWomanVision: string;
  relationshipWithHusbandFamily: string;

  // Partner Preferences
  preferredQualities: string;
  unpreferredQualities: string;
  unacceptableQualities: string[];
}

// Male Registration Request
export interface MaleRegisterRequest extends BaseRegisterRequest {
  gender: "male";

  // Male-specific religious fields
  hasBeard: boolean;
  prayingLocation: "mosque" | "home" | "both";
  congregationalPrayer: "always" | "usually" | "sometimes" | "rarely" | "never";

  // Male-specific fields
  attractivenessLevel: "very-handsome" | "handsome" | "average" | "simple";
  financialSituation: "excellent" | "good" | "average" | "struggling";
  housingOwnership: "owned" | "rented" | "family";
  currentLivingArrangement: "independent" | "with-family" | "shared";
  monthlyIncome?: number;

  // Male-specific questions
  maleLeadershipVision: string;
  womanWorkVision: string;
  relationshipWithWifeFamily: string;
  familyInterferenceView: string;

  // Partner Preferences
  preferredQualities: string;
  unpreferredQualities: string;
  unacceptableQualities: string[];
}

// Union type for RegisterRequest
export type RegisterRequest = MaleRegisterRequest | FemaleRegisterRequest;

// Base Profile Interface
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
  religiousLevel: "basic" | "practicing" | "very-religious" | "moderate";
  bio?: string;
  profilePicture?: string;
  preferences: ProfilePreferences;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  isComplete?: boolean;
  isApproved?: boolean;
  isVerified?: boolean;
}

// Female Profile
export interface FemaleProfile extends BaseProfile {
  gender: "female";
  guardianName: string;
  guardianPhone: string;
  wearHijab: boolean;
  wearNiqab: boolean;
}

// Male Profile
export interface MaleProfile extends BaseProfile {
  gender: "male";
  hasBeard: boolean;
  financialSituation: "excellent" | "good" | "average" | "struggling";
}

// Union type for Profile
export type Profile = MaleProfile | FemaleProfile;

// Auth API Response Types
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

// Constants
export const GUARDIAN_RELATIONSHIPS = {
  FATHER: "father",
  BROTHER: "brother",
  UNCLE: "uncle",
  OTHER: "other",
} as const;
