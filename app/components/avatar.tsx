"use client";

import Image from "next/image";
import type { User } from "@prisma/client";

type AvatarProps = {
  user: User;
};

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="user avatar"
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
