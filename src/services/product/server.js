import connectToDB from "@/database";
import Product from "@/models/product";

export const getAllProductsDirect = async () => {
  try {
    await connectToDB();
    const products = await Product.find({});
    if (products) {
      return { success: true, data: JSON.parse(JSON.stringify(products)) };
    }
    return { success: false, message: "No Products found" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const productByCategoryDirect = async (category) => {
  try {
    await connectToDB();
    const products = await Product.find({ category });
    if (products) {
      return { success: true, data: JSON.parse(JSON.stringify(products)) };
    }
    return { success: false, message: "No Products found" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

export const productByIdDirect = async (id) => {
  try {
    await connectToDB();
    const product = await Product.findById(id);
    if (product) {
      return { success: true, data: JSON.parse(JSON.stringify(product)) };
    }
    return { success: false, message: "Product not found" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
