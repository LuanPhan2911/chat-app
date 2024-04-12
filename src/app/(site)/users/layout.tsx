import SideBar from "@/app/components/sidebars/SideBar";
import { FunctionComponent } from "react";

interface UsersLayoutProps {
  children: React.ReactNode;
}

const UsersLayout: FunctionComponent<UsersLayoutProps> = async ({
  children,
}) => {
  return (
    <SideBar>
      <div className="h-full">{children}</div>
    </SideBar>
  );
};

export default UsersLayout;
