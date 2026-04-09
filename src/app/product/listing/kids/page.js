import CommonListing from "@/components/CommonListing";
import { productByCategoryDirect } from "@/services/product/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kids' Clothing",
  description: "Find adorable and durable kids' clothing. Shop t-shirts, overalls, hoodies and more at Zero Store.",
};

export default async function KidsAllProducts() {
  
  const getAllProducts = await productByCategoryDirect("kids");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}