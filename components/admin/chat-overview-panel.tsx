"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockActiveChats,
  type ActiveChat,
} from "@/lib/static-data/admin-mock-data";
import { MessageCircle, Users, Clock, AlertTriangle, Eye } from "lucide-react";

export function ChatOverviewPanel() {
  const [chats, setChats] = useState<ActiveChat[]>(mockActiveChats);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedChat, setSelectedChat] = useState<ActiveChat | null>(null);

  const filteredChats =
    selectedStatus === "all"
      ? chats
      : chats.filter((chat) => chat.status === selectedStatus);

  const getStatusBadge = (status: ActiveChat["status"]) => {
    const statusConfig = {
      active: {
        label: "نشط",
        variant: "default" as const,
        icon: MessageCircle,
      },
      expired: { label: "منتهي", variant: "secondary" as const, icon: Clock },
      reported: {
        label: "مبلغ عنه",
        variant: "error" as const,
        icon: AlertTriangle,
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

  const getTimeRemaining = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "منتهي";
    if (diffDays === 0) return "ينتهي اليوم";
    if (diffDays === 1) return "ينتهي غداً";
    return `${diffDays} أيام متبقية`;
  };

  const getCounts = () => {
    return {
      all: chats.length,
      active: chats.filter((c) => c.status === "active").length,
      expired: chats.filter((c) => c.status === "expired").length,
      reported: chats.filter((c) => c.status === "reported").length,
      expiringToday: chats.filter((c) => {
        const today = new Date().toISOString().split("T")[0];
        return c.expiryDate && c.expiryDate === today;
      }).length,
    };
  };

  const counts = getCounts();

  const handleChatAction = (
    chatId: string,
    action: "suspend" | "extend" | "close",
  ) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? ({
              ...chat,
              status: action === "close" ? "expired" : chat.status,
              // Extend expiry by 7 days if extending
              expiryDate:
                action === "extend"
                  ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  : chat.expiryDate || new Date().toISOString().split("T")[0],
            } as ActiveChat)
          : chat,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with statistics */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            المحادثات النشطة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-primary-subtle rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {counts.active}
              </div>
              <div className="text-sm text-primary">محادثات نشطة</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {counts.expiringToday}
              </div>
              <div className="text-sm text-orange-600">تنتهي اليوم</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {counts.reported}
              </div>
              <div className="text-sm text-red-600">مبلغ عنها</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {counts.expired}
              </div>
              <div className="text-sm text-gray-600">منتهية</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedStatus === "all" ? "primary" : "outline"}
              onClick={() => setSelectedStatus("all")}
              size="sm"
            >
              جميع المحادثات ({counts.all})
            </Button>
            <Button
              variant={selectedStatus === "active" ? "primary" : "outline"}
              onClick={() => setSelectedStatus("active")}
              size="sm"
            >
              نشطة ({counts.active})
            </Button>
            <Button
              variant={selectedStatus === "reported" ? "primary" : "outline"}
              onClick={() => setSelectedStatus("reported")}
              size="sm"
            >
              مبلغ عنها ({counts.reported})
            </Button>
            <Button
              variant={selectedStatus === "expired" ? "primary" : "outline"}
              onClick={() => setSelectedStatus("expired")}
              size="sm"
            >
              منتهية ({counts.expired})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chats Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المشاركان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عدد الرسائل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر رسالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوقت المتبقي
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChats.map((chat) => (
                  <tr key={chat.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {chat.participants[0]?.name || "غير محدد"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {chat.participants[0]?.age || 0} سنة
                          </div>
                        </div>
                        <div className="text-gray-400">←</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {chat.participants[1]?.name || "غير محدد"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {chat.participants[1]?.age || 0} سنة
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(chat.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {chat.messageCount} رسالة
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {chat.lastMessageDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div
                        className={`${
                          getTimeRemaining(chat.expiryDate).includes("منتهي")
                            ? "text-red-600"
                            : getTimeRemaining(chat.expiryDate).includes(
                                  "اليوم",
                                )
                              ? "text-orange-600"
                              : "text-gray-600"
                        }`}
                      >
                        {getTimeRemaining(chat.expiryDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedChat(chat)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {chat.status === "active" && (
                          <>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                handleChatAction(chat.id, "extend")
                              }
                              title="تمديد المحادثة"
                            >
                              +7
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleChatAction(chat.id, "close")}
                              title="إنهاء المحادثة"
                            >
                              إنهاء
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

      {/* Chat Details Modal */}
      {selectedChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <h3 className="text-lg font-semibold">تفاصيل المحادثة</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedChat(null)}
                className="absolute left-4 top-4"
              >
                إغلاق
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">المشارك الأول</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>الاسم:</strong>{" "}
                      {selectedChat.participants[0]?.name || "غير محدد"}
                    </div>
                    <div>
                      <strong>العمر:</strong>{" "}
                      {selectedChat.participants[0]?.age || 0} سنة
                    </div>
                    <div>
                      <strong>الجنس:</strong>{" "}
                      {selectedChat.participants[0]?.gender === "male"
                        ? "ذكر"
                        : "أنثى"}
                    </div>
                    <div>
                      <strong>المعرف:</strong>{" "}
                      {selectedChat.participants[0]?.id || "غير محدد"}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">المشارك الثاني</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>الاسم:</strong>{" "}
                      {selectedChat.participants[1]?.name || "غير محدد"}
                    </div>
                    <div>
                      <strong>العمر:</strong>{" "}
                      {selectedChat.participants[1]?.age || 0} سنة
                    </div>
                    <div>
                      <strong>الجنس:</strong>{" "}
                      {selectedChat.participants[1]?.gender === "male"
                        ? "ذكر"
                        : "أنثى"}
                    </div>
                    <div>
                      <strong>المعرف:</strong>{" "}
                      {selectedChat.participants[1]?.id || "غير محدد"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">معلومات المحادثة</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    <strong>تاريخ البداية:</strong> {selectedChat.startDate}
                  </div>
                  <div>
                    <strong>آخر رسالة:</strong> {selectedChat.lastMessageDate}
                  </div>
                  <div>
                    <strong>عدد الرسائل:</strong> {selectedChat.messageCount}{" "}
                    رسالة
                  </div>
                  <div>
                    <strong>تاريخ الانتهاء:</strong>{" "}
                    {selectedChat.expiryDate || "غير محدد"}
                  </div>
                  <div>
                    <strong>الوقت المتبقي:</strong>
                    <span
                      className={`font-medium ${
                        selectedChat.expiryDate &&
                        getTimeRemaining(selectedChat.expiryDate).includes(
                          "منتهي",
                        )
                          ? "text-red-600"
                          : selectedChat.expiryDate &&
                              getTimeRemaining(
                                selectedChat.expiryDate,
                              ).includes("اليوم")
                            ? "text-orange-600"
                            : "text-green-600"
                      }`}
                    >
                      {" " +
                        (selectedChat.expiryDate
                          ? getTimeRemaining(selectedChat.expiryDate)
                          : "غير محدد")}
                    </span>
                  </div>
                  <div>
                    <strong>الحالة:</strong>{" "}
                    {getStatusBadge(selectedChat.status)}
                  </div>
                  <div>
                    <strong>معرف طلب الزواج:</strong> {selectedChat.requestId}
                  </div>
                </div>
              </div>

              {selectedChat.status === "active" && (
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleChatAction(selectedChat.id, "extend");
                      setSelectedChat({
                        ...selectedChat,
                        expiryDate: new Date(
                          Date.now() + 7 * 24 * 60 * 60 * 1000,
                        )
                          .toISOString()
                          .split("T")[0],
                      } as ActiveChat);
                    }}
                    className="flex-1"
                  >
                    <Clock className="h-4 w-4 ml-1" />
                    تمديد 7 أيام
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleChatAction(selectedChat.id, "close");
                      setSelectedChat(null);
                    }}
                    className="flex-1"
                  >
                    <AlertTriangle className="h-4 w-4 ml-1" />
                    إنهاء المحادثة
                  </Button>
                </div>
              )}

              {selectedChat.status === "reported" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <div className="mr-3">
                      <h3 className="text-sm font-medium text-red-800">
                        محادثة مبلغ عنها
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          هذه المحادثة تم الإبلاغ عنها وتحتاج إلى مراجعة فورية
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
