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
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
          isCurrentUser ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <div className="flex items-center justify-between mt-1">
          <span
            className={`text-xs ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}
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
    <div className="border-t border-gray-200 p-4">
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            disabled ? "تم الوصول للحد الأقصى من الرسائل" : "اكتب رسالتك..."
          }
          disabled={disabled}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm resize-none"
          rows={2}
          maxLength={500}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !content.trim()}
          className="self-end"
        >
          إرسال
        </Button>
      </div>
      <div className="text-xs text-gray-500 mt-1">{content.length}/500 حرف</div>
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
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">
              محادثة مع{" "}
              {chatRoom.participants.find((p) => p !== user?.id) || "مستخدم"}
            </h3>
            <p className="text-sm text-gray-600">
              تنتهي في: {formatExpiryDate(chatRoom.expiresAt)}
            </p>
          </div>
          <Badge variant={isExpired ? "error" : "success"}>
            {isExpired ? "منتهية" : "نشطة"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">جاري تحميل الرسائل...</p>
              </div>
            </div>
          ) : roomMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-600">لا توجد رسائل بعد</p>
                <p className="text-sm text-gray-500">
                  ابدأ المحادثة بإرسال رسالة
                </p>
              </div>
            </div>
          ) : (
            <>
              {roomMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === user?.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Rate Limit Warning */}
        {rateLimited && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mx-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
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
          <div className="bg-red-50 border-t border-red-200 p-4 text-center">
            <p className="text-sm text-red-800">انتهت صلاحية هذه المحادثة</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
