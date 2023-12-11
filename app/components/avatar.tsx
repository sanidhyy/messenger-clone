"use client";

import Image from "next/image";
import type { User } from "@prisma/client";

import useActiveList from "@/app/hooks/use-active-list";

type AvatarProps = {
  user: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) === -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="user avatar"
          fill
        />
      </div>
      {isActive && (
        <span
          role="status"
          className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"
          aria-hidden
        />
      )}
    </div>
  );
};

export default Avatar;
