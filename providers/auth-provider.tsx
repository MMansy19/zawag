"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { User, Profile } from "@/lib/types";
import { authApi } from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { showToast } from "@/components/ui/toaster";

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: { user: User; profile?: Profile } }
  | { type: "CLEAR_AUTH" }
  | { type: "SET_INITIALIZED"; payload: boolean }
  | { type: "UPDATE_PROFILE"; payload: Profile };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  verifyOTP: (otp: string, identifier: string) => Promise<void>;
  refreshAuth: () => Promise<void>;
  updateProfile: (profile: Profile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  profile: null,
  isLoading: false,
  isAuthenticated: false,
  isInitialized: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.profile || null,
        isAuthenticated: true,
        isLoading: false,
      };

    case "CLEAR_AUTH":
      return {
        ...state,
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "SET_INITIALIZED":
      return { ...state, isInitialized: action.payload };

    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };

    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

        if (token && userData) {
          const user = JSON.parse(userData);

          // Verify token is still valid by fetching profile
          try {
            const profileResponse = await authApi.refreshToken(
              localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || "",
            );

            dispatch({ type: "SET_USER", payload: { user } });
          } catch (error) {
            // Token invalid, clear storage
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_DATA);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        dispatch({ type: "SET_INITIALIZED", payload: true });
      }
    };

    initializeAuth();
  }, []);

  const login = async (emailOrPhone: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await authApi.login({ emailOrPhone, password });

      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;

        // Store auth data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

        dispatch({ type: "SET_USER", payload: { user } });
        showToast.success("تم تسجيل الدخول بنجاح");
      }
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تسجيل الدخول");
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const register = async (data: any) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await authApi.register(data);

      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;

        // Store auth data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

        dispatch({ type: "SET_USER", payload: { user } });
        showToast.success("تم إنشاء الحساب بنجاح");
      }
    } catch (error: any) {
      showToast.error(error.message || "خطأ في إنشاء الحساب");
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const verifyOTP = async (otp: string, identifier: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await authApi.verifyOTP({ otp, identifier });

      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data;

        // Store auth data
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));

        dispatch({ type: "SET_USER", payload: { user } });
        showToast.success("تم التحقق بنجاح");
      }
    } catch (error: any) {
      showToast.error(error.message || "خطأ في التحقق");
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Even if logout fails on server, clear local data
      console.error("Logout error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);

      dispatch({ type: "CLEAR_AUTH" });
      showToast.info("تم تسجيل الخروج");
    }
  };

  const refreshAuth = async () => {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error("No refresh token");
      }

      const response = await authApi.refreshToken(refreshToken);

      if (response.success && response.data) {
        const { token, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
      }
    } catch (error) {
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  const updateProfile = (profile: Profile) => {
    dispatch({ type: "UPDATE_PROFILE", payload: profile });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    verifyOTP,
    refreshAuth,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
