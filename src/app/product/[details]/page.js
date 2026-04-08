import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

export const dynamic = "force-dynamic";

export default async function ProductDetails({ params }) {
  const { details } = await params;
  const productDetailsData = await productById(details);

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}