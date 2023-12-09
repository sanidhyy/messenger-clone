"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { Conversation, User } from "@prisma/client";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

import useOtherUser from "@/app/hooks/use-other-user";
import Avatar from "@/app/components/avatar";

type HeaderProps = {
  conversation: Conversation & {
    users: User[];
  };
};

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return `Online`;
  }, [conversation]);

  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          href="/conversations"
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />

        <div className="flex flex-col">
          <h3>{conversation.name || otherUser.name}</h3>

          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>

      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
    </div>
  );
};

export default Header;