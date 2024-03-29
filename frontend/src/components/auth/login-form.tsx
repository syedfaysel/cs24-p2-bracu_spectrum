"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardWrapper from "./card-wrapper";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from 'zod';
import { useFormStatus } from "react-dom";

type LoginData = {
  email: string;
  password: string;
}


const LoginForm = () => {

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginData, setLoginData] = useState<LoginData | null>(null); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const onSubmit = (data: z.infer<typeof LoginSchema>) => {
  //   setLoginData(data);
  //   console.log(loading)
  //   console.log("submitted");
  // };
  const { pending } = useFormStatus();

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      setLoading(true);
      console.log(loading)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, data);
      

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error: any) {
      console.log("login failed\n", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

  }, []);
  
  return (
    <CardWrapper
      label="Login to your account"
      title="Login | EcoSync"
      backButtonHref="/"
      backButtonLabel="Don't have an account? Back to home"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="sts.manager@ecosync.com"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            ></FormField>
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            ></FormField>
          </div>

          <Button type="submit" className="w-full" disabled={pending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
