import { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export const metadata: Metadata = {
  title: "لوحة التحكم - الزواج السعيد",
  description:
    "لوحة التحكم الشخصية لإدارة حسابك، تصفح طلبات الزواج، والتفاعل مع الأعضاء في منصة الزواج السعيد.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add session and profile checks when NextAuth is properly configured

  return <DashboardLayout>{children}</DashboardLayout>;
}
