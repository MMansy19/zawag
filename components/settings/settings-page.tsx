"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth-provider";
import { showToast } from "@/components/ui/toaster";
import { PrivacySettingsComponent } from "./privacy-settings";
import { PrivacySettings } from "@/lib/types";

export function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      newMessages: true,
      newRequests: true,
    },
    privacy: {
      profileVisibility: "everyone" as "everyone" | "matches-only" | "none",
      allowMessages: "everyone" as "everyone" | "matches-only" | "none",
    },
    account: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      // TODO: Save notification settings
      showToast.success("تم حفظ إعدادات التنبيهات");
    } catch (error) {
      showToast.error("خطأ في حفظ الإعدادات");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async (privacySettings: PrivacySettings) => {
    setLoading(true);
    try {
      // TODO: Save privacy settings to backend
      console.log("Saving privacy settings:", privacySettings);
      showToast.success("تم حفظ إعدادات الخصوصية");
    } catch (error) {
      showToast.error("خطأ في حفظ الإعدادات");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (settings.account.newPassword !== settings.account.confirmPassword) {
      showToast.error("كلمة المرور الجديدة غير متطابقة");
      return;
    }

    setLoading(true);
    try {
      // TODO: Change password
      showToast.success("تم تغيير كلمة المرور");
      setSettings((prev) => ({
        ...prev,
        account: {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
      }));
    } catch (error) {
      showToast.error("خطأ في تغيير كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">الإعدادات</h1>
        <p className="text-gray-600">إدارة إعدادات حسابك وخصوصيتك</p>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">إعدادات التنبيهات</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              تنبيهات البريد الإلكتروني
            </span>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    email: e.target.checked,
                  },
                }))
              }
              className="h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">التنبيهات الفورية</span>
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    push: e.target.checked,
                  },
                }))
              }
              className="h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">الرسائل الجديدة</span>
            <input
              type="checkbox"
              checked={settings.notifications.newMessages}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    newMessages: e.target.checked,
                  },
                }))
              }
              className="h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">طلبات الزواج الجديدة</span>
            <input
              type="checkbox"
              checked={settings.notifications.newRequests}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    newRequests: e.target.checked,
                  },
                }))
              }
              className="h-4 w-4"
            />
          </div>

          <div className="pt-4">
            <Button onClick={handleSaveNotifications} disabled={loading}>
              حفظ إعدادات التنبيهات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <PrivacySettingsComponent
        profile={user?.profile}
        onSave={handleSavePrivacy}
      />

      {/* Account Security */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">أمان الحساب</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="كلمة المرور الحالية"
            type="password"
            value={settings.account.currentPassword}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                account: { ...prev.account, currentPassword: e.target.value },
              }))
            }
            placeholder="أدخل كلمة المرور الحالية"
          />

          <Input
            label="كلمة المرور الجديدة"
            type="password"
            value={settings.account.newPassword}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                account: { ...prev.account, newPassword: e.target.value },
              }))
            }
            placeholder="أدخل كلمة المرور الجديدة"
          />

          <Input
            label="تأكيد كلمة المرور الجديدة"
            type="password"
            value={settings.account.confirmPassword}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                account: { ...prev.account, confirmPassword: e.target.value },
              }))
            }
            placeholder="أكد كلمة المرور الجديدة"
          />

          <div className="pt-4">
            <Button
              onClick={handleChangePassword}
              disabled={
                loading ||
                !settings.account.currentPassword ||
                !settings.account.newPassword ||
                !settings.account.confirmPassword
              }
            >
              تغيير كلمة المرور
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">إجراءات الحساب</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-md">
            <h4 className="font-medium text-yellow-800 mb-2">تصدير البيانات</h4>
            <p className="text-sm text-yellow-700 mb-3">
              احصل على نسخة من جميع بياناتك الشخصية
            </p>
            <Button variant="outline" size="sm">
              تصدير البيانات
            </Button>
          </div>

          <div className="bg-red-50 p-4 rounded-md">
            <h4 className="font-medium text-red-800 mb-2">حذف الحساب</h4>
            <p className="text-sm text-red-700 mb-3">
              حذف حسابك نهائياً مع جميع البيانات المرتبطة به
            </p>
            <Button variant="destructive" size="sm">
              حذف الحساب
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
