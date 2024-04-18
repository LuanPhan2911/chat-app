"use client";
import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { FunctionComponent } from "react";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: FunctionComponent<AvatarGroupProps> = ({ users }) => {
  const sliceUsers = users?.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {sliceUsers?.map((user, index) => {
        return (
          <div
            className={clsx(
              `absolute inline-block rounded-full
             overflow-hidden h-[21px] w-[21px]`,
              positionMap[index as keyof typeof positionMap]
            )}
            key={user.id}
          >
            <Image
              alt="Avatar"
              src={user?.image || "/images/placeholder.jpg"}
              fill
            />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarGroup;
