"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/lib/types";

interface ProfileCardProps {
  profile: Profile;
  onSendRequest?: (profileId: string, message: string) => Promise<void>;
}

export function ProfileCard({ profile, onSendRequest }: ProfileCardProps) {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [message, setMessage] = useState("");

  const calculateAge = (age: number) => {
    return age;
  };

  const handleSendRequest = async () => {
    if (onSendRequest && message.trim()) {
      await onSendRequest(profile.id, message);
      setShowRequestModal(false);
      setMessage("");
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {profile.name}
              </h3>{" "}
              <p className="text-sm text-gray-600 mb-2">{profile.age} سنة</p>
            </div>

            {/* Profile Status Badge */}
            <Badge variant={profile.isVerified ? "success" : "secondary"}>
              {profile.isVerified ? "موثق" : "غير موثق"}
            </Badge>
          </div>

          {/* Location */}
          <div className="mb-3">
            <p className="text-sm text-gray-700">
              📍 {profile.city}, {profile.country}
            </p>
          </div>

          {/* Education & Work */}
          <div className="space-y-2 mb-4">
            {profile.education && (
              <p className="text-sm text-gray-600">🎓 {profile.education}</p>
            )}
            {profile.occupation && (
              <p className="text-sm text-gray-600">💼 {profile.occupation}</p>
            )}
          </div>

          {/* Religious Info */}
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.prays && (
              <Badge variant="outline" className="text-xs">
                يصلي
              </Badge>
            )}
            {profile.fasts && (
              <Badge variant="outline" className="text-xs">
                يصوم
              </Badge>
            )}
            {(profile.hijab || profile.hasHijab) && (
              <Badge variant="outline" className="text-xs">
                محجبة
              </Badge>
            )}
            {(profile.beard || profile.hasBeard) && (
              <Badge variant="outline" className="text-xs">
                ملتح
              </Badge>
            )}{" "}
            {/* {profile.religiousLevel && (
              <Badge variant="outline" className="text-xs">
                {profile.religiousLevel === "practicing"
                  ? "ملتزم"
                  : profile.religiousLevel === "moderate"
                    ? "متوسط"
                    : profile.religiousLevel === "very-religious"
                      ? "ملتزم جداً"
                      : "أساسي"}
              </Badge>
            )} */}
          </div>

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

          {/* Marital Status */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              الحالة الزوجية: {profile.maritalStatus}
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => setShowRequestModal(true)}
            className="w-full"
            size="sm"
          >
            إرسال طلب زواج
          </Button>
        </CardContent>
      </Card>{" "}
      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-center mb-4">
                إرسال طلب زواج
              </h2>
              <p className="text-center text-gray-600 mb-4">
                إلى: {profile.name}
              </p>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-border rounded-md p-3 text-sm min-h-[120px] resize-none mb-4"
                placeholder="اكتب رسالة مختصرة للتعريف بنفسك..."
                maxLength={500}
              />

              <div className="flex justify-between gap-3">
                <Button
                  onClick={() => setShowRequestModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleSendRequest}
                  className="flex-1"
                  disabled={!message.trim()}
                >
                  إرسال الطلب
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
