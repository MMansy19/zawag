"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, User } from "lucide-react";

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
  currentImage?: string | null;
  className?: string;
}

export function ImageUploader({
  onImageSelect,
  currentImage,
  className = "",
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <CardContent className="p-6">
          {previewUrl ? (
            // Image Preview
            <div className="relative">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover rounded-full border-4 border-gray-200"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUploadClick}
                  className="mt-2"
                >
                  تغيير الصورة
                </Button>
              </div>
            </div>
          ) : (
            // Upload Area
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                رفع صورة شخصية
              </h3>
              <Button
                type="button"
                onClick={handleUploadClick}
                className="flex items-center gap-2 mx-auto my-2"
              >
                <Upload className="h-4 w-4" />
                اختيار صورة
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, أو WebP (حد أقصى 5MB)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
