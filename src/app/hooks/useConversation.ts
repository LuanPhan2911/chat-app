import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function useConversation() {
  const params = useParams();
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }
    return params?.conversationId as string;
  }, [params?.conversationId]);
  const isOpen = useMemo(() => {
    return !!conversationId;
  }, [conversationId]);

  return useMemo(() => {
    return {
      isOpen,
      conversationId,
    };
  }, [isOpen, conversationId]);
}
