import client from "../lib/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getConversations() {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser?.id) {
    return [];
  }
  try {
    const conversations = await client.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        useIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });
    return conversations;
  } catch (error) {
    return [];
  }
}
