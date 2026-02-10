import img from "../assets/products/product1/product-thumbnail-85-600x712.png"
import img1 from "../assets/products/product1/product-thumbnail-13-600x600.png"
import img2 from "../assets/products/product1/product-thumbnail-86-600x712.png"
import img3 from "../assets/products/product1/product-thumbnail-87-600x712.png"


import  {ProductReadMore }from "./ProductReadMore"
export const Gentle = ()=>{
    return(
        <ProductReadMore product ={product} />
    )
}   
const product = {
    id: 1,
    name: "Gentle Gel Facial Cleanser 200ml",
    price: 200,
    description: "An intensely moisturizing, but lightweight, non-greasy hand lotion thanks to a blend of botanical oils that deliver superior, deeply penetrating hydration leaving skin soft and supple. Our bestselling hand moisturizer combines precious Rose Petal Oil, with Rosehip, Camelia, Sea Buckthorn, Wheat Germ Oil and Vitamin E. Enjoy the calm, pleasant, refreshing scent of Vanillin and Orange peel oils.",
    additionalInfo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    reviews: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    quantity: 200,
    isBiodegradable: true,
    dimension: "200ml",
    category: "Skin Care",
    sku: "GENTLE-200ML",
    inStock: 100,
    imgsrc: img,
    alt: "Gentle Gel Facial Cleanser 200ml",
    otherImages : [img, img1, img2, img3]
}