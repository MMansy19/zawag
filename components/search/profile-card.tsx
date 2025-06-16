"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, MapPin, Calendar, User, Shield, Lock } from "lucide-react";
import {
  Profile,
  MaleProfile,
  FemaleProfile,
  isMaleProfile,
  isFemaleProfile,
} from "@/lib/types/auth.types";
import { useProfilePrivacyCheck } from "@/providers/profile-privacy-provider";

interface ProfileCardProps {
  profile: Profile;
  onSendRequest?: (profileId: string, message: string) => Promise<void>;
  currentUserGender?: "male" | "female";
}

export function ProfileCard({
  profile,
  onSendRequest,
  currentUserGender,
}: ProfileCardProps) {
  const router = useRouter();
  const privacyCheck = useProfilePrivacyCheck(profile);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSendRequest = async () => {
    if (onSendRequest && message.trim()) {
      setSubmitting(true);
      try {
        await onSendRequest(profile.id, message);
        setShowRequestModal(false);
        setMessage("");
      } catch (error) {
        console.error("Error sending request:", error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleViewProfile = () => {
    router.push(`/profile/${profile.id}`);
  };

  const getReligiousLevelLabel = (level: string) => {
    switch (level) {
      case "basic":
        return "أساسي";
      case "practicing":
        return "ممارس";
      case "very-religious":
        return "متدين جداً";
      default:
        return level;
    }
  };

  const getMaritalStatusLabel = (status: string) => {
    switch (status) {
      case "single":
        return "أعزب";
      case "divorced":
        return "مطلق";
      case "widowed":
        return "أرمل";
      default:
        return status;
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary-500">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {profile.name}
                </h3>
                {profile.status === "approved" && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    ✓ موثق
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {profile.age} سنة
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.city}, {profile.country}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline">
                  {getMaritalStatusLabel(profile.maritalStatus)}
                </Badge>
                <Badge variant="secondary">
                  {getReligiousLevelLabel(profile.religiousLevel)}
                </Badge>
                {profile.education && (
                  <Badge variant="outline" className="text-xs">
                    {profile.education}
                  </Badge>
                )}
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Key Information */}
          <div className="space-y-3 mb-4">
            {/* Physical Info */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">الطول والوزن:</span>
              <span className="font-medium">
                {profile.height} سم, {profile.weight} كجم
              </span>
            </div>

            {/* Prayer Regularity */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">انتظام الصلاة:</span>
              <Badge
                variant={profile.isPrayerRegular ? "success" : "secondary"}
                className="text-xs"
              >
                {profile.isPrayerRegular ? "منتظم" : "أحياناً"}
              </Badge>
            </div>

            {/* Children Preference */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">رغبة في الأطفال:</span>
              <span className="font-medium">
                {profile.wantsChildren === "yes"
                  ? "نعم"
                  : profile.wantsChildren === "no"
                    ? "لا"
                    : "ربما"}
              </span>
            </div>

            {/* Gender-specific Information */}
            {isMaleProfile(profile) && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">اللحية:</span>
                    <span className="font-medium">
                      {profile.hasBeard ? "نعم" : "لا"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">التدخين:</span>
                    <Badge
                      variant={profile.smokes ? "error" : "success"}
                      className="text-xs"
                    >
                      {profile.smokes ? "نعم" : "لا"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الوضع المادي:</span>
                    <Badge className="text-xs">
                      {profile.financialSituation === "excellent"
                        ? "ممتاز"
                        : profile.financialSituation === "good"
                          ? "جيد"
                          : profile.financialSituation === "average"
                            ? "متوسط"
                            : "صعب"}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {isFemaleProfile(profile) && (
              <div className="bg-pink-50 p-3 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الحجاب:</span>
                    <span className="font-medium">
                      {profile.wearHijab ? "نعم" : "لا"}
                    </span>
                  </div>
                  {profile.wearNiqab && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">النقاب:</span>
                      <span className="font-medium">نعم</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">نوع اللبس:</span>
                    <span className="font-medium">
                      {profile.clothingStyle === "conservative"
                        ? "محافظ"
                        : profile.clothingStyle === "modest"
                          ? "محتشم"
                          : "تقليدي"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">الاهتمامات:</p>
              <div className="flex flex-wrap gap-1">
                {profile.interests.slice(0, 3).map((interest, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {profile.interests.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{profile.interests.length - 3} أخرى
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Bio Preview */}
          {profile.bio && (
            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-2">
                {profile.bio.length > 100
                  ? `${profile.bio.substring(0, 100)}...`
                  : profile.bio}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleViewProfile}
              disabled={!privacyCheck.canView}
            >
              <Eye className="h-4 w-4 ml-2" />
              {privacyCheck.canView ? "عرض الملف" : "محجوب"}
            </Button>
            <Button
              className="flex-1"
              onClick={() => setShowRequestModal(true)}
              disabled={!privacyCheck.canContact}
            >
              {privacyCheck.canContact ? (
                <>
                  <Heart className="h-4 w-4 ml-2" />
                  إرسال طلب
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 ml-2" />
                  غير متاح
                </>
              )}
            </Button>
          </div>

          {/* Privacy Level Indicator */}
          {privacyCheck.isFemaleProfile && privacyCheck.hasEnhancedPrivacy && (
            <div className="flex items-center justify-center gap-1 pt-2">
              <Shield className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">محمي بموافقة الولي</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">إرسال طلب تعارف</h3>
            <p className="text-gray-600 mb-4">إلى: {profile.name}</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالة تعريفية مختصرة..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mb-4">
              {message.length}/500 حرف
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleSendRequest}
                disabled={!message.trim() || submitting}
                className="flex-1"
              >
                {submitting ? "جاري الإرسال..." : "إرسال الطلب"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRequestModal(false);
                  setMessage("");
                }}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
