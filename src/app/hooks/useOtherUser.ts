import { useMemo } from "react";
import { FullConversationType } from "../types";
import { useSession } from "next-auth/react";
import { Conversation, User } from "@prisma/client";

export default function useOtherUser(
  conversation: Conversation & {
    users: User[];
  }
) {
  const session = useSession();
  const currentUserEmail = session?.data?.user?.email;
  const otherUser = useMemo(() => {
    const otherUser = conversation.users.filter((user) => {
      return user.email !== currentUserEmail;
    });
    return otherUser[0];
  }, [currentUserEmail, conversation?.users]);
  return otherUser;
}
