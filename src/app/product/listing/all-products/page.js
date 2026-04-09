import CommonListing from "@/components/CommonListing";
import { getAllProductsDirect } from "@/services/product/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Products",
  description: "Browse our complete collection of fashion clothing for Men, Women and Kids at Zero Store.",
};

export default async function AllProducts() {
  
  const getAllProducts = await getAllProductsDirect();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}