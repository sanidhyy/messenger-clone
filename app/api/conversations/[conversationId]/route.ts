import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";

type IParams = {
  conversationId?: string;
};

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
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

    return NextResponse.json(deletedConversation);
  } catch (error: unknown) {
    console.log("ERROR_CONVERSATION_DELETE:", error);
    return new NextResponse("Internal Server Error.", { status: 500 });
  }
}
