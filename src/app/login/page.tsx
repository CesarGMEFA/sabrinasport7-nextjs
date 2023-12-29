"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { authenticate } from "@/lib/actions";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("test@gmail.com");
  const [password, setPassword] = useState<string>("test");
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("=> ", data);

    try {
      const res = await fetch(
        `https://sabrinasport7.com/?rest_route=/simple-jwt-login/v1/auth`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const user = await res.json();
      console.log(user);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   await signIn("credentials", data);
    // } catch (error) {
    //   if (error instanceof AuthError) {
    //     switch (error.type) {
    //       case "CredentialsSignin":
    //         return "Invalid credentials.";
    //       default:
    //         return "Something went wrong.";
    //     }
    //   }
    //   throw error;
    // }

    // const responseNextAuth = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // });
    // console.log(responseNextAuth);
    // if (responseNextAuth?.error) {
    //   setErrors(responseNextAuth.error.split(","));
    //   return;
    // }
  }

  return (
    <section className="h-screen flex items-center justify-center">
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
                  <Input placeholder="******" {...field} />
                </FormControl>
                <FormDescription>
                  Este campo de clave es requerido para iniciar sesión
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};
export default LoginPage;
