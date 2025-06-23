"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  mockSystemSettings,
  type SystemSettings,
} from "@/lib/static-data/admin-mock-data";
import { Settings, Save, RotateCcw, Palette, Shield, Zap } from "lucide-react";

export function SettingsForm() {
  const [settings, setSettings] = useState<SystemSettings>(mockSystemSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "platform" | "theme" | "features" | "moderation"
  >("platform");

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to save settings
      console.log("Saving settings:", settings);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("تم حفظ الإعدادات بنجاح!");
    } catch (error) {
      alert("حدث خطأ في حفظ الإعدادات");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("هل أنت متأكد من إعادة تعيين جميع الإعدادات؟")) {
      setSettings(mockSystemSettings);
    }
  };

  const updateSettings = (
    section: keyof SystemSettings,
    key: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateNestedSettings = (
    section: keyof SystemSettings,
    nestedKey: string,
    key: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedKey]: {
          ...(prev[section] as any)[nestedKey],
          [key]: value,
        },
      },
    }));
  };

  const addBannedWord = () => {
    const word = prompt("أدخل كلمة محظورة جديدة:");
    if (word && word.trim()) {
      setSettings((prev) => ({
        ...prev,
        moderation: {
          ...prev.moderation,
          bannedWords: [...prev.moderation.bannedWords, word.trim()],
        },
      }));
    }
  };

  const removeBannedWord = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      moderation: {
        ...prev.moderation,
        bannedWords: prev.moderation.bannedWords.filter((_, i) => i !== index),
      },
    }));
  };

  const tabs = [
    { id: "platform" as const, label: "معلومات المنصة", icon: Settings },
    { id: "theme" as const, label: "المظهر", icon: Palette },
    { id: "features" as const, label: "الميزات", icon: Zap },
    { id: "moderation" as const, label: "الإشراف", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            إعدادات النظام
          </h2>
          <p className="text-gray-600 mt-2">
            إدارة إعدادات المنصة والمظهر والميزات وأدوات الإشراف
          </p>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "primary" : "outline"}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Settings Content */}
      <Card>
        <CardContent className="pt-6">
          {activeTab === "platform" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">معلومات المنصة</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="اسم المنصة"
                  value={settings.platform.name}
                  onChange={(e) =>
                    updateSettings("platform", "name", e.target.value)
                  }
                  placeholder="اسم المنصة"
                />
                <Input
                  label="بريد التواصل"
                  type="email"
                  value={settings.platform.contactEmail}
                  onChange={(e) =>
                    updateSettings("platform", "contactEmail", e.target.value)
                  }
                  placeholder="admin@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="رقم الدعم"
                  value={settings.platform.supportPhone}
                  onChange={(e) =>
                    updateSettings("platform", "supportPhone", e.target.value)
                  }
                  placeholder="+966501234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وصف المنصة
                </label>
                <textarea
                  value={settings.platform.description}
                  onChange={(e) =>
                    updateSettings("platform", "description", e.target.value)
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="وصف المنصة"
                />
              </div>
            </div>
          )}

          {activeTab === "theme" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">إعدادات المظهر</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اللون الأساسي
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.theme.primaryColor}
                      onChange={(e) =>
                        updateSettings("theme", "primaryColor", e.target.value)
                      }
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <Input
                      value={settings.theme.primaryColor}
                      onChange={(e) =>
                        updateSettings("theme", "primaryColor", e.target.value)
                      }
                      placeholder="#1E88E5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اللون الثانوي
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.theme.secondaryColor}
                      onChange={(e) =>
                        updateSettings(
                          "theme",
                          "secondaryColor",
                          e.target.value,
                        )
                      }
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <Input
                      value={settings.theme.secondaryColor}
                      onChange={(e) =>
                        updateSettings(
                          "theme",
                          "secondaryColor",
                          e.target.value,
                        )
                      }
                      placeholder="#4CAF50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    لون التمييز
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.theme.accentColor}
                      onChange={(e) =>
                        updateSettings("theme", "accentColor", e.target.value)
                      }
                      className="w-12 h-10 border border-gray-300 rounded"
                    />
                    <Input
                      value={settings.theme.accentColor}
                      onChange={(e) =>
                        updateSettings("theme", "accentColor", e.target.value)
                      }
                      placeholder="#FF9800"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="حجم الخط الصغير"
                  value={settings.theme.fontSize.small}
                  onChange={(e) =>
                    updateNestedSettings(
                      "theme",
                      "fontSize",
                      "small",
                      e.target.value,
                    )
                  }
                  placeholder="14px"
                />
                <Input
                  label="حجم الخط المتوسط"
                  value={settings.theme.fontSize.medium}
                  onChange={(e) =>
                    updateNestedSettings(
                      "theme",
                      "fontSize",
                      "medium",
                      e.target.value,
                    )
                  }
                  placeholder="16px"
                />
                <Input
                  label="حجم الخط الكبير"
                  value={settings.theme.fontSize.large}
                  onChange={(e) =>
                    updateNestedSettings(
                      "theme",
                      "fontSize",
                      "large",
                      e.target.value,
                    )
                  }
                  placeholder="18px"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  معاينة الألوان
                </h4>
                <div className="flex gap-4">
                  <div
                    className="w-16 h-16 rounded"
                    style={{ backgroundColor: settings.theme.primaryColor }}
                    title="اللون الأساسي"
                  ></div>
                  <div
                    className="w-16 h-16 rounded"
                    style={{ backgroundColor: settings.theme.secondaryColor }}
                    title="اللون الثانوي"
                  ></div>
                  <div
                    className="w-16 h-16 rounded"
                    style={{ backgroundColor: settings.theme.accentColor }}
                    title="لون التمييز"
                  ></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">إعدادات الميزات</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">السماح بالصور الشخصية</h4>
                    <p className="text-sm text-gray-500">
                      السماح للمستخدمين برفع صور شخصية
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.features.allowProfilePictures}
                      onChange={(e) =>
                        updateSettings(
                          "features",
                          "allowProfilePictures",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-subtle dark:peer-focus:ring-primary-light rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">الإشراف التلقائي</h4>
                    <p className="text-sm text-gray-500">
                      تشغيل الإشراف التلقائي على الرسائل
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.features.autoModeration}
                      onChange={(e) =>
                        updateSettings(
                          "features",
                          "autoModeration",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-subtle dark:peer-focus:ring-primary-light rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="مدة المحادثة (أيام)"
                  type="number"
                  value={settings.features.chatTimeLimit}
                  onChange={(e) =>
                    updateSettings(
                      "features",
                      "chatTimeLimit",
                      parseInt(e.target.value),
                    )
                  }
                  min="1"
                  max="30"
                />
                <Input
                  label="الحد الأقصى للطلبات يومياً"
                  type="number"
                  value={settings.features.maxRequestsPerDay}
                  onChange={(e) =>
                    updateSettings(
                      "features",
                      "maxRequestsPerDay",
                      parseInt(e.target.value),
                    )
                  }
                  min="1"
                  max="20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="الحد الأقصى للرسائل بالساعة"
                  type="number"
                  value={settings.features.maxMessagesPerHour}
                  onChange={(e) =>
                    updateSettings(
                      "features",
                      "maxMessagesPerHour",
                      parseInt(e.target.value),
                    )
                  }
                  min="1"
                  max="50"
                />
                <Input
                  label="الحد الأقصى للرسائل يومياً"
                  type="number"
                  value={settings.features.maxMessagesPerDay}
                  onChange={(e) =>
                    updateSettings(
                      "features",
                      "maxMessagesPerDay",
                      parseInt(e.target.value),
                    )
                  }
                  min="10"
                  max="200"
                />
              </div>
            </div>
          )}

          {activeTab === "moderation" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">إعدادات الإشراف</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">موافقة الإدارة المطلوبة</h4>
                    <p className="text-sm text-gray-500">
                      يتطلب موافقة الإدارة على الملفات الجديدة
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.moderation.requireAdminApproval}
                      onChange={(e) =>
                        updateSettings(
                          "moderation",
                          "requireAdminApproval",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-subtle dark:peer-focus:ring-primary-light rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">
                      الإبلاغ التلقائي عن الكلمات الحساسة
                    </h4>
                    <p className="text-sm text-gray-500">
                      الإبلاغ تلقائياً عن الرسائل التي تحتوي على كلمات محظورة
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.moderation.autoFlagSensitiveWords}
                      onChange={(e) =>
                        updateSettings(
                          "moderation",
                          "autoFlagSensitiveWords",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-subtle dark:peer-focus:ring-primary-light rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="عتبة التحذير"
                  type="number"
                  value={settings.moderation.warningThreshold}
                  onChange={(e) =>
                    updateSettings(
                      "moderation",
                      "warningThreshold",
                      parseInt(e.target.value),
                    )
                  }
                  min="1"
                  max="10"
                  helperText="عدد المخالفات قبل التحذير"
                />
                <Input
                  label="عتبة الإيقاف"
                  type="number"
                  value={settings.moderation.suspensionThreshold}
                  onChange={(e) =>
                    updateSettings(
                      "moderation",
                      "suspensionThreshold",
                      parseInt(e.target.value),
                    )
                  }
                  min="2"
                  max="20"
                  helperText="عدد المخالفات قبل الإيقاف"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">الكلمات المحظورة</h4>
                  <Button variant="outline" size="sm" onClick={addBannedWord}>
                    إضافة كلمة
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {settings.moderation.bannedWords.map((word, index) => (
                    <Badge
                      key={index}
                      variant="error"
                      className="cursor-pointer"
                      onClick={() => removeBannedWord(index)}
                    >
                      {word} ×
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  انقر على الكلمة لحذفها
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              إعادة تعيين
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "جاري الحفظ..." : "حفظ الإعدادات"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
