"use client";
import { useCallback, useReducer } from "react";
import { authApiService } from "../services/auth.service";
import { getStepSchema } from "../validation/auth.schemas";
import { showToast } from "../../components/ui/toaster";
import {
  RegisterRequest,
  AuthenticationError,
  ValidationError,
} from "../types/auth.types";

// Registration State Management
interface RegistrationState {
  currentStep: number;
  totalSteps: number;
  data: Partial<RegisterRequest>;
  completedSteps: Set<number>;
  isSubmitting: boolean;
  error: string | null;
  otpSent: boolean;
  profilePicture: File | null;
}

type RegistrationAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "UPDATE_DATA"; payload: Partial<RegisterRequest> }
  | { type: "MARK_STEP_COMPLETED"; payload: number }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_OTP_SENT"; payload: boolean }
  | { type: "SET_PROFILE_PICTURE"; payload: File | null }
  | { type: "RESET" };

const initialState: RegistrationState = {
  currentStep: 1,
  totalSteps: 9,
  data: {
    prays: true,
    fasts: true,
    religiousLevel: "practicing",
    preferences: {
      ageRange: { min: 18, max: 35 },
    },
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
  // State
  currentStep: number;
  totalSteps: number;
  data: Partial<RegisterRequest>;
  completedSteps: Set<number>;
  isSubmitting: boolean;
  error: string | null;
  otpSent: boolean;
  profilePicture: File | null;

  // Actions
  goToStep: (step: number) => void;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  updateData: (data: Partial<RegisterRequest>) => void;
  setProfilePicture: (file: File | null) => void;
  sendOTP: () => Promise<boolean>;
  submitRegistration: () => Promise<boolean>;
  reset: () => void;
  clearError: () => void;

  // Validation
  validateCurrentStep: () => Promise<boolean>;
  isStepCompleted: (step: number) => boolean;
  canProceedToStep: (step: number) => boolean;
}

export function useRegistration(): UseRegistrationResult {
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
      const schema = getStepSchema(state.currentStep);

      // Extract relevant data for current step
      let stepData: any = { ...state.data };

      // Special handling for step 1 (email/password)
      if (state.currentStep === 1) {
        stepData = {
          email: state.data.email,
          password: state.data.password,
          confirmPassword: state.data.password, // Add confirmPassword for validation
        };
      }

      await schema.parseAsync(stepData);
      dispatch({ type: "SET_ERROR", payload: null });
      return true;
    } catch (error: any) {
      if (error.errors) {
        const firstError =
          error.errors[0]?.message || "خطأ في التحقق من البيانات";
        dispatch({ type: "SET_ERROR", payload: firstError });
        showToast.error(firstError);
      } else {
        handleError(error);
      }
      return false;
    }
  }, [state.currentStep, state.data, handleError]);

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
      dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
    }

    return true;
  }, [validateCurrentStep, state.currentStep, state.totalSteps]);

  const prevStep = useCallback(() => {
    if (state.currentStep > 1) {
      dispatch({ type: "SET_STEP", payload: state.currentStep - 1 });
    }
  }, [state.currentStep]);

  const updateData = useCallback((data: Partial<RegisterRequest>) => {
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

      // TODO: Replace with actual OTP sending API
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

      // Validate all data before submission
      const isValid = await validateCurrentStep();
      if (!isValid) return false; // Prepare registration data
      const registrationData: RegisterRequest = {
        email: state.data.email!,
        password: state.data.password!,
        firstName: state.data.firstName!,
        lastName: state.data.lastName!,
        age: state.data.age!,
        gender: state.data.gender!,
        country: state.data.country!,
        city: state.data.city!,
        nationality: state.data.nationality!,
        maritalStatus: state.data.maritalStatus!,
        religiousLevel: state.data.religiousLevel!,
        prays: state.data.prays!,
        fasts: state.data.fasts!,
        preferences: state.data.preferences!,
        ...(state.data.education && { education: state.data.education }),
        ...(state.data.occupation && { occupation: state.data.occupation }),
        ...(state.data.hasHijab !== undefined && {
          hasHijab: state.data.hasHijab,
        }),
        ...(state.data.hasBeard !== undefined && {
          hasBeard: state.data.hasBeard,
        }),
        ...(state.data.bio && { bio: state.data.bio }),
        ...(state.data.guardianName && {
          guardianName: state.data.guardianName,
        }),
        ...(state.data.guardianPhone && {
          guardianPhone: state.data.guardianPhone,
        }),
        ...(state.data.guardianEmail && {
          guardianEmail: state.data.guardianEmail,
        }),
        ...(state.profilePicture && { profilePicture: state.profilePicture }),
      };

      const response = await authApiService.register(registrationData);

      if (response.requiresVerification) {
        // Redirect to OTP verification
        showToast.success("تم إنشاء الحساب، يرجى تأكيد بريدك الإلكتروني");
      } else {
        showToast.success("تم إنشاء الحساب بنجاح");
      }

      return true;
    } catch (error) {
      handleError(error);
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
      // Can proceed to step if all previous steps are completed
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
    // State
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    data: state.data,
    completedSteps: state.completedSteps,
    isSubmitting: state.isSubmitting,
    error: state.error,
    otpSent: state.otpSent,
    profilePicture: state.profilePicture,

    // Actions
    goToStep,
    nextStep,
    prevStep,
    updateData,
    setProfilePicture,
    sendOTP,
    submitRegistration,
    reset,
    clearError,

    // Validation
    validateCurrentStep,
    isStepCompleted,
    canProceedToStep,
  };
}
