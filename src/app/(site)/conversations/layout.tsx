import SideBar from "@/app/components/sidebars/SideBar";
import { FunctionComponent } from "react";
import ConversationList from "./components/ConversationList";
import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";

interface ConversationLayoutProps {
  children: React.ReactNode;
}

const ConversationLayout: FunctionComponent<ConversationLayoutProps> = async ({
  children,
}) => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <SideBar>
      <ConversationList initialItems={conversations} users={users} />
      {children}
    </SideBar>
  );
};

export default ConversationLayout;
