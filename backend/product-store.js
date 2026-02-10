const product =  require("./schema/Product")

const product1 = {
    productdesc : "Soothe, soften and its featuring a powerful blend of botanical extracts.. Apply to clean skin Gently massage in until absorbed. Excellent for rough skin, cuticles and nails. Cuticles with this intensely moisturizing, lightweight, non-greasy and beautifully scented formula." ,
    productname : "Natural Hydrating Mineral Sunscreen SPF30",
    productimage : [{bindata : productimg}],
    skuno : "000456",
    category : "Sunscreen",
    reviews : [{reviewname : "Rohan Tyagi", reviewerimage : reviewerimg, review : "After regular use, I’ve noticed a significant reduction in the appearance of my dark spots, and my complexion looks more even and radiant", email : "yourmail", rating : 5, reviewdate : new Date().setFullYear(2024, 1, 1),  }],
    range : [[{quantity : String, price : Number, discount : Number, dimension : { l : Number, b : Number, h : Number}, color : String, sku : String, isbiodegradable : Boolean} ]]
}

const productModel = new Product()
product.set(product1)
const firstProdct = async()=>{
const res = await product.save()
console.log(res);
}
