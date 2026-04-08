import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Products",
  description: "Browse our complete collection of fashion clothing for Men, Women and Kids at Zero Store.",
};

export default async function AllProducts() {
  
  const getAllProducts = await getAllAdminProducts();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}