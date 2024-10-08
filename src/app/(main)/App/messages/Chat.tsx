"use client";

import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Chat as StreamChat } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import ChatSidebar from "./ChatSidebar";
import useInitializeChatClient from "./useInitializeChatClient";

export default function Chat() {
  const chatClient = useInitializeChatClient();
  const { resolvedTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Loading state
  if (!chatClient) {
    return (
      // <div className="flex justify-center items-center h-full">
        <Loader2 className="mx-auto my-3 text-center font-bold text-purple-600 justify-center animate-spin"
        strokeWidth={2}  />

      // </div>
    );
  }

  return (
    <main className="relative w-full overflow-auto rounded-2xl bg-card shadow-sm min-h-max mb-10">
      <div className="absolute inset-5 flex">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <ChatChannel
            open={!sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
}
