"use client";

import { useState } from "react";
import { X, Flag, Shield, Clock, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface ChatMenuProps {
  isOpen: boolean;
  onClose: () => void;
  chatRoomId: string;
  otherUserName: string;
}

export function ChatMenu({
  isOpen,
  onClose,
  chatRoomId,
  otherUserName,
}: ChatMenuProps) {
  const [showReportDialog, setShowReportDialog] = useState(false);

  if (!isOpen) return null;

  const handleReport = () => {
    setShowReportDialog(true);
  };

  const handleEndChat = () => {
    // Implementation for ending chat
    alert("سيتم إنهاء المحادثة");
  };

  const handleExtendChat = () => {
    // Implementation for extending chat duration
    alert("سيتم تمديد مدة المحادثة");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">خيارات المحادثة</h3>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleExtendChat}
              >
                <Clock className="h-4 w-4 ml-2" />
                تمديد مدة المحادثة
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleReport}
              >
                <Flag className="h-4 w-4 ml-2" />
                إبلاغ عن مشكلة
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700"
                onClick={handleEndChat}
              >
                <Shield className="h-4 w-4 ml-2" />
                إنهاء المحادثة
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Report Dialog */}
      {showReportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h3 className="text-lg font-semibold">إبلاغ عن مشكلة</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  نوع المشكلة
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>محتوى غير مناسب</option>
                  <option>تحرش</option>
                  <option>محاولة احتيال</option>
                  <option>أخرى</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  التفاصيل
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[80px]"
                  placeholder="اشرح المشكلة بالتفصيل..."
                />
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setShowReportDialog(false);
                    alert("تم إرسال البلاغ بنجاح");
                  }}
                >
                  إرسال البلاغ
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowReportDialog(false)}
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
