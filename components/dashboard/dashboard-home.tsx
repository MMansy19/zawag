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
      gradient: "from-primary to-primary-hover",
      bgColor: "bg-gradient-to-br from-primary-subtle to-primary-subtle/50",
      hoverColor: "hover:from-primary-subtle/70 hover:to-primary-subtle",
    },
    {
      title: "طلبات الزواج",
      description: "إدارة الطلبات المرسلة والمستلمة",
      href: "/dashboard/requests",
      icon: "💍",
      gradient: "from-pink-500 to-rose-600",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-100",
      hoverColor: "hover:from-pink-100 hover:to-rose-200",
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
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      hoverColor: "hover:from-green-100 hover:to-emerald-200",
      badge: stats.activeChats > 0 ? stats.activeChats.toString() : undefined,
    },
    {
      title: "الملف الشخصي",
      description: "عرض وتحديث معلوماتك الشخصية",
      href: "/dashboard/profile",
      icon: "👤",
      gradient: "from-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-100",
      hoverColor: "hover:from-purple-100 hover:to-indigo-200",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Welcome Section */}
      <div className="text-center sm:text-right px-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2">
          مرحباً، {user?.profile?.name || user?.name || "المستخدم"} 👋
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto sm:mx-0 leading-relaxed">
          إليك نظرة عامة على نشاطك في منصة الزواج الإسلامية. نسأل الله أن يبارك
          لك ويوفقك في إيجاد شريك حياتك.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 badge-primary rounded-xl flex items-center justify-center text-white text-base sm:text-lg lg:text-xl xl:text-2xl shadow-lg">
                📊
              </div>
              <div className="mr-2 sm:mr-3 lg:mr-4 min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary truncate font-display">
                  {stats.profileViews}
                </p>
                <p className="text-body-small text-text-secondary truncate arabic-optimized">
                  مشاهدات الملف
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white text-base sm:text-lg lg:text-xl xl:text-2xl shadow-lg">
                💍
              </div>
              <div className="mr-2 sm:mr-3 lg:mr-4 min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-pink-600 truncate font-display">
                  {stats.totalRequests}
                </p>
                <p className="text-body-small text-text-secondary truncate arabic-optimized">
                  إجمالي الطلبات
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-base sm:text-lg lg:text-xl xl:text-2xl shadow-lg">
                ⏳
              </div>
              <div className="mr-2 sm:mr-3 lg:mr-4 min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 truncate font-display">
                  {stats.pendingRequests}
                </p>
                <p className="text-body-small text-text-secondary truncate arabic-optimized">
                  طلبات معلقة
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-base sm:text-lg lg:text-xl xl:text-2xl shadow-lg">
                💬
              </div>
              <div className="mr-2 sm:mr-3 lg:mr-4 min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 truncate">
                  {stats.activeChats}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  محادثات نشطة
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Quick Actions */}
        <div className="xl:col-span-2">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6 px-1">
            الإجراءات السريعة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card
                  className={`${action.bgColor} ${action.hoverColor} transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2 border-0 overflow-hidden`}
                >
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
                      <div className="text-xl sm:text-2xl lg:text-3xl">
                        {action.icon}
                      </div>
                      {action.badge && (
                        <Badge
                          variant="error"
                          className="text-xs bg-red-500 text-white shadow-lg animate-pulse"
                        >
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                      {action.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {action.description}
                    </p>
                    <div className="mt-2 sm:mt-3 lg:mt-4">
                      <div
                        className={`w-6 sm:w-8 h-0.5 sm:h-1 bg-gradient-to-r ${action.gradient} rounded-full`}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6 px-1">
            النشاط الأخير
          </h2>
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="flex items-center text-xs sm:text-sm">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 badge-primary rounded-full flex items-center justify-center text-sm sm:text-base lg:text-lg text-white shadow-md">
                    👁️
                  </div>
                  <div className="mr-2 sm:mr-3 flex-1 min-w-0">
                    <p className="text-gray-900 font-medium truncate text-xs sm:text-sm">
                      تم عرض ملفك الشخصي
                    </p>
                    <p className="text-gray-500 text-xs">منذ ساعتين</p>
                  </div>
                </div>

                <div className="flex items-center text-xs sm:text-sm">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-sm sm:text-base lg:text-lg text-white shadow-md">
                    💌
                  </div>
                  <div className="mr-2 sm:mr-3 flex-1 min-w-0">
                    <p className="text-gray-900 font-medium truncate text-xs sm:text-sm">
                      طلب تعارف جديد
                    </p>
                    <p className="text-gray-500 text-xs">منذ 5 ساعات</p>
                  </div>
                </div>

                <div className="flex items-center text-xs sm:text-sm">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-sm sm:text-base lg:text-lg text-white shadow-md">
                    💬
                  </div>
                  <div className="mr-2 sm:mr-3 flex-1 min-w-0">
                    <p className="text-gray-900 font-medium truncate text-xs sm:text-sm">
                      رسالة جديدة
                    </p>
                    <p className="text-gray-500 text-xs">أمس</p>
                  </div>
                </div>

                <div className="flex items-center text-xs sm:text-sm">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-sm sm:text-base lg:text-lg text-white shadow-md">
                    ✅
                  </div>
                  <div className="mr-2 sm:mr-3 flex-1 min-w-0">
                    <p className="text-gray-900 font-medium truncate text-xs sm:text-sm">
                      تم تحديث الملف الشخصي
                    </p>
                    <p className="text-gray-500 text-xs">منذ يومين</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                >
                  عرض جميع الأنشطة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips and Guidelines */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-gray-50 to-primary-subtle overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary-600 text-white p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold flex items-center">
            <span className="text-lg sm:text-xl lg:text-2xl ml-2">💡</span>
            نصائح وإرشادات
          </h3>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-primary-subtle to-primary-subtle/50 rounded-xl border border-primary-light hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 badge-primary rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl text-white mx-auto mb-2 sm:mb-3 shadow-lg">
                📝
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                أكمل ملفك الشخصي
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                الملفات المكتملة تحصل على مشاهدات أكثر
              </p>
            </div>

            <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl text-white mx-auto mb-2 sm:mb-3 shadow-lg">
                🔒
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                حافظ على خصوصيتك
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                لا تشارك معلومات شخصية حساسة في الرسائل
              </p>
            </div>

            <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl text-white mx-auto mb-2 sm:mb-3 shadow-lg">
                🤝
              </div>
              <h4 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                كن محترماً
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                تعامل مع الآخرين بأدب واحترام في جميع التفاعلات
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
