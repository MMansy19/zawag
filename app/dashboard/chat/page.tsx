"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatList } from "@/components/chat/chat-list";
import { ChatInterface } from "@/components/chat/chat-interface";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const chatRoomId = searchParams.get("chatRoomId");

  // If we have a request ID, show the chat interface
  if (requestId && chatRoomId) {
    return <ChatInterface requestId={requestId} chatRoomId={chatRoomId} />;
  }

  // Otherwise, show the regular chat list
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center sm:text-right">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          المحادثات 💬
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          تابع محادثاتك النشطة مع المهتمين
        </p>
      </div>

      <ChatList />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  );
}
