"use client";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username debe tener al menos dos caracteres.",
  }),
  first_name: z.string().min(2, {
    message: "Nombre debe tener al menos dos caracteres.",
  }),
  last_name: z.string().min(2, {
    message: "Apellido debe tener al menos dos caracteres.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

export default function FormPersonInfo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "coco123",
      first_name: "Cesar",
      last_name: "Doe",
      email: "cesar@email.com"
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="alex12" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="escribe tu nombre aqui"
                  {...field}
                />
              </FormControl>
              <FormDescription>Este es tu nombre.</FormDescription>
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
                <Input
                  placeholder="escribe tu apellido aqui"
                  {...field}
                />
              </FormControl>
              <FormDescription>Este es tu apellido.</FormDescription>
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
                <Input
                  placeholder="ejemplo@mail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Nosotros no compatiremos tu email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isDirty}>Submit</Button>
      </form>
    </Form>
  );

}
