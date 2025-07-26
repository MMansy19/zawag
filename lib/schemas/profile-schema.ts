import { z } from "zod";

export const profileSchema = z
  .object({
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
    education: z.string().optional(),
    occupation: z.string().optional(),
    religiousLevel: z.enum(["basic", "practicing", "very-religious"]),
    prays: z.boolean().default(true),
    fasts: z.boolean().default(true),
    hasHijab: z.boolean().optional(),
    hasBeard: z.boolean().optional(),
    bio: z
      .string()
      .max(500, "النبذة الشخصية يجب أن تكون أقل من 500 حرف")
      .optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    guardianEmail: z
      .string()
      .email("بريد إلكتروني غير صحيح")
      .optional()
      .or(z.literal("")),
    preferences: z
      .object({
        ageRange: z.object({
          min: z.number().min(18).max(80),
          max: z.number().min(18).max(80),
        }),
        country: z.string().optional(),
        religiousLevel: z.array(z.string()).optional(),
        education: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // Validate that max age is greater than min age
      if (data.preferences?.ageRange) {
        return data.preferences.ageRange.max >= data.preferences.ageRange.min;
      }
      return true;
    },
    {
      message: "الحد الأقصى للعمر يجب أن يكون أكبر من الحد الأدنى",
      path: ["preferences", "ageRange", "max"],
    },
  );

export type ProfileFormData = z.infer<typeof profileSchema>;
