import { WOO_URL, CK, CS } from "@/lib/api/config";
import { Product } from "@/lib/interfaces/Product.interface";

/**
 * Fetches a product from the WooCommerce API.
 *
 * This function takes a product ID as input and returns a product object.
 * It uses the WooCommerce API to fetch the product data.
 *
 * @param {number} id - The ID of the product to fetch.
 * @returns {Promise<Product>} - A promise that resolves to a product object.
 *
 * @throws Will throw an error if the fetch request does not return a successful response.
 *
 * @example
 * const product = await getProduct(123);
 */
export async function getProduct(id: number) {
  const url = new URL(`/wp-json/wc/v3/products/${id}`, WOO_URL);
  url.searchParams.append("consumer_key", CK ?? "");
  url.searchParams.append("consumer_secret", CS ?? "");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("No data received from API");
  }

  const product: Product = await response.json();

  return product;
}
