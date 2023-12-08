import type { PropsWithChildren } from "react";

import Sidebar from "@/app/components/sidebar/sidebar";
import UserList from "@/app/users/components/user-list";
import getUsers from "@/app/actions/get-users";

export default async function UsersLayout({ children }: PropsWithChildren) {
  const users = await getUsers();

  return (
    <Sidebar>
      <UserList users={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
