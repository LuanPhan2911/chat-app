"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FunctionComponent, useCallback, useMemo } from "react";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: Boolean;
}

const ConversationBox: FunctionComponent<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const router = useRouter();
  const session = useSession();
  const otherUser = useOtherUser(data);
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);
  const lastMessage = useMemo(() => {
    const { messages = [] } = data;
    return messages[messages.length - 1];
  }, [data]);
  const userEmail = useMemo(
    () => session?.data?.user?.email,
    [session?.data?.user?.email]
  );
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    if (!userEmail) {
      return false;
    }
    const seenArray = lastMessage.seen || [];
    return seenArray.filter((user) => user.email === userEmail).length === 0;
  }, [lastMessage, userEmail]);
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Start a conversation";
  }, [lastMessage]);
  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
      w-full relative flex  items-center space-x-3 p-3
      hover:bg-neutral-100 rounded-md transition cursor-pointer`,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">
              {data?.name || otherUser?.name}
            </p>
            <p className="text-xs font-light text-gray-400">
              {lastMessage?.createdAt &&
                format(new Date(lastMessage?.createdAt), "p")}
            </p>
          </div>
        </div>
        <p
          className={clsx(
            `truncate text-sm`,
            hasSeen ? "text-gray" : "text-black"
          )}
        >
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};

export default ConversationBox;
