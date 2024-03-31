import Cookies from "js-cookie";

// const CURRENT_URL = "http://localhost:3000" 
const CURRENT_URL = "https://zero-store-next.vercel.app"

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    // console.log(error);
  }
};

export const getAllAdminProducts = async () => {
  try {
    console.log("process.env.API_URL");
    console.log(process.env.API_URL);
    const res = await fetch(`https://zero-store-next.vercel.app/api/admin/all-products`, {
      method: "GET",
      cache : 'no-store'
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (formData) => {
    try {
      const res = await fetch("/api/admin/update-product", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/admin/delete-product?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };


  export const productByCategory = async (id) => {
    try {
      const res = await fetch(
        `${CURRENT_URL}/api/admin/product-by-category?id=${id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const productById = async (id) => {
    try {
      const res = await fetch(
        `${CURRENT_URL}/api/admin/product-by-id?id=${id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };