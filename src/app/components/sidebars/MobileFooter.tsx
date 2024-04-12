"use client";
import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import { FunctionComponent } from "react";
import MobileItem from "./MobileItem";

interface MobileFooterProps {}

const MobileFooter: FunctionComponent<MobileFooterProps> = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div
      className="fixed flex justify-between items-center
     w-full bottom-0 bg-white border-t-[1px] lg:hidden"
    >
      {routes.map((item) => {
        return (
          <MobileItem
            key={item.label}
            href={item.href}
            label={item.label}
            active={item.active}
            onClick={item.onClick}
            icon={item.icon}
          />
        );
      })}
    </div>
  );
};

export default MobileFooter;
