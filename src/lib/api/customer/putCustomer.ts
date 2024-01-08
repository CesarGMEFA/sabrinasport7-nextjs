import { WOO_URL, CK, CS } from "@/lib/api/config";
import {
  Shipping,
  Billing,
  Customer,
} from "@/lib/interfaces/Customer.interface";

type Data = {
  shipping?: Shipping;
  billing?: Billing;
  first_name?: string;
  last_name?: string;
  email?: string;
};
export async function putCustomer(id: number, data: Data) {
  const url = new URL(`/wp-json/wc/v3/customers/${id}`, WOO_URL);
  url.searchParams.append("consumer_key", CK ?? "");
  url.searchParams.append("consumer_secret", CS ?? "");

  const response = await fetch(url.toString(), {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("No data received from API");
  }

  return true;
}
