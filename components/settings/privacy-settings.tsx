"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Info, Shield, Eye, Users, UserCheck, Crown } from "lucide-react";
import { PrivacySettings, Profile, isFemaleProfile } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { showToast } from "@/components/ui/toaster";

interface PrivacySettingsProps {
  profile?: Profile | undefined;
  onSave?: (settings: PrivacySettings) => Promise<void>;
}

export function PrivacySettingsComponent({
  profile,
  onSave,
}: PrivacySettingsProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<PrivacySettings>({
    showProfilePicture: "everyone",
    showAge: true,
    showLocation: true,
    showOccupation: true,
    allowMessagesFrom: "everyone",
    // Enhanced privacy controls for females
    profileVisibility: "everyone",
    allowProfileViews: "everyone",
    showBasicInfo: "everyone",
    showDetailedInfo: "matches-only",
    requireGuardianApproval: false,
    allowContactRequests: "everyone",
    showOnlineStatus: true,
    showLastSeen: "everyone",
    hideFromLocalUsers: false,
    allowNearbySearch: true,
  });
  // Check if user is female to show enhanced privacy options
  const isFemale = profile ? isFemaleProfile(profile) : false;

  useEffect(() => {
    if (profile?.privacySettings) {
      setSettings(profile.privacySettings);
    }
  }, [profile]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (onSave) {
        await onSave(settings);
      }
      showToast.success("تم حفظ إعدادات الخصوصية بنجاح");
    } catch (error) {
      console.error("Error saving privacy settings:", error);
      showToast.error("خطأ في حفظ إعدادات الخصوصية");
    } finally {
      setLoading(false);
    }
  };

  const privacyLevels = [
    { value: "everyone", label: "الجميع", icon: Users, color: "bg-primary" },
    {
      value: "verified-only",
      label: "الأعضاء المتحققين فقط",
      icon: UserCheck,
      color: "bg-green-500",
    },
    {
      value: "premium-only",
      label: "الأعضاء المميزين فقط",
      icon: Crown,
      color: "bg-purple-500",
    },
    {
      value: "guardian-approved",
      label: "بموافقة الولي",
      icon: Shield,
      color: "bg-orange-500",
    },
    {
      value: "matches-only",
      label: "المتطابقين فقط",
      icon: Eye,
      color: "bg-red-500",
    },
    { value: "none", label: "لا أحد", icon: Shield, color: "bg-gray-500" },
  ];

  const getPrivacyIcon = (value: string) => {
    const level = privacyLevels.find((l) => l.value === value);
    return level ? level.icon : Users;
  };

  const getPrivacyColor = (value: string) => {
    const level = privacyLevels.find((l) => l.value === value);
    return level ? level.color : "bg-primary";
  };

  const getPrivacyLabel = (value: string) => {
    const level = privacyLevels.find((l) => l.value === value);
    return level ? level.label : value;
  };

  return (
    <div className="space-y-6">
      {/* Profile Visibility Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">مرئية الملف الشخصي</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            تحكمي في من يمكنه رؤية ملفك الشخصي والوصول إلى معلوماتك
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Profile Picture Settings */}
          <div className="space-y-3">
            <Label htmlFor="profile-picture" className="text-sm font-medium">
              عرض الصورة الشخصية
            </Label>
            <select
              id="profile-picture"
              value={settings.showProfilePicture}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  showProfilePicture: e.target.value as any,
                }))
              }
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="everyone">للجميع</option>
              <option value="matches-only">للمتطابقين فقط</option>
              <option value="none">مخفية</option>
            </select>
          </div>

          {isFemale && (
            <>
              {/* Enhanced Profile Visibility for Females */}
              <div className="space-y-3">
                <Label
                  htmlFor="profile-visibility"
                  className="text-sm font-medium"
                >
                  من يمكنه رؤية ملفي الشخصي؟
                </Label>
                <select
                  id="profile-visibility"
                  value={settings.profileVisibility || "everyone"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profileVisibility: e.target.value as any,
                    }))
                  }
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {privacyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3 w-3" />
                  <span>
                    الإعدادات الأكثر تقييداً توفر حماية أفضل وفقاً للقيم
                    الإسلامية
                  </span>
                </div>
              </div>

              {/* Who Can View Profile Details */}
              <div className="space-y-3">
                <Label htmlFor="profile-views" className="text-sm font-medium">
                  من يمكنه عرض تفاصيل الملف؟
                </Label>
                <select
                  id="profile-views"
                  value={settings.allowProfileViews || "everyone"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      allowProfileViews: e.target.value as any,
                    }))
                  }
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="everyone">الجميع</option>
                  <option value="verified-males">الرجال المتحققين فقط</option>
                  <option value="premium-males">الرجال المميزين فقط</option>
                  <option value="guardian-approved">بموافقة الولي</option>
                  <option value="matches-only">المتطابقين فقط</option>
                </select>
              </div>
            </>
          )}

          {/* Information Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-age" className="text-sm font-medium">
                عرض العمر
              </Label>{" "}
              <Switch
                id="show-age"
                checked={settings.showAge}
                onCheckedChange={(checked: boolean) =>
                  setSettings((prev) => ({ ...prev, showAge: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-location" className="text-sm font-medium">
                عرض الموقع
              </Label>{" "}
              <Switch
                id="show-location"
                checked={settings.showLocation}
                onCheckedChange={(checked: boolean) =>
                  setSettings((prev) => ({ ...prev, showLocation: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-occupation" className="text-sm font-medium">
                عرض المهنة
              </Label>{" "}
              <Switch
                id="show-occupation"
                checked={settings.showOccupation}
                onCheckedChange={(checked: boolean) =>
                  setSettings((prev) => ({ ...prev, showOccupation: checked }))
                }
              />
            </div>

            {isFemale && (
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="show-online-status"
                  className="text-sm font-medium"
                >
                  عرض حالة الاتصال
                </Label>{" "}
                <Switch
                  id="show-online-status"
                  checked={settings.showOnlineStatus || false}
                  onCheckedChange={(checked: boolean) =>
                    setSettings((prev) => ({
                      ...prev,
                      showOnlineStatus: checked,
                    }))
                  }
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Communication & Contact Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">التواصل والاتصال</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            تحكمي في من يمكنه التواصل معك وإرسال الرسائل والطلبات
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Message Settings */}
          <div className="space-y-3">
            <Label htmlFor="allow-messages" className="text-sm font-medium">
              من يمكنه إرسال رسائل؟
            </Label>
            <select
              id="allow-messages"
              value={settings.allowMessagesFrom}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  allowMessagesFrom: e.target.value as any,
                }))
              }
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="everyone">الجميع</option>
              <option value="matches-only">المتطابقين فقط</option>
              <option value="none">لا أحد</option>
            </select>
          </div>

          {isFemale && (
            <>
              {/* Contact Requests */}
              <div className="space-y-3">
                <Label
                  htmlFor="contact-requests"
                  className="text-sm font-medium"
                >
                  من يمكنه إرسال طلبات التواصل؟
                </Label>
                <select
                  id="contact-requests"
                  value={settings.allowContactRequests || "everyone"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      allowContactRequests: e.target.value as any,
                    }))
                  }
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="everyone">الجميع</option>
                  <option value="verified-only">المتحققين فقط</option>
                  <option value="guardian-approved">بموافقة الولي</option>
                  <option value="none">لا أحد</option>
                </select>
              </div>

              {/* Guardian Approval */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="space-y-1">
                  <Label
                    htmlFor="guardian-approval"
                    className="text-sm font-medium"
                  >
                    مطالبة بموافقة الولي
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    يتطلب موافقة الولي قبل قبول طلبات التواصل
                  </p>
                </div>{" "}
                <Switch
                  id="guardian-approval"
                  checked={settings.requireGuardianApproval || false}
                  onCheckedChange={(checked: boolean) =>
                    setSettings((prev) => ({
                      ...prev,
                      requireGuardianApproval: checked,
                    }))
                  }
                />
              </div>

              {/* Last Seen Settings */}
              <div className="space-y-3">
                <Label htmlFor="last-seen" className="text-sm font-medium">
                  من يمكنه رؤية آخر ظهور؟
                </Label>
                <select
                  id="last-seen"
                  value={settings.showLastSeen || "everyone"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      showLastSeen: e.target.value as any,
                    }))
                  }
                  className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="everyone">للجميع</option>
                  <option value="matches-only">للمتطابقين فقط</option>
                  <option value="none">مخفي</option>
                </select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Geographic Privacy Settings */}
      {isFemale && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">الخصوصية الجغرافية</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              تحكمي في من يمكنه العثور عليك بناءً على الموقع الجغرافي
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="hide-local" className="text-sm font-medium">
                  إخفاء من المستخدمين المحليين
                </Label>
                <p className="text-xs text-muted-foreground">
                  منع الأشخاص في منطقتك من العثور على ملفك الشخصي
                </p>
              </div>{" "}
              <Switch
                id="hide-local"
                checked={settings.hideFromLocalUsers || false}
                onCheckedChange={(checked: boolean) =>
                  setSettings((prev) => ({
                    ...prev,
                    hideFromLocalUsers: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="nearby-search" className="text-sm font-medium">
                  السماح بالبحث القريب
                </Label>
                <p className="text-xs text-muted-foreground">
                  السماح للآخرين بالعثور عليك في البحث القريب
                </p>
              </div>{" "}
              <Switch
                id="nearby-search"
                checked={settings.allowNearbySearch !== false}
                onCheckedChange={(checked: boolean) =>
                  setSettings((prev) => ({
                    ...prev,
                    allowNearbySearch: checked,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Privacy Level Summary */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">ملخص مستوى الخصوصية</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            {(() => {
              const PrivacyIcon = getPrivacyIcon(
                settings.profileVisibility || "everyone",
              );
              return <PrivacyIcon className="h-5 w-5" />;
            })()}
            <div className="flex-1">
              <p className="font-medium">
                المستوى الحالي:{" "}
                {getPrivacyLabel(settings.profileVisibility || "everyone")}
              </p>{" "}
              <p className="text-sm text-muted-foreground">
                {settings.profileVisibility === "everyone" &&
                  "ملفك مرئي للجميع"}
                {settings.profileVisibility === "verified-only" &&
                  "ملفك مرئي للأعضاء المتحققين فقط"}
                {settings.profileVisibility === "premium-only" &&
                  "ملفك مرئي للأعضاء المميزين فقط"}
                {settings.profileVisibility === "guardian-approved" &&
                  "يتطلب موافقة الولي لرؤية ملفك"}
                {settings.profileVisibility === "matches-only" &&
                  "ملفك مرئي للمتطابقين فقط"}
                {!settings.profileVisibility && "ملفك مرئي للجميع"}
              </p>
            </div>
            <Badge
              variant="secondary"
              className={`${getPrivacyColor(settings.profileVisibility || "everyone")} text-white`}
            >
              {isFemale && settings.requireGuardianApproval ? "محمي" : "عادي"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="min-w-[120px]"
        >
          {loading ? "جارٍ الحفظ..." : "حفظ الإعدادات"}
        </Button>
      </div>
    </div>
  );
}
