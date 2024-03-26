"use client";
import { addNewProduct } from "@/app/services/product";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/TileComponent";
import {
    AvailableSizes,
    adminAddProductformControls,
    firebaseConfig,
    firebaseStorageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile) => {
    const timestamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);
    return `${getFile.name} -${timestamp}-${randomStringValue}`;
};

async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `ecommerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);
    return new Promise((resolve, reject) => {
        uploadImage.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref)
                    .then((dowloadUrl) => resolve(dowloadUrl))
                    .catch((error) => reject(error));
            }
        );
    });
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

    async function handleImage(event) {
        const extractImageUrl = await helperForUploadingImageToFirebase(
            event.target.files[0]
        )
        if(extractImageUrl) {
            setFormData({
                ...formData,
                imageUrl: extractImageUrl
            })
        }
    }
    console.log({formData});

    function handleTileClick(getCurrentItem) {
        console.log({getCurrentItem});
        let cpySizes = [...formData.sizes]
        const index = cpySizes.findIndex(item => item.id === getCurrentItem.id)
        if(index===-1) {
            cpySizes.push(getCurrentItem)
        } else {
            cpySizes = cpySizes.filter(item=> item.id !== getCurrentItem.id)
        }
        setFormData({
            ...formData,
            sizes: cpySizes
        })
    }

    async function handleAddProduct () {
        const res = await addNewProduct(formData)
        console.log({res});

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
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(event)=>{
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value
                                    })
                                }}
                            />
                        ) : controlItem.componentType === "select" ? (
                            <SelectComponent
                                label={controlItem.label}
                                options={controlItem.options}
                                onChange={(event)=>{
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
                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}
