"use client";
import { addNewProduct, updateProduct } from "@/services/product";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import TileComponent from "@/components/TileComponent";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import {
    AvailableSizes,
    adminAddProductformControls,
} from "@/utils";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: formData,
    });
    const data = await res.json();
    if (data.success) {
        return data.url;
    }
    throw new Error(data.message || "Upload failed");
}

const initFormData = {
    name: "",
    price: 0,
    description: "",
    category: 'men',
    sizes: [],
    deliveryInfo: '',
    onSale: 'no',
    imageUrl: '',
    priceDrop: 0
}

export default function AdminAddNewProduct() {
    const [formData, setFormData] = useState(initFormData);
    const router = useRouter()

    const {
        componentLevelLoader, setComponentLevelLoader,
        currentUpdatedProduct, setCurrentUpdatedProduct
    } = useContext(GlobalContext)
    console.log({ currentUpdatedProduct });

    useEffect(() => {
        if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct)
    }, [currentUpdatedProduct])

    async function handleImage(event) {
        try {
            const extractImageUrl = await uploadImageToCloudinary(
                event.target.files[0]
            );
            if (extractImageUrl) {
                setFormData({
                    ...formData,
                    imageUrl: extractImageUrl
                });
            }
        } catch (error) {
            toast.error("Image upload failed. Please try again.", {
                position: "top-right",
            });
        }
    }
    console.log({ formData });

    function handleTileClick(getCurrentItem) {
        console.log({ getCurrentItem });
        let cpySizes = [...formData.sizes]
        const index = cpySizes.findIndex(item => item.id === getCurrentItem.id)
        if (index === -1) {
            cpySizes.push(getCurrentItem)
        } else {
            cpySizes = cpySizes.filter(item => item.id !== getCurrentItem.id)
        }
        setFormData({
            ...formData,
            sizes: cpySizes
        })
    }

    async function handleAddProduct() {
        setComponentLevelLoader({ loading: true, id: '' })
        const res = currentUpdatedProduct !== null
            ? await updateProduct(formData)
            : await addNewProduct(formData)
        console.log({ res });
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.success(res.message, {
                position: "top-right"
            })
            setFormData(initFormData)
            setCurrentUpdatedProduct(null)
            setTimeout(() => {
                router.push('/admin-view/all-products')
            }, 1000)
        } else {
            toast.error(res.message, {
                position: "top-right"
            })
            setComponentLevelLoader({ loading: false, id: '' })
            setFormData(initFormData)

        }
    }

    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                    <input
                        accept="image/*"
                        max="1000000"
                        type="file"
                        onChange={handleImage}
                    />

                    <div className="flex gap-2 flex-col">
                        <label>Available sizes</label>
                        <TileComponent
                            selected={formData.sizes}
                            data={AvailableSizes}
                            onClick={handleTileClick}
                        />
                    </div>
                    {adminAddProductformControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                            <InputComponent
                                key={controlItem.id}
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value
                                    })
                                }}
                            />
                        ) : controlItem.componentType === "select" ? (
                            <SelectComponent
                                 key={controlItem.id}
                                label={controlItem.label}
                                options={controlItem.options}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value
                                    })
                                }}
                            />
                        ) : null
                    )}
                    <button
                        onClick={handleAddProduct}
                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                    >
                        {
                            componentLevelLoader && componentLevelLoader.loading
                                ? <ComponentLevelLoader
                                    text={currentUpdatedProduct !== null ? 'Updating Product' : 'Adding product'}
                                    color={"#ffffff"}
                                    loading={componentLevelLoader && componentLevelLoader.loading}
                                /> : (currentUpdatedProduct !== null ? 'Update Product' : 'Add product')
                        }
                    </button>
                </div>
            </div>
            <Notification />
        </div>
    );
}
