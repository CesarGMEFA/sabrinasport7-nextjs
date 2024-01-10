import { WOO_URL, CK, CS } from "@/lib/api/config";
import { Product } from "@/lib/interfaces/Product.interface";

/**
 * Fetches variations of a product from the WooCommerce API.
 *
 * This function takes a product object as input, which should include a `variations` field
 * containing an array of variation IDs. It then fetches each variation from the WooCommerce API
 * and returns an array of variation objects.
 *
 * @param {Product} data - The product object. Should include a `variations` field.
 * @returns {Promise<Product[]>} - A promise that resolves to an array of variation objects.
 *
 * @throws Will throw an error if the fetch request does not return a successful response.
 *
 * @example
 * const product = await getProduct(123);
 * const variations = await getProductVariations(product);
 */
export async function getProductVariations(data: Product): Promise<Product[]> {
  const variationPromises = data.variations.map(async (variationId) => {
    const url = new URL(
      `/wp-json/wc/v3/products/${data.id}/variations/${variationId}`,
      WOO_URL
    );
    url.searchParams.append("consumer_key", CK ?? "");
    url.searchParams.append("consumer_secret", CS ?? "");

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("No data received from API");
    }

    return await response.json();
  });
  return await Promise.all(variationPromises);
}
