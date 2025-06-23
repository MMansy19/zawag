"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockMarriageRequests,
  type MarriageRequest,
} from "@/lib/static-data/admin-mock-data";
import { Eye, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";

export function RequestsTable() {
  const [requests, setRequests] =
    useState<MarriageRequest[]>(mockMarriageRequests);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] =
    useState<MarriageRequest | null>(null);

  const filteredRequests =
    selectedStatus === "all"
      ? requests
      : requests.filter((request) => request.status === selectedStatus);

  const getStatusBadge = (status: MarriageRequest["status"]) => {
    const statusConfig = {
      pending: {
        label: "في الانتظار",
        variant: "secondary" as const,
        icon: Clock,
      },
      accepted: {
        label: "مقبول",
        variant: "success" as const,
        icon: CheckCircle,
      },
      rejected: {
        label: "مرفوض",
        variant: "error" as const,
        icon: XCircle,
      },
      expired: {
        label: "منتهي الصلاحية",
        variant: "outline" as const,
        icon: Clock,
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

  const handleStatusUpdate = (
    requestId: string,
    newStatus: MarriageRequest["status"],
  ) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? ({
              ...req,
              status: newStatus,
              responseDate:
                newStatus !== "pending"
                  ? new Date().toISOString().split("T")[0]
                  : req.responseDate,
            } as MarriageRequest)
          : req,
      ),
    );
  };

  const getStatusCounts = () => {
    return {
      all: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      accepted: requests.filter((r) => r.status === "accepted").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
      expired: requests.filter((r) => r.status === "expired").length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header with statistics */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            إدارة طلبات الزواج
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <div className="text-center p-3 bg-primary-subtle rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {statusCounts.all}
              </div>
              <div className="text-sm text-primary">إجمالي الطلبات</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {statusCounts.pending}
              </div>
              <div className="text-sm text-yellow-600">في الانتظار</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {statusCounts.accepted}
              </div>
              <div className="text-sm text-green-600">مقبولة</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {statusCounts.rejected}
              </div>
              <div className="text-sm text-red-600">مرفوضة</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {statusCounts.expired}
              </div>
              <div className="text-sm text-gray-600">منتهية الصلاحية</div>
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
              جميع الطلبات ({statusCounts.all})
            </Button>
            <Button
              variant={selectedStatus === "pending" ? "primary" : "outline"}
              onClick={() => setSelectedStatus("pending")}
              size="sm"
            >
              في الانتظار ({statusCounts.pending})
            </Button>
            <Button
              variant={selectedStatus === "accepted" ? "primary" : "outline"}
              onClick={() => setSelectedStatus("accepted")}
              size="sm"
            >
              مقبولة ({statusCounts.accepted})
            </Button>
            <Button
              variant={selectedStatus === "rejected" ? "primary" : "outline"}
              onClick={() => setSelectedStatus("rejected")}
              size="sm"
            >
              مرفوضة ({statusCounts.rejected})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
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
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الإرسال
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.senderName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.senderAge} سنة - {request.senderCountry}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.receiverName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.receiverAge} سنة - {request.receiverCountry}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.sentDate}
                      {request.responseDate && (
                        <div className="text-xs text-gray-400">
                          رد: {request.responseDate}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                        className="ml-2"
                      >
                        <Eye className="h-4 w-4 ml-1" />
                        عرض
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <h3 className="text-lg font-semibold">تفاصيل طلب الزواج</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRequest(null)}
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
                      <strong>الاسم:</strong> {selectedRequest.senderName}
                    </div>
                    <div>
                      <strong>العمر:</strong> {selectedRequest.senderAge} سنة
                    </div>
                    <div>
                      <strong>البلد:</strong> {selectedRequest.senderCountry}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">المستقبل</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>الاسم:</strong> {selectedRequest.receiverName}
                    </div>
                    <div>
                      <strong>العمر:</strong> {selectedRequest.receiverAge} سنة
                    </div>
                    <div>
                      <strong>البلد:</strong> {selectedRequest.receiverCountry}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">الرسالة</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  {selectedRequest.message}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">معلومات إضافية</h4>
                <div className="text-sm text-gray-600">
                  <div>
                    <strong>تاريخ الإرسال:</strong> {selectedRequest.sentDate}
                  </div>
                  {selectedRequest.responseDate && (
                    <div>
                      <strong>تاريخ الرد:</strong>{" "}
                      {selectedRequest.responseDate}
                    </div>
                  )}
                  <div>
                    <strong>الحالة:</strong>{" "}
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                  {selectedRequest.adminNotes && (
                    <div>
                      <strong>ملاحظات الإدارة:</strong>{" "}
                      {selectedRequest.adminNotes}
                    </div>
                  )}
                </div>
              </div>

              {selectedRequest.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleStatusUpdate(selectedRequest.id, "accepted");
                      setSelectedRequest(null);
                    }}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 ml-1" />
                    موافقة على الطلب
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleStatusUpdate(selectedRequest.id, "rejected");
                      setSelectedRequest(null);
                    }}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 ml-1" />
                    رفض الطلب
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
