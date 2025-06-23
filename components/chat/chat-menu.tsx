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
      {/* Mobile-first backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        {/* Mobile: Bottom sheet, Desktop: Center modal */}
        <Card
          className="w-full sm:w-full sm:max-w-md rounded-t-xl sm:rounded-xl mx-0 sm:mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <h3 className="text-base sm:text-lg font-semibold">
              خيارات المحادثة
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 pb-6">
            <Button
              variant="outline"
              className="w-full justify-start text-sm sm:text-base py-3 sm:py-2"
              onClick={handleExtendChat}
            >
              <Clock className="h-4 w-4 ml-2" />
              تمديد مدة المحادثة
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-sm sm:text-base py-3 sm:py-2"
              onClick={handleReport}
            >
              <Flag className="h-4 w-4 ml-2" />
              إبلاغ عن مشكلة
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 text-sm sm:text-base py-3 sm:py-2"
              onClick={handleEndChat}
            >
              <Shield className="h-4 w-4 ml-2" />
              إنهاء المحادثة
            </Button>

            {/* Mobile: Add cancel button */}
            <Button
              variant="ghost"
              className="w-full sm:hidden mt-4 py-3"
              onClick={onClose}
            >
              إلغاء
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Report Dialog */}
      {showReportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-end sm:items-center justify-center">
          <Card className="w-full sm:w-full sm:max-w-md rounded-t-xl sm:rounded-xl mx-0 sm:mx-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold">
                  إبلاغ عن مشكلة
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReportDialog(false)}
                  className="p-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  نوع المشكلة
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">اختر نوع المشكلة</option>
                  <option value="inappropriate">محتوى غير لائق</option>
                  <option value="spam">رسائل مزعجة</option>
                  <option value="harassment">تحرش</option>
                  <option value="fake">حساب مزيف</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  تفاصيل المشكلة
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                  placeholder="اكتب وصفاً مفصلاً للمشكلة..."
                  maxLength={500}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <Button
                  onClick={() => {
                    setShowReportDialog(false);
                    alert("تم إرسال البلاغ بنجاح");
                  }}
                  className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white py-3 sm:py-2"
                >
                  إرسال البلاغ
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReportDialog(false)}
                  className="w-full sm:flex-1 py-3 sm:py-2"
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
