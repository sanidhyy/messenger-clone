import type { PropsWithChildren } from "react";

import Sidebar from "@/app/components/sidebar/sidebar";
import ConversationList from "@/app/conversations/components/conversation-list";
import getConversations from "@/app/actions/get-conversations";

export default async function ConversationsLayout({
  children,
}: PropsWithChildren) {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialConversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
