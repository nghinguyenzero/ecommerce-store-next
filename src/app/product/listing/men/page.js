import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Men's Clothing",
  description: "Discover the latest men's fashion collection. Shop t-shirts, jeans, hoodies and more at Zero Store.",
};

export default async function MenAllProducts() {
  const getAllProducts = await productByCategory("men");

  return <CommonListing data={ getAllProducts && getAllProducts.data }/>;
}