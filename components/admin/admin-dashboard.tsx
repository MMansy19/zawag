"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UsersManagement } from "@/components/admin/users-management";
import { RequestsTable } from "@/components/admin/requests-table";
import { FlaggedList } from "@/components/admin/flagged-list";
import { ChatOverviewPanel } from "@/components/admin/chat-overview-panel";
import { ReportTable } from "@/components/admin/report-table";
import { SettingsForm } from "@/components/admin/settings-form";
import { NotificationsBox } from "@/components/admin/notifications-box";
import {
  mockUsers,
  mockMarriageRequests,
  mockFlaggedMessages,
  mockActiveChats,
  getAdminStats,
} from "@/lib/static-data/admin-mock-data";

const tabs = [
  { id: "users", label: "المستخدمين", icon: "👥" },
  { id: "requests", label: "طلبات الزواج", icon: "💍" },
  { id: "messages", label: "الرسائل المبلغ عنها", icon: "🚨" },
  { id: "chats", label: "المحادثات النشطة", icon: "💬" },
  { id: "reports", label: "التقارير", icon: "📋" },
  { id: "notifications", label: "الإشعارات", icon: "🔔" },
  { id: "settings", label: "الإعدادات", icon: "⚙️" },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const stats = getAdminStats();

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersManagement />;
      case "requests":
        return <RequestsTable />;
      case "messages":
        return <FlaggedList />;
      case "chats":
        return <ChatOverviewPanel />;
      case "reports":
        return <ReportTable />;
      case "notifications":
        return <NotificationsBox />;
      case "settings":
        return <SettingsForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            لوحة تحكم المشرف
          </h1>
          <p className="text-gray-600">إدارة ومراقبة منصة الزواج الإسلامية</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-4">👥</div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-gray-600 text-sm">إجمالي المستخدمين</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-4">💍</div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                  <p className="text-gray-600 text-sm">طلبات الزواج</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <p className="text-2xl font-bold">{stats.activeChats}</p>
                  <p className="text-gray-600 text-sm">محادثات نشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-4">🚨</div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingReports}</p>
                  <p className="text-gray-600 text-sm">تقارير معلقة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 ml-4 mb-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
