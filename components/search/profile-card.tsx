"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/lib/types";
import { RequestModal } from "./request-modal";

interface ProfileCardProps {
  profile: Profile;
  onSendRequest?: (profileId: string, message: string) => Promise<void>;
}

export function ProfileCard({ profile, onSendRequest }: ProfileCardProps) {
  const [showRequestModal, setShowRequestModal] = useState(false);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleSendRequest = async (message: string) => {
    if (onSendRequest) {
      await onSendRequest(profile.id, message);
      setShowRequestModal(false);
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
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {calculateAge(profile.birthDate)} سنة
              </p>
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
              <p className="text-sm text-gray-600">
                🎓 {profile.education}
              </p>
            )}
            {profile.occupation && (
              <p className="text-sm text-gray-600">
                💼 {profile.occupation}
              </p>
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
            {profile.hijab && (
              <Badge variant="outline" className="text-xs">
                محجبة
              </Badge>
            )}
            {profile.beard && (
              <Badge variant="outline" className="text-xs">
                ملتح
              </Badge>
            )}
            {profile.religiousLevel && (
              <Badge variant="outline" className="text-xs">
                {profile.religiousLevel === "practicing" ? "ملتزم" : 
                 profile.religiousLevel === "moderate" ? "متوسط" : "يتعلم"}
              </Badge>
            )}
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
      </Card>

      {/* Request Modal */}
      {showRequestModal && (
        <RequestModal
          profileName={profile.name}
          onSend={handleSendRequest}
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </>
  );
}
