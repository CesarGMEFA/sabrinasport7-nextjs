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
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/Loading";

import { putCustomer } from "@/lib/api/customer/putCustomer";
import { Billing } from "@/lib/interfaces/Customer.interface";

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "Nombre debe tener al menos dos caracteres.",
  }),
  last_name: z.string().min(2, {
    message: "Apellido debe tener al menos dos caracteres.",
  }),
  company: z.string().optional(),
  address_1: z.string().min(2, {
    message: "Dirección debe tener al menos dos caracteres.",
  }),
  address_2: z.string().optional(),
  city: z.string().min(2, {
    message: "Ciudad debe tener al menos dos caracteres.",
  }),
  state: z.string().min(2, {
    message: "Estado debe tener al menos dos caracteres.",
  }),
  postcode: z.string().min(2, {
    message: "Código postal debe tener al menos dos caracteres.",
  }),
  country: z.string().min(2, {
    message: "País debe tener al menos dos caracteres.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

type Props = {
  id: number;
  billingShipping: Billing;
};
export default function FormBillingShipping({
  billingShipping: bs,
  id,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: bs.first_name || "",
      last_name: bs.last_name || "",
      company: bs.company || "",
      address_1: bs.address_1 || "",
      address_2: bs.address_2 || "",
      city: bs.city || "",
      state: bs.state || "",
      postcode: bs.postcode || "",
      country: bs.country || "",
      email: "cesar@email.com" || "",
      phone: "04141234567" || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const b = {
        billing: {
          ...data,
          company: data.company || "",
          address_2: data.address_2 || "",
        },
      };
      const result = await putCustomer(id, b);

      if (result) {
        toast({
          variant: "success",
          title: "Dirección de envío actualizado.",
          description: "Tu dirección ha sido actualizado.",
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
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compa&ntilde;ia</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direcci&oacute;n 1</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direcci&oacute;n 2</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input placeholder="Escribe la ciudad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="escribe el estado aqui" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>C&oacute;digo Postal</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo: 2003" {...field} />
              </FormControl>
              <FormDescription>
                C&oacute;digo postal de tu direcci&oacute;n de la cuenta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pa&iacute;s</FormLabel>
              <FormControl>
                <Input placeholder="Venezuela" {...field} />
              </FormControl>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>N&uacute;mero telef&oacute;nico</FormLabel>
              <FormControl>
                <Input placeholder="numero telefonico" {...field} />
              </FormControl>
              <FormDescription>
                Este es tu n&uacute;mero telef&oacute;nico de la cuenta.
              </FormDescription>
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
