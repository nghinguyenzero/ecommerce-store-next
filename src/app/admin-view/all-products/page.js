import { getAllAdminProducts } from "@/services/product";
import CommListing from "@/components/CommonListing";

export default async function AdminAllProducts() {
    const allAdminProducts = await getAllAdminProducts()
    return ( 
        <CommListing 
            data={allAdminProducts && allAdminProducts.data}
        />
    );
}
