import { getAllAdminProducts } from "@/services/product";
import CommListing from "@/components/CommonListing";

export const dynamic = "force-dynamic";

export default async function AdminAllProducts() {
    const allAdminProducts = await getAllAdminProducts()
    return ( 
        <CommListing 
            data={allAdminProducts && allAdminProducts.data}
        />
    );
}
