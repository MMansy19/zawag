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
    return (
      <div className="h-full">
        <ChatInterface requestId={requestId} chatRoomId={chatRoomId} />
      </div>
    );
  }

  // Otherwise, show the regular chat list
  return (
    <div className="h-full">
      {/* Header - Mobile optimized */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            المحادثات 💬
          </h1>
          <div className="flex sm:hidden">
            {/* Mobile action buttons can be added here */}
          </div>
        </div>
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
