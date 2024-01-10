import { WOO_URL, CK, CS } from "@/lib/api/config";
import { Product } from "@/lib/interfaces/Product.interface";

/**
 * Fetches a page of products from the WooCommerce API.
 *
 * This function takes optional parameters for the page number, search query, and category ID,
 * and returns an object containing an array of products and metadata about the total number
 * of pages and products.
 *
 * @param {number} [page=1] - The page number to fetch. Defaults to 1.
 * @param {string} [search=""] - A search query to filter the products. Defaults to an empty string.
 * @param {string} [category=""] - A category ID to filter the products. Defaults to an empty string.
 * @returns {Promise<{products: Product[], totalPages: string, totalProducts: string}>} - A promise that resolves to an object containing an array of products and metadata about the total number of pages and products.
 *
 * @throws Will throw an error if the page is not a positive integer or if the fetch request does not return a successful response.
 *
 * @example
 * const { products, totalPages, totalProducts } = await getProducts(1, "shirt", "5");
 */
export async function getProducts(page = 1, search = "", category = "") {
  const per_page = 20;
  if (typeof page !== "number" || page < 1) {
    throw new Error("Page must be a positive integer");
  }

  const url = new URL(`/wp-json/wc/v3/products`, WOO_URL);
  url.searchParams.append("consumer_key", CK ?? "");
  url.searchParams.append("consumer_secret", CS ?? "");
  url.searchParams.append("page", page.toString());
  url.searchParams.append("per_page", per_page.toString());

  if (search !== "") {
    url.searchParams.append("search", search);
  }

  if (category !== "") {
    url.searchParams.append("category", category);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("No data received from API");
  }

  const products: Product[] = await response.json();
  const totalPages = response.headers.get("x-wp-totalpages");
  const totalProducts = response.headers.get("x-wp-total");

  return {
    products,
    totalPages,
    totalProducts,
  };
}
