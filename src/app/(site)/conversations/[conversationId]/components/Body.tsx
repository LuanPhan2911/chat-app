"use client";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: FunctionComponent<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  useEffect(() => {
    async function makeSeen() {
      try {
        await axios.post(`/api/conversations/${conversationId}/seen`);
      } catch (error) {}
    }
    makeSeen();
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => {
        return (
          <MessageBox
            isLast={index == messages.length - 1}
            key={message.id}
            data={message}
          />
        );
      })}
      <div className="pt-20" ref={bottomRef}></div>
    </div>
  );
};

export default Body;
