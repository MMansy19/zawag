// Application constants for the Islamic Zawaj Platform

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    VERIFY_OTP: "/api/auth/verify-otp",
    RESEND_OTP: "/api/auth/resend-otp",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
    REFRESH_TOKEN: "/api/auth/refresh",
  },

  // Profile
  PROFILE: {
    GET: "/api/profile",
    UPDATE: "/api/profile",
    UPLOAD_PICTURE: "/api/profile/picture",
    DELETE_PICTURE: "/api/profile/picture",
    COMPLETE: "/api/profile/complete",
  },

  // Search
  SEARCH: {
    PROFILES: "/api/search/profiles",
    FILTERS: "/api/search/filters",
  },

  // Marriage Requests
  REQUESTS: {
    SEND: "/api/requests/send",
    GET_RECEIVED: "/api/requests/received",
    GET_SENT: "/api/requests/sent",
    RESPOND: "/api/requests/respond",
    GET_BY_ID: "/api/requests",
  },

  // Chat
  CHAT: {
    GET_ROOMS: "/api/chat/rooms",
    GET_MESSAGES: "/api/chat/messages",
    SEND_MESSAGE: "/api/chat/send",
    GET_LIMITS: "/api/chat/limits",
  },

  // Admin
  ADMIN: {
    USERS: "/api/admin/users",
    REQUESTS: "/api/admin/requests",
    MESSAGES: "/api/admin/messages",
    REPORTS: "/api/admin/reports",
    SETTINGS: "/api/admin/settings",
    STATS: "/api/admin/stats",
  },

  // Notifications
  NOTIFICATIONS: {
    GET: "/api/notifications",
    MARK_READ: "/api/notifications/read",
    GET_UNREAD_COUNT: "/api/notifications/unread-count",
  },
} as const;

export const COUNTRIES = [
  { code: "SA", name: "المملكة العربية السعودية", nameEn: "Saudi Arabia" },
  {
    code: "AE",
    name: "الإمارات العربية المتحدة",
    nameEn: "United Arab Emirates",
  },
  { code: "EG", name: "مصر", nameEn: "Egypt" },
  { code: "JO", name: "الأردن", nameEn: "Jordan" },
  { code: "LB", name: "لبنان", nameEn: "Lebanon" },
  { code: "SY", name: "سوريا", nameEn: "Syria" },
  { code: "IQ", name: "العراق", nameEn: "Iraq" },
  { code: "KW", name: "الكويت", nameEn: "Kuwait" },
  { code: "QA", name: "قطر", nameEn: "Qatar" },
  { code: "BH", name: "البحرين", nameEn: "Bahrain" },
  { code: "OM", name: "عُمان", nameEn: "Oman" },
  { code: "YE", name: "اليمن", nameEn: "Yemen" },
  { code: "MA", name: "المغرب", nameEn: "Morocco" },
  { code: "DZ", name: "الجزائر", nameEn: "Algeria" },
  { code: "TN", name: "تونس", nameEn: "Tunisia" },
  { code: "LY", name: "ليبيا", nameEn: "Libya" },
  { code: "SD", name: "السودان", nameEn: "Sudan" },
  { code: "TR", name: "تركيا", nameEn: "Turkey" },
  { code: "PK", name: "باكستان", nameEn: "Pakistan" },
  { code: "BD", name: "بنغلاديش", nameEn: "Bangladesh" },
  { code: "ID", name: "إندونيسيا", nameEn: "Indonesia" },
  { code: "MY", name: "ماليزيا", nameEn: "Malaysia" },
  { code: "US", name: "الولايات المتحدة", nameEn: "United States" },
  { code: "CA", name: "كندا", nameEn: "Canada" },
  { code: "GB", name: "المملكة المتحدة", nameEn: "United Kingdom" },
  { code: "DE", name: "ألمانيا", nameEn: "Germany" },
  { code: "FR", name: "فرنسا", nameEn: "France" },
  { code: "AU", name: "أستراليا", nameEn: "Australia" },
] as const;

export const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "أعزب/عزباء" },
  { value: "divorced", label: "مطلق/مطلقة" },
  { value: "widowed", label: "أرمل/أرملة" },
] as const;

export const RELIGIOUS_LEVEL_OPTIONS = [
  { value: "basic", label: "ملتزم بالأساسيات" },
  { value: "practicing", label: "ملتزم" },
  { value: "very-religious", label: "ملتزم جداً" },
] as const;

export const EDUCATION_OPTIONS = [
  { value: "high-school", label: "ثانوية عامة" },
  { value: "diploma", label: "دبلوم" },
  { value: "bachelor", label: "بكالوريوس" },
  { value: "master", label: "ماجستير" },
  { value: "phd", label: "دكتوراه" },
  { value: "other", label: "أخرى" },
] as const;

export const OCCUPATION_OPTIONS = [
  { value: "student", label: "طالب/طالبة" },
  { value: "teacher", label: "معلم/معلمة" },
  { value: "doctor", label: "طبيب/طبيبة" },
  { value: "engineer", label: "مهندس/مهندسة" },
  { value: "nurse", label: "ممرض/ممرضة" },
  { value: "accountant", label: "محاسب/محاسبة" },
  { value: "lawyer", label: "محامي/محامية" },
  { value: "business", label: "رجل/سيدة أعمال" },
  { value: "government", label: "موظف حكومي" },
  { value: "freelancer", label: "عمل حر" },
  { value: "unemployed", label: "عاطل عن العمل" },
  { value: "housewife", label: "ربة منزل" },
  { value: "retired", label: "متقاعد/متقاعدة" },
  { value: "other", label: "أخرى" },
] as const;

export const PRIVACY_OPTIONS = {
  PROFILE_PICTURE: [
    { value: "everyone", label: "الجميع" },
    { value: "matches-only", label: "المطابقات فقط" },
    { value: "none", label: "لا أحد" },
  ],
  MESSAGES: [
    { value: "everyone", label: "الجميع" },
    { value: "matches-only", label: "المطابقات فقط" },
    { value: "none", label: "لا أحد" },
  ],
} as const;

export const CHAT_LIMITS = {
  MESSAGES_PER_HOUR: 1,
  MESSAGES_PER_DAY: 3,
  MAX_CONCURRENT_CHATS: 3,
  DEFAULT_EXPIRY_DAYS: 7,
  MAX_MESSAGE_LENGTH: 500,
} as const;

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  AGE: {
    MIN: 18,
    MAX: 70,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
  BIO: {
    MAX_LENGTH: 500,
  },
  MESSAGE: {
    MAX_LENGTH: 500,
  },
  OTP: {
    LENGTH: 6,
  },
} as const;

export const FILE_UPLOAD = {
  PROFILE_PICTURE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    MAX_DIMENSION: 1000, // pixels
  },
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  VERIFY_OTP: "/auth/verify-otp",
  FORGOT_PASSWORD: "/auth/forgot-password",
  PROFILE_BUILDER: "/profile/builder",
  DASHBOARD: "/dashboard",
  SEARCH: "/dashboard/search",
  REQUESTS: "/dashboard/requests",
  CHAT: "/dashboard/chat",
  SETTINGS: "/dashboard/settings",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_REQUESTS: "/admin/requests",
  ADMIN_MESSAGES: "/admin/messages",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_SETTINGS: "/admin/settings",
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "zawaj_auth_token",
  REFRESH_TOKEN: "zawaj_refresh_token",
  USER_DATA: "zawaj_user_data",
  THEME_SETTINGS: "zawaj_theme_settings",
  PROFILE_BUILDER_DRAFT: "zawaj_profile_builder_draft",
} as const;

export const ERROR_MESSAGES = {
  GENERIC: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
  NETWORK: "خطأ في الاتصال. يرجى التحقق من اتصال الإنترنت.",
  UNAUTHORIZED: "غير مصرح لك بالوصول. يرجى تسجيل الدخول مرة أخرى.",
  FORBIDDEN: "ليس لديك صلاحية للقيام بهذا الإجراء.",
  NOT_FOUND: "العنصر المطلوب غير موجود.",
  VALIDATION: "يرجى التحقق من البيانات المدخلة.",
  SERVER_ERROR: "خطأ في الخادم. يرجى المحاولة لاحقاً.",
  FILE_TOO_LARGE: "حجم الملف كبير جداً.",
  INVALID_FILE_TYPE: "نوع الملف غير مدعوم.",
  PROFILE_INCOMPLETE: "يرجى إكمال الملف الشخصي أولاً.",
  CHAT_LIMIT_EXCEEDED: "تم تجاوز حد الرسائل المسموح.",
  REQUEST_EXPIRED: "انتهت صلاحية الطلب.",
} as const;

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: "تم تحديث الملف الشخصي بنجاح.",
  REQUEST_SENT: "تم إرسال طلب الزواج بنجاح.",
  REQUEST_ACCEPTED: "تم قبول الطلب بنجاح.",
  REQUEST_REJECTED: "تم رفض الطلب.",
  MESSAGE_SENT: "تم إرسال الرسالة بنجاح.",
  SETTINGS_UPDATED: "تم تحديث الإعدادات بنجاح.",
  PASSWORD_UPDATED: "تم تغيير كلمة المرور بنجاح.",
  EMAIL_VERIFIED: "تم تأكيد البريد الإلكتروني بنجاح.",
  PHONE_VERIFIED: "تم تأكيد رقم الهاتف بنجاح.",
} as const;

export const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
] as const;

export const ARABIC_DAYS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
] as const;

// Abusive words list for content moderation (starter list)
export const ABUSIVE_WORDS_AR = [
  // Note: This is a basic starter list. In production, this should be much more comprehensive
  // and maintained by administrators through the admin panel
  "كلب",
  "حمار",
  "غبي",
  "أحمق",
  "لعين",
] as const;

export const DEFAULT_THEME = {
  colors: {
    primary: "#1E88E5",
    secondary: "#4CAF50",
    accent: "#FBC02D",
    background: "#F5F5F5",
    text: "#212121",
    error: "#D32F2F",
    border: "#E0E0E0",
    card: "#FFFFFF",
  },
  fonts: {
    primary: "Noto Kufi Arabic",
    secondary: "Amiri",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
} as const;
