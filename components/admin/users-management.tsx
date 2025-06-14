"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableView } from "./table-view";
import { User as MainUser } from "@/lib/types";
import { mockUsers, User as MockUser } from "@/lib/static-data/admin-mock-data";
import { showToast } from "@/components/ui/toaster";

interface Column {
  key: keyof MockUser | "actions";
  title: string;
  render?: (value: any, row: MockUser) => React.ReactNode;
  width?: string;
}

export function UsersManagement() {
  const [users, setUsers] = useState<MockUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers(mockUsers);
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحميل المستخدمين");
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (
    userId: string,
    action: "suspend" | "activate",
  ) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Update user status in mock data
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, status: action === "suspend" ? "suspended" : "active" }
            : user,
        ),
      );

      showToast.success(
        action === "suspend" ? "تم إيقاف المستخدم" : "تم تفعيل المستخدم",
      );
    } catch (error: any) {
      showToast.error(error.message || "خطأ في تحديث المستخدم");
    }
  };
  const columns: Column[] = [
    {
      key: "name",
      title: "الاسم",
      width: "20%",
      render: (value, row) => row.name || "غير محدد",
    },
    {
      key: "email",
      title: "البريد الإلكتروني",
      width: "25%",
    },
    {
      key: "age",
      title: "العمر",
      width: "10%",
    },
    {
      key: "status",
      title: "الحالة",
      width: "10%",
      render: (value, row) => (
        <Badge variant={row.status === "active" ? "success" : "error"}>
          {row.status === "active" ? "نشط" : "موقوف"}
        </Badge>
      ),
    },
    {
      key: "profileComplete",
      title: "اكتمال الملف",
      width: "10%",
      render: (value, row) => {
        return (
          <Badge variant={row.profileComplete ? "success" : "outline"}>
            {row.profileComplete ? "مكتمل" : "غير مكتمل"}
          </Badge>
        );
      },
    },
    {
      key: "joinDate",
      title: "تاريخ التسجيل",
      width: "15%",
      render: (value) => new Date(value).toLocaleDateString("ar-SA"),
    },
    {
      key: "actions" as any,
      title: "الإجراءات",
      width: "10%",
      render: (value, row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={row.status === "active" ? "destructive" : "outline"}
            onClick={(e) => {
              e.stopPropagation();
              handleUserAction(
                row.id,
                row.status === "active" ? "suspend" : "activate",
              );
            }}
          >
            {row.status === "active" ? "إيقاف" : "تفعيل"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
              <p className="text-gray-600">
                عرض وإدارة جميع المستخدمين في النظام
              </p>
            </div>
            <Button onClick={loadUsers} variant="outline">
              تحديث
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TableView
            data={users}
            columns={columns}
            loading={loading}
            onRowClick={setSelectedUser}
          />
        </CardContent>
      </Card>

      {/* User Details Modal/Sidebar could go here */}
      {selectedUser && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">تفاصيل المستخدم</h3>
          </CardHeader>
          <CardContent>
            {" "}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الاسم
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.name || "غير محدد"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  العمر
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.age || "غير محدد"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  المدينة
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.city || "غير محدد"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  تاريخ الانضمام
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedUser.joinDate).toLocaleDateString("ar-SA")}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  آخر نشاط
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.lastActivity
                    ? new Date(selectedUser.lastActivity).toLocaleDateString(
                        "ar-SA",
                      )
                    : "غير محدد"}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button
                variant={
                  selectedUser.status === "active" ? "destructive" : "outline"
                }
                onClick={() =>
                  handleUserAction(
                    selectedUser.id,
                    selectedUser.status === "active" ? "suspend" : "activate",
                  )
                }
              >
                {selectedUser.status === "active"
                  ? "إيقاف المستخدم"
                  : "تفعيل المستخدم"}
              </Button>
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                إغلاق
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
