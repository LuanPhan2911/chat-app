"use client";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FunctionComponent } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton } from "next-cloudinary";

interface FormProps {}

const Form: FunctionComponent<FormProps> = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/messages", {
        ...data,
        conversationId,
      });
      setValue("message", "", { shouldValidate: true });
    } catch (error) {}
  };
  const handleUpload = async (result: any) => {
    try {
      await axios.post("/api/messages", {
        image: result?.info?.secure_url,
        conversationId,
      });
    } catch (error) {}
  };
  return (
    <div
      className="py-4 px-4 bg-white border-t 
  flex items-center gap-2 lg:gap-4 w-full"
    >
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onSuccess={handleUpload}
        uploadPreset="eavpddnh"
      >
        <HiPhoto size={32} className="text-sky-500" />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message!"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 
        cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={32} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
