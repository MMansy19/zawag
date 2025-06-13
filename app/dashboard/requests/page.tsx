import { RequestsList } from "@/components/requests/requests-list";

export default function RequestsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center sm:text-right">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          طلبات الزواج 💍
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          إدارة الطلبات المرسلة والمستلمة
        </p>
      </div>

      <RequestsList />
    </div>
  );
}
