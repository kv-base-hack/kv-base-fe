"use client";

import { IconPlus } from "@/components/shared/icons/IconPlus";
import { MessageHistory } from "./message-history";
import { useAtom } from "jotai";
import { messageAtom } from "@/atom/message";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ChatHistory = ({
  messages,
  setMessages,
}: {
  messages: any[];
  setMessages: any;
}) => {
  const [messagesHistory, setMessagesHistory] = useAtom<any[]>(messageAtom);
  const [currentMessage, setCurrentMessage] = useState<number>();

  const totalMessages = messagesHistory.length || 0;

  const updateMessageHistory = (index: number, newContent: any) => {
    const oldMessage = [...messagesHistory];

    if (oldMessage[index]) {
      oldMessage[index] = messages;
    }

    setMessagesHistory(oldMessage);
  };

  const handleCreateNewChat = () => {
    if (typeof currentMessage !== "undefined") {
      updateMessageHistory(currentMessage, messages);
    } else {
      // Tạo chat mới nếu không có chat nào đang active
      const newMessages = [...messagesHistory, messages];
      setMessagesHistory(newMessages);
    }

    setCurrentMessage(undefined);
    setMessages([]);
  };

  const onCreateNewChat = () => {
    if (messages.length === 0) return;
    if (totalMessages === 20) {
      setMessagesHistory(messagesHistory.shift());
    }
    handleCreateNewChat();
    setCurrentMessage(undefined);
  };

  return (
    <div className="hidden h-full xl:flex flex-col min-w-[250px] max-w-[280px] p-4 gap-4 border border-white/10 bg-[#1a1d1f80] rounded-xl backdrop-blur-[32px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-neutral-500 text-sm font-medium">Chat History</p>
          <span className="text-[#6c7275] text-xs font-medium bg-[#1a1d1f]/50 px-2 rounded-lg border border-white/10">
            <span>{totalMessages}</span>/20
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onCreateNewChat}
                className="hover:bg-white/10 p-2 rounded-full transition-all duration-300 ease-in-ou cursor-pointer"
                disabled={messages.length === 0}
              >
                <IconPlus />
              </button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col gap-2">
        {messagesHistory.map((msg, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCurrentMessage(index);
                setMessages(msg);
              }}
              role="button"
            >
              <MessageHistory msg={msg} isActive={currentMessage === index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
