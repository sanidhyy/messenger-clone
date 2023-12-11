import type { PropsWithChildren } from "react";

import Sidebar from "@/app/components/sidebar/sidebar";
import ConversationList from "@/app/conversations/components/conversation-list";
import getConversations from "@/app/actions/get-conversations";
import getUsers from "@/app/actions/get-users";

export default async function ConversationsLayout({
  children,
}: PropsWithChildren) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialConversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
