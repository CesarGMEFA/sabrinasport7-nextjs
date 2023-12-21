import { WOO_URL, CK, CS } from "@/lib/api/config";
import { Product } from "@/lib/interfaces/Product.interface";

/**
 * Fetches a list of products from the API.
 *
 * @param {number} [options.page=1] - The page of products to fetch. Must be a positive integer.
 * @param {number} [options.per_page=20] - The number of products to fetch per page. Must be a positive integer.
 *
 * @throws {Error} If `page` or `per_page` is not a positive integer.
 * @throws {Error} If no data is received from the API.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing an array of products and the total number of pages.
 */
export async function getProducts(page = 1, per_page = 5) {
    if (typeof page !== "number" || page < 1) {
        throw new Error("Page must be a positive integer");
    }

    if (typeof per_page !== "number" || per_page < 1) {
        throw new Error("Per_page must be a positive integer");
    }

    const url = new URL(`/wp-json/wc/v3/products`, WOO_URL);
    url.searchParams.append('consumer_key', CK ?? '');
    url.searchParams.append('consumer_secret', CS ?? '');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', per_page.toString());

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
        totalProducts
    };
}

export async function getProduct(id: number) {
    const url = new URL(`/wp-json/wc/v3/products/${id}`, WOO_URL);
    url.searchParams.append('consumer_key', CK ?? '');
    url.searchParams.append('consumer_secret', CS ?? '');

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error("No data received from API");
    }

    const product: Product = await response.json();

    return product;
}