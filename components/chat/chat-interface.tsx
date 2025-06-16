"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Send,
  MoreVertical,
  Shield,
  Clock,
  User,
  MessageCircle,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Message, ChatRoom, MarriageRequest, Profile } from "@/lib/types";
import { useChat } from "@/providers/chat-provider";
import { useAuth } from "@/providers/auth-provider";
import { showToast } from "@/components/ui/toaster";
import { ChatMenu } from "./chat-menu";
import { TypingIndicator } from "./typing-indicator";
import { MobileChatInterface } from "./mobile-chat-interface";

interface ChatInterfaceProps {
  requestId: string;
  chatRoomId: string;
}

interface ChatMessage extends Message {
  sender?: Profile;
  isCurrentUser?: boolean;
}

export function ChatInterface({ requestId, chatRoomId }: ChatInterfaceProps) {
  // Mobile detection hook
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Use mobile interface for smaller screens
  if (isMobile) {
    return (
      <MobileChatInterface requestId={requestId} chatRoomId={chatRoomId} />
    );
  }

  // Desktop interface for larger screens
  return <DesktopChatInterface requestId={requestId} chatRoomId={chatRoomId} />;
}

function DesktopChatInterface({ requestId, chatRoomId }: ChatInterfaceProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { sendMessage, isConnected } = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [request, setRequest] = useState<MarriageRequest | null>(null);
  const [otherUser, setOtherUser] = useState<Profile | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadChatData();
  }, [requestId, chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatData = async () => {
    setIsLoading(true);
    try {
      // Load mock data for development
      const { mockRequestsApi } = await import(
        "@/lib/static-data/marriage-requests"
      );

      // Get the request details
      const requestData = await mockRequestsApi.getRequestById(requestId);
      if (requestData.success && requestData.data) {
        const requestDetails = requestData.data;
        setRequest(requestDetails);

        // Determine the other user
        const otherUserId =
          requestDetails.senderId === user?.id
            ? requestDetails.receiverId
            : requestDetails.senderId;

        const otherUserProfile =
          requestDetails.senderId === user?.id
            ? requestDetails.receiver
            : requestDetails.sender;

        if (otherUserProfile) {
          setOtherUser(otherUserProfile);
        }

        // Create mock chat room
        const mockChatRoom: ChatRoom = {
          id: chatRoomId,
          requestId: requestId,
          participants: [user?.id || "", otherUserId],
          status: "active",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 7 days from now
        };

        setChatRoom(mockChatRoom);

        // Mock messages
        const mockMessages: ChatMessage[] = [
          {
            id: "1",
            chatRoomId: chatRoomId,
            senderId: otherUserId,
            content: "السلام عليكم ورحمة الله وبركاته",
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            status: "approved",
            isCurrentUser: false,
          },
          {
            id: "2",
            chatRoomId: chatRoomId,
            senderId: user?.id || "",
            content: "وعليكم السلام ورحمة الله وبركاته، أهلاً وسهلاً",
            createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
            status: "approved",
            isCurrentUser: true,
          },
          {
            id: "3",
            chatRoomId: chatRoomId,
            senderId: otherUserId,
            content: "بارك الله فيك، كيف حالك؟ أتمنى أن تكون بخير وصحة جيدة",
            createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
            status: "approved",
            isCurrentUser: false,
          },
        ];

        setMessages(mockMessages);
      }
    } catch (error) {
      console.error("Failed to load chat data:", error);
      showToast.error("خطأ في تحميل بيانات المحادثة");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      // Create temporary message for immediate display
      const tempMessage: ChatMessage = {
        id: Date.now().toString(),
        chatRoomId: chatRoomId,
        senderId: user?.id || "",
        content: newMessage.trim(),
        createdAt: new Date().toISOString(),
        status: "pending",
        isCurrentUser: true,
      };

      setMessages((prev) => [...prev, tempMessage]);
      setNewMessage("");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update message status
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: "approved" } : msg,
        ),
      );

      // Focus input
      inputRef.current?.focus();
    } catch (error: any) {
      showToast.error(error.message || "خطأ في إرسال الرسالة");
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    // Simulate typing indicator
    if (!isTyping) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return "✓✓";
      case "pending":
        return "⏳";
      case "rejected":
        return "✗";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="animate-pulse w-full max-w-4xl">
          <div className="bg-gray-200 rounded-lg h-[500px] sm:h-[600px] lg:h-[700px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="flex-1 flex flex-col shadow-lg max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-150px)] lg:max-h-[700px]">
        {/* Chat Header */}
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="p-2 flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg truncate">
                    {otherUser?.name || "مستخدم"}
                  </h3>
                  <div className="flex items-center space-x-2 space-x-reverse text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-gray-400"} ml-1`}
                      ></div>
                      <span className="hidden sm:inline">
                        {isConnected ? "متصل" : "غير متصل"}
                      </span>
                    </div>
                    {isTyping && (
                      <span className="text-blue-500 italic hidden sm:inline">
                        جاري الكتابة...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse flex-shrink-0">
              <Badge
                variant="outline"
                className="bg-white text-xs hidden sm:flex"
              >
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                محادثة آمنة
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatMenu(true)}
                className="p-2"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Info Bar */}
          <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center space-x-2 sm:space-x-4 space-x-reverse text-gray-600">
                <div className="flex items-center">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                  <span className="hidden sm:inline">
                    {messages.length} رسالة
                  </span>
                  <span className="sm:hidden">{messages.length}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                  <span className="hidden sm:inline">تنتهي في 7 أيام</span>
                  <span className="sm:hidden">7 أيام</span>
                </div>
              </div>
              <div className="text-blue-600 font-medium text-xs sm:text-sm">
                #{requestId.substring(0, 6)}
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md xl:max-w-lg px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm ${
                    message.isCurrentUser
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">
                    {message.content}
                  </p>
                  <div
                    className={`flex items-center justify-between mt-1 sm:mt-2 text-xs ${
                      message.isCurrentUser ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    <span>{formatTime(message.createdAt)}</span>
                    {message.isCurrentUser && (
                      <span
                        className={`${getStatusColor(message.status)} font-medium`}
                      >
                        {getStatusIcon(message.status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Message Input */}
        <div className="border-t bg-white p-3 sm:p-4 flex-shrink-0">
          <div className="flex items-end space-x-2 sm:space-x-3 space-x-reverse">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا..."
                className="w-full resize-none border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[40px] sm:min-h-[44px] max-h-24 sm:max-h-32 text-sm sm:text-base"
                rows={1}
                disabled={isSending}
              />
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>{newMessage.length}/500</span>
                <span className="hidden sm:inline">Enter للإرسال</span>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isSending}
              className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 flex-shrink-0 min-h-[40px] sm:min-h-[44px]"
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <span className="hidden sm:inline ml-1">إرسال</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {/* Guidelines */}
          <div className="mt-2 sm:mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800 flex items-start">
              <span className="ml-1 flex-shrink-0">💡</span>
              <span className="hidden sm:inline">
                تذكر: جميع الرسائل تخضع للمراجعة للحفاظ على بيئة آمنة ومحترمة
              </span>
              <span className="sm:hidden">الرسائل تخضع للمراجعة</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Chat Menu */}
      <ChatMenu
        isOpen={showChatMenu}
        onClose={() => setShowChatMenu(false)}
        chatRoomId={chatRoomId}
        otherUserName={otherUser?.name || "مستخدم"}
      />
    </div>
  );
}
