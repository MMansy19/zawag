"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatRoom } from "@/lib/types";
import { useChat } from "@/providers/chat-provider";
import { ChatWindow } from "./chat-window";

function ChatRoomItem({
  room,
  isActive,
  onClick,
}: {
  room: ChatRoom;
  isActive: boolean;
  onClick: () => void;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = new Date(room.expiresAt) < new Date();

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
        isActive ? "bg-blue-50 border-l-4 border-l-primary" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm">
          محادثة #{room.id.substring(0, 8)}
        </h4>
        <Badge variant={isExpired ? "error" : "success"} className="text-xs">
          {isExpired ? "منتهية" : "نشطة"}
        </Badge>
      </div>

      <p className="text-xs text-gray-600 mb-1">
        تنتهي: {formatDate(room.expiresAt)}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {room.messages?.length || 0} رسالة
        </span>

        {room.status === "active" && !isExpired && (
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        )}
      </div>
    </div>
  );
}

export function ChatList() {
  const { chatRooms, activeRoom, setActiveRoom, fetchChatRooms } = useChat();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChatRooms = async () => {
      setLoading(true);
      try {
        await fetchChatRooms();
      } catch (error) {
        console.error("Failed to load chat rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChatRooms();
  }, [fetchChatRooms]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
          <div className="lg:col-span-2 animate-pulse">
            <div className="bg-gray-200 rounded-lg h-[600px]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">المحادثات</h1>
        <p className="text-gray-600">محادثاتك النشطة مع المرشحين للزواج</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Rooms List */}
        <Card className="h-fit">
          <CardHeader>
            <h3 className="font-semibold">المحادثات ({chatRooms.length})</h3>
          </CardHeader>
          <CardContent className="p-0">
            {chatRooms.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-600 mb-2">لا توجد محادثات</p>
                <p className="text-sm text-gray-500">
                  ستظهر محادثاتك هنا بعد قبول طلبات الزواج
                </p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {chatRooms.map((room) => (
                  <ChatRoomItem
                    key={room.id}
                    room={room}
                    isActive={activeRoom?.id === room.id}
                    onClick={() => setActiveRoom(room)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {activeRoom ? (
            <ChatWindow chatRoom={activeRoom} />
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  اختر محادثة
                </h3>
                <p className="text-gray-600">
                  اختر محادثة من القائمة لبدء الحديث
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
