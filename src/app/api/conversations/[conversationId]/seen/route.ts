import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/lib/prismadb";
import { pusherServer } from "@/app/lib/pusher";
import { NextResponse } from "next/server";

interface IParams {
  conversationId: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
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
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("ConversationId invalid", { status: 400 });
    }
    const lastMessage =
      conversation?.messages[conversation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }
    const updateMessage = await client.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        seen: true,
        sender: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser?.email, "conversation:update", {
      id: conversationId,
      messages: [updateMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser?.id) !== -1) {
      return NextResponse.json(conversation);
    }
    await pusherServer.trigger(conversationId, "message:update", updateMessage);
    return NextResponse.json(updateMessage);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
