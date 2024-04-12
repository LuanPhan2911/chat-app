import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function useConversation() {
  const params = useParams();
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }
    return params?.conversationId;
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
