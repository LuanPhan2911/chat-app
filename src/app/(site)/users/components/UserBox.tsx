"use client";
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

import { FunctionComponent, useCallback, useState } from "react";

interface UserBoxProps {
  user: User;
}

const UserBox: FunctionComponent<UserBoxProps> = ({ user }) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/conversations`, {
        userId: user.id,
      });
      if (res.data?.id) {
        let conversationId = res.data.id;
        router.push(`/conversations/${conversationId}`);
      }
    } catch (error) {}
    setLoading(false);
  }, [user, router]);
  return (
    <div
      className="
      w-full
      relative
      flex
      items-center
      space-x-3
      bg-white
      p-3
      hover:bg-neutral-100
      rounded-lg
      transition
      cursor-pointer
  "
      onClick={handleClick}
    >
      <Avatar user={user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;