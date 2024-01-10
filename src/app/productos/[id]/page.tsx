import ProductPageComponent from "@/components/Product/ProductPage";
import { getProductVariations } from "@/lib/api/products/getProductVariations";
import { getProduct } from "@/lib/api/products/getProduct";

import { Product } from "@/lib/interfaces/Product.interface";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const id = params.id;
  let variations: Product[] = [];

  const data = await getProduct(Number(id));

  if (data.variations.length > 0) {
    variations = await getProductVariations(data);
  }

  return <ProductPageComponent product={data} variations={variations} />;
}
