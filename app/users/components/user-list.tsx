"use client";

import type { User } from "@prisma/client";

import UserBox from "@/app/users/components/user-box";

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lb:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <h3 className="text-2xl font-bold text-neutral-800 py-4">People</h3>
        </div>

        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
