"use client";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import { FullConversationType } from "@/app/types";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: FunctionComponent<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const { isOpen, conversationId } = useConversation();
  const router = useRouter();
  return (
    <aside
      className={clsx(
        `
            fixed
            inset-y-0
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto
            border-r
            border-gray-200
  `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <div className="tex-2xl font-bold text-neutral-800">Messages</div>
          <div className="rounded-full p-2 bg-gray-200 cursor-pointer hover:opacity-75 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((conversation) => {
          return (
            <ConversationBox
              key={conversation.id}
              data={conversation}
              selected={conversation.id === conversationId}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default ConversationList;
