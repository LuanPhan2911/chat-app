import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/lib/prismadb";
import { id } from "date-fns/locale";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { conversationId, message, image } = body;

    if (!currentUser || !currentUser.email) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const newMessage = await client.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });
    const updatedConversation = await client.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
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

    return NextResponse.json("Hello", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
