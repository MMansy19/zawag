// Mock data for admin dashboard - comprehensive static data until backend is ready

export interface User {
  id: string;
  name: string;
  email: string;
  gender: "m" | "f";
  age: number;
  country: string;
  city: string;
  joinDate: string;
  status: "active" | "suspended" | "pending";
  profileComplete: boolean;
  lastActivity: string;
  requestsSent: number;
  requestsReceived: number;
  profileViews: number;
}

export interface MarriageRequest {
  id: string;
  senderName: string;
  senderId: string;
  senderAge: number;
  senderCountry: string;
  receiverName: string;
  receiverId: string;
  receiverAge: number;
  receiverCountry: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  message: string;
  sentDate: string;
  responseDate?: string;
  adminNotes?: string;
}

export interface FlaggedMessage {
  id: string;
  chatId: string;
  senderName: string;
  senderId: string;
  receiverName: string;
  receiverId: string;
  message: string;
  flaggedWords: string[];
  severity: "low" | "medium" | "high";
  timestamp: string;
  status: "pending" | "approved" | "rejected";
  adminAction?: string;
  reviewedBy?: string;
  reviewDate?: string;
}

export interface ActiveChat {
  id: string;
  participants: {
    id: string;
    name: string;
    gender: "m" | "f";
    age: number;
  }[];
  startDate: string;
  lastMessageDate: string;
  messageCount: number;
  status: "active" | "expired" | "reported";
  expiryDate: string;
  requestId: string;
}

export interface UserReport {
  id: string;
  reporterName: string;
  reporterId: string;
  reportedName: string;
  reportedId: string;
  reason: string;
  category:
    | "inappropriate_behavior"
    | "fake_profile"
    | "harassment"
    | "spam"
    | "other";
  description: string;
  evidence?: string;
  status: "pending" | "investigating" | "resolved" | "dismissed";
  priority: "low" | "medium" | "high" | "urgent";
  reportDate: string;
  assignedTo?: string;
  resolution?: string;
  resolutionDate?: string;
}

export interface AdminNotification {
  id: string;
  type:
    | "new_user"
    | "flagged_message"
    | "user_report"
    | "system_alert"
    | "marriage_request";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  actionRequired: boolean;
  relatedId?: string;
}

export interface SystemSettings {
  platform: {
    name: string;
    description: string;
    contactEmail: string;
    supportPhone: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
  };
  features: {
    allowProfilePictures: boolean;
    chatTimeLimit: number; // days
    maxRequestsPerDay: number;
    maxMessagesPerHour: number;
    maxMessagesPerDay: number;
    autoModeration: boolean;
  };
  moderation: {
    requireAdminApproval: boolean;
    autoFlagSensitiveWords: boolean;
    bannedWords: string[];
    warningThreshold: number;
    suspensionThreshold: number;
  };
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "أحمد محمد علي",
    email: "ahmed.mohamed@example.com",
    gender: "m",
    age: 28,
    country: "السعودية",
    city: "الرياض",
    joinDate: "2024-11-15",
    status: "active",
    profileComplete: true,
    lastActivity: "2024-12-15",
    requestsSent: 5,
    requestsReceived: 12,
    profileViews: 45,
  },
  {
    id: "2",
    name: "فاطمة عبدالله",
    email: "fatima.abdullah@example.com",
    gender: "f",
    age: 25,
    country: "الإمارات",
    city: "دبي",
    joinDate: "2024-10-20",
    status: "active",
    profileComplete: true,
    lastActivity: "2024-12-14",
    requestsSent: 0,
    requestsReceived: 18,
    profileViews: 67,
  },
  {
    id: "3",
    name: "محمد عبدالرحمن",
    email: "mohammed.abdelrahman@example.com",
    gender: "m",
    age: 32,
    country: "مصر",
    city: "القاهرة",
    joinDate: "2024-09-10",
    status: "suspended",
    profileComplete: false,
    lastActivity: "2024-12-10",
    requestsSent: 15,
    requestsReceived: 3,
    profileViews: 22,
  },
  {
    id: "4",
    name: "عائشة حسن",
    email: "aisha.hassan@example.com",
    gender: "f",
    age: 27,
    country: "الأردن",
    city: "عمان",
    joinDate: "2024-12-01",
    status: "pending",
    profileComplete: false,
    lastActivity: "2024-12-13",
    requestsSent: 0,
    requestsReceived: 2,
    profileViews: 8,
  },
  {
    id: "5",
    name: "يوسف أحمد",
    email: "youssef.ahmed@example.com",
    gender: "m",
    age: 30,
    country: "المغرب",
    city: "الرباط",
    joinDate: "2024-08-15",
    status: "active",
    profileComplete: true,
    lastActivity: "2024-12-12",
    requestsSent: 8,
    requestsReceived: 6,
    profileViews: 33,
  },
];

// Mock Marriage Requests Data
export const mockMarriageRequests: MarriageRequest[] = [
  {
    id: "req_1",
    senderName: "أحمد محمد علي",
    senderId: "1",
    senderAge: 28,
    senderCountry: "السعودية",
    receiverName: "فاطمة عبدالله",
    receiverId: "2",
    receiverAge: 25,
    receiverCountry: "الإمارات",
    status: "pending",
    message:
      "السلام عليكم ورحمة الله وبركاته، أتمنى أن تتاح لنا الفرصة للتعارف بهدف الزواج الحلال.",
    sentDate: "2024-12-10",
    adminNotes: "طلب عادي، لا يحتاج تدخل",
  },
  {
    id: "req_2",
    senderName: "محمد عبدالرحمن",
    senderId: "3",
    senderAge: 32,
    senderCountry: "مصر",
    receiverName: "عائشة حسن",
    receiverId: "4",
    receiverAge: 27,
    receiverCountry: "الأردن",
    status: "rejected",
    message: "أرغب في التعارف للزواج",
    sentDate: "2024-12-05",
    responseDate: "2024-12-08",
    adminNotes: "تم الرفض بسبب عدم اكتمال الملف الشخصي",
  },
  {
    id: "req_3",
    senderName: "يوسف أحمد",
    senderId: "5",
    senderAge: 30,
    senderCountry: "المغرب",
    receiverName: "فاطمة عبدالله",
    receiverId: "2",
    receiverAge: 25,
    receiverCountry: "الإمارات",
    status: "accepted",
    message: "السلام عليكم، أعجبني ملفك الشخصي وأتمنى التعارف للزواج.",
    sentDate: "2024-11-28",
    responseDate: "2024-12-02",
    adminNotes: "تم القبول، تم بدء المحادثة",
  },
];

// Mock Flagged Messages Data
export const mockFlaggedMessages: FlaggedMessage[] = [
  {
    id: "flag_1",
    chatId: "chat_1",
    senderName: "محمد عبدالرحمن",
    senderId: "3",
    receiverName: "عائشة حسن",
    receiverId: "4",
    message: "أريد أن أراك شخصياً قبل الزواج",
    flaggedWords: ["شخصياً"],
    severity: "medium",
    timestamp: "2024-12-12 14:30:00",
    status: "pending",
    adminAction: "مراجعة مطلوبة",
  },
  {
    id: "flag_2",
    chatId: "chat_2",
    senderName: "أحمد محمد علي",
    senderId: "1",
    receiverName: "فاطمة عبدالله",
    receiverId: "2",
    message: "هل يمكنني الحصول على رقم هاتفك للتواصل؟",
    flaggedWords: ["رقم هاتفك"],
    severity: "low",
    timestamp: "2024-12-11 16:45:00",
    status: "approved",
    adminAction: "تم الموافقة - طلب عادي",
    reviewedBy: "المشرف أحمد",
    reviewDate: "2024-12-12",
  },
  {
    id: "flag_3",
    chatId: "chat_3",
    senderName: "يوسف أحمد",
    senderId: "5",
    receiverName: "فاطمة عبدالله",
    receiverId: "2",
    message: "أرسلي لي صورة أخرى",
    flaggedWords: ["صورة"],
    severity: "high",
    timestamp: "2024-12-10 20:15:00",
    status: "rejected",
    adminAction: "تم رفض الرسالة - طلب غير مناسب",
    reviewedBy: "المشرفة سارة",
    reviewDate: "2024-12-11",
  },
];

// Mock Active Chats Data
export const mockActiveChats: ActiveChat[] = [
  {
    id: "chat_1",
    participants: [
      { id: "1", name: "أحمد محمد علي", gender: "m", age: 28 },
      { id: "2", name: "فاطمة عبدالله", gender: "f", age: 25 },
    ],
    startDate: "2024-12-10",
    lastMessageDate: "2024-12-15",
    messageCount: 24,
    status: "active",
    expiryDate: "2024-12-17",
    requestId: "req_1",
  },
  {
    id: "chat_2",
    participants: [
      { id: "5", name: "يوسف أحمد", gender: "m", age: 30 },
      { id: "2", name: "فاطمة عبدالله", gender: "f", age: 25 },
    ],
    startDate: "2024-12-02",
    lastMessageDate: "2024-12-14",
    messageCount: 67,
    status: "active",
    expiryDate: "2024-12-09",
    requestId: "req_3",
  },
  {
    id: "chat_3",
    participants: [
      { id: "3", name: "محمد عبدالرحمن", gender: "m", age: 32 },
      { id: "4", name: "عائشة حسن", gender: "f", age: 27 },
    ],
    startDate: "2024-12-08",
    lastMessageDate: "2024-12-12",
    messageCount: 12,
    status: "reported",
    expiryDate: "2024-12-15",
    requestId: "req_2",
  },
];

// Mock User Reports Data
export const mockUserReports: UserReport[] = [
  {
    id: "report_1",
    reporterName: "فاطمة عبدالله",
    reporterId: "2",
    reportedName: "محمد عبدالرحمن",
    reportedId: "3",
    reason: "سلوك غير مناسب",
    category: "inappropriate_behavior",
    description: "يرسل رسائل غير مناسبة ويطلب اللقاء الشخصي",
    status: "investigating",
    priority: "high",
    reportDate: "2024-12-12",
    assignedTo: "المشرف أحمد",
  },
  {
    id: "report_2",
    reporterName: "عائشة حسن",
    reporterId: "4",
    reportedName: "يوسف أحمد",
    reportedId: "5",
    reason: "طلب صور شخصية",
    category: "harassment",
    description: "يطلب إرسال صور شخصية باستمرار",
    status: "resolved",
    priority: "medium",
    reportDate: "2024-12-10",
    assignedTo: "المشرفة سارة",
    resolution: "تم تحذير المستخدم ومنعه من إرسال رسائل لمدة 24 ساعة",
    resolutionDate: "2024-12-11",
  },
  {
    id: "report_3",
    reporterName: "أحمد محمد علي",
    reporterId: "1",
    reportedName: "محمد عبدالرحمن",
    reportedId: "3",
    reason: "ملف شخصي مزيف",
    category: "fake_profile",
    description: "معلومات غير صحيحة في الملف الشخصي",
    status: "pending",
    priority: "medium",
    reportDate: "2024-12-13",
  },
];

// Mock Admin Notifications Data
export const mockAdminNotifications: AdminNotification[] = [
  {
    id: "notif_1",
    type: "flagged_message",
    title: "رسالة مبلغ عنها جديدة",
    message: "تم الإبلاغ عن رسالة من محمد عبدالرحمن",
    timestamp: "2024-12-15 10:30:00",
    read: false,
    priority: "high",
    actionRequired: true,
    relatedId: "flag_1",
  },
  {
    id: "notif_2",
    type: "user_report",
    title: "بلاغ مستخدم جديد",
    message: "تم الإبلاغ عن مستخدم بسبب سلوك غير مناسب",
    timestamp: "2024-12-14 15:45:00",
    read: false,
    priority: "high",
    actionRequired: true,
    relatedId: "report_1",
  },
  {
    id: "notif_3",
    type: "new_user",
    title: "مستخدم جديد",
    message: "انضم مستخدم جديد: عائشة حسن",
    timestamp: "2024-12-13 09:20:00",
    read: true,
    priority: "low",
    actionRequired: false,
    relatedId: "4",
  },
  {
    id: "notif_4",
    type: "marriage_request",
    title: "طلب تعارف جديد",
    message: "تم إرسال طلب تعارف جديد",
    timestamp: "2024-12-12 14:15:00",
    read: true,
    priority: "medium",
    actionRequired: false,
    relatedId: "req_1",
  },
  {
    id: "notif_5",
    type: "system_alert",
    title: "تحديث النظام",
    message: "تم تطبيق تحديث أمني جديد",
    timestamp: "2024-12-11 08:00:00",
    read: true,
    priority: "medium",
    actionRequired: false,
  },
];

// Mock System Settings Data
export const mockSystemSettings: SystemSettings = {
  platform: {
    name: "منصة الزواج السعيد",
    description: "منصة إسلامية للتعارف والزواج الحلال",
    contactEmail: "admin@zawaj.com",
    supportPhone: "+966501234567",
  },
  theme: {
    primaryColor: "#5d1a78",
    secondaryColor: "#4CAF50",
    accentColor: "#FF9800",
    backgroundColor: "#FFFFFF",
    textColor: "#212121",
    fontSize: {
      small: "14px",
      medium: "16px",
      large: "18px",
    },
  },
  features: {
    allowProfilePictures: true,
    chatTimeLimit: 7,
    maxRequestsPerDay: 5,
    maxMessagesPerHour: 10,
    maxMessagesPerDay: 50,
    autoModeration: true,
  },
  moderation: {
    requireAdminApproval: false,
    autoFlagSensitiveWords: true,
    bannedWords: ["خروج", "لقاء", "رقم هاتف", "واتساب", "انستقرام"],
    warningThreshold: 3,
    suspensionThreshold: 5,
  },
};

// Helper functions for data manipulation
export const getActiveUsersCount = () =>
  mockUsers.filter((u) => u.status === "active").length;
export const getPendingUsersCount = () =>
  mockUsers.filter((u) => u.status === "pending").length;
export const getSuspendedUsersCount = () =>
  mockUsers.filter((u) => u.status === "suspended").length;

export const getPendingRequestsCount = () =>
  mockMarriageRequests.filter((r) => r.status === "pending").length;
export const getAcceptedRequestsCount = () =>
  mockMarriageRequests.filter((r) => r.status === "accepted").length;

export const getPendingFlaggedMessagesCount = () =>
  mockFlaggedMessages.filter((m) => m.status === "pending").length;
export const getHighSeverityFlaggedCount = () =>
  mockFlaggedMessages.filter((m) => m.severity === "high").length;

export const getActiveChatsCount = () =>
  mockActiveChats.filter((c) => c.status === "active").length;
export const getReportedChatsCount = () =>
  mockActiveChats.filter((c) => c.status === "reported").length;

export const getUnreadNotificationsCount = () =>
  mockAdminNotifications.filter((n) => !n.read).length;
export const getHighPriorityNotificationsCount = () =>
  mockAdminNotifications.filter((n) => n.priority === "high" && !n.read).length;

// Export notifications with alias for consistency
export const mockNotifications = mockAdminNotifications;

// Comprehensive admin stats function
export const getAdminStats = () => ({
  totalUsers: mockUsers.length,
  activeUsers: getActiveUsersCount(),
  pendingUsers: getPendingUsersCount(),
  suspendedUsers: getSuspendedUsersCount(),

  totalRequests: mockMarriageRequests.length,
  pendingRequests: getPendingRequestsCount(),
  acceptedRequests: getAcceptedRequestsCount(),

  totalFlaggedMessages: mockFlaggedMessages.length,
  pendingFlaggedMessages: getPendingFlaggedMessagesCount(),
  highSeverityFlags: getHighSeverityFlaggedCount(),

  totalChats: mockActiveChats.length,
  activeChats: getActiveChatsCount(),
  reportedChats: getReportedChatsCount(),
  totalReports: mockUserReports.length,
  pendingReports: mockUserReports.filter((r) => r.status === "pending").length,
  urgentReports: mockUserReports.filter((r) => r.priority === "urgent").length,

  totalNotifications: mockAdminNotifications.length,
  unreadNotifications: getUnreadNotificationsCount(),
  highPriorityNotifications: getHighPriorityNotificationsCount(),
});
