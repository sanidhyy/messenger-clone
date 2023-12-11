import { getServerSession } from "next-auth";

import { authOptions } from "@/app/config/authOptions";

export default async function getSession() {
  return await getServerSession(authOptions);
}
