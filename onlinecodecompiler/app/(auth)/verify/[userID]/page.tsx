"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Meteors from "@/components/magicui/meteors";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VerifyData, verifySchema } from "@/schemas/verifySchema";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";import toast from "react-hot-toast";

const VerificationCodeComponent = () => {
  const router = useRouter();
  const pramas = useParams<{ userID: string }>();

  const form = useForm<VerifyData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const verifyApi = async (data: VerifyData) => {
    const respone = await axios.post("/api/verify-code", {
      userID: pramas.userID,
      code: data.code
    });
    return respone.data;
  };

  const {
    mutate,
    isPending,
    isError,
    reset,
  } = useMutation({
    mutationFn: verifyApi,
    retry: 3,
    onSuccess: (data: any) => {
      // console.log("Signup successful:", data);
      toast.success(`${data.message}`)
      router.replace(`/sign-in`)
    },
    onError: (error: any) => {
      // console.error("Error signing up:", error);
      toast.error(`Verifacation failed, Please try again`)
    },
  });

  const onSubmit: SubmitHandler<VerifyData> = (data) => {
    // console.log(data);
    // console.log(pramas);
    mutate(data);
  };

  return (
    <>
      <div className="relative   flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
        <Meteors number={100} />

        <div className="absolute z-[9999]  flex justify-center items-center  bg-background ">
          <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 font-Vesper text-primary">
                Verify Your Account
              </h1>
              <p className="mb-4 font-NTR text-foreground">
                Enter the verification code sent to your email
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-Kadwa text-foreground">
                        Verification code
                      </FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="font-NTR text-muted-foreground">
                        Please enter the verification code sent to your email.
                      </FormDescription>
                      <FormMessage className="text-destructive" />
                    </FormItem>
                  )}
                />
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    disabled={isPending}
                  >
                    {isPending ? "Verifying..." : "Verify"}
                    <motion.div
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                </div>
                {/*  */}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationCodeComponent;
