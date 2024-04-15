import getUsers from "@/app/actions/getUsers";
import SideBar from "@/app/components/sidebars/SideBar";
import { FunctionComponent } from "react";
import UserList from "./components/UserList";

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FunctionComponent<UsersLayoutProps> = async ({
  children,
}) => {
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <UserList users={users} />
        {children}
      </div>
    </SideBar>
  );
};

export default UsersLayout;
