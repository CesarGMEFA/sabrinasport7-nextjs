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

const FormSchema = z
  .object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6, "La clave debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "La contraseña no coincide",
    path: ["confirmPassword"],
  });

type userRegisteredType = {
  success: boolean;
  jwt: string;
  message: string;
  roles: string[];
  user: {
    ID: string;
    display_name: string;
    user_activation_key: string;
    user_email: string;
    user_level: number;
    user_login: string;
    user_nicename: string;
    user_registered: string;
    user_status: string;
    user_url: string;
  };
};
const RegistroPage = () => {
  const [registerError, setRegisterError] = useState("");
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
      confirmPassword: "",
      first_name: "",
      last_name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REGISTER_URL}&AUTH_KEY=${process.env.NEXT_PUBLIC_AUTH_CODE_CUSTOMER}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const userRegistered: userRegisteredType = await res.json();
      console.log("user register => ", userRegistered);
      if (userRegistered.success) {
        setUser({
          id: userRegistered.user.ID,
          username: userRegistered.user.user_nicename,
        })
        router.push("/");
      } else {
        setRegisterError(userRegistered.message);
      }
      setRegisterError("");
    } catch (error) {
      setRegisterError(
        "El inicio de sesión falló. Por favor, intenta de nuevo."
      );
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
    <section className="mt-16 flex flex-col lg:flex-row items-center justify-center">
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-72 mb-10 space-y-6"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Este campo de nombre es requerido para iniciar sesión
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Este campo de nombre es requerido para iniciar sesión.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validar Clave</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Este campo de clave es requerido para iniciar sesión
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          {registerError && <FormMessage>{registerError}</FormMessage>}
        </form>
      </Form>
    </section>
  );
};
export default RegistroPage;
