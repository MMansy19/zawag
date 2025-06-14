import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthenticationError,
  ValidationError,
} from "../types/auth.types";

const API_BASE_URL = process.env["NEXT_PUBLIC_API_URL"] || "/api";

// API Error Handler
class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, any>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// HTTP Client with error handling
class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Get auth token if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        await this.handleError(response);
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return {} as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or other errors
      throw new ApiError(0, "NETWORK_ERROR", "فشل في الاتصال بالخادم", {
        originalError: error,
      });
    }
  }

  private async handleError(response: Response): Promise<never> {
    let errorData: any = {};

    try {
      errorData = await response.json();
    } catch {
      // Response doesn't contain JSON
    }

    const { status } = response;
    const code = errorData.code || `HTTP_${status}`;
    const message = errorData.message || this.getDefaultErrorMessage(status);
    const details = errorData.details || {};

    switch (status) {
      case 400:
        if (errorData.fields) {
          throw new ValidationError(message, errorData.fields);
        }
        throw new ApiError(status, code, message, details);

      case 401:
        // Clear invalid tokens
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
        }
        throw new AuthenticationError(code, message, details);

      case 403:
        throw new AuthenticationError(code, message, details);

      case 429:
        throw new ApiError(
          status,
          "RATE_LIMIT",
          "تم تجاوز حد الطلبات، حاول مرة أخرى لاحقاً",
          details,
        );

      case 500:
        throw new ApiError(
          status,
          "SERVER_ERROR",
          "خطأ في الخادم، حاول مرة أخرى لاحقاً",
          details,
        );

      default:
        throw new ApiError(status, code, message, details);
    }
  }

  private getDefaultErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return "طلب غير صحيح";
      case 401:
        return "غير مصرح لك بهذا الإجراء";
      case 403:
        return "ممنوع الوصول";
      case 404:
        return "المورد غير موجود";
      case 429:
        return "تم تجاوز حد الطلبات";
      case 500:
        return "خطأ في الخادم";
      default:
        return "حدث خطأ غير متوقع";
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }
  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : null,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit,
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : null,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  async postFormData<T>(
    endpoint: string,
    formData: FormData,
    options?: RequestInit,
  ): Promise<T> {
    const headers = { ...options?.headers };
    delete (headers as any)["Content-Type"]; // Let browser set content-type for FormData

    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      headers,
      body: formData,
    });
  }
}

// Create HTTP client instance
const httpClient = new HttpClient(API_BASE_URL);

// Auth API Service
export class AuthApiService {
  /**
   * User login
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await httpClient.post<LoginResponse>(
        "/auth/login",
        data,
      );

      // Store tokens
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", response.accessToken);
        localStorage.setItem("refresh_token", response.refreshToken);
        localStorage.setItem("user_data", JSON.stringify(response.user));
        if (response.profile) {
          localStorage.setItem(
            "profile_data",
            JSON.stringify(response.profile),
          );
        }
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * User registration
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const formData = new FormData();

      // Add text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "profilePicture") return; // Handle separately
        if (key === "preferences") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      // Add profile picture if exists
      if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
      }

      const response = await httpClient.postFormData<RegisterResponse>(
        "/auth/register",
        formData,
      );
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  /**
   * Verify OTP after registration
   */
  async verifyOTP(data: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    try {
      const response = await httpClient.post<VerifyOTPResponse>(
        "/auth/verify-otp",
        data,
      );

      // Store tokens after successful verification
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", response.accessToken);
        localStorage.setItem("refresh_token", response.refreshToken);
        localStorage.setItem("user_data", JSON.stringify(response.user));
        localStorage.setItem("profile_data", JSON.stringify(response.profile));
      }

      return response;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  }

  /**
   * Resend OTP
   */
  async resendOTP(email: string): Promise<{ message: string }> {
    try {
      return await httpClient.post("/auth/resend-otp", { email });
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await httpClient.post<RefreshTokenResponse>(
        "/auth/refresh",
        {
          refreshToken,
        },
      );

      // Update stored tokens
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", response.accessToken);
        localStorage.setItem("refresh_token", response.refreshToken);
      }

      return response;
    } catch (error) {
      console.error("Token refresh error:", error);

      // Clear invalid tokens
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("profile_data");
      }

      throw error;
    }
  }

  /**
   * Request password reset
   */
  async forgotPassword(
    data: ForgotPasswordRequest,
  ): Promise<{ message: string }> {
    try {
      return await httpClient.post("/auth/forgot-password", data);
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  }

  /**
   * Reset password with OTP
   */
  async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<{ message: string }> {
    try {
      return await httpClient.post("/auth/reset-password", data);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refresh_token")
          : null;

      if (refreshToken) {
        await httpClient.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with local logout even if server request fails
    } finally {
      // Clear local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("profile_data");
      }
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<{ user: any; profile: any }> {
    try {
      return await httpClient.get("/auth/me");
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth_token");
  }

  /**
   * Get stored tokens
   */
  getTokens(): { accessToken: string | null; refreshToken: string | null } {
    if (typeof window === "undefined") {
      return { accessToken: null, refreshToken: null };
    }

    return {
      accessToken: localStorage.getItem("auth_token"),
      refreshToken: localStorage.getItem("refresh_token"),
    };
  }
}

// Export singleton instance
export const authApiService = new AuthApiService();

// Export the HTTP client for other services
export { httpClient };
