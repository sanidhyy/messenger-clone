import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { name, image } = body;

    if (!currentUser?.id)
      return new NextResponse("Unauthorized.", { status: 401 });

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    console.log("ERROR_SETTINGS:", error);
    return new NextResponse("Internal Server Error.", { status: 500 });
  }
}
