"use client";

import { useEffect, useRef, useState } from "react";

import type { FullMessageType } from "@/app/types";
import useConversation from "@/app/hooks/use-conversation";
import MessageBox from "./message-box";
import axios from "axios";

type BodyProps = {
  initialMessages: FullMessageType[];
};

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" aria-hidden />
    </div>
  );
};

export default Body;
