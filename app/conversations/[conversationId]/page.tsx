import EmptyState from "@/app/components/empty-state";
import getConversationById from "@/app/actions/get-conversation-by-id";
import getMessages from "@/app/actions/get-messages";
import Header from "./components/header";
import Body from "./components/body";

type IParams = {
  conversationId: string;
};

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body />
      </div>
    </div>
  );
};

export default ConversationId;
