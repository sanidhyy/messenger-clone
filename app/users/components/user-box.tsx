"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { User } from "@prisma/client";

import Avatar from "@/app/components/avatar";
import LoadingModal from "@/app/components/loading-modal";

type UserBoxProps = {
  user: User;
};

const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const userConversationRef = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  useEffect(() => {
    userConversationRef.current?.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
        handleClick();
      }
    });

    return userConversationRef.current?.removeEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
        handleClick();
      }
    });
  }, [userConversationRef, handleClick]);

  if (isLoading) return <LoadingModal />;

  return (
    <div
      ref={userConversationRef}
      role="button"
      aria-pressed={false}
      tabIndex={0}
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar user={user} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
