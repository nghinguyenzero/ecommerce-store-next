'use client'
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";

export default  function CommListing({data = [
    {
        name: 'Vest',
        description: 'Vest for men',
        price: Number,
        category: 'men',
        sizes: [{
            id:'s', label: 'S'
        }],
        price: 1000,
        deliveryInfor: 'Free delivery',
        onSale: 'yes',
        priceDrop: 15,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-store-909d1.appspot.com/o/ecommerce%2FIMG_4122.JPG%20-1711478371595-jlqvy8xnem?alt=media&token=ee97e7cd-32e2-4962-b3bb-0480600a7c07'
    }
]}) {
    return (<section className="bg-white py-12 sm:py-16">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
        {data && data.length
          ? data.map((item) => (
              <article className="relative flex flex-col overflow-hidden border cursor-pointer" key={item._id}>
                <ProductTile item={item} />
                <ProductButton item={item} />
              </article>
            ))
          : null}
      </div>
    </div>
  </section> );
}
