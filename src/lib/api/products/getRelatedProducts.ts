import { WOO_URL, CK, CS } from "@/lib/api/config";
import { Product } from "@/lib/interfaces/Product.interface";

/**
 * Fetches related products from the WooCommerce API.
 *
 * This function takes a product object as input, which should include a `related_ids` field
 * containing an array of product IDs. It then fetches each related product from the WooCommerce API
 * and returns an array of product objects.
 *
 * @param {Product} data - The product object. Should include a `related_ids` field.
 * @returns {Promise<Product[]>} - A promise that resolves to an array of related product objects.
 *
 * @throws Will throw an error if the fetch request does not return a successful response.
 *
 * @example
 * const relatedProducts = await getRelatedProducts(product);
 */
export async function getRelatedProducts(data: Product): Promise<Product[]> {
  const relatedPromises = data.related_ids.map(async (relatedId) => {
    const url = new URL(`/wp-json/wc/v3/products/${relatedId}`, WOO_URL);
    url.searchParams.append("consumer_key", CK ?? "");
    url.searchParams.append("consumer_secret", CS ?? "");
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("No data received from API");
    }

    return await response.json();
  });

  return await Promise.all(relatedPromises);
}
