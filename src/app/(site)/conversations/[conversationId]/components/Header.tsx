"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { FunctionComponent, useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: FunctionComponent<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const { members } = useActiveList();
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return members.indexOf(otherUser.email!) !== -1 ? "Active" : "Offline";
  }, [
    conversation.isGroup,
    conversation.users.length,
    members,
    otherUser.email,
  ]);
  return (
    <>
      <ProfileDrawer
        isOpen={isOpenDrawer}
        onClose={() => setOpenDrawer(false)}
        data={conversation}
      />
      <div
        className="bg-white w-full flex border-b-2 py-3 px-4 
        lg:px-6 justify-between items-center shadow-sm"
      >
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-sky-500 
        hover:text-sky-600 transition cursor-pointer"
            href={"/conversations"}
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation?.isGroup ? (
            <AvatarGroup users={conversation?.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="">{conversation?.name || otherUser?.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          className="text-sky-500 cursor-pointer
           hover:text-sky-600 transition"
          onClick={() => setOpenDrawer(true)}
        />
      </div>
    </>
  );
};

export default Header;
