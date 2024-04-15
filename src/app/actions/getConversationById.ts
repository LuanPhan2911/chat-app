import client from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getConversationById(id: string) {
  try {
    let currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }
    const conversation = client.conversation.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error) {
    return null;
  }
}
