import { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  description: "لوحة التحكم الشخصية لإدارة حسابك ومتابعة طلبات الزواج",
};

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add session and profile checks when NextAuth is properly configured

  return <DashboardLayout>{children}</DashboardLayout>;
}
