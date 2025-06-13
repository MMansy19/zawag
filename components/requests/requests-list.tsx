"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarriageRequest } from "@/lib/types";
import { requestsApi } from "@/lib/api";
import { showToast } from "@/components/ui/toaster";

interface RequestCardProps {
  request: MarriageRequest;
  type: "received" | "sent";
  onUpdate?: () => void;
}

function RequestCard({ request, type, onUpdate }: RequestCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleResponse = async (status: "accepted" | "rejected") => {
    setIsLoading(true);
    try {
      await requestsApi.respondToRequest({
        requestId: request.id,
        response: status,
      });

      showToast.success(
        status === "accepted" ? "تم قبول الطلب بنجاح!" : "تم رفض الطلب",
      );

      if (onUpdate) {
        onUpdate();
      }
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحديث الطلب");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">في الانتظار</Badge>;
      case "accepted":
        return <Badge variant="success">مقبول</Badge>;
      case "rejected":
        return <Badge variant="error">مرفوض</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">
              {type === "received" ? "من" : "إلى"}:{" "}
              {type === "received"
                ? request.sender?.name || "مستخدم"
                : request.receiver?.name || "مستخدم"}
            </h3>
            <p className="text-sm text-gray-600">
              {formatDate(request.createdAt)}
            </p>
          </div>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>

      <CardContent>
        {request.message && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">الرسالة:</p>
            <div className="bg-gray-50 rounded-md p-3">
              <p className="text-sm text-gray-800">{request.message}</p>
            </div>
          </div>
        )}

        {/* Profile Info */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            معلومات الملف الشخصي:
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            {type === "received" && request.sender && (
              <>
                <p>العمر: {request.sender.age || "غير محدد"}</p>
                <p>
                  الموقع: {request.sender.city}, {request.sender.country}
                </p>
                {request.sender.occupation && (
                  <p>المهنة: {request.sender.occupation}</p>
                )}
              </>
            )}
            {type === "sent" && request.receiver && (
              <>
                <p>العمر: {request.receiver.age || "غير محدد"}</p>
                <p>
                  الموقع: {request.receiver.city}, {request.receiver.country}
                </p>
                {request.receiver.occupation && (
                  <p>المهنة: {request.receiver.occupation}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {type === "received" && request.status === "pending" && (
          <div className="flex gap-3">
            <Button
              onClick={() => handleResponse("accepted")}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "جاري القبول..." : "قبول"}
            </Button>
            <Button
              onClick={() => handleResponse("rejected")}
              disabled={isLoading}
              variant="outline"
              className="flex-1"
            >
              {isLoading ? "جاري الرفض..." : "رفض"}
            </Button>
          </div>
        )}

        {/* Status Information */}
        {request.status === "accepted" && (
          <div className="mt-4 p-3 bg-green-50 rounded-md">
            <p className="text-sm text-green-800">
              ✅ تم قبول الطلب! يمكنك الآن بدء المحادثة.
            </p>
            <Button size="sm" className="mt-2">
              بدء المحادثة
            </Button>
          </div>
        )}

        {request.status === "rejected" && (
          <div className="mt-4 p-3 bg-red-50 rounded-md">
            <p className="text-sm text-red-800">❌ تم رفض الطلب</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function RequestsList() {
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");
  const [receivedRequests, setReceivedRequests] = useState<MarriageRequest[]>(
    [],
  );
  const [sentRequests, setSentRequests] = useState<MarriageRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const [receivedResponse, sentResponse] = await Promise.all([
        requestsApi.getReceivedRequests(),
        requestsApi.getSentRequests(),
      ]);

      if (receivedResponse.success && receivedResponse.data) {
        setReceivedRequests(receivedResponse.data.requests);
      }

      if (sentResponse.success && sentResponse.data) {
        setSentRequests(sentResponse.data.requests);
      }
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  };

  const currentRequests =
    activeTab === "received" ? receivedRequests : sentRequests;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">طلبات الزواج</h1>
        <p className="text-gray-600">إدارة طلبات الزواج المرسلة والمستلمة</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("received")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "received"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          الطلبات المستلمة ({receivedRequests.length})
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === "sent"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          الطلبات المرسلة ({sentRequests.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-32"></div>
            </div>
          ))}
        </div>
      ) : currentRequests.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد طلبات
          </h3>
          <p className="text-gray-600">
            {activeTab === "received"
              ? "لم تستلم أي طلبات زواج بعد"
              : "لم ترسل أي طلبات زواج بعد"}
          </p>
        </div>
      ) : (
        <div>
          {currentRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              type={activeTab}
              onUpdate={loadRequests}
            />
          ))}
        </div>
      )}
    </div>
  );
}
