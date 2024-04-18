"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

import { FunctionComponent, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingModalProps {
  currentUser?: User;
  isOpen?: boolean;
  onClose: () => void;
}

const SettingModal: FunctionComponent<SettingModalProps> = ({
  isOpen,
  currentUser,
  onClose,
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });
  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/settings", data);
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
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">
              Edit your public information.
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
            </div>
            <div className="mt-10 flex flex-col gap-y-8">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <div
                  className="relative inline-block rounded-full 
                              h-14 w-14 md:h-24 md:w-24 overflow-hidden"
                >
                  <Image
                    alt="img"
                    src={image || "/images/placeholder.jpg"}
                    fill
                  />
                </div>
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onSuccess={handleUpload}
                  uploadPreset="eavpddnh"
                >
                  <Button disabled={isLoading} secondary type="button">
                    Change
                  </Button>
                </CldUploadButton>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingModal;
