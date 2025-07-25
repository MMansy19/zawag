// Profile types are now defined in auth.types.ts for gender-specific profiles
// Import and re-export the Profile types from auth.types.ts
import type {
  Profile,
  MaleProfile,
  FemaleProfile,
  BaseProfile,
  RELIGIOUS_LEVELS,
  MARITAL_STATUS,
  PARENT_STATUS,
  PARENT_RELATIONSHIP,
  CHILDREN_PREFERENCE,
  APPEARANCE_LEVELS,
  SKIN_COLORS,
  BODY_TYPES,
  CLOTHING_STYLES,
  FEMALE_PRAYER_LOCATIONS,
  GUARDIAN_RELATIONSHIPS,
  MALE_PRAYER_LOCATIONS,
  FINANCIAL_SITUATIONS,
  HOUSING_OWNERSHIP,
  HOUSING_TYPES,
} from "./auth.types";

import { isMaleProfile, isFemaleProfile } from "./auth.types";

export type { Profile, MaleProfile, FemaleProfile, BaseProfile };

export {
  isMaleProfile,
  isFemaleProfile,
  RELIGIOUS_LEVELS,
  MARITAL_STATUS,
  PARENT_STATUS,
  PARENT_RELATIONSHIP,
  CHILDREN_PREFERENCE,
  APPEARANCE_LEVELS,
  SKIN_COLORS,
  BODY_TYPES,
  CLOTHING_STYLES,
  FEMALE_PRAYER_LOCATIONS,
  GUARDIAN_RELATIONSHIPS,
  MALE_PRAYER_LOCATIONS,
  FINANCIAL_SITUATIONS,
  HOUSING_OWNERSHIP,
  HOUSING_TYPES,
};

// Core types for the Islamic Zawaj Platform
export interface User {
  id: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: "user" | "admin" | "moderator";
  status: "active" | "suspended" | "pending" | "blocked";
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  lastActiveAt?: string;
  profile?: Profile;
  // Computed properties for admin interface
  name?: string; // Will be populated from profile
  isActive?: boolean; // Computed from status
  isVerified?: boolean; // Computed from email/phone verification
}

export interface PrivacySettings {
  showProfilePicture: "everyone" | "matches-only" | "none";
  showAge: boolean;
  showLocation: boolean;
  showOccupation: boolean;
  allowMessagesFrom: "everyone" | "matches-only" | "none";

  // Enhanced privacy controls for females
  profileVisibility?:
    | "everyone"
    | "verified-only"
    | "premium-only"
    | "guardian-approved"
    | "matches-only";
  allowProfileViews?:
    | "everyone"
    | "verified-males"
    | "premium-males"
    | "guardian-approved"
    | "matches-only";
  showBasicInfo?: "everyone" | "verified-only" | "matches-only";
  showDetailedInfo?: "matches-only" | "guardian-approved" | "none";
  requireGuardianApproval?: boolean;
  allowContactRequests?:
    | "everyone"
    | "verified-only"
    | "guardian-approved"
    | "none";
  showOnlineStatus?: boolean;
  showLastSeen?: "everyone" | "matches-only" | "none";

  // Geographic visibility controls
  hideFromLocalUsers?: boolean;
  allowNearbySearch?: boolean;

  // Advanced filters for who can see profile
  allowedEducationLevels?: string[];
  allowedAgeRange?: { min: number; max: number };
  allowedFinancialSituations?: string[];
  blockedUsers?: string[];
}

export interface SearchFilters {
  ageRange: {
    min: number;
    max: number;
  };
  country?: string;
  city?: string;
  maritalStatus?: string[];
  religiousLevel?: string[];
  education?: string[];
  occupation?: string[];

  // Gender-specific filters
  // Female-specific filters (for male users searching females)
  wearHijab?: boolean;
  wearNiqab?: boolean;
  guardianRelationship?: string[];

  // Male-specific filters (for female users searching males)
  hasBeard?: boolean;
  financialSituation?: string[];
  smokes?: boolean;
  housingType?: string[];
}

export interface MarriageRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  message: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  sender?: Profile;
  receiver?: Profile;
}

export interface ChatRoom {
  id: string;
  requestId: string;
  participants: string[];
  status: "active" | "expired" | "closed";
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  status: "pending" | "approved" | "rejected" | "flagged";
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  flagReason?: string;
  sender?: Profile;
}

export interface AdminSettings {
  messageLimits: {
    perHour: number;
    perDay: number;
    maxConcurrentChats: number;
  };
  chatSettings: {
    defaultExpiryDays: number;
    maxExtensions: number;
  };
  moderationSettings: {
    autoApproveMessages: boolean;
    abusiveWords: string[];
  };
  themeSettings: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontSize: string;
  };
}

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId?: string;
  reportedMessageId?: string;
  reason:
    | "inappropriate-content"
    | "harassment"
    | "fake-profile"
    | "spam"
    | "other";
  description?: string;
  status: "pending" | "investigating" | "resolved" | "dismissed";
  createdAt: string;
  updatedAt: string;
  resolvedBy?: string;
  resolutionNotes?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ProfilePreferences {
  ageRange: { min: number; max: number };
}

export interface RegistrationData {
  preferredQualities?: string;
  unpreferredQualities?: string;
  // Common fields
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  country: string;
  city: string;
  nationality: string;
  maritalStatus: 'single' | 'divorced' | 'widowed';
  religiousLevel: 'practicing' | 'basic' | 'very-religious' | 'moderate';
  isPrayerRegular: boolean;
  areParentsAlive: 'both' | 'father' | 'mother' | 'none';
  parentRelationship: 'excellent' | 'good' | 'average' | 'poor';
  wantsChildren: 'yes' | 'no' | 'maybe';
  height: number;
  weight: number;
  appearance: 'average' | 'very-attractive' | 'attractive' | 'simple';
  skinColor: 'fair' | 'medium' | 'olive' | 'dark';
  bodyType: 'average' | 'slim' | 'athletic' | 'heavy';
  interests: string; // Comma-separated string
  marriageGoals: string;
  personalityDescription: string;
  familyPlans: string;
  relocationPlans: string;
  marriageTimeline: string;
  preferences: ProfilePreferences;
  education?: string;
  occupation?: string;
  bio?: string;
  phone?: string;
  otpCode?: string;

  // Female-specific fields
  guardianName?: string;
  guardianPhone?: string;
  guardianRelationship?: string;
  guardianEmail?: string;
  guardianNotes?: string;
  wearHijab?: boolean;
  wearNiqab?: boolean;
  clothingStyle?: string;
  prayingLocation?: string;
  mahramAvailable?: boolean;
  workAfterMarriage?: string;
  childcarePreference?: string;

  // Male-specific fields
  hasBeard?: boolean;
  isRegularAtMosque?: boolean;
  smokes?: boolean;
  financialSituation?: string;
  housingLocation?: string;
  housingOwnership?: string;
  housingType?: string;
  monthlyIncome?: number;
  providerView?: string;
  householdChores?: string;
}

export interface OTPVerificationData {
  otp: string;
  identifier: string; // email or phone
}

export interface ProfileBuilderData {
  // Step 1: Basic Info
  basicInfo: {
    name: string;
    age: number;
    gender: "male" | "female";
    country: string;
    city: string;
    nationality: string;
    maritalStatus: "single" | "divorced" | "widowed";
  };

  // Step 2: Religious Info
  religiousInfo: {
    prays: boolean;
    fasts: boolean;
    hasHijab?: boolean;
    hasBeard?: boolean;
    religiousLevel: "basic" | "practicing" | "very-religious" | "moderate";
  };

  // Step 3: Education & Work
  educationWork: {
    education: string;
    occupation: string;
  };

  // Step 4: Preferences
  preferences: SearchFilters;

  // Step 5: Profile Picture (optional)
  profilePicture?: File;

  // Step 6: Guardian Info (optional)
  guardianInfo?: {
    name: string;
    phone: string;
    email: string;
  };

  // Step 7: Bio
  bio?: string;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: "marriage-request" | "message" | "profile-approved" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  data?: any;
}

// Chat Limits
export interface ChatLimits {
  messagesPerHour: number;
  messagesPerDay: number;
  remainingHourly: number;
  remainingDaily: number;
  nextHourReset: string;
  nextDayReset: string;
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    error: string;
    border: string;
    card: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface ProfileFormData {
  name?: string;
  age?: number;
  gender?: "male" | "female";
  maritalStatus?: "single" | "divorced" | "widowed";
  country?: string;
  city?: string;
  nationality?: string;
  education?: string;
  occupation?: string;
  religiousLevel?: "basic" | "practicing" | "very-religious" | "moderate";
  prays?: boolean;
  fasts?: boolean;
  hasHijab?: boolean;
  hasBeard?: boolean;
  bio?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  preferences?: {
    ageRange?: {
      min?: number;
      max?: number;
    };
    country?: string;
    religiousLevel?: string[];
    education?: string[];
  };
}

export interface TermsSection {
  title: string;
  items: {
    label: string;
    description: string;
  }[];
}
