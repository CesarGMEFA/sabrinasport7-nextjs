"use client";
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
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/ui/Loading";

import { Customer } from "@/lib/interfaces/Customer.interface";
import { putCustomer } from "@/lib/api/customer/putCustomer";

const formSchema = z.object({
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

type Props = {
  c: Customer;
  id: number;
};
export default function FormPersonInfo({ c, id }: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: c.first_name || "",
      last_name: c.last_name || "",
      email: c.email || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const customerData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      };

      const result = await putCustomer(id, customerData);

      if (result) {
        toast({
          variant: "success",
          title: "Información personal actualizada.",
          description: "Tu información ha sido actualizado.",
          duration: 1200,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo@mail.com" {...field} />
              </FormControl>
              <FormDescription>
                Nosotros no compatiremos tu email.
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
                <Input placeholder="escribe tu nombre aqui" {...field} />
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
                <Input placeholder="escribe tu apellido aqui" {...field} />
              </FormControl>
              <FormDescription>Este es tu apellido.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {loading ? (
          <div className=" w-12 rounded-md py-2 px-4 bg-red-600 text-center flex items-center justify-center">
            <Loading size={24} />
          </div>
        ) : (
          <Button type="submit" disabled={!form.formState.isDirty}>
            Guardar
          </Button>
        )}
      </form>
    </Form>
  );
}
