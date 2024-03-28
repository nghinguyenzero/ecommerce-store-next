"use client";

import { deleteProduct } from "@/app/services/product";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const { currentUpdatedProduct, setCurrentUpdatedProduct,
    componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext)

  const isAdminView = pathName.includes("admin-view");
  const router = useRouter()

  async function handleDeleteProduct(item) {
    const res = await deleteProduct(item._id)
    if (res.success) {
      setComponentLevelLoader({ loading: true, id: item._id })
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      router.refresh()
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      setComponentLevelLoader({ loading: false, id: '' })
    }

  }
  return isAdminView ? (
    <>
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item)
          router.push('/admin-view/add-product')
        }}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
        Update
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
        {
          componentLevelLoader && componentLevelLoader.loading
            && item._id === componentLevelLoader.id ?
            <ComponentLevelLoader
              text={'Deleting product'}
              color={"#ffffff"}
              loading={componentLevelLoader && componentLevelLoader.loading}
            /> : 'DELETE'
        }
      </button>
    </>
  ) : (
    <>
      <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
        Add To Cart
      </button>
    </>
  );
}