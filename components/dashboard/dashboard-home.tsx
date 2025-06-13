"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/providers/auth-provider";

interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  activeChats: number;
  profileViews: number;
}

export function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalRequests: 0,
    pendingRequests: 0,
    activeChats: 0,
    profileViews: 0,
  });

  // TODO: Load actual stats from API
  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalRequests: 12,
      pendingRequests: 3,
      activeChats: 2,
      profileViews: 45,
    });
  }, []);

  const quickActions = [
    {
      title: "البحث عن شريك",
      description: "ابحث عن الشريك المناسب باستخدام الفلاتر",
      href: "/dashboard/search",
      icon: "🔍",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "طلبات الزواج",
      description: "إدارة الطلبات المرسلة والمستلمة",
      href: "/dashboard/requests",
      icon: "💍",
      color: "bg-pink-50 hover:bg-pink-100",
      badge:
        stats.pendingRequests > 0
          ? stats.pendingRequests.toString()
          : undefined,
    },
    {
      title: "المحادثات",
      description: "تابع محادثاتك النشطة",
      href: "/dashboard/chat",
      icon: "💬",
      color: "bg-green-50 hover:bg-green-100",
      badge: stats.activeChats > 0 ? stats.activeChats.toString() : undefined,
    },
    {
      title: "الملف الشخصي",
      description: "عرض وتحديث معلوماتك الشخصية",
      href: "/dashboard/profile",
      icon: "👤",
      color: "bg-purple-50 hover:bg-purple-100",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        {" "}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          مرحباً، {user?.profile?.name || user?.name || "المستخدم"}
        </h1>
        <p className="text-gray-600">
          إليك نظرة عامة على نشاطك في منصة الزواج الإسلامية
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">📊</div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.profileViews}
                </p>
                <p className="text-gray-600 text-sm">مشاهدات الملف الشخصي</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">💍</div>
              <div>
                <p className="text-2xl font-bold text-pink-600">
                  {stats.totalRequests}
                </p>
                <p className="text-gray-600 text-sm">إجمالي الطلبات</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">⏳</div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.pendingRequests}
                </p>
                <p className="text-gray-600 text-sm">طلبات معلقة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-4">💬</div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {stats.activeChats}
                </p>
                <p className="text-gray-600 text-sm">محادثات نشطة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            الإجراءات السريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card
                  className={`transition-colors cursor-pointer ${action.color}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{action.icon}</div>
                      {action.badge && (
                        <Badge variant="error" className="text-xs">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            النشاط الأخير
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <div className="text-lg mr-3">👁️</div>
                  <div>
                    <p className="text-gray-900">تم عرض ملفك الشخصي</p>
                    <p className="text-gray-500 text-xs">منذ ساعتين</p>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <div className="text-lg mr-3">💌</div>
                  <div>
                    <p className="text-gray-900">طلب زواج جديد</p>
                    <p className="text-gray-500 text-xs">منذ 5 ساعات</p>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <div className="text-lg mr-3">💬</div>
                  <div>
                    <p className="text-gray-900">رسالة جديدة</p>
                    <p className="text-gray-500 text-xs">أمس</p>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <div className="text-lg mr-3">✅</div>
                  <div>
                    <p className="text-gray-900">تم تحديث الملف الشخصي</p>
                    <p className="text-gray-500 text-xs">منذ يومين</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  عرض جميع الأنشطة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips and Guidelines */}
      <Card className="mt-8">
        <CardHeader>
          <h3 className="text-xl font-semibold">نصائح وإرشادات</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-medium mb-2">أكمل ملفك الشخصي</h4>
              <p className="text-sm text-gray-600">
                الملفات المكتملة تحصل على مشاهدات أكثر
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-medium mb-2">حافظ على خصوصيتك</h4>
              <p className="text-sm text-gray-600">
                لا تشارك معلومات شخصية حساسة في الرسائل
              </p>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-medium mb-2">كن محترماً</h4>
              <p className="text-sm text-gray-600">
                تعامل مع الآخرين بأدب واحترام في جميع التفاعلات
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
