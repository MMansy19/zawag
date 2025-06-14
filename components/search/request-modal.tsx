"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface RequestModalProps {
  profileName: string;
  onSend: (message: string) => Promise<void>;
  onClose: () => void;
}

export function RequestModal({
  profileName,
  onSend,
  onClose,
}: RequestModalProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      await onSend(message);
    } catch (error) {
      console.error("Failed to send request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="max-w-md w-full mx-4">
        <CardHeader>
          <h2 className="text-xl font-bold text-center">إرسال طلب تعارف</h2>
          <p className="text-center text-gray-600">إلى: {profileName}</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                رسالة التعارف (اختياري)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-border rounded-md p-3 text-sm min-h-[120px] resize-none"
                placeholder="اكتب رسالة مختصرة للتعريف بنفسك..."
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">
                {message.length}/500 حرف
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-800">
                💡 نصيحة: اكتب رسالة مهذبة ومختصرة تعرف فيها بنفسك ونواياك
                الجدية
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleSend}
            className="flex-1"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? "جاري الإرسال..." : "إرسال الطلب"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
