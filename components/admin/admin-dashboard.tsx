"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UsersManagement } from "@/components/admin/users-management";

const tabs = [
  { id: "users", label: "المستخدمين", icon: "👥" },
  { id: "requests", label: "طلبات الزواج", icon: "💍" },
  { id: "messages", label: "الرسائل المبلغ عنها", icon: "🚨" },
  { id: "chats", label: "المحادثات النشطة", icon: "💬" },
  { id: "reports", label: "التقارير", icon: "📋" },
  { id: "settings", label: "الإعدادات", icon: "⚙️" },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersManagement />;
      case "requests":
        return (
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">إدارة طلبات الزواج</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">قريباً...</p>
            </CardContent>
          </Card>
        );
      case "messages":
        return (
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">الرسائل المبلغ عنها</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">قريباً...</p>
            </CardContent>
          </Card>
        );
      case "chats":
        return (
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">المحادثات النشطة</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">قريباً...</p>
            </CardContent>
          </Card>
        );
      case "reports":
        return (
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">التقارير</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">قريباً...</p>
            </CardContent>
          </Card>
        );
      case "settings":
        return (
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">إعدادات النظام</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">قريباً...</p>
            </CardContent>
          </Card>
        );
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
                  <p className="text-2xl font-bold">1,234</p>
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
                  <p className="text-2xl font-bold">56</p>
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
                  <p className="text-2xl font-bold">23</p>
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
                  <p className="text-2xl font-bold">7</p>
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
