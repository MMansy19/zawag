"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockFlaggedMessages,
  type FlaggedMessage,
} from "@/lib/static-data/admin-mock-data";
import { AlertTriangle, CheckCircle, XCircle, Eye, Clock } from "lucide-react";

export function FlaggedList() {
  const [flaggedMessages, setFlaggedMessages] =
    useState<FlaggedMessage[]>(mockFlaggedMessages);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<FlaggedMessage | null>(
    null,
  );

  const filteredMessages = flaggedMessages.filter((message) => {
    const severityMatch =
      selectedSeverity === "all" || message.severity === selectedSeverity;
    const statusMatch =
      selectedStatus === "all" || message.status === selectedStatus;
    return severityMatch && statusMatch;
  });

  const getSeverityBadge = (severity: FlaggedMessage["severity"]) => {
    const severityConfig = {
      low: {
        label: "منخفض",
        variant: "secondary" as const,
        className: "bg-blue-100 text-blue-800",
      },
      medium: {
        label: "متوسط",
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800",
      },
      high: {
        label: "عالي",
        variant: "error" as const,
        className: "bg-red-100 text-red-800",
      },
    };

    const config = severityConfig[severity];

    return (
      <Badge variant={config.variant} className={config.className}>
        <AlertTriangle className="h-3 w-3 ml-1" />
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: FlaggedMessage["status"]) => {
    const statusConfig = {
      pending: {
        label: "في الانتظار",
        variant: "secondary" as const,
        icon: Clock,
      },
      approved: {
        label: "تمت الموافقة",
        variant: "success" as const,
        icon: CheckCircle,
      },
      rejected: {
        label: "مرفوض",
        variant: "error" as const,
        icon: XCircle,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const handleMessageAction = (
    messageId: string,
    action: "approved" | "rejected",
    adminAction: string,
  ) => {
    setFlaggedMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? ({
              ...msg,
              status: action,
              adminAction,
              reviewedBy: "المشرف الحالي",
              reviewDate: new Date().toISOString().split("T")[0],
            } as FlaggedMessage)
          : msg,
      ),
    );
  };

  const getCounts = () => {
    return {
      all: flaggedMessages.length,
      pending: flaggedMessages.filter((m) => m.status === "pending").length,
      approved: flaggedMessages.filter((m) => m.status === "approved").length,
      rejected: flaggedMessages.filter((m) => m.status === "rejected").length,
      high: flaggedMessages.filter((m) => m.severity === "high").length,
      medium: flaggedMessages.filter((m) => m.severity === "medium").length,
      low: flaggedMessages.filter((m) => m.severity === "low").length,
    };
  };

  const counts = getCounts();

  return (
    <div className="space-y-6">
      {/* Header with statistics */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            الرسائل المبلغ عنها
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {counts.pending}
              </div>
              <div className="text-sm text-red-600">تحتاج مراجعة</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {counts.high}
              </div>
              <div className="text-sm text-orange-600">خطورة عالية</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {counts.approved}
              </div>
              <div className="text-sm text-green-600">تمت الموافقة</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {counts.rejected}
              </div>
              <div className="text-sm text-gray-600">مرفوضة</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                فلترة حسب الحالة:
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedStatus === "all" ? "primary" : "outline"}
                  onClick={() => setSelectedStatus("all")}
                  size="sm"
                >
                  الكل ({counts.all})
                </Button>
                <Button
                  variant={selectedStatus === "pending" ? "primary" : "outline"}
                  onClick={() => setSelectedStatus("pending")}
                  size="sm"
                >
                  في الانتظار ({counts.pending})
                </Button>
                <Button
                  variant={
                    selectedStatus === "approved" ? "primary" : "outline"
                  }
                  onClick={() => setSelectedStatus("approved")}
                  size="sm"
                >
                  موافق عليها ({counts.approved})
                </Button>
                <Button
                  variant={
                    selectedStatus === "rejected" ? "primary" : "outline"
                  }
                  onClick={() => setSelectedStatus("rejected")}
                  size="sm"
                >
                  مرفوضة ({counts.rejected})
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                فلترة حسب الخطورة:
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSeverity === "all" ? "primary" : "outline"}
                  onClick={() => setSelectedSeverity("all")}
                  size="sm"
                >
                  جميع المستويات
                </Button>
                <Button
                  variant={selectedSeverity === "high" ? "primary" : "outline"}
                  onClick={() => setSelectedSeverity("high")}
                  size="sm"
                >
                  عالي ({counts.high})
                </Button>
                <Button
                  variant={
                    selectedSeverity === "medium" ? "primary" : "outline"
                  }
                  onClick={() => setSelectedSeverity("medium")}
                  size="sm"
                >
                  متوسط ({counts.medium})
                </Button>
                <Button
                  variant={selectedSeverity === "low" ? "primary" : "outline"}
                  onClick={() => setSelectedSeverity("low")}
                  size="sm"
                >
                  منخفض ({counts.low})
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المرسل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستقبل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الرسالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الخطورة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {message.senderName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {message.senderId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {message.receiverName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {message.receiverId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {message.message}
                      </div>
                      <div className="text-xs text-red-500 mt-1">
                        كلمات مبلغ عنها: {message.flaggedWords.join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getSeverityBadge(message.severity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(message.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleDateString("ar-SA")}
                      <div className="text-xs">
                        {new Date(message.timestamp).toLocaleTimeString(
                          "ar-SA",
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMessage(message)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {message.status === "pending" && (
                          <>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() =>
                                handleMessageAction(
                                  message.id,
                                  "approved",
                                  "تمت الموافقة على الرسالة",
                                )
                              }
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                handleMessageAction(
                                  message.id,
                                  "rejected",
                                  "تم رفض الرسالة",
                                )
                              }
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <h3 className="text-lg font-semibold">
                تفاصيل الرسالة المبلغ عنها
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedMessage(null)}
                className="absolute left-4 top-4"
              >
                إغلاق
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">المرسل</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>الاسم:</strong> {selectedMessage.senderName}
                    </div>
                    <div>
                      <strong>المعرف:</strong> {selectedMessage.senderId}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">المستقبل</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>الاسم:</strong> {selectedMessage.receiverName}
                    </div>
                    <div>
                      <strong>المعرف:</strong> {selectedMessage.receiverId}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">نص الرسالة</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm border-r-4 border-red-400">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">تفاصيل البلاغ</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    <strong>الكلمات المبلغ عنها:</strong>
                    <span className="text-red-600 font-medium">
                      {selectedMessage.flaggedWords.join(", ")}
                    </span>
                  </div>
                  <div>
                    <strong>مستوى الخطورة:</strong>{" "}
                    {getSeverityBadge(selectedMessage.severity)}
                  </div>
                  <div>
                    <strong>التاريخ والوقت:</strong>{" "}
                    {new Date(selectedMessage.timestamp).toLocaleString(
                      "ar-SA",
                    )}
                  </div>
                  <div>
                    <strong>الحالة:</strong>{" "}
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                </div>
              </div>

              {selectedMessage.reviewedBy && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">تفاصيل المراجعة</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>تمت المراجعة بواسطة:</strong>{" "}
                      {selectedMessage.reviewedBy}
                    </div>
                    <div>
                      <strong>تاريخ المراجعة:</strong>{" "}
                      {selectedMessage.reviewDate}
                    </div>
                    <div>
                      <strong>الإجراء المتخذ:</strong>{" "}
                      {selectedMessage.adminAction}
                    </div>
                  </div>
                </div>
              )}

              {selectedMessage.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleMessageAction(
                        selectedMessage.id,
                        "approved",
                        "تمت الموافقة على الرسالة بعد المراجعة",
                      );
                      setSelectedMessage(null);
                    }}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 ml-1" />
                    الموافقة على الرسالة
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleMessageAction(
                        selectedMessage.id,
                        "rejected",
                        "تم رفض الرسالة لانتهاكها قوانين المنصة",
                      );
                      setSelectedMessage(null);
                    }}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 ml-1" />
                    رفض الرسالة
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
