import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, User } from "lucide-react";

// Note: This component is only shown for male users
// Female users skip this step for Islamic modesty requirements
const StepPhoto = ({
  data,
  clearError,
  profilePicture,
  setProfilePicture,
}: {
  data: any;
  clearError: () => void;
  profilePicture: File | null;
  setProfilePicture: (file: File | null) => void;
}) => {
  // Additional safeguard: This component should not render for female users
  if (data.gender === "f") {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">هذه الخطوة مخصصة للمستخدمين للإخوة فقط</p>
      </div>
    );
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return;
      }

      setProfilePicture(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePicture(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          إضافة صورة شخصية
        </h2>
        <p className="text-gray-600">أضف صورة شخصية لملفك الشخصي (اختيارية)</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Photo Preview */}
            <div className="relative">
              {profilePicture ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                    onClick={handleRemovePhoto}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="space-y-2">
              <Label htmlFor="profile-photo" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 bg-primary text-white bg-primary px-4 py-2 rounded-md transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>{profilePicture ? "تغيير الصورة" : "اختيار صورة"}</span>
                </div>
              </Label>
              <Input
                id="profile-photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Guidelines */}
            <div className="text-sm text-gray-600 text-center space-y-1">
              <p>• الحد الأقصى: 5 ميجابايت</p>
              <p>• الصيغ المدعومة: JPG, PNG, GIF</p>
              <p>• يُفضل صورة واضحة للوجه</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepPhoto;
