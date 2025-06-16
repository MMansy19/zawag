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
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message, ChatRoom, MarriageRequest, Profile } from "@/lib/types";
import { useChat } from "@/providers/chat-provider";
import { useAuth } from "@/providers/auth-provider";
import { showToast } from "@/components/ui/toaster";
import { ChatMenu } from "./chat-menu";
import { TypingIndicator } from "./typing-indicator";

interface MobileChatInterfaceProps {
  requestId: string;
  chatRoomId: string;
}

interface ChatMessage extends Message {
  sender?: Profile;
  isCurrentUser?: boolean;
}

export function MobileChatInterface({
  requestId,
  chatRoomId,
}: MobileChatInterfaceProps) {
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
  const [showChatInfo, setShowChatInfo] = useState(false);

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
          ).toISOString(),
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

      // Simulate sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update message status to approved
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: "approved" } : msg,
        ),
      );

      inputRef.current?.focus();
    } catch (error: any) {
      showToast.error(error.message || "خطأ في إرسال الرسالة");
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 96)}px`;
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
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">جاري تحميل المحادثة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Mobile Chat Header - Fixed */}
      <div className="flex-shrink-0 border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center px-3 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2 mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center flex-1 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate">
                {otherUser?.name || "مستخدم"}
              </h3>
              <div className="flex items-center text-xs text-gray-500">
                <div className="flex items-center ml-2">
                  <div
                    className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-gray-400"} ml-1`}
                  ></div>
                  {isConnected ? "متصل" : "غير متصل"}
                </div>
                {isTyping && (
                  <span className="text-blue-500 italic">يكتب...</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChatInfo(!showChatInfo)}
              className="p-2"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showChatInfo ? "rotate-180" : ""}`}
              />
            </Button>
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

        {/* Collapsible Chat Info */}
        {showChatInfo && (
          <div className="px-3 pb-3 border-t bg-blue-50">
            <div className="flex items-center justify-between text-xs text-gray-600 py-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <MessageCircle className="h-3 w-3 ml-1" />
                  {messages.length} رسالة
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 ml-1" />7 أيام
                </div>
              </div>
              <div className="text-blue-600 font-medium">
                #{requestId.substring(0, 6)}
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3 text-green-600" />
              <span className="text-green-600">محادثة آمنة ومشفرة</span>
            </div>
          </div>
        )}
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-4">
        <div className="space-y-3 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-2xl shadow-sm ${
                  message.isCurrentUser
                    ? "bg-gradient-to-r from-primary to-primary-600 text-white rounded-br-md"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div
                  className={`flex items-center justify-between mt-1 text-xs ${
                    message.isCurrentUser ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  <span>{formatTime(message.createdAt)}</span>
                  {message.isCurrentUser && (
                    <span
                      className={`${getStatusColor(message.status)} font-medium ml-1`}
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
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="flex-shrink-0 border-t bg-white px-3 py-3">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك..."
              className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary min-h-[36px] max-h-24"
              rows={1}
              disabled={isSending}
              maxLength={500}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
            size="sm"
            className="rounded-full w-10 h-10 p-0 flex-shrink-0"
          >
            {isSending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Character count and guidelines */}
        <div className="flex justify-between items-center mt-1 px-1">
          <div className="text-xs text-gray-500">{newMessage.length}/500</div>
          <div className="text-xs text-yellow-600 flex items-center">
            <span className="mr-1">💡</span>
            الرسائل تخضع للمراجعة
          </div>
        </div>
      </div>

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
