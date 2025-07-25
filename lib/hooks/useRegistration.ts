"use client";
import { useCallback, useReducer } from "react";
import { authApiService } from "@/lib/services/auth.service";
import { showToast } from "@/components/ui/toaster";
import {
  RegisterRequest,
  MaleRegisterRequest,
  FemaleRegisterRequest,
  AuthenticationError,
  ValidationError,
} from "@/lib/types/auth.types";
import { RegistrationData } from "@/lib/types";

// Registration State Management
interface RegistrationState {
  currentStep: number;
  totalSteps: number;
  data: RegistrationData;
  completedSteps: Set<number>;
  isSubmitting: boolean;
  error: string | null;
  otpSent: boolean;
  profilePicture: File | null;
}

type RegistrationAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "UPDATE_DATA"; payload: Partial<RegistrationData> }
  | { type: "MARK_STEP_COMPLETED"; payload: number }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_OTP_SENT"; payload: boolean }
  | { type: "SET_PROFILE_PICTURE"; payload: File | null }
  | { type: "RESET" };

const initialState: RegistrationState = {
  currentStep: 1,
  totalSteps: 3,
  data: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: 18,
    gender: "male",
    phone: "",
    otpCode: "",
    country: "",
    city: "",
    nationality: "",
    maritalStatus: "single",
    religiousLevel: "practicing",
    isPrayerRegular: true,
    areParentsAlive: "both",
    parentRelationship: "good",
    wantsChildren: "yes",
    height: 170,
    weight: 70,
    appearance: "average",
    skinColor: "medium",
    bodyType: "average",
    interests: "",
    marriageGoals: "",
    personalityDescription: "",
    familyPlans: "",
    relocationPlans: "",
    marriageTimeline: "",
    preferences: {
      ageRange: { min: 18, max: 35 },
    },
    education: "",
    occupation: "",
    bio: "",
    // Male-specific
    hasBeard: false,
    prayingLocation: "",
    isRegularAtMosque: false,
    smokes: false,
    financialSituation: "",
    housingLocation: "",
    housingOwnership: "",
    housingType: "",
    monthlyIncome: 0,
    providerView: "",
    householdChores: "",
    // Female-specific
    guardianName: "",
    guardianPhone: "",
    guardianRelationship: "",
    wearHijab: false,
    wearNiqab: false,
    clothingStyle: "",
    guardianEmail: "",
    guardianNotes: "",
    mahramAvailable: false,
    workAfterMarriage: "",
    childcarePreference: "",
  },
  completedSteps: new Set(),
  isSubmitting: false,
  error: null,
  otpSent: false,
  profilePicture: null,
};

function registrationReducer(
  state: RegistrationState,
  action: RegistrationAction,
): RegistrationState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload, error: null };
    case "UPDATE_DATA":
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        error: null,
      };
    case "MARK_STEP_COMPLETED":
      return {
        ...state,
        completedSteps: new Set([...state.completedSteps, action.payload]),
      };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_OTP_SENT":
      return { ...state, otpSent: action.payload };
    case "SET_PROFILE_PICTURE":
      return { ...state, profilePicture: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface UseRegistrationResult {
  currentStep: number;
  totalSteps: number;
  data: RegistrationData;
  completedSteps: Set<number>;
  isSubmitting: boolean;
  error: string | null;
  otpSent: boolean;
  profilePicture: File | null;
  goToStep: (step: number) => void;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  updateData: (data: Partial<RegistrationData>) => void;
  setProfilePicture: (file: File | null) => void;
  sendOTP: () => Promise<boolean>;
  submitRegistration: () => Promise<boolean>;
  reset: () => void;
  clearError: () => void;
  validateCurrentStep: () => Promise<boolean>;
  isStepCompleted: (step: number) => boolean;
  canProceedToStep: (step: number) => boolean;
}

const useRegistration = (): UseRegistrationResult => {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  const handleError = useCallback((error: any) => {
    console.error("Registration error:", error);
    if (error instanceof ValidationError) {
      const firstFieldError = Object.values(error.fields || {})[0]?.[0];
      const errorMessage = firstFieldError || error.message;
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      showToast.error(errorMessage);
      return;
    }
    if (error instanceof AuthenticationError) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      showToast.error(error.message);
      return;
    }
    const errorMessage = error.message || "حدث خطأ غير متوقع";
    dispatch({ type: "SET_ERROR", payload: errorMessage });
    showToast.error(errorMessage);
  }, []);

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    try {
      // Step 1: Validate basic auth fields
      if (state.currentStep === 1) {
        if (!state.data.email) {
          dispatch({ type: "SET_ERROR", payload: "البريد الإلكتروني مطلوب" });
          return false;
        }
        if (!state.data.password) {
          dispatch({ type: "SET_ERROR", payload: "كلمة المرور مطلوبة" });
          return false;
        }
        if (!state.data.gender) {
          dispatch({ type: "SET_ERROR", payload: "يرجى اختيار الجنس" });
          return false;
        }
        if (!state.data.phone) {
          dispatch({ type: "SET_ERROR", payload: "رقم الهاتف مطلوب" });
          return false;
        }
        if (!state.otpSent) {
          dispatch({
            type: "SET_ERROR",
            payload: "يرجى إرسال رمز التحقق للبريد الإلكتروني",
          });
          return false;
        }
        if (!state.data.otpCode) {
          dispatch({ type: "SET_ERROR", payload: "يرجى إدخال رمز التحقق" });
          return false;
        }
      }

      // Step 2: Validate personal data
      if (state.currentStep === 2) {
        const requiredFields: (keyof RegistrationData)[] = [
          "firstName",
          "lastName",
          "age",
          "nationality",
          "maritalStatus",
          "country",
          "city",
          "religiousLevel",
          "height",
          "weight",
          "skinColor",
          "bodyType",
          "appearance",
          "areParentsAlive",
          "parentRelationship",
          "wantsChildren",
          "interests",
          "marriageGoals",
          "personalityDescription",
          "familyPlans",
          "marriageTimeline",
        ];

        for (const field of requiredFields) {
          if (!state.data[field]) {
            dispatch({ type: "SET_ERROR", payload: `الحقل ${field} مطلوب` });
            return false;
          }
        }

        // Gender-specific validations
        if (state.data.gender === "male") {
          const maleRequiredFields: (keyof RegistrationData)[] = [
            "hasBeard",
            "smokes",
            "financialSituation",
            "housingOwnership",
            "isRegularAtMosque",
          ];
          for (const field of maleRequiredFields) {
            if (state.data[field] === undefined) {
              dispatch({
                type: "SET_ERROR",
                payload: `يرجى ملء جميع البيانات المطلوبة للذكور`,
              });
              return false;
            }
          }
        }

        if (state.data.gender === "female") {
          const femaleRequiredFields: (keyof RegistrationData)[] = [
            "wearHijab",
            "guardianName",
            "guardianPhone",
          ];
          for (const field of femaleRequiredFields) {
            if (state.data[field] === undefined) {
              dispatch({
                type: "SET_ERROR",
                payload: `يرجى ملء جميع البيانات المطلوبة للإناث`,
              });
              return false;
            }
          }
        }

        // Preferences validation
        if (
          !state.data.preferences.ageRange.min ||
          !state.data.preferences.ageRange.max
        ) {
          dispatch({
            type: "SET_ERROR",
            payload: "يرجى تحديد المدى العمري المفضل",
          });
          return false;
        }
      }

      // Step 3: Review, no additional validation
      dispatch({ type: "SET_ERROR", payload: null });
      return true;
    } catch (error: any) {
      handleError(error);
      return false;
    }
  }, [state.currentStep, state.data, state.otpSent, handleError]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= state.totalSteps) {
        dispatch({ type: "SET_STEP", payload: step });
      }
    },
    [state.totalSteps],
  );

  const nextStep = useCallback(async (): Promise<boolean> => {
    const isValid = await validateCurrentStep();
    if (!isValid) return false;

    dispatch({ type: "MARK_STEP_COMPLETED", payload: state.currentStep });

    if (state.currentStep < state.totalSteps) {
      const nextStepNumber = state.currentStep + 1;
      dispatch({ type: "SET_STEP", payload: nextStepNumber });
    }

    return true;
  }, [validateCurrentStep, state.currentStep, state.totalSteps]);

  const prevStep = useCallback(() => {
    if (state.currentStep > 1) {
      const prevStepNumber = state.currentStep - 1;
      dispatch({ type: "SET_STEP", payload: prevStepNumber });
    }
  }, [state.currentStep]);

  const updateData = useCallback((data: Partial<RegistrationData>) => {
    dispatch({ type: "UPDATE_DATA", payload: data });
  }, []);

  const setProfilePicture = useCallback((file: File | null) => {
    dispatch({ type: "SET_PROFILE_PICTURE", payload: file });
  }, []);

  const sendOTP = useCallback(async (): Promise<boolean> => {
    try {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      if (!state.data.email) {
        dispatch({ type: "SET_ERROR", payload: "البريد الإلكتروني مطلوب" });
        return false;
      }

      // Simulated OTP sending (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch({ type: "SET_OTP_SENT", payload: true });
      showToast.success("تم إرسال رمز التحقق");
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  }, [state.data.email, handleError]);

  const submitRegistration = useCallback(async (): Promise<boolean> => {
    try {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      // Validate form data
      const isValid = await validateCurrentStep();
      if (!isValid) {
        showToast.error("يرجى ملء جميع الحقول المطلوبة بشكل صحيح");
        return false;
      }

      // Common registration data
      const baseData: Omit<RegisterRequest, "gender"> = {
        email: state.data.email,
        password: state.data.password,
        firstName: state.data.firstName,
        lastName: state.data.lastName,
        age: state.data.age,
        phone: state.data.phone ?? "",
        country: state.data.country,
        city: state.data.city,
        nationality: state.data.nationality,
        maritalStatus: state.data.maritalStatus,
        religiousLevel: state.data.religiousLevel,
        isPrayerRegular: state.data.isPrayerRegular,
        areParentsAlive: state.data.areParentsAlive,
        parentRelationship: state.data.parentRelationship,
        wantsChildren: state.data.wantsChildren,
        height: state.data.height,
        weight: state.data.weight,
        appearance: state.data.appearance,
        skinColor: state.data.skinColor,
        bodyType: state.data.bodyType,
        interests: state.data.interests.split(",").map((item) => item.trim()),
        marriageGoals: state.data.marriageGoals,
        personalityDescription: state.data.personalityDescription,
        familyPlans: state.data.familyPlans,
        relocationPlans: state.data.relocationPlans,
        marriageTimeline: state.data.marriageTimeline,
        preferences: state.data.preferences,
        education: state.data.education,
        occupation: state.data.occupation,
        prayingLocation: (["both", "mosque", "home", "mosque-when-possible"].includes(state.data.prayingLocation ?? "")
          ? state.data.prayingLocation
          : "both") as "both" | "mosque" | "home" | "mosque-when-possible",
        preferredQualities: typeof state.data.preferredQualities === "string" ? state.data.preferredQualities : "",
        unpreferredQualities: typeof state.data.unpreferredQualities === "string" ? state.data.unpreferredQualities : "",
        mahramAvailable: state.data.mahramAvailable ?? false,
        workAfterMarriage: state.data.workAfterMarriage ?? "",
        childcarePreference: state.data.childcarePreference ?? "",
        smokes: state.data.smokes ?? false,
        financialSituation: state.data.financialSituation ?? "",
        housingLocation: state.data.housingLocation ?? "",
        housingOwnership: state.data.housingOwnership ?? "",
        housingType: state.data.housingType ?? "",
        isRegularAtMosque: state.data.isRegularAtMosque ?? false,
        hasBeard: state.data.hasBeard ?? false,
        otpCode: state.data.otpCode ?? "",
      };

      // Gender-specific data
      let registrationData: RegisterRequest;

  
      if (state.data.gender === "female") {
        registrationData = {
          ...baseData,
          gender: "female",
          guardianName: state.data.guardianName ?? "",
          guardianPhone: state.data.guardianPhone ?? "",
          guardianRelationship: state.data.guardianRelationship ?? "",
          wearHijab: state.data.wearHijab ?? false,
          wearNiqab: state.data.wearNiqab ?? false,
          clothingStyle: state.data.clothingStyle ?? "",
          prayingLocation: state.data.prayingLocation,
          guardianEmail: state.data.guardianEmail ?? "",
          guardianNotes: state.data.guardianNotes ?? "",
          workAfterMarriage: state.data.workAfterMarriage ?? "",
        } as FemaleRegisterRequest;
      } else {
        registrationData = {
          ...baseData,
          hasBeard: state.data.hasBeard,
          prayingLocation: state.data.prayingLocation,
          financialSituation: state.data.financialSituation,
          housingLocation: state.data.housingLocation,
          housingOwnership: state.data.housingOwnership,
          monthlyIncome: state.data.monthlyIncome,
        } as MaleRegisterRequest;
      }

      // Call API (expects RegisterRequest object)
      const response = await authApiService.register(registrationData);

      if (response.requiresVerification) {
        showToast.success("تم إنشاء الحساب، يرجى تأكيد بريدك الإلكتروني");
      } else {
        showToast.success("تم إنشاء الحساب بنجاح");
      }

      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "فشل التسجيل، يرجى المحاولة مرة أخرى";
      handleError(error);
      showToast.error(errorMessage);
      return false;
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  }, [state, validateCurrentStep, handleError]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  const isStepCompleted = useCallback(
    (step: number): boolean => {
      return state.completedSteps.has(step);
    },
    [state.completedSteps],
  );

  const canProceedToStep = useCallback(
    (step: number): boolean => {
      for (let i = 1; i < step; i++) {
        if (!state.completedSteps.has(i)) {
          return false;
        }
      }
      return true;
    },
    [state.completedSteps],
  );

  return {
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    data: state.data,
    completedSteps: state.completedSteps,
    isSubmitting: state.isSubmitting,
    error: state.error,
    otpSent: state.otpSent,
    profilePicture: state.profilePicture,
    goToStep,
    nextStep,
    prevStep,
    updateData,
    setProfilePicture,
    sendOTP,
    submitRegistration,
    reset,
    clearError,
    validateCurrentStep,
    isStepCompleted,
    canProceedToStep,
  };
};

export { useRegistration };
export default useRegistration;