import SideBar from "@/app/components/sidebars/SideBar";
import { FunctionComponent } from "react";
import ConversationList from "./components/ConversationList";
import getConversations from "@/app/actions/getConversations";

interface ConversationLayoutProps {
  children: React.ReactNode;
}

const ConversationLayout: FunctionComponent<ConversationLayoutProps> = async ({
  children,
}) => {
  const conversations = await getConversations();
  return (
    <SideBar>
      <ConversationList initialItems={conversations} />
      {children}
    </SideBar>
  );
};

export default ConversationLayout;
