import { getAllProductsDirect } from "@/services/product/server";
import CommListing from "@/components/CommonListing";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Products",
  robots: { index: false, follow: false },
};

export default async function AdminAllProducts() {
    const allAdminProducts = await getAllProductsDirect()
    return ( 
        <CommListing 
            data={allAdminProducts && allAdminProducts.data}
        />
    );
}
