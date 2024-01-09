import { WOO_URL, CK, CS } from "@/lib/api/config";
import { Customer } from "@/lib/interfaces/Customer.interface";

export async function getCustomer(id: number | string) {
  const url = new URL(`/wp-json/wc/v3/customers/${id}`, WOO_URL);
  url.searchParams.append("consumer_key", CK ?? "");
  url.searchParams.append("consumer_secret", CS ?? "");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("No data received from API");
  }

  const customer: Customer = await response.json();

  return customer;
}