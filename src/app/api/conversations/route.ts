import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await request.json();
    const { userId, isGroup, members, name } = body;
    if (isGroup && (!members || members?.length < 2 || !name)) {
      return new NextResponse("Invalid data for group chat", { status: 400 });
    }
    if (isGroup) {
      const newConversation = await client.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => {
                return {
                  id: member.value,
                };
              }),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversation);
    }
    const existingConversations = await client.conversation.findMany({
      where: {
        OR: [
          {
            useIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            useIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });
    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }
    const newConversation = await client.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Error from server", { status: 500 });
  }
}
