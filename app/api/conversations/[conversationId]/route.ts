import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";
import { pusherServer } from "@/app/libs/pusher";

type IParams = {
  conversationId?: string;
};

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<IParams> },
) {
  try {
    const { conversationId } = await params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id)
      return new NextResponse("Unauthorized.", { status: 401 });

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation)
      return new NextResponse("Invalid Id.", { status: 400 });

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation,
        );
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error: unknown) {
    console.error("ERROR_CONVERSATION_DELETE:", error);
    return new NextResponse("Internal Server Error.", { status: 500 });
  }
}
