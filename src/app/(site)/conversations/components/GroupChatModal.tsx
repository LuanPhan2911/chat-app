"use client";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  users: User[];
  onClose: () => void;
}

const GroupChatModal: FunctionComponent<GroupChatModalProps> = ({
  onClose,
  users,
  isOpen,
}) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/conversations", {
        ...data,
        isGroup: true,
      });
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">
              Need more than 2 members to create a group chat.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                errors={errors}
                id="name"
                label="Name"
                register={register}
                disable={isLoading}
                required
                type="text"
              />
              <Select
                disable={isLoading}
                label="Members"
                options={users?.map((user) => ({
                  value: user?.id,
                  label: user?.name,
                }))}
                onChange={(value: any) => {
                  setValue("members", value, {
                    shouldValidate: true,
                  });
                }}
                value={members}
              />
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button disabled={isLoading} secondary onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
