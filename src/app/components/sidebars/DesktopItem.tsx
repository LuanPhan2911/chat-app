"use client";
import clsx from "clsx";
import Link from "next/link";
import { FunctionComponent } from "react";

interface DesktopItemProps {
  label: string;
  active?: boolean;
  href: string;
  icon: any;
  onClick?: () => void;
}

const DesktopItem: FunctionComponent<DesktopItemProps> = ({
  label,
  active,
  href,
  icon: Icon,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
          group
          flex
          gap-x-2
          rounded-md
          text-sm
          leading-6
          text-gray-500
          font-semibold
          hover:text-black
          hover:bg-gray-100
          p-3   
      `,
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
