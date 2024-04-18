"use client";
import useRoutes from "@/app/hooks/useRoutes";
import { FunctionComponent, useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingModal from "./SettingModal";

interface DesktopSideBarProps {
  currentUser?: User;
}

const DesktopSideBar: FunctionComponent<DesktopSideBarProps> = ({
  currentUser,
}) => {
  const routes = useRoutes();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <SettingModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 
                xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 
                lg:flex lg:flex-col justify-between"
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul className="flex flex-col items-center space-y-1">
            {routes.map((item) => {
              return (
                <DesktopItem
                  key={item.label}
                  label={item.label}
                  active={item?.active}
                  href={item.href}
                  icon={item.icon}
                  onClick={item?.onClick}
                />
              );
            })}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSideBar;
