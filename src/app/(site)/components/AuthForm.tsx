"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);
  const toggleVarian = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (variant === "REGISTER") {
      try {
        await axios.post("/api/register", data);
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    if (variant === "LOGIN") {
      try {
        let res = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        if (res?.error) {
          toast.error("Invalid Credential!");
        }
        if (res?.ok) {
          toast.success("Logged in!");
          router.push("/users");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    setLoading(false);
  };
  const socialAction = async (action: string) => {
    setLoading(true);
    try {
      let res = await signIn(action, {
        redirect: false,
      });
      console.log(res);

      if (res?.error) {
        toast.error("Invalid Credential!");
      }
      if (res?.ok) {
        toast.success("Logged in!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              id="name"
              type="text"
              register={register}
              errors={errors}
            />
          )}
          <Input
            label="Email"
            id="email"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
          />
          <Button fullWidth disabled={isLoading}>
            {variant === "LOGIN" ? "Sign In" : "Register"}
          </Button>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction("github")}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction("google")}
          />
        </div>
        <div className="mt-6 flex justify-center gap-2 text-sm px-2 text-gray-500">
          <span>
            {variant === "LOGIN" ? "New to Messenger?" : "Already Account"}
          </span>
          <span
            className="underline cursor-pointer text-sky-500"
            onClick={toggleVarian}
          >
            {variant === "LOGIN" ? "Create Account" : "Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
