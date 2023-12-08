import prisma from "@/app/libs/prismadb";

import getSession from "@/app/actions/get-session";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) return [];

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: unknown) {
    return [];
  }
};

export default getUsers;
