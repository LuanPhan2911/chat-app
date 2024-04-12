import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat, HiUser } from "react-icons/hi";
import useConversation from "./useConversation";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathName = usePathname();
  const params = useParams();
  const { conversationId } = useConversation();
  const routes = useMemo(() => {
    return [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathName === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUser,
        active: pathName === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ];
  }, [pathName, conversationId]);
  return routes;
};
export default useRoutes;
