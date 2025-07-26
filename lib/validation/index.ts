import { z } from "zod";

// Authentication Schemas
const registerSchema = z
  .object({
    email: z.string().email("بريد إلكتروني غير صحيح"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string(),
    name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
    phone: z.string().min(10, "رقم الهاتف غير صحيح"),
    gender: z.enum(["m", "f"], {
      required_error: "يرجى تحديد الجنس",
    }),
    age: z.number().min(18, "العمر يجب أن يكون 18 سنة على الأقل"),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "يجب الموافقة على الشروط والأحكام",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صحيح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
  rememberMe: z.boolean().optional(),
});

const otpSchema = z.object({
  otp: z.string().length(6, "رمز التحقق يجب أن يكون 6 أرقام"),
  email: z.string().email(),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صحيح"),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

// Profile Building Schemas
const basicInfoSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  age: z
    .number()
    .min(18, "العمر يجب أن يكون 18 سنة على الأقل")
    .max(80, "العمر يجب أن يكون أقل من 80 سنة"),
  gender: z.enum(["m", "f"], {
    required_error: "يرجى تحديد الجنس",
  }),
  country: z.string().min(2, "يرجى إدخال البلد"),
  city: z.string().min(2, "يرجى إدخال المدينة"),
  nationality: z.string().min(2, "يرجى إدخال الجنسية"),
  maritalStatus: z.enum(["single", "divorced", "widowed"], {
    required_error: "يرجى تحديد الحالة الزوجية",
  }),
});

const religiousInfoSchema = z.object({
  religiousLevel: z.enum(["basic", "practicing", "very-religious"], {
    required_error: "يرجى تحديد مستوى التدين",
  }),
  prays: z.boolean().default(true),
  fasts: z.boolean().default(true),
  hasHijab: z.boolean().optional(),
  hasBeard: z.boolean().optional(),
  memorizedQuran: z.enum(["none", "some", "half", "full"]).optional(),
  islamicEducation: z.string().optional(),
});

const educationWorkSchema = z.object({
  education: z.string().min(2, "يرجى إدخال المؤهل التعليمي"),
  occupation: z.string().min(2, "يرجى إدخال المهنة"),
  income: z.enum(["low", "medium", "high", "prefer-not-to-say"]).optional(),
  workLocation: z.string().optional(),
});

const preferencesSchema = z
  .object({
    ageRange: z.object({
      min: z.number().min(18).max(80),
      max: z.number().min(18).max(80),
    }),
    countries: z.array(z.string()).optional(),
    religiousLevels: z.array(z.string()).optional(),
    educationLevels: z.array(z.string()).optional(),
    maritalStatuses: z.array(z.string()).optional(),
  })
  .refine((data) => data.ageRange.max >= data.ageRange.min, {
    message: "الحد الأقصى للعمر يجب أن يكون أكبر من الحد الأدنى",
    path: ["ageRange", "max"],
  });

const guardianInfoSchema = z.object({
  guardianName: z.string().min(2, "اسم الولي مطلوب"),
  guardianPhone: z.string().min(10, "رقم هاتف الولي غير صحيح"),
  guardianEmail: z
    .string()
    .email("بريد إلكتروني غير صحيح")
    .optional()
    .or(z.literal("")),
  guardianRelation: z.enum(["father", "brother", "uncle", "other"], {
    required_error: "يرجى تحديد صلة القرابة",
  }),
});

const bioSchema = z.object({
  bio: z
    .string()
    .max(500, "النبذة الشخصية يجب أن تكون أقل من 500 حرف")
    .optional(),
  hobbies: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
});

const privacySettingsSchema = z.object({
  profileVisibility: z
    .enum(["public", "members-only", "private"])
    .default("members-only"),
  showAge: z.boolean().default(true),
  showLocation: z.boolean().default(true),
  showOccupation: z.boolean().default(true),
  allowMessages: z.boolean().default(true),
  allowRequests: z.boolean().default(true),
});

// Marriage Request Schemas
const marriageRequestSchema = z.object({
  recipientId: z.string(),
  message: z
    .string()
    .min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل")
    .max(500, "الرسالة يجب أن تكون أقل من 500 حرف"),
  seriousIntent: z.boolean().refine((val) => val === true, {
    message: "يجب تأكيد الجدية في الطلب",
  }),
});

const respondToRequestSchema = z.object({
  requestId: z.string(),
  response: z.enum(["accept", "reject"], {
    required_error: "يرجى تحديد الرد",
  }),
  message: z.string().optional(),
});

// Chat Schemas
const sendMessageSchema = z.object({
  chatRoomId: z.string(),
  content: z
    .string()
    .min(1, "الرسالة لا يمكن أن تكون فارغة")
    .max(1000, "الرسالة طويلة جداً"),
  type: z.enum(["text", "image", "file"]).default("text"),
});

// Report Schemas
const reportSchema = z.object({
  reportedUserId: z.string(),
  reason: z.enum(
    [
      "inappropriate-content",
      "harassment",
      "fake-profile",
      "spam",
      "underage",
      "other",
    ],
    {
      required_error: "يرجى تحديد سبب البلاغ",
    },
  ),
  description: z
    .string()
    .min(10, "وصف البلاغ يجب أن يكون 10 أحرف على الأقل")
    .max(500, "الوصف طويل جداً"),
  evidence: z.array(z.string()).optional(), // URLs to uploaded evidence
});

// Admin Schemas
const adminUserActionSchema = z.object({
  userId: z.string(),
  action: z.enum(["suspend", "unsuspend", "delete", "warn", "verify"], {
    required_error: "يرجى تحديد الإجراء",
  }),
  reason: z.string().min(5, "السبب يجب أن يكون 5 أحرف على الأقل"),
  duration: z.number().optional(), // in days for suspension
});

const adminSettingsSchema = z.object({
  maintenanceMode: z.boolean().default(false),
  registrationEnabled: z.boolean().default(true),
  maxDailyRequests: z.number().min(1).max(100).default(10),
  maxDailyMessages: z.number().min(1).max(1000).default(100),
  minAge: z.number().min(16).max(25).default(18),
  maxAge: z.number().min(60).max(100).default(80),
  featuredProfilesCount: z.number().min(5).max(50).default(20),
});

// Type exports
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type ReligiousInfoFormData = z.infer<typeof religiousInfoSchema>;
export type EducationWorkFormData = z.infer<typeof educationWorkSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
export type GuardianInfoFormData = z.infer<typeof guardianInfoSchema>;
export type BioFormData = z.infer<typeof bioSchema>;
export type PrivacySettingsFormData = z.infer<typeof privacySettingsSchema>;

export type MarriageRequestFormData = z.infer<typeof marriageRequestSchema>;
export type RespondToRequestFormData = z.infer<typeof respondToRequestSchema>;
export type SendMessageFormData = z.infer<typeof sendMessageSchema>;
export type ReportFormData = z.infer<typeof reportSchema>;

export type AdminUserActionFormData = z.infer<typeof adminUserActionSchema>;
export type AdminSettingsFormData = z.infer<typeof adminSettingsSchema>;

// Schema exports for use with form libraries
export {
  registerSchema,
  loginSchema,
  otpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  basicInfoSchema,
  religiousInfoSchema,
  educationWorkSchema,
  preferencesSchema,
  guardianInfoSchema,
  bioSchema,
  privacySettingsSchema,
  marriageRequestSchema,
  respondToRequestSchema,
  sendMessageSchema,
  reportSchema,
  adminUserActionSchema,
  adminSettingsSchema,
};
