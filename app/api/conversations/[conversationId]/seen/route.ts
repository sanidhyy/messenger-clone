import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/get-current-user";

type IParams = {
  conversationId: string;
};

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    // find the existing conversation
    const conversation = await prisma.conversation.findUnique({
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
      return new NextResponse("Invalid Id.", { status: 400 });
    }

    // find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) return NextResponse.json(conversation);

    // update seen of last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(updatedMessage);
  } catch (error: unknown) {
    console.log("ERROR_MESSAGES_SEEN:", error);
    return new NextResponse("Internal Server Error.", { status: 500 });
  }
}
