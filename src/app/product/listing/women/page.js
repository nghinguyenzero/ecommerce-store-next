import CommonListing from "@/components/CommonListing";
import { productByCategoryDirect } from "@/services/product/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Women's Clothing",
  description: "Explore women's fashion collection. Shop dresses, blouses, jackets and more at Zero Store.",
};

export default async function WomenAllProducts() {
  
  const getAllProducts = await productByCategoryDirect("women");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}