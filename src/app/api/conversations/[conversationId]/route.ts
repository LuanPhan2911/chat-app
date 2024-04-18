import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/lib/prismadb";
import { pusherServer } from "@/app/lib/pusher";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const { conversationId } = params;
    const conversation = await client.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("ConversationId invalid", { status: 400 });
    }
    const deletedConversation = await client.conversation.deleteMany({
      where: {
        id: conversationId,
        useIds: {
          hasSome: [currentUser?.id],
        },
      },
    });

    conversation.users.map((user) => {
      if (user?.email) {
        pusherServer.trigger(user?.email, "conversation:remove", conversation);
      }
    });
    return NextResponse.json(deletedConversation);
  } catch (error) {
    return new NextResponse("Error from server", { status: 500 });
  }
}
