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
  Phone,
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

interface EnhancedChatInterfaceProps {
  requestId: string;
  chatRoomId: string;
}

interface ChatMessage extends Message {
  sender?: Profile;
  isCurrentUser?: boolean;
}

export function EnhancedChatInterface({
  requestId,
  chatRoomId,
}: EnhancedChatInterfaceProps) {
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

        setChatRoom(mockChatRoom); // Load mock messages
        const mockMessages: ChatMessage[] = [
          {
            id: "1",
            chatRoomId: chatRoomId,
            senderId: otherUserId,
            content: "السلام عليكم ورحمة الله وبركاته",
            status: "approved",
            createdAt: new Date(Date.now() - 60000).toISOString(),
            ...(otherUserProfile && { sender: otherUserProfile }),
            isCurrentUser: false,
          },
          {
            id: "2",
            chatRoomId: chatRoomId,
            senderId: user?.id || "current",
            content: "وعليكم السلام ورحمة الله وبركاته",
            status: "approved",
            createdAt: new Date(Date.now() - 30000).toISOString(),
            isCurrentUser: true,
          },
        ];

        setMessages(mockMessages);
      }
    } catch (error) {
      showToast.error("خطأ في تحميل المحادثة");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    const messageContent = newMessage.trim();
    setNewMessage("");
    setIsSending(true);

    try {
      const tempMessage: ChatMessage = {
        id: Date.now().toString(),
        chatRoomId: chatRoomId,
        senderId: user?.id || "",
        content: messageContent,
        status: "pending",
        createdAt: new Date().toISOString(),
        isCurrentUser: true,
      };

      setMessages((prev) => [...prev, tempMessage]);

      // Simulate sending message
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update message status to approved
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id
            ? { ...msg, status: "approved" as const }
            : msg,
        ),
      );

      showToast.success("تم إرسال الرسالة");
    } catch (error) {
      showToast.error("خطأ في إرسال الرسالة");
      // Remove the failed message
      setMessages((prev) =>
        prev.filter((msg) => msg.content !== messageContent),
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    // Simulate typing indicator (in real app, this would be sent via socket)
    if (e.target.value.length > 0 && !isTyping) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000); // Hide after 3 seconds
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
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-[600px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="h-[700px] flex flex-col shadow-lg">
        {/* Chat Header */}
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {otherUser?.name || "مستخدم"}
                  </h3>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-gray-400"} ml-1`}
                      ></div>
                      {isConnected ? "متصل" : "غير متصل"}
                    </div>
                    {isTyping && (
                      <span className="text-blue-500 italic">
                        جاري الكتابة...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Badge variant="outline" className="bg-white">
                <Shield className="h-4 w-4 ml-1" />
                محادثة آمنة
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatMenu(true)}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Info Bar */}
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 space-x-reverse text-gray-600">
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 ml-1" />
                  {messages.length} رسالة
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 ml-1" />
                  تنتهي في 7 أيام
                </div>
              </div>
              <div className="text-blue-600 font-medium">
                طلب زواج #{requestId.substring(0, 8)}
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                    message.isCurrentUser
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div
                    className={`flex items-center justify-between mt-2 text-xs ${
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
        <div className="border-t bg-white p-4">
          <div className="flex items-end space-x-3 space-x-reverse">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا... (اضغط Enter للإرسال)"
                className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] max-h-32"
                rows={1}
                disabled={isSending}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isSending}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50"
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Guidelines */}
          <div className="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800">
              💡 تذكر: جميع الرسائل تخضع للمراجعة للحفاظ على بيئة آمنة ومحترمة
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
