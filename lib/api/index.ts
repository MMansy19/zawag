import { ApiClient } from "./client";
import { API_ENDPOINTS, STORAGE_KEYS } from "@/lib/constants";
import type {
  User,
  Profile,
  MarriageRequest,
  ChatRoom,
  Message,
  SearchFilters,
  Notification,
  ChatLimits,
  Report,
  AdminSettings,
  ApiResponse,
} from "@/lib/types";
import type {
  RegisterFormData,
  LoginFormData,
  OTPFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  BasicInfoFormData,
  ReligiousInfoFormData,
  EducationWorkFormData,
  PreferencesFormData,
  GuardianInfoFormData,
  BioFormData,
  PrivacySettingsFormData,
  MarriageRequestFormData,
  RespondToRequestFormData,
  SendMessageFormData,
  ReportFormData,
  AdminUserActionFormData,
  AdminSettingsFormData,
} from "@/lib/validation";

// Authentication API
export const authApi = {
  register: (data: RegisterFormData) =>
    ApiClient.post<{ user: User; token: string }>(
      API_ENDPOINTS.AUTH.REGISTER, // POST /register
      data,
    ),

  login: (data: LoginFormData) =>
    ApiClient.post<{ user: User; token: string; refreshToken: string }>(
      API_ENDPOINTS.AUTH.LOGIN, // POST /login (assumed)
      data,
    ),

  logout: () =>
    ApiClient.post<void>(
      API_ENDPOINTS.AUTH.LOGOUT, // POST /logout
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)}` } }
    ),

  verifyOTP: (data: OTPFormData) =>
    ApiClient.post<{ user: User; token: string; refreshToken: string }>(
      API_ENDPOINTS.AUTH.VERIFY_OTP, // POST /verify-otp (assumed)
      data,
    ),

  resendOTP: (identifier: string) =>
    ApiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.RESEND_OTP, // POST /resend-otp (assumed)
      { identifier },
    ),

  forgotPassword: (data: ForgotPasswordFormData) =>
    ApiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD, // POST /forgot-password (assumed)
      data,
    ),

  resetPassword: (data: ResetPasswordFormData) =>
    ApiClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD, // POST /reset-password (assumed)
      data,
    ),

  refreshToken: (refreshToken: string) =>
    ApiClient.post<{ token: string; refreshToken: string }>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN, // POST /refresh (assumed)
      { refreshToken },
    ),
};

// Profile API (unchanged)
export const profileApi = {
  getProfile: () => ApiClient.get<Profile>(API_ENDPOINTS.PROFILE.GET),
  updateBasicInfo: (data: BasicInfoFormData) =>
    ApiClient.patch<Profile>(`${API_ENDPOINTS.PROFILE.UPDATE}/basic`, data),
  updateReligiousInfo: (data: ReligiousInfoFormData) =>
    ApiClient.patch<Profile>(`${API_ENDPOINTS.PROFILE.UPDATE}/religious`, data),
  updateEducationWork: (data: EducationWorkFormData) =>
    ApiClient.patch<Profile>(`${API_ENDPOINTS.PROFILE.UPDATE}/education`, data),
  updatePreferences: (data: PreferencesFormData) =>
    ApiClient.patch<Profile>(`${API_ENDPOINTS.PROFILE.UPDATE}/preferences`, data),
  updateGuardianInfo: (data: GuardianInfoFormData) =>
    ApiClient.patch<Profile>(`${API_ENDPOINTS.PROFILE.UPDATE}/guardian`, data),
  updateBio: (data: BioFormData) =>
    ApiClient.patch<Profile>(`${API_ENDPOINTS.PROFILE.UPDATE}/bio`, data),
  updatePrivacySettings: (data: PrivacySettingsFormData) =>
    ApiClient.patch<Profile>(`${API_ENDPOINTS.PROFILE.UPDATE}/privacy`, data),
  uploadProfilePicture: (file: File, onProgress?: (progress: number) => void) =>
    ApiClient.uploadFile<{ profilePicture: string }>(
      API_ENDPOINTS.PROFILE.UPLOAD_PICTURE,
      file,
      onProgress,
    ),
  deleteProfilePicture: () =>
    ApiClient.delete(API_ENDPOINTS.PROFILE.DELETE_PICTURE),
  completeProfile: () =>
    ApiClient.post<Profile>(API_ENDPOINTS.PROFILE.COMPLETE),
};

// Search API (unchanged)
export const searchApi = {
  searchProfiles: (filters: SearchFilters, page = 1, limit = 20) =>
    ApiClient.post<{
      profiles: Profile[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>(API_ENDPOINTS.SEARCH.PROFILES, { filters, page, limit }),
  getFilterOptions: () =>
    ApiClient.get<{
      countries: Array<{ code: string; name: string }>;
      cities: Array<{ country: string; cities: string[] }>;
      educationLevels: string[];
      occupations: string[];
    }>(API_ENDPOINTS.SEARCH.FILTERS),
};

// Marriage Requests API (unchanged)
export const requestsApi = {
  sendRequest: (data: MarriageRequestFormData) =>
    ApiClient.post<MarriageRequest>(API_ENDPOINTS.REQUESTS.SEND, data),
  getReceivedRequests: (page = 1, limit = 20) =>
    ApiClient.get<{
      requests: MarriageRequest[];
      pagination: any;
    }>(`${API_ENDPOINTS.REQUESTS.GET_RECEIVED}?page=${page}&limit=${limit}`),
  getSentRequests: (page = 1, limit = 20) =>
    ApiClient.get<{
      requests: MarriageRequest[];
      pagination: any;
    }>(`${API_ENDPOINTS.REQUESTS.GET_SENT}?page=${page}&limit=${limit}`),
  respondToRequest: (data: RespondToRequestFormData) =>
    ApiClient.post<MarriageRequest>(API_ENDPOINTS.REQUESTS.RESPOND, data),
  getRequestById: (requestId: string) =>
    ApiClient.get<MarriageRequest>(`${API_ENDPOINTS.REQUESTS.GET_BY_ID}/${requestId}`),
};

// Chat API (unchanged)
export const chatApi = {
  getChatRooms: () => ApiClient.get<ChatRoom[]>(API_ENDPOINTS.CHAT.GET_ROOMS),
  getMessages: (chatRoomId: string, page = 1, limit = 50) =>
    ApiClient.get<{
      messages: Message[];
      pagination: any;
    }>(`${API_ENDPOINTS.CHAT.GET_MESSAGES}/${chatRoomId}?page=${page}&limit=${limit}`),
  sendMessage: (data: SendMessageFormData) =>
    ApiClient.post<Message>(API_ENDPOINTS.CHAT.SEND_MESSAGE, data),
  getChatLimits: () => ApiClient.get<ChatLimits>(API_ENDPOINTS.CHAT.GET_LIMITS),
};

// Notifications API (unchanged)
export const notificationsApi = {
  getNotifications: (page = 1, limit = 20) =>
    ApiClient.get<{
      notifications: Notification[];
      pagination: any;
    }>(`${API_ENDPOINTS.NOTIFICATIONS.GET}?page=${page}&limit=${limit}`),
  markAsRead: (notificationId: string) =>
    ApiClient.patch(`${API_ENDPOINTS.NOTIFICATIONS.MARK_READ}/${notificationId}`),
  markAllAsRead: () => ApiClient.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ),
  getUnreadCount: () =>
    ApiClient.get<{ count: number }>(API_ENDPOINTS.NOTIFICATIONS.GET_UNREAD_COUNT),
};

// Reports API (unchanged)
export const reportsApi = {
  submitReport: (data: ReportFormData) =>
    ApiClient.post<Report>("/api/reports", data),
};

// Admin API (unchanged)
export const adminApi = {
  getUsers: (page = 1, limit = 20, filters?: any) =>
    ApiClient.get<{
      users: User[];
      pagination: any;
    }>(`${API_ENDPOINTS.ADMIN.USERS}?page=${page}&limit=${limit}&${new URLSearchParams(filters).toString()}`),
  getUserById: (userId: string) =>
    ApiClient.get<User>(`${API_ENDPOINTS.ADMIN.USERS}/${userId}`),
  performUserAction: (data: AdminUserActionFormData) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.USERS}/action`, data),
  suspendUser: (userId: string, reason?: string) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.USERS}/${userId}/suspend`, { reason }),
  activateUser: (userId: string) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.USERS}/${userId}/activate`),
  getMarriageRequests: (page = 1, limit = 20, filters?: any) =>
    ApiClient.get<{
      requests: MarriageRequest[];
      pagination: any;
    }>(`${API_ENDPOINTS.ADMIN.REQUESTS}?page=${page}&limit=${limit}&${new URLSearchParams(filters).toString()}`),
  approveRequest: (requestId: string) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.REQUESTS}/${requestId}/approve`),
  rejectRequest: (requestId: string, reason?: string) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.REQUESTS}/${requestId}/reject`, { reason }),
  getPendingMessages: (page = 1, limit = 20) =>
    ApiClient.get<{
      messages: Message[];
      pagination: any;
    }>(`${API_ENDPOINTS.ADMIN.MESSAGES}/pending?page=${page}&limit=${limit}`),
  getFlaggedMessages: (page = 1, limit = 20) =>
    ApiClient.get<{
      messages: Message[];
      pagination: any;
    }>(`${API_ENDPOINTS.ADMIN.MESSAGES}/flagged?page=${page}&limit=${limit}`),
  approveMessage: (messageId: string) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.MESSAGES}/${messageId}/approve`),
  rejectMessage: (messageId: string, reason?: string) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.MESSAGES}/${messageId}/reject`, { reason }),
  getReports: (page = 1, limit = 20, filters?: any) =>
    ApiClient.get<{
      reports: Report[];
      pagination: any;
    }>(`${API_ENDPOINTS.ADMIN.REPORTS}?page=${page}&limit=${limit}&${new URLSearchParams(filters).toString()}`),
  resolveReport: (reportId: string, resolution: string) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.REPORTS}/${reportId}/resolve`, { resolution }),
  dismissReport: (reportId: string, reason?: string) =>
    ApiClient.post(`${API_ENDPOINTS.ADMIN.REPORTS}/${reportId}/dismiss`, { reason }),
  getSettings: () => ApiClient.get<AdminSettings>(API_ENDPOINTS.ADMIN.SETTINGS),
  updateSettings: (data: AdminSettingsFormData) =>
    ApiClient.put<AdminSettings>(API_ENDPOINTS.ADMIN.SETTINGS, data),
  getStats: () =>
    ApiClient.get<{
      totalUsers: number;
      activeUsers: number;
      totalRequests: number;
      pendingRequests: number;
      activeChats: number;
      pendingMessages: number;
      flaggedMessages: number;
      totalReports: number;
      pendingReports: number;
    }>(API_ENDPOINTS.ADMIN.STATS),
};