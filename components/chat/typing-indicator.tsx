"use client";

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3 sm:mb-4">
      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 sm:px-4 py-2 sm:py-3 max-w-[85%] sm:max-w-xs border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-1 space-x-reverse">
          <div className="flex space-x-1 space-x-reverse">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mr-2">
            <span className="hidden sm:inline">جاري الكتابة...</span>
            <span className="sm:hidden">يكتب...</span>
          </span>
        </div>
      </div>
    </div>
  );
}
