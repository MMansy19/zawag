"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  mockUserReports,
  type UserReport,
} from "@/lib/static-data/admin-mock-data";
import {
  AlertTriangle,
  Eye,
  User,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export function ReportTable() {
  const [reports, setReports] = useState<UserReport[]>(mockUserReports);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<UserReport | null>(null);

  const filteredReports = reports.filter((report) => {
    const categoryMatch =
      selectedCategory === "all" || report.category === selectedCategory;
    const statusMatch =
      selectedStatus === "all" || report.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const getCategoryLabel = (category: UserReport["category"]) => {
    const categories = {
      inappropriate_behavior: "سلوك غير مناسب",
      fake_profile: "ملف مزيف",
      harassment: "مضايقة",
      spam: "رسائل مزعجة",
      other: "أخرى",
    };
    return categories[category];
  };

  const getStatusBadge = (status: UserReport["status"]) => {
    const statusConfig = {
      pending: {
        label: "في الانتظار",
        variant: "secondary" as const,
        icon: Clock,
      },
      investigating: {
        label: "قيد التحقيق",
        variant: "default" as const,
        icon: Eye,
      },
      resolved: {
        label: "تم الحل",
        variant: "default" as const,
        icon: CheckCircle,
      },
      dismissed: { label: "مرفوض", variant: "outline" as const, icon: XCircle },
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

  const getPriorityBadge = (priority: UserReport["priority"]) => {
    const priorityConfig = {
      low: { label: "منخفض", className: "bg-primary-subtle text-primary" },
      medium: { label: "متوسط", className: "bg-yellow-100 text-yellow-800" },
      high: { label: "عالي", className: "bg-orange-100 text-orange-800" },
      urgent: { label: "عاجل", className: "bg-red-100 text-red-800" },
    };

    const config = priorityConfig[priority];

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleReportAction = (
    reportId: string,
    action: "investigating" | "resolved" | "dismissed",
    resolution?: string,
  ) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? ({
              ...report,
              status: action,
              assignedTo:
                action === "investigating"
                  ? "المشرف الحالي"
                  : (report.assignedTo ?? ""),
              resolution:
                action === "resolved"
                  ? (resolution ?? "")
                  : (report.resolution ?? ""),
              resolutionDate:
                action === "resolved"
                  ? new Date().toISOString().split("T")[0]
                  : (report.resolutionDate ?? ""),
            } as UserReport)
          : report,
      ),
    );
  };

  const getCounts = () => {
    return {
      all: reports.length,
      pending: reports.filter((r) => r.status === "pending").length,
      investigating: reports.filter((r) => r.status === "investigating").length,
      resolved: reports.filter((r) => r.status === "resolved").length,
      dismissed: reports.filter((r) => r.status === "dismissed").length,
      urgent: reports.filter((r) => r.priority === "urgent").length,
      high: reports.filter((r) => r.priority === "high").length,
    };
  };

  const counts = getCounts();

  return (
    <div className="space-y-6">
      {/* Header with statistics */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            تقارير المستخدمين
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
                {counts.investigating}
              </div>
              <div className="text-sm text-orange-600">قيد التحقيق</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {counts.resolved}
              </div>
              <div className="text-sm text-green-600">تم الحل</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {counts.urgent}
              </div>
              <div className="text-sm text-purple-600">عاجل</div>
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
                    selectedStatus === "investigating" ? "primary" : "outline"
                  }
                  onClick={() => setSelectedStatus("investigating")}
                  size="sm"
                >
                  قيد التحقيق ({counts.investigating})
                </Button>
                <Button
                  variant={
                    selectedStatus === "resolved" ? "primary" : "outline"
                  }
                  onClick={() => setSelectedStatus("resolved")}
                  size="sm"
                >
                  تم الحل ({counts.resolved})
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                فلترة حسب النوع:
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "primary" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  size="sm"
                >
                  جميع الأنواع
                </Button>
                <Button
                  variant={
                    selectedCategory === "inappropriate_behavior"
                      ? "primary"
                      : "outline"
                  }
                  onClick={() => setSelectedCategory("inappropriate_behavior")}
                  size="sm"
                >
                  سلوك غير مناسب
                </Button>
                <Button
                  variant={
                    selectedCategory === "harassment" ? "primary" : "outline"
                  }
                  onClick={() => setSelectedCategory("harassment")}
                  size="sm"
                >
                  مضايقة
                </Button>
                <Button
                  variant={
                    selectedCategory === "fake_profile" ? "primary" : "outline"
                  }
                  onClick={() => setSelectedCategory("fake_profile")}
                  size="sm"
                >
                  ملف مزيف
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلِغ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلَغ عنه
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السبب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الأولوية
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
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 ml-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {report.reporterName}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {report.reporterId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-red-400 ml-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {report.reportedName}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {report.reportedId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {report.reason}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getCategoryLabel(report.category)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(report.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.reportDate}
                      {report.assignedTo && (
                        <div className="text-xs text-primary">
                          مُسند إلى: {report.assignedTo}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReport(report)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {report.status === "pending" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleReportAction(report.id, "investigating")
                            }
                          >
                            تحقيق
                          </Button>
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

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <h3 className="text-lg font-semibold">تفاصيل البلاغ</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReport(null)}
                className="absolute left-4 top-4"
              >
                إغلاق
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">المبلِغ</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>الاسم:</strong> {selectedReport.reporterName}
                    </div>
                    <div>
                      <strong>المعرف:</strong> {selectedReport.reporterId}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">المبلَغ عنه</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>الاسم:</strong> {selectedReport.reportedName}
                    </div>
                    <div>
                      <strong>المعرف:</strong> {selectedReport.reportedId}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">تفاصيل البلاغ</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    <strong>السبب:</strong> {selectedReport.reason}
                  </div>
                  <div>
                    <strong>التصنيف:</strong>{" "}
                    {getCategoryLabel(selectedReport.category)}
                  </div>
                  <div>
                    <strong>الأولوية:</strong>{" "}
                    {getPriorityBadge(selectedReport.priority)}
                  </div>
                  <div>
                    <strong>تاريخ البلاغ:</strong> {selectedReport.reportDate}
                  </div>
                  <div>
                    <strong>الحالة:</strong>{" "}
                    {getStatusBadge(selectedReport.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">الوصف التفصيلي</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  {selectedReport.description}
                </div>
              </div>

              {selectedReport.evidence && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">الأدلة</h4>
                  <div className="bg-primary-subtle p-3 rounded-lg text-sm">
                    {selectedReport.evidence}
                  </div>
                </div>
              )}

              {selectedReport.assignedTo && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">معلومات التعيين</h4>
                  <div className="text-sm text-gray-600">
                    <div>
                      <strong>مُسند إلى:</strong> {selectedReport.assignedTo}
                    </div>
                  </div>
                </div>
              )}

              {selectedReport.resolution && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">القرار النهائي</h4>
                  <div className="bg-green-50 p-3 rounded-lg text-sm">
                    <div>
                      <strong>الحل:</strong> {selectedReport.resolution}
                    </div>
                    <div>
                      <strong>تاريخ الحل:</strong>{" "}
                      {selectedReport.resolutionDate}
                    </div>
                  </div>
                </div>
              )}

              {(selectedReport.status === "pending" ||
                selectedReport.status === "investigating") && (
                <div className="flex gap-2 pt-4">
                  {selectedReport.status === "pending" && (
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleReportAction(selectedReport.id, "investigating");
                        setSelectedReport({
                          ...selectedReport,
                          status: "investigating",
                          assignedTo: "المشرف الحالي",
                        });
                      }}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 ml-1" />
                      بدء التحقيق
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    onClick={() => {
                      const resolution = prompt("أدخل تفاصيل الحل:");
                      if (resolution) {
                        handleReportAction(
                          selectedReport.id,
                          "resolved",
                          resolution,
                        );
                        setSelectedReport(null);
                      }
                    }}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 ml-1" />
                    حل البلاغ
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleReportAction(selectedReport.id, "dismissed");
                      setSelectedReport(null);
                    }}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 ml-1" />
                    رفض البلاغ
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
