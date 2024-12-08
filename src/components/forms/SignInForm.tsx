"use client";

import FormInputText from "@/components/common/FormInputText";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../ui/input";
import Link from "next/link";
import { ArrowRight } from "iconsax-react";

const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({ required_error: "Password is required" }),
});

const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    mode: "all",
  });

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const onSubmit = async () => {
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-11 py-4">
          <div className="flex flex-col justify-end gap-4">
            <FormInputText
              name="email"
              label="Email address"
              placeholder="email@domain.com"
              control={control}
              errors={errors}
            />
            <FormInputText
              name="password"
              label="password"
              placeholder="*******************"
              type="password"
              control={control}
              errors={errors}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
              <Input
                type="checkbox"
                id="remember-device"
                className="w-4 h-4 form-input"
              />
              <label htmlFor="remember-device" className="text-Gray-100">
                Remember this device
              </label>
            </div>
            <Link
              href="/"
              className="text-Green-300 text-sm md:text-base  font-semibold"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-Black-100 text-White-100 h-10 flex justify-between items-center p-4"
          >
            <span className="uppercase">sign in</span>
            <ArrowRight size="24" className="text-secondary-foreground" />
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link
              href="#"
              className="text-Green-300 text-sm md:text-base  font-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
