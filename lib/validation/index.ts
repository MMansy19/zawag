import { z } from "zod";
import { VALIDATION_RULES } from "@/lib/constants";

// Authentication Schemas
export const registerSchema = z
  .object({
    emailOrPhone: z
      .string()
      .min(1, "يرجى إدخال البريد الإلكتروني أو رقم الهاتف")
      .refine((val) => {
        // Check if it's a valid email or phone
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return emailRegex.test(val) || phoneRegex.test(val);
      }, "يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح"),
    password: z
      .string()
      .min(
        VALIDATION_RULES.PASSWORD.MIN_LENGTH,
        `كلمة المرور يجب أن تكون على الأقل ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} أحرف`,
      )
      .max(
        VALIDATION_RULES.PASSWORD.MAX_LENGTH,
        `كلمة المرور يجب أن تكون أقل من ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} حرف`,
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم",
      ),
    confirmPassword: z.string(),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, "يجب الموافقة على الشروط والأحكام"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتان",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "يرجى إدخال البريد الإلكتروني أو رقم الهاتف"),
  password: z.string().min(1, "يرجى إدخال كلمة المرور"),
  rememberMe: z.boolean().optional(),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(
      VALIDATION_RULES.OTP.LENGTH,
      `رمز التحقق يجب أن يكون ${VALIDATION_RULES.OTP.LENGTH} أرقام`,
    )
    .regex(/^\d+$/, "رمز التحقق يجب أن يحتوي على أرقام فقط"),
  identifier: z.string().min(1, "معرف غير صحيح"),
});

export const forgotPasswordSchema = z.object({
  emailOrPhone: z.string().min(1, "يرجى إدخال البريد الإلكتروني أو رقم الهاتف"),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "رمز غير صحيح"),
    password: z
      .string()
      .min(
        VALIDATION_RULES.PASSWORD.MIN_LENGTH,
        `كلمة المرور يجب أن تكون على الأقل ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} أحرف`,
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتان",
    path: ["confirmPassword"],
  });

// Profile Schemas
export const basicInfoSchema = z.object({
  name: z
    .string()
    .min(
      VALIDATION_RULES.NAME.MIN_LENGTH,
      `الاسم يجب أن يكون على الأقل ${VALIDATION_RULES.NAME.MIN_LENGTH} أحرف`,
    )
    .max(
      VALIDATION_RULES.NAME.MAX_LENGTH,
      `الاسم يجب أن يكون أقل من ${VALIDATION_RULES.NAME.MAX_LENGTH} حرف`,
    )
    .regex(
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]+$/,
      "يرجى إدخال الاسم بالعربية فقط",
    ),
  age: z
    .number()
    .min(
      VALIDATION_RULES.AGE.MIN,
      `العمر يجب أن يكون على الأقل ${VALIDATION_RULES.AGE.MIN} سنة`,
    )
    .max(
      VALIDATION_RULES.AGE.MAX,
      `العمر يجب أن يكون أقل من ${VALIDATION_RULES.AGE.MAX} سنة`,
    ),
  gender: z.enum(["male", "female"], { required_error: "يرجى اختيار الجنس" }),
  country: z.string().min(1, "يرجى اختيار البلد"),
  city: z.string().min(1, "يرجى إدخال المدينة"),
  nationality: z.string().min(1, "يرجى إدخال الجنسية"),
  maritalStatus: z.enum(["single", "divorced", "widowed"], {
    required_error: "يرجى اختيار الحالة الاجتماعية",
  }),
});

export const religiousInfoSchema = z.object({
  prays: z.boolean(),
  fasts: z.boolean(),
  hasHijab: z.boolean().optional(),
  hasBeard: z.boolean().optional(),
  religiousLevel: z.enum(["basic", "practicing", "very-religious"], {
    required_error: "يرجى اختيار مستوى الالتزام الديني",
  }),
});

export const educationWorkSchema = z.object({
  education: z.string().min(1, "يرجى اختيار المستوى التعليمي"),
  occupation: z.string().min(1, "يرجى اختيار المهنة"),
});

export const preferencesSchema = z.object({
  ageRange: z
    .object({
      min: z.number().min(VALIDATION_RULES.AGE.MIN),
      max: z.number().max(VALIDATION_RULES.AGE.MAX),
    })
    .refine(
      (data) => data.min <= data.max,
      "الحد الأدنى للعمر يجب أن يكون أقل من أو يساوي الحد الأعلى",
    ),
  country: z.string().optional(),
  city: z.string().optional(),
  maritalStatus: z.array(z.string()).optional(),
  religiousLevel: z.array(z.string()).optional(),
  education: z.array(z.string()).optional(),
  occupation: z.array(z.string()).optional(),
});

export const guardianInfoSchema = z
  .object({
    name: z.string().min(1, "يرجى إدخال اسم الولي").optional(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "رقم هاتف غير صحيح")
      .optional(),
    email: z.string().email("بريد إلكتروني غير صحيح").optional(),
  })
  .refine(
    (data) => {
      // If any guardian info is provided, name is required
      if (data.phone || data.email) {
        return data.name && data.name.length > 0;
      }
      return true;
    },
    {
      message: "اسم الولي مطلوب عند إدخال معلومات الاتصال",
      path: ["name"],
    },
  );

export const bioSchema = z.object({
  bio: z
    .string()
    .max(
      VALIDATION_RULES.BIO.MAX_LENGTH,
      `النبذة الشخصية يجب أن تكون أقل من ${VALIDATION_RULES.BIO.MAX_LENGTH} حرف`,
    )
    .optional(),
});

export const privacySettingsSchema = z.object({
  showProfilePicture: z.enum(["everyone", "matches-only", "none"]),
  showAge: z.boolean(),
  showLocation: z.boolean(),
  showOccupation: z.boolean(),
  allowMessagesFrom: z.enum(["everyone", "matches-only", "none"]),
});

// Search Schema
export const searchFiltersSchema = z.object({
  ageRange: z
    .object({
      min: z.number().min(VALIDATION_RULES.AGE.MIN).optional(),
      max: z.number().max(VALIDATION_RULES.AGE.MAX).optional(),
    })
    .optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  maritalStatus: z.array(z.string()).optional(),
  religiousLevel: z.array(z.string()).optional(),
  education: z.array(z.string()).optional(),
  occupation: z.array(z.string()).optional(),
});

// Marriage Request Schema
export const marriageRequestSchema = z.object({
  receiverId: z.string().min(1, "معرف المستقبل مطلوب"),
  message: z
    .string()
    .min(10, "الرسالة يجب أن تكون على الأقل 10 أحرف")
    .max(
      VALIDATION_RULES.MESSAGE.MAX_LENGTH,
      `الرسالة يجب أن تكون أقل من ${VALIDATION_RULES.MESSAGE.MAX_LENGTH} حرف`,
    ),
});

export const respondToRequestSchema = z.object({
  requestId: z.string().min(1, "معرف الطلب مطلوب"),
  response: z.enum(["accepted", "rejected"], {
    required_error: "يرجى اختيار الرد",
  }),
  message: z.string().optional(),
});

// Chat Schema
export const sendMessageSchema = z.object({
  chatRoomId: z.string().min(1, "معرف غرفة المحادثة مطلوب"),
  content: z
    .string()
    .min(1, "محتوى الرسالة مطلوب")
    .max(
      VALIDATION_RULES.MESSAGE.MAX_LENGTH,
      `الرسالة يجب أن تكون أقل من ${VALIDATION_RULES.MESSAGE.MAX_LENGTH} حرف`,
    ),
});

// Report Schema
export const reportSchema = z
  .object({
    reportedUserId: z.string().optional(),
    reportedMessageId: z.string().optional(),
    reason: z.enum(
      ["inappropriate-content", "harassment", "fake-profile", "spam", "other"],
      {
        required_error: "يرجى اختيار سبب البلاغ",
      },
    ),
    description: z
      .string()
      .max(500, "الوصف يجب أن يكون أقل من 500 حرف")
      .optional(),
  })
  .refine((data) => data.reportedUserId || data.reportedMessageId, {
    message: "يجب تحديد المستخدم أو الرسالة المراد الإبلاغ عنها",
  });

// Admin Schemas
export const adminUserActionSchema = z.object({
  userId: z.string().min(1, "معرف المستخدم مطلوب"),
  action: z.enum(["approve", "suspend", "block", "unblock", "delete"], {
    required_error: "يرجى اختيار الإجراء",
  }),
  reason: z.string().optional(),
});

export const adminSettingsSchema = z.object({
  messageLimits: z.object({
    perHour: z.number().min(1).max(10),
    perDay: z.number().min(1).max(50),
    maxConcurrentChats: z.number().min(1).max(10),
  }),
  chatSettings: z.object({
    defaultExpiryDays: z.number().min(1).max(30),
    maxExtensions: z.number().min(0).max(5),
  }),
  moderationSettings: z.object({
    autoApproveMessages: z.boolean(),
    abusiveWords: z.array(z.string()),
  }),
  themeSettings: z.object({
    primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, "لون غير صحيح"),
    secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, "لون غير صحيح"),
    accentColor: z.string().regex(/^#[0-9A-F]{6}$/i, "لون غير صحيح"),
    fontSize: z.string().min(1),
  }),
});

// File Upload Schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        ),
      "نوع الملف يجب أن يكون JPG, PNG, أو WebP",
    ),
});

// Complete Profile Schema (combining all profile-related schemas)
export const profileSchema = z
  .object({
    name: z
      .string()
      .min(
        VALIDATION_RULES.NAME.MIN_LENGTH,
        `الاسم يجب أن يكون على الأقل ${VALIDATION_RULES.NAME.MIN_LENGTH} أحرف`,
      )
      .max(
        VALIDATION_RULES.NAME.MAX_LENGTH,
        `الاسم يجب أن يكون أقل من ${VALIDATION_RULES.NAME.MAX_LENGTH} حرف`,
      ),
    age: z
      .number()
      .min(
        VALIDATION_RULES.AGE.MIN,
        `العمر يجب أن يكون على الأقل ${VALIDATION_RULES.AGE.MIN} سنة`,
      )
      .max(
        VALIDATION_RULES.AGE.MAX,
        `العمر يجب أن يكون أقل من ${VALIDATION_RULES.AGE.MAX} سنة`,
      ),
    gender: z.enum(["male", "female"], { required_error: "يرجى اختيار الجنس" }),
    country: z.string().min(1, "يرجى اختيار البلد"),
    city: z.string().min(1, "يرجى إدخال المدينة"),
    nationality: z.string().min(1, "يرجى إدخال الجنسية"),
    maritalStatus: z.enum(["single", "divorced", "widowed"], {
      required_error: "يرجى اختيار الحالة الاجتماعية",
    }),
    education: z.string().min(1, "يرجى اختيار المستوى التعليمي"),
    occupation: z.string().min(1, "يرجى اختيار المهنة"),
    prays: z.boolean(),
    fasts: z.boolean(),
    religiousLevel: z.enum(["basic", "practicing", "very-religious"], {
      required_error: "يرجى اختيار مستوى الالتزام الديني",
    }),
    hasHijab: z.boolean().optional(),
    hasBeard: z.boolean().optional(),
    bio: z
      .string()
      .max(
        VALIDATION_RULES.BIO.MAX_LENGTH,
        `النبذة الشخصية يجب أن تكون أقل من ${VALIDATION_RULES.BIO.MAX_LENGTH} حرف`,
      )
      .optional(),
    guardianName: z.string().optional(),
    guardianPhone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "رقم هاتف غير صحيح")
      .optional(),
    guardianEmail: z.string().email("بريد إلكتروني غير صحيح").optional(),
  })
  .refine(
    (data) => {
      // If any guardian info is provided, name is required
      if (data.guardianPhone || data.guardianEmail) {
        return data.guardianName && data.guardianName.length > 0;
      }
      return true;
    },
    {
      message: "اسم الولي مطلوب عند إدخال معلومات الاتصال",
      path: ["guardianName"],
    },
  );

// Type exports for use in components
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
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PrivacySettingsFormData = z.infer<typeof privacySettingsSchema>;
export type SearchFiltersFormData = z.infer<typeof searchFiltersSchema>;
export type MarriageRequestFormData = z.infer<typeof marriageRequestSchema>;
export type RespondToRequestFormData = z.infer<typeof respondToRequestSchema>;
export type SendMessageFormData = z.infer<typeof sendMessageSchema>;
export type ReportFormData = z.infer<typeof reportSchema>;
export type AdminUserActionFormData = z.infer<typeof adminUserActionSchema>;
export type AdminSettingsFormData = z.infer<typeof adminSettingsSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;
