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

export interface Profile {
  id: string;
  userId: string;
  // Basic Info
  name: string;
  age: number;
  birthDate?: string; // Optional birth date field
  gender: "male" | "female";
  country: string;
  city: string;
  nationality: string;
  maritalStatus: "single" | "divorced" | "widowed";

  // Religious Info
  prays: boolean;
  fasts: boolean;
  hasHijab?: boolean; // for sisters
  hasBeard?: boolean; // for brothers
  hijab?: boolean; // Alternative property name
  beard?: boolean; // Alternative property name
  religiousLevel: "basic" | "practicing" | "very-religious" | "moderate"; // Added moderate

  // Education & Work
  education: string;
  occupation: string;

  // Profile Settings
  profilePicture?: string;
  bio?: string;
  isComplete: boolean;
  isApproved: boolean;
  isVerified?: boolean; // Verification status
  privacySettings: PrivacySettings;

  // Guardian Info (optional)
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;

  createdAt: string;
  updatedAt: string;
}

export interface PrivacySettings {
  showProfilePicture: "everyone" | "matches-only" | "none";
  showAge: boolean;
  showLocation: boolean;
  showOccupation: boolean;
  allowMessagesFrom: "everyone" | "matches-only" | "none";
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

// Form Types
export interface RegisterFormData {
  emailOrPhone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
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
    religiousLevel: "basic" | "practicing" | "very-religious";
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
