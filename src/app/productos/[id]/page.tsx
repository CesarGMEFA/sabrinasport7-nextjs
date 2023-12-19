import ProductPageComponent from "@/components/Product/ProductPage";
import { getProduct } from "@/lib/api/products";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const id = params.id;

  const data = await getProduct(Number(id));
  // console.log('data =>', data.attributes)
  return <ProductPageComponent product={data} />;
}
