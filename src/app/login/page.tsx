"use client";

import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { verifyJwtToken } from "@/lib/auth";

import { useUser } from "@/lib/store/user";
import { useUserStore } from "@/lib/store/useUserStore";

import { UserStore } from "@/lib/interfaces/UserStore.interface";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type jwtInfoUser = {
  success: boolean;
  data: {
    jwt: string;
  };
};
const LoginPage = () => {
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const userStore = useUserStore<UserStore, UserStore>(
    useUser,
    (state: any) => state
  );

  const { user, setUser } = userStore || {
    setUser: () => {},
    user: {},
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const userJWT: jwtInfoUser = await res.json();

      if (userJWT.data) {
        const userData: any = await verifyJwtToken(userJWT.data.jwt);
        if (userData !== null) {
          setUser({
            id: userData.id,
            username: userData.username,
          });
          router.push("/");
        }
      }
      setLoginError("");
    } catch (error) {
      setLoginError("El inicio de sesión falló. Por favor, intenta de nuevo.");
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    if (user.id) {
      console.log("Hay usuario", user);
      redirect("/");
    }
  }, [user]);

  return (
    <section className="h-screen flex flex-col lg:flex-row items-center justify-center">
      <Image
        src={"/logo.png"}
        alt="logo de Sabrina Sport 7"
        width={300}
        height={100}
      />
      <Separator className="bg-red-300 w-72 my-3 lg:hidden" />
      <Separator
        className="bg-red-300 h-96 mx-3 hidden lg:block"
        orientation="vertical"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-72 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" {...field} />
                </FormControl>
                <FormDescription>
                  Este campo de email es requerido para iniciar sesión
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clave</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Este campo de clave es requerido para iniciar sesión
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          {loginError && <FormMessage>{loginError}</FormMessage>}
        </form>
      </Form>
    </section>
  );
};
export default LoginPage;
