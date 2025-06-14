import { useState, useCallback } from "react";
import { authApiService } from "../services/auth.service";
import { useAuth } from "../../providers/auth-provider";
import { showToast } from "../../components/ui/toaster";
import {
  LoginFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  AuthenticationError,
  ValidationError,
} from "../types/auth.types";
import { OTPVerificationData } from "../validation/auth.schemas";

interface UseAuthActionsResult {
  login: (data: LoginFormData) => Promise<boolean>;
  verifyOTP: (data: OTPVerificationData) => Promise<boolean>;
  resendOTP: (email: string) => Promise<boolean>;
  forgotPassword: (data: ForgotPasswordFormData) => Promise<boolean>;
  resetPassword: (data: ResetPasswordFormData) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useAuthActions(): UseAuthActionsResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin, logout: authLogout } = useAuth();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: any) => {
    console.error("Auth error:", error);

    if (error instanceof ValidationError) {
      const firstFieldError = Object.values(error.fields || {})[0]?.[0];
      const errorMessage = firstFieldError || error.message;
      setError(errorMessage);
      showToast.error(errorMessage);
      return;
    }

    if (error instanceof AuthenticationError) {
      setError(error.message);
      showToast.error(error.message);
      return;
    }

    const errorMessage = error.message || "حدث خطأ غير متوقع";
    setError(errorMessage);
    showToast.error(errorMessage);
  }, []);
  const login = useCallback(
    async (data: LoginFormData): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        // Extract only the fields needed for the API request
        const loginRequest = {
          email: data.email,
          password: data.password,
        };

        const response = await authApiService.login(loginRequest);
        // Call the auth provider's login - we'll need to update this interface
        // For now, let's dispatch the action directly
        // await authLogin(response.user, response.profile);

        showToast.success("تم تسجيل الدخول بنجاح");
        return true;
      } catch (error) {
        handleError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [authLogin, handleError],
  );

  const verifyOTP = useCallback(
    async (data: OTPVerificationData): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await authApiService.verifyOTP(data);
        // Call the auth provider's login - we'll need to update this interface
        // await authLogin(response.user, response.profile);

        showToast.success("تم تأكيد الحساب بنجاح");
        return true;
      } catch (error) {
        handleError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [authLogin, handleError],
  );

  const resendOTP = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        await authApiService.resendOTP(email);
        showToast.success("تم إرسال رمز التحقق مرة أخرى");
        return true;
      } catch (error) {
        handleError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [handleError],
  );

  const forgotPassword = useCallback(
    async (data: ForgotPasswordFormData): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        await authApiService.forgotPassword(data);
        showToast.success("تم إرسال رمز استعادة كلمة المرور");
        return true;
      } catch (error) {
        handleError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [handleError],
  );

  const resetPassword = useCallback(
    async (data: ResetPasswordFormData): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        await authApiService.resetPassword({
          ...data,
          newPassword: data.password,
        });
        showToast.success("تم تغيير كلمة المرور بنجاح");
        return true;
      } catch (error) {
        handleError(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [handleError],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authApiService.logout();
      await authLogout();
      showToast.success("تم تسجيل الخروج بنجاح");
    } catch (error) {
      console.error("Logout error:", error);
      // Still logout locally even if server request fails
      await authLogout();
    } finally {
      setIsLoading(false);
    }
  }, [authLogout]);

  return {
    login,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    logout,
    isLoading,
    error,
    clearError,
  };
}
