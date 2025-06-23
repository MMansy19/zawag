"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Message, ChatRoom } from "@/lib/types";
import { useChat } from "@/providers/chat-provider";
import { useAuth } from "@/providers/auth-provider";
import { showToast } from "@/components/ui/toaster";

interface ChatWindowProps {
  chatRoom: ChatRoom;
}

function MessageBubble({
  message,
  isCurrentUser,
}: {
  message: Message;
  isCurrentUser: boolean;
}) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3 sm:mb-4`}
    >
      <div
        className={`max-w-[85%] sm:max-w-xs lg:max-w-md xl:max-w-lg px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-sm ${
          isCurrentUser
            ? "bg-primary text-white rounded-br-sm"
            : "bg-gray-100 text-gray-800 rounded-bl-sm"
        }`}
      >
        <p className="text-body leading-relaxed arabic-optimized">
          {message.content}
        </p>
        <div className="flex items-center justify-between mt-1 sm:mt-2">
          <span
            className={`text-caption ${isCurrentUser ? "text-primary-lighter" : "text-gray-500"} arabic-optimized`}
          >
            {formatTime(message.createdAt)}
          </span>
          {message.status && (
            <Badge
              variant={
                message.status === "approved"
                  ? "success"
                  : message.status === "pending"
                    ? "outline"
                    : message.status === "rejected"
                      ? "error"
                      : "secondary"
              }
              className="text-xs"
            >
              {message.status === "approved"
                ? "تم الإرسال"
                : message.status === "pending"
                  ? "في الانتظار"
                  : message.status === "rejected"
                    ? "مرفوض"
                    : message.status}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageInput({
  onSend,
  disabled,
}: {
  onSend: (content: string) => void;
  disabled: boolean;
}) {
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!content.trim() || disabled) return;

    onSend(content);
    setContent("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
      <div className="flex gap-2 sm:gap-3 items-end">
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              disabled ? "تم الوصول للحد الأقصى من الرسائل" : "اكتب رسالتك..."
            }
            disabled={disabled}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[40px] max-h-24 sm:max-h-32"
            rows={1}
            maxLength={500}
          />
          <div className="text-xs text-gray-500 mt-1 flex justify-between">
            <span>{content.length}/500 حرف</span>
            <span className="text-gray-400 hidden sm:inline">
              Enter للإرسال
            </span>
          </div>
        </div>
        <Button
          onClick={handleSend}
          disabled={disabled || !content.trim()}
          size="sm"
          className="self-end px-3 sm:px-4 py-2 min-h-[40px] flex-shrink-0"
        >
          <span className="hidden sm:inline ml-1">إرسال</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export function ChatWindow({ chatRoom }: ChatWindowProps) {
  const { user } = useAuth();
  const { messages, sendMessage, fetchMessages } = useChat();
  const [loading, setLoading] = useState(true);
  const [rateLimited, setRateLimited] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roomMessages = messages[chatRoom.id] || [];

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        await fetchMessages(chatRoom.id);
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [chatRoom.id, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages]);

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessage(content);
      // TODO: Implement rate limiting check
    } catch (error: any) {
      if (error.message.includes("rate limit")) {
        setRateLimited(true);
        setTimeout(() => setRateLimited(false), 60000); // Reset after 1 minute
      }
      showToast.error(error.message || "خطأ في إرسال الرسالة");
    }
  };

  const formatExpiryDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isExpired = new Date(chatRoom.expiresAt) < new Date();

  return (
    <Card className="h-full max-h-[600px] lg:h-[600px] flex flex-col shadow-sm">
      <CardHeader className="pb-3 border-b bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg truncate">
              محادثة مع{" "}
              {chatRoom.participants.find((p) => p !== user?.id) || "مستخدم"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              تنتهي في: {formatExpiryDate(chatRoom.expiresAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant={isExpired ? "error" : "success"}
              className="text-xs"
            >
              {isExpired ? "منتهية" : "نشطة"}
            </Badge>
            {/* Mobile menu button */}
            <button className="lg:hidden p-1 rounded-full hover:bg-gray-200 transition-colors">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-xs sm:text-sm text-gray-600">
                  جاري تحميل الرسائل...
                </p>
              </div>
            </div>
          ) : roomMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center px-4">
                <div className="text-3xl sm:text-4xl mb-4">💬</div>
                <p className="text-sm sm:text-base text-gray-600 mb-1">
                  لا توجد رسائل بعد
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  ابدأ المحادثة بإرسال رسالة
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {roomMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === user?.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Rate Limit Warning */}
        {rateLimited && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-sm">⚠️</span>
              </div>
              <div className="mr-3 flex-1">
                <p className="text-xs sm:text-sm text-yellow-700">
                  تم الوصول للحد الأقصى من الرسائل. يمكنك الإرسال مرة أخرى بعد
                  ساعة.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Message Input */}
        {!isExpired && (
          <MessageInput
            onSend={handleSendMessage}
            disabled={rateLimited || isExpired}
          />
        )}

        {isExpired && (
          <div className="bg-red-50 border-t border-red-200 p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs sm:text-sm text-red-800">
                انتهت صلاحية هذه المحادثة
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
