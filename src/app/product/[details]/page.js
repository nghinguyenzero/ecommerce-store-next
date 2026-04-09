import CommonDetails from "@/components/CommonDetails";
import { productByIdDirect } from "@/services/product/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { details } = await params;
  const res = await productByIdDirect(details);
  const product = res?.data;

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export default async function ProductDetails({ params }) {
  const { details } = await params;
  const productDetailsData = await productByIdDirect(details);

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}