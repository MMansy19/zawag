import { z } from "zod";

// Base validation schemas
const emailSchema = z
  .string()
  .email("البريد الإلكتروني غير صحيح")
  .min(1, "البريد الإلكتروني مطلوب");

const passwordSchema = z
  .string()
  .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم",
  );

const nameSchema = z
  .string()
  .min(2, "الاسم يجب أن يكون حرفين على الأقل")
  .max(50, "الاسم يجب أن يكون أقل من 50 حرف")
  .regex(
    /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]+$/,
    "يجب أن يحتوي الاسم على أحرف عربية فقط",
  );

const phoneSchema = z
  .string()
  .regex(/^[+]?[1-9]\d{1,14}$/, "رقم الهاتف غير صحيح")
  .optional();

const otpSchema = z
  .string()
  .length(6, "رمز التحقق يجب أن يكون 6 أرقام")
  .regex(/^\d{6}$/, "رمز التحقق يجب أن يحتوي على أرقام فقط");

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "كلمة المرور مطلوبة"),
  rememberMe: z.boolean().optional().default(false),
});

// Registration Schema - Step by Step
export const registrationStep1Schema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export const registrationStep2Schema = z.object({
  firstname: nameSchema,
  lastname: nameSchema,
  age: z
    .number()
    .min(18, "العمر يجب أن يكون 18 سنة على الأقل")
    .max(80, "العمر يجب أن يكون أقل من 80 سنة"),
  gender: z.enum(["m", "f"], {
    required_error: "الجنس مطلوب",
  }),
  country: z.string().min(1, "البلد مطلوب"),
  maritalStatus: z.enum(["single", "divorced", "widowed"], {
    required_error: "الحالة الزوجية مطلوبة",
  }),
});

export const registrationStep3Schema = z.object({
  religiousLevel: z.enum(["basic", "practicing", "very-religious"], {
    required_error: "مستوى التدين مطلوب",
  }),
  prays: z.boolean(),
  fasts: z.boolean(),
  hasHijab: z.boolean().optional(),
  hasBeard: z.boolean().optional(),
});

export const registrationStep4Schema = z.object({
  education: z.string().min(1, "المستوى التعليمي مطلوب"),
  occupation: z.string().min(1, "المهنة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  nationality: z.string().min(1, "الجنسية مطلوبة"),
});

export const registrationStep5Schema = z.object({
  bio: z
    .string()
    .max(500, "النبذة الشخصية يجب أن تكون أقل من 500 حرف")
    .optional(),
});

export const registrationStep6Schema = z.object({
  preferences: z.object({
    ageRange: z
      .object({
        min: z
          .number()
          .min(18, "الحد الأدنى للعمر يجب أن يكون 18 سنة على الأقل"),
        max: z.number().max(80, "الحد الأقصى للعمر يجب أن يكون 80 سنة أو أقل"),
      })
      .refine((data) => data.max >= data.min, {
        message: "الحد الأقصى للعمر يجب أن يكون أكبر من أو يساوي الحد الأدنى",
        path: ["max"],
      }),
    country: z.string().optional(),
    religiousLevel: z.array(z.string()).optional(),
    education: z.array(z.string()).optional(),
  }),
});

export const registrationStep7Schema = z.object({
  profilePicture: z.any().optional(), // File validation handled separately
});

export const registrationStep8Schema = z.object({
  guardianName: nameSchema.optional(),
  guardianPhone: phoneSchema,
  guardianEmail: z
    .string()
    .email("بريد إلكتروني غير صحيح")
    .optional()
    .or(z.literal("")),
});

// Male-specific financial step schema
export const registrationStepMaleFinancialSchema = z.object({
  financialStatus: z.enum(["excellent", "very-good", "good", "moderate"], {
    required_error: "الوضع المالي مطلوب",
  }),
  monthlyIncome: z.enum(
    ["under-3000", "3000-5000", "5000-10000", "10000-15000", "above-15000"],
    {
      required_error: "الدخل الشهري مطلوب",
    },
  ),
  housingType: z.enum(["own-house", "own-apartment", "family-house", "rent"], {
    required_error: "نوع السكن مطلوب",
  }),
  workLocation: z.string().min(1, "مكان العمل مطلوب"),
  canRelocate: z.boolean(),
  familyFinancialSupport: z.boolean(),
});

// Female-specific preferences step schema
export const registrationStepFemalePreferencesSchema = z.object({
  workAfterMarriage: z.enum(
    ["yes-same-field", "yes-different-field", "maybe", "no"],
    {
      required_error: "موقف العمل بعد الزواج مطلوب",
    },
  ),
  childrenDesired: z.enum(["1-2", "3-4", "5-plus", "no-preference"], {
    required_error: "عدد الأطفال المرغوب مطلوب",
  }),
  livingWithInLaws: z.enum(["yes-prefer", "yes-accept", "maybe", "no"], {
    required_error: "موقف السكن مع الأهل مطلوب",
  }),
  houseworkSharing: z.enum(
    [
      "full-responsibility",
      "shared-responsibility",
      "husband-helps",
      "flexible",
    ],
    {
      required_error: "تقسيم أعمال المنزل مطلوب",
    },
  ),
  travelForWork: z.boolean(),
  studyAfterMarriage: z.boolean(),
});

// Complete Registration Schema
export const completeRegistrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstname: nameSchema,
  lastname: nameSchema,
  age: z
    .number()
    .min(18, "العمر يجب أن يكون 18 سنة على الأقل")
    .max(80, "العمر يجب أن يكون أقل من 80 سنة"),
  gender: z.enum(["m", "f"], {
    required_error: "الجنس مطلوب",
  }),
  country: z.string().min(1, "البلد مطلوب"),
  maritalStatus: z.enum(["single", "divorced", "widowed"], {
    required_error: "الحالة الزوجية مطلوبة",
  }),
  religiousLevel: z.enum(["basic", "practicing", "very-religious"], {
    required_error: "مستوى التدين مطلوب",
  }),
  prays: z.boolean(),
  fasts: z.boolean(),
  hasHijab: z.boolean().optional(),
  hasBeard: z.boolean().optional(),
  education: z.string().min(1, "المستوى التعليمي مطلوب"),
  occupation: z.string().min(1, "المهنة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  nationality: z.string().min(1, "الجنسية مطلوبة"),
  bio: z
    .string()
    .max(500, "النبذة الشخصية يجب أن تكون أقل من 500 حرف")
    .optional(),
  preferences: z.object({
    ageRange: z
      .object({
        min: z
          .number()
          .min(18, "الحد الأدنى للعمر يجب أن يكون 18 سنة على الأقل"),
        max: z.number().max(80, "الحد الأقصى للعمر يجب أن يكون 80 سنة أو أقل"),
      })
      .refine((data) => data.max >= data.min, {
        message: "الحد الأقصى للعمر يجب أن يكون أكبر من أو يساوي الحد الأدنى",
        path: ["max"],
      }),
    country: z.string().optional(),
    religiousLevel: z.array(z.string()).optional(),
    education: z.array(z.string()).optional(),
  }),
  profilePicture: z.any().optional(),
  guardianName: nameSchema.optional(),
  guardianPhone: phoneSchema,
  guardianEmail: z
    .string()
    .email("بريد إلكتروني غير صحيح")
    .optional()
    .or(z.literal("")),
});

// OTP Verification Schema
export const otpVerificationSchema = z.object({
  email: emailSchema,
  otp: otpSchema,
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    otp: otpSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور غير متطابقة",
    path: ["confirmPassword"],
  });

// Update Profile Schema
export const updateProfileSchema = z.object({
  firstname: nameSchema.optional(),
  lastname: nameSchema.optional(),
  age: z.number().min(18).max(80).optional(),
  city: z.string().min(1).optional(),
  nationality: z.string().min(1).optional(),
  education: z.string().optional(),
  occupation: z.string().optional(),
  bio: z.string().max(500).optional(),
  guardianName: nameSchema.optional(),
  guardianPhone: phoneSchema,
  guardianEmail: z.string().email().optional().or(z.literal("")),
  preferences: z
    .object({
      ageRange: z.object({
        min: z.number().min(18),
        max: z.number().max(80),
      }),
      country: z.string().optional(),
      religiousLevel: z.array(z.string()).optional(),
      education: z.array(z.string()).optional(),
    })
    .optional(),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationStep1Data = z.infer<typeof registrationStep1Schema>;
export type RegistrationStep2Data = z.infer<typeof registrationStep2Schema>;
export type RegistrationStep3Data = z.infer<typeof registrationStep3Schema>;
export type RegistrationStep4Data = z.infer<typeof registrationStep4Schema>;
export type RegistrationStep5Data = z.infer<typeof registrationStep5Schema>;
export type RegistrationStep6Data = z.infer<typeof registrationStep6Schema>;
export type RegistrationStep7Data = z.infer<typeof registrationStep7Schema>;
export type RegistrationStep8Data = z.infer<typeof registrationStep8Schema>;
export type RegistrationStepMaleFinancialData = z.infer<
  typeof registrationStepMaleFinancialSchema
>;
export type RegistrationStepFemalePreferencesData = z.infer<
  typeof registrationStepFemalePreferencesSchema
>;
export type CompleteRegistrationData = z.infer<
  typeof completeRegistrationSchema
>;
export type OTPVerificationData = z.infer<typeof otpVerificationSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

// Step validation helper
export const getStepSchema = (step: number, gender?: string) => {
  switch (step) {
    case 1:
      return registrationStep1Schema;
    case 2:
      return registrationStep2Schema;
    case 3:
      return registrationStep3Schema;
    case 4:
      return registrationStep4Schema;
    case 5:
      // Gender-specific step
      if (gender === "m") {
        return registrationStepMaleFinancialSchema;
      } else if (gender === "f") {
        return registrationStepFemalePreferencesSchema;
      }
      return registrationStep5Schema; // Fallback to bio step
    case 6:
      return registrationStep5Schema; // Bio step
    case 7:
      return registrationStep6Schema; // Preferences step
    case 8:
      return registrationStep7Schema; // Photo step
    case 9:
      return registrationStep8Schema; // Guardian step
    case 10:
      return completeRegistrationSchema; // Review step
    default:
      throw new Error(`Invalid step: ${step}`);
  }
};
