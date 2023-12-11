"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import type { User } from "@prisma/client";
import { MdOutlineGroupAdd } from "react-icons/md";

import type { FullConversationType } from "@/app/types";
import useConversation from "@/app/hooks/use-conversation";
import ConversationBox from "@/app/conversations/components/conversation-box";
import GroupChatModal from "@/app/conversations/components/group-chat-modal";

type ConversationListProps = {
  initialConversations: FullConversationType[];
  users: User[];
};

const ConversationList: React.FC<ConversationListProps> = ({
  initialConversations,
  users,
}) => {
  const [conversations, setConversation] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <h3 className="text-2xl font-bold text-neutral-800">Messages</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} />
            </button>
          </div>

          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              data={conversation}
              selected={conversationId === conversation.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
